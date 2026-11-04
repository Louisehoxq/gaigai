import http from 'http';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Shared server-side Gemini client with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// ---- Pilot event counting (anonymous: no IP, no user id, no cookies) ----
const EVENT_NAMES = new Set(['qr_scan', 'outbound_click', 'trail_add', 'raise_record_click']);
const ID_RE = /^[a-z0-9-]{1,40}$/;
const MEDIUM_RE = /^[a-z]{1,20}$/;
const EVENTS_FILE = path.join(process.cwd(), 'data', 'events.jsonl');

app.post('/api/events', (req: Request, res: Response) => {
  const { event, enterpriseId, medium } = req.body ?? {};
  if (typeof event !== 'string' || !EVENT_NAMES.has(event)) return res.status(400).json({ error: 'bad event' });
  if (typeof enterpriseId !== 'string' || !ID_RE.test(enterpriseId)) return res.status(400).json({ error: 'bad enterpriseId' });
  if (medium != null && (typeof medium !== 'string' || !MEDIUM_RE.test(medium))) return res.status(400).json({ error: 'bad medium' });
  const line = JSON.stringify({ t: new Date().toISOString(), event, enterpriseId, medium: medium ?? null }) + '\n';
  fs.mkdir(path.dirname(EVENTS_FILE), { recursive: true }, (mkErr) => {
    if (mkErr) return res.status(500).json({ error: 'storage unavailable' });
    fs.appendFile(EVENTS_FILE, line, (err) => (err ? res.status(500).json({ error: 'storage unavailable' }) : res.status(204).end()));
  });
});

// Per-enterprise, per-event counts. Requires the ADMIN_TOKEN env var and a matching x-admin-token header.
app.get('/api/events/summary', (req: Request, res: Response) => {
  const expected = process.env.ADMIN_TOKEN;
  const given = String(req.header('x-admin-token') ?? '');
  const ok =
    !!expected &&
    given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return res.status(403).json({ error: 'forbidden' });
  let text = '';
  try {
    text = fs.readFileSync(EVENTS_FILE, 'utf8');
  } catch {
    return res.json({ total: 0, byEnterprise: {}, byDay: {} });
  }
  const byEnterprise: Record<string, Record<string, number>> = {};
  const byDay: Record<string, number> = {};
  let total = 0;
  for (const line of text.split('\n')) {
    if (!line) continue;
    try {
      const e = JSON.parse(line);
      byEnterprise[e.enterpriseId] ??= {};
      byEnterprise[e.enterpriseId][e.event] = (byEnterprise[e.enterpriseId][e.event] ?? 0) + 1;
      const day = String(e.t).slice(0, 10);
      byDay[day] = (byDay[day] ?? 0) + 1;
      total++;
    } catch {
      /* skip a corrupt line */
    }
  }
  return res.json({ total, byEnterprise, byDay });
});

// API: Audio Transcription using gemini-3.5-transcribe
app.post('/api/gemini/transcribe-audio', async (req: Request, res: Response) => {
  try {
    const { audioData, mimeType } = req.body;
    if (!audioData) {
      return res.status(400).json({ error: 'Missing audioData payload' });
    }

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: audioData,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          { text: 'Transcribe this spoken search query into plain text. Only return the transcribed search keywords without commentary.' },
        ],
      },
    });

    const transcription = response.text?.trim() || '';
    return res.json({ transcription });
  } catch (error: unknown) {
    console.error('Audio transcription error:', error);
    const message = error instanceof Error ? error.message : 'Transcription failed';
    return res.status(500).json({ error: message });
  }
});

// API: Maps Grounding using gemini-3.8-flash with googleMaps tool
app.post('/api/gemini/maps-grounding', async (req: Request, res: Response) => {
  try {
    const { query, userLocation } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const latitude = userLocation?.latitude || 1.3521;
    const longitude = userLocation?.longitude || 103.8198;

    const prompt = `You are GaiGai's Singapore Social Enterprise & Neighborhood Guide.
User query: "${query}".
Help the user find places to visit, spend time, or buy goods/services in Singapore that support social causes (like inclusive cafes, disability employment, artisan gifts, blind massage, or community activities).
Ground your response using Google Maps for Singapore. Provide brief helpful recommendations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude,
              longitude,
            },
          },
        },
      },
    });

    const text = response.text || '';
    // Extract grounding chunks for links and reviews
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return res.json({
      text,
      groundingChunks,
    });
  } catch (error: unknown) {
    console.error('Maps grounding error:', error);
    const message = error instanceof Error ? error.message : 'Maps grounding failed';
    return res.status(500).json({ error: message });
  }
});

// Mount Vite middleware for SPA in dev
async function startServer() {
  const server = http.createServer(app);

  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: {
        server,
      },
    },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`GaiGai full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
