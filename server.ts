import http from 'http';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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
