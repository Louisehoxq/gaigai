import { SocialEnterprise, DonationRecord } from '../types';

export const SOCIAL_ENTERPRISES: SocialEnterprise[] = [
  {
    id: 'foreword-coffee',
    name: 'Foreword Coffee Roasters',
    tagline: 'Specialty coffee roasting with an inclusive cup for all abilities',
    description: 'A specialty coffee company and certified social enterprise founded in 2017 to mainstream disability and normalize inclusion. Foreword roasts direct-trade Asian beans and provides structured barista apprenticeships for persons with autism, deaf individuals, and mental health needs.',
    category: 'fnb',
    cause: 'neurodiversity',
    causeLabel: 'Neurodiversity & Deaf Community',
    address: '28 Orchard Road, Temasek Shophouse #01-01',
    district: 'Central / Dhoby Ghaut',
    mrt: 'Dhoby Ghaut MRT (NS24/NE6/CC1) · 2 min walk',
    mrtLineColor: '#E11D48',
    lat: 1.2995,
    lng: 103.8475,
    mapX: 52,
    mapY: 62,
    phone: '+65 6908 5873',
    email: 'hello@forewordcoffee.com',
    website: 'https://forewordcoffee.com',
    openingHours: 'Mon–Fri 8:00am–6:00pm, Sat–Sun 9:00am–5:00pm',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Platinum (Highest Tier)',
    donationGoal: 25000,
    currentRaised: 18450,
    impactMetrics: {
      primaryNumber: '48+',
      primaryLabel: 'Inclusive Baristas & Roasters Trained',
      secondaryNumber: '82%',
      secondaryLabel: 'Direct-Trade Micro-Lots Sourced in Asia'
    },
    offerings: [
      {
        id: 'fw-1',
        name: 'Timor-Leste Honey Process Filter',
        price: '$7.50',
        description: 'Bright notes of apricot, brown sugar, and floral jasmine roasted in-house.',
        impactTag: 'Supports 1 hr sensory roasting training'
      },
      {
        id: 'fw-2',
        name: 'Oat Milk Flat White',
        price: '$6.80',
        description: 'Velvety espresso paired with steamed Minor Figures oat milk.',
        impactTag: 'Brewed with care by neurodivergent baristas'
      },
      {
        id: 'fw-3',
        name: 'Asian Origin Coffee Drip Bag Box (10s)',
        price: '$24.00',
        description: 'Single-origin drip bags packed by inclusive packaging teams.',
        impactTag: 'Direct revenue shared with inclusive packaging crew'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'Beyond the First Brew',
        subtitle: 'Founding with radical inclusivity in 2017',
        narrative: 'When founder Wei Jie set out to create Foreword Coffee, he rejected the notion that disability is a limitation. Instead of fitting individuals into rigid corporate boxes, Foreword re-engineered brewing workflows, visual timers, and sensory cupping protocols to empower people with diverse abilities.',
        quote: 'We do not ask what someone cannot do; we build an espresso bar where what they can do shines.',
        quoteAuthor: 'Lim Wei Jie, Co-Founder',
        metricNumber: '100%',
        metricLabel: 'Adapted training equipment across all outlets',
        visualTheme: 'amber'
      },
      {
        chapterNumber: 2,
        title: 'Dignity at the Espresso Machine',
        subtitle: 'From non-verbal youth to master baristas',
        narrative: 'Deaf team members communicate through tactile orders and tablet systems, while neurodivergent staff excel at precision roasting curves and grind adjustments. Customers experience world-class specialty coffee while experiencing everyday inclusion firsthand.',
        quote: 'Working here taught me that I have a voice, even without speaking words. Coffee is my craft.',
        quoteAuthor: 'Jeremy, Senior Barista',
        metricNumber: '3.5 yrs',
        metricLabel: 'Average team retention rate',
        visualTheme: 'emerald'
      },
      {
        chapterNumber: 3,
        title: 'Scaling the Enabling Mark',
        subtitle: 'From one counter to national recognition',
        narrative: 'Today, Foreword operates across Temasek Shophouse, Esplanade, and Enabling Village, holding the prestigious Enabling Mark (Platinum). Every dollar spent sustains an ecosystem where inclusive work is the standard, not an afterthought.',
        metricNumber: '$18k',
        metricLabel: 'Community micro-scholarship pool funded to date',
        visualTheme: 'rose'
      }
    ],
    googleRating: 4.8,
    reviewCount: 312,
    googleReviews: [
      {
        id: 'r-fw-1',
        author: 'Marcus Tan',
        rating: 5,
        relativeTime: '2 weeks ago',
        text: 'The best flat white in Dhoby Ghaut. The baristas are extraordinarily meticulous and warm. Love the visual ordering system and knowing every cup supports meaningful employment.',
        sentiment: 'Quality',
        ownerResponse: 'Thank you Marcus! Jeremy and our team take immense pride in every pour. See you again soon!'
      },
      {
        id: 'r-fw-2',
        author: 'Siti Nurhaliza',
        rating: 5,
        relativeTime: '1 month ago',
        text: 'Quiet, serene shophouse ambiance. The cold brew is refreshing and smooth. So heartwarming to see true disability inclusion executed at such high specialty coffee standards.',
        sentiment: 'Inclusivity'
      },
      {
        id: 'r-fw-3',
        author: 'David Chen',
        rating: 4,
        relativeTime: '3 months ago',
        text: 'Great selection of Asian specialty beans from Myanmar and Yunnan. Staff was super patient explaining the tasting profiles.',
        sentiment: 'Hospitality'
      }
    ]
  },
  {
    id: 'bettr-group',
    name: 'Bettr Group (Bettr Coffee Co.)',
    tagline: 'Southeast Asia’s pioneer B Corp holistic beverage academy & roastery',
    description: 'Founded in 2011 by Pamela Chng, Bettr Group is a pioneer B Corp that runs holistic coffee education programs alongside specialty retail bars. They empower marginalized women, at-risk youth, and low-income families through emotional resilience training and professional barista certification.',
    category: 'fnb',
    cause: 'women_youth',
    causeLabel: 'Marginalized Women & At-Risk Youth',
    address: '9 Prinsep Street, The Foundry',
    district: 'Central / Bras Basah',
    mrt: 'Bencoolen MRT (DT21) · 3 min walk',
    mrtLineColor: '#0284C7',
    lat: 1.2998,
    lng: 103.8504,
    mapX: 56,
    mapY: 60,
    phone: '+65 6834 4568',
    email: 'ask@bettrbarista.com',
    website: 'https://bettr.group',
    openingHours: 'Mon–Sat 8:30am–5:30pm, Closed Sundays',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Certified B Corp',
    donationGoal: 30000,
    currentRaised: 22600,
    impactMetrics: {
      primaryNumber: '1,800+',
      primaryLabel: 'Women & Youth Graduated with Certified Skills',
      secondaryNumber: '89%',
      secondaryLabel: 'Sustained Employment & Financial Independence'
    },
    offerings: [
      {
        id: 'bt-1',
        name: 'Signature Bold Heart Espresso Roast',
        price: '$18.00',
        description: '250g beans with notes of dark chocolate, toasted hazelnut, and golden raisins.',
        impactTag: 'Direct ethical farmer trade'
      },
      {
        id: 'bt-2',
        name: 'Artisan Matcha Latte & Single Origin Pourover',
        price: '$7.20',
        description: 'Uji ceremonial grade matcha whisked to order alongside micro-lot pourovers.',
        impactTag: 'Poured by Bettr Academy scholars'
      },
      {
        id: 'bt-3',
        name: 'Community Barista Masterclass (Half-Day)',
        price: '$120.00',
        description: 'Hands-on sensory, milk frothing, and latte art class supporting youth apprentices.',
        impactTag: '100% surplus subsidizes youth vocational tuition'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'Brewing a Holistic Antidote to Poverty',
        subtitle: 'Vocational training combined with emotional self-defence',
        narrative: 'Pamela Chng started Bettr Barista after stepping away from the tech startup world. She realized that giving someone technical skills without emotional resilience and financial literacy rarely broke the cycle of intergenerational poverty.',
        quote: 'Coffee is our vehicle, but human potential and dignity are our real business.',
        quoteAuthor: 'Pamela Chng, Founder of Bettr Group',
        metricNumber: '13+ Years',
        metricLabel: 'Sustained social impact track record',
        visualTheme: 'amber'
      },
      {
        chapterNumber: 2,
        title: 'The Bettr Holistic Training Program',
        subtitle: 'Physical martial arts, emotional coaching, and SCA barista exams',
        narrative: 'Students undergo a rigorous 4-month curriculum blending physical conditioning, self-defense, psychological counseling, and internationally certified Specialty Coffee Association (SCA) qualifications.',
        quote: 'Before Bettr, I thought my life was over as a single mum. Today I run a corporate coffee bar with head held high.',
        quoteAuthor: 'Mei Lin, Bettr Academy Alumna',
        metricNumber: '92%',
        metricLabel: 'Graduation & job placement rate',
        visualTheme: 'rose'
      }
    ],
    googleRating: 4.7,
    reviewCount: 420,
    googleReviews: [
      {
        id: 'r-bt-1',
        author: 'Evelyn Ng',
        rating: 5,
        relativeTime: '3 weeks ago',
        text: 'Super inspiring place. Took the weekend latte art workshop and was amazed by the care and dedication of the trainers. Coffee is top-notch.',
        sentiment: 'Quality'
      },
      {
        id: 'r-bt-2',
        author: 'Farhan bin Rahim',
        rating: 5,
        relativeTime: '2 months ago',
        text: 'Clean, minimalist space at Prinsep. The team here radiates passion. Knowing that every cup helps empower single mothers makes it taste even better.',
        sentiment: 'Hospitality',
        ownerResponse: 'Terima kasih Farhan! Your support directly funds our holistic training modules.'
      }
    ]
  },
  {
    id: 'prof-brawn',
    name: 'Professor Brawn Café',
    tagline: 'Warm western comfort food providing meaningful jobs for autism & special needs',
    description: 'An inclusive bistro social enterprise operated by the Autism Resource Centre (Singapore). Professor Brawn provides authentic, supportive culinary and service employment for individuals on the autism spectrum, celebrating high food quality and warm service.',
    category: 'fnb',
    cause: 'neurodiversity',
    causeLabel: 'Autism Spectrum & Special Needs',
    address: 'Pathlight School Campus 1, 5 Ang Mo Kio Ave 10',
    district: 'North-East / Ang Mo Kio',
    mrt: 'Ang Mo Kio MRT (NS16) · 10 min bus/walk',
    mrtLineColor: '#DC2626',
    lat: 1.3653,
    lng: 103.8549,
    mapX: 53,
    mapY: 42,
    phone: '+65 6336 2955',
    email: 'info@profbrawn.com.sg',
    website: 'https://profbrawn.com.sg',
    openingHours: 'Mon–Sat 11:30am–9:00pm, Closed Sundays',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Autism Resource Centre Certified',
    donationGoal: 20000,
    currentRaised: 14200,
    impactMetrics: {
      primaryNumber: '65+',
      primaryLabel: 'Adults with Autism in Permanent Employment',
      secondaryNumber: '320,000+',
      secondaryLabel: 'Dignified Comfort Meals Served'
    },
    offerings: [
      {
        id: 'pb-1',
        name: 'Brawn’s Signature Fish & Chips',
        price: '$15.90',
        description: 'Crispy golden batter Pacific dory served with thick-cut fries and house-made tartar.',
        impactTag: 'Prepared with structured kitchen station systems'
      },
      {
        id: 'pb-2',
        name: 'Grilled Rosemary Chicken Chop',
        price: '$14.50',
        description: 'Tender chicken thigh with mushroom gravy, buttered seasonal greens, and mash.',
        impactTag: 'Culinary job coach assisted preparation'
      },
      {
        id: 'pb-3',
        name: 'Professor Brawn Waffles with Gelato',
        price: '$8.90',
        description: 'Crispy Belgian-style waffles topped with artisanal dark chocolate or vanilla gelato.',
        impactTag: 'Served by friendly student interns'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'A Superhero Named Brawn',
        subtitle: 'The vision of parents and educators in 2009',
        narrative: 'Professor Brawn was created as an approachable superhero: smart, strong, and kind. The café was born from an urgent question parents of autistic children faced: "What happens when our children graduate from school into a world that doesn’t understand them?"',
        quote: 'Our goal was never charity. Our goal was real work, real wages, and real pride.',
        quoteAuthor: 'Denise Phua, President of Autism Resource Centre',
        metricNumber: '15 Years',
        metricLabel: 'Pioneering inclusive F&B employment in Singapore',
        visualTheme: 'amber'
      },
      {
        chapterNumber: 2,
        title: 'Structured Workspaces that Work',
        subtitle: 'Color-coded stations, checklists, and patient mentorship',
        narrative: 'In the kitchen, visual recipe manuals, portion guides, and clear job rotations allow adults with autism to thrive. The food is consistently delicious, debunking myths about what differently-abled individuals can achieve.',
        metricNumber: '100%',
        metricLabel: 'Fair market wages paid to all special needs staff',
        visualTheme: 'emerald'
      }
    ],
    googleRating: 4.8,
    reviewCount: 540,
    googleReviews: [
      {
        id: 'r-pb-1',
        author: 'Audrey Lee',
        rating: 5,
        relativeTime: '1 month ago',
        text: 'The fish and chips were genuinely fantastic—crispy batter, fresh fish, and generous portions! The staff were polite, attentive, and so earnest. Wonderful place for family dinners.',
        sentiment: 'Quality'
      },
      {
        id: 'r-pb-2',
        author: 'Kumaraguru M.',
        rating: 5,
        relativeTime: '2 months ago',
        text: 'Heartwarming experience. Service was quick and welcoming. Keep supporting this fantastic initiative by Pathlight!',
        sentiment: 'Hospitality',
        ownerResponse: 'Thank you Kumaraguru! Our service crew loves hearing your kind words.'
      }
    ]
  },
  {
    id: 'teddythotz',
    name: 'TeddyThotz',
    tagline: 'Handcrafted toys, batik gifts, and upcycled treasures by elderly artisans',
    description: 'A creative social enterprise established in Chai Chee to provide dignified supplemental income and artistic therapy for elderly crafters, single mothers, and persons with physical disabilities. Every crocheted bear and batik pouch is made with patient love.',
    category: 'gifts',
    cause: 'seniors',
    causeLabel: 'Elderly Artisans & Vulnerable Crafters',
    address: '26 Chai Chee Street, Community Workspace #01-14',
    district: 'East / Bedok & Chai Chee',
    mrt: 'Bedok MRT (EW5) · 8 min walk',
    mrtLineColor: '#059669',
    lat: 1.3256,
    lng: 103.9218,
    mapX: 74,
    mapY: 55,
    phone: '+65 9680 7350',
    email: 'info@teddythotz.com',
    website: 'https://teddythotz.com',
    openingHours: 'Tue–Sat 10:30am–6:00pm, Closed Sun & Mon',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'raiSE Verified Leading Enterprise',
    donationGoal: 15000,
    currentRaised: 11800,
    impactMetrics: {
      primaryNumber: '42',
      primaryLabel: 'Pioneer Generation & Senior Crafters Engaged',
      secondaryNumber: '100%',
      secondaryLabel: 'Artisan Proceeds Transferred Directly to Crafters'
    },
    offerings: [
      {
        id: 'tt-1',
        name: 'Hand-Knitted Heritage Amigurumi Bear',
        price: '$32.00',
        description: 'Each bear is hand-crocheted over 6 hours by senior resident Auntie Mary (age 74).',
        impactTag: 'Provides $20 direct crafting fee to senior artisan'
      },
      {
        id: 'tt-2',
        name: 'Peranakan Motif Batik Tote Bag',
        price: '$28.00',
        description: 'Double-lined heavy cotton tote with vintage Indonesian and Peranakan prints.',
        impactTag: 'Stitched by stay-home single mothers'
      },
      {
        id: 'tt-3',
        name: 'Upcycled Denim Coin Pouch with Keyring',
        price: '$12.00',
        description: 'Handcrafted from donated pre-loved denim jeans, preventing textile landfill waste.',
        impactTag: 'Eco-conscious craft training module'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'Stitches of Love in Chai Chee',
        subtitle: 'Turning idle hands into master craftspeople',
        narrative: 'TeddyThotz founders discovered many seniors living in 1-room rental flats in Chai Chee who felt lonely, disconnected, and economically vulnerable. By supplying yarn, ergonomic knitting hooks, and fair piecemeal rates, TeddyThotz transformed living rooms into vibrant artisan studios.',
        quote: 'Crocheting gives my hands strength and my heart joy. I can buy groceries for my grandchildren with money I made myself.',
        quoteAuthor: 'Auntie Mary (74), Master Crafter',
        metricNumber: '4,500+',
        metricLabel: 'Plushies and bags crafted and loved',
        visualTheme: 'rose'
      },
      {
        chapterNumber: 2,
        title: 'Partnering with Friends of the Disabled',
        subtitle: 'Creating supply chains that heal',
        narrative: 'Beyond senior crafters, TeddyThotz partners with the Friends of the Disabled Society for packing, card tagging, and inventory. This ensures that every step of the retail journey empowers someone who needs it.',
        metricNumber: '$140k+',
        metricLabel: 'Direct supplemental income distributed',
        visualTheme: 'amber'
      }
    ],
    googleRating: 4.9,
    reviewCount: 168,
    googleReviews: [
      {
        id: 'r-tt-1',
        author: 'Rachel Tan',
        rating: 5,
        relativeTime: '2 weeks ago',
        text: 'Bought a hand-knitted bear for my nephew’s first birthday. The craftsmanship is breathtaking, and the little card telling you who made it brought tears to our eyes.',
        sentiment: 'Quality',
        ownerResponse: 'Thank you Rachel! Auntie Mary will be thrilled to hear how much your nephew loves his bear.'
      },
      {
        id: 'r-tt-2',
        author: 'Benjamin Koh',
        rating: 5,
        relativeTime: '1 month ago',
        text: 'Wonderful shop filled with heart. The Peranakan batik pouches make fantastic authentic Singapore gifts for overseas colleagues.',
        sentiment: 'Inclusivity'
      }
    ]
  },
  {
    id: 'the-social-space',
    name: 'The Social Space',
    tagline: 'Multi-concept eco-cafe, refillery, and nail salon empowering disadvantaged women',
    description: 'An inspiring multi-concept social enterprise founded by Daniel Yeow and Cheryl Ou in Kreta Ayer. It provides dignified jobs, vocational training, and hospitality apprenticeships for women facing social and financial barriers, coupled with low-waste living goods.',
    category: 'fnb',
    cause: 'women_youth',
    causeLabel: 'Disadvantaged Women & Low-Waste Living',
    address: '333 Kreta Ayer Road, #01-14',
    district: 'Downtown / Chinatown',
    mrt: 'Chinatown MRT (NE4/DT19) · 5 min walk',
    mrtLineColor: '#7C3AED',
    lat: 1.2818,
    lng: 103.8415,
    mapX: 52,
    mapY: 67,
    phone: '+65 6655 0221',
    email: 'hello@thesocialspace.co',
    website: 'https://thesocialspace.co',
    openingHours: 'Wed–Mon 9:00am–5:00pm, Closed Tuesdays',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'raiSE Verified Leading Enterprise',
    donationGoal: 20000,
    currentRaised: 16400,
    impactMetrics: {
      primaryNumber: '85+',
      primaryLabel: 'Women Empowered with Hospitality & Nail Diplomas',
      secondaryNumber: '10,000kg',
      secondaryLabel: 'Single-Use Plastics Eliminated via Refillery'
    },
    offerings: [
      {
        id: 'tss-1',
        name: 'The Hulk Smoothie Bowl',
        price: '$12.50',
        description: 'Spinach, banana, mango, coconut water topped with house granola and chia seeds.',
        impactTag: 'Made with organic Fairtrade ingredients'
      },
      {
        id: 'tss-2',
        name: 'Truffle & Mushroom Open-Face Brioche Toast',
        price: '$14.00',
        description: 'Sautéed forest mushrooms, white truffle oil, on toasted sourdough with microgreens.',
        impactTag: 'Prepared by culinary apprentices'
      },
      {
        id: 'tss-3',
        name: 'Non-Toxic Express Manicure Treatment',
        price: '$35.00',
        description: 'Cruelty-free, vegan, chemical-free nail polish treatment in their serene in-house salon.',
        impactTag: '100% services performed by trained disadvantaged women'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'A Haven in Kreta Ayer',
        subtitle: 'Dignified second chances in the heart of Chinatown',
        narrative: 'Cheryl Ou and Daniel Yeow envisioned a space where conscious consumerism felt effortless. By combining specialty cafe fare, eco-refills, and a nail salon under one roof, they created steady, multi-disciplinary jobs for single mothers, ex-offenders, and women recovering from mental health challenges.',
        quote: 'We want people to experience that buying ethically doesn’t require sacrifice; it enhances life.',
        quoteAuthor: 'Cheryl Ou, Co-Founder',
        metricNumber: '100%',
        metricLabel: 'Fair living wages paid with medical coverage',
        visualTheme: 'emerald'
      }
    ],
    googleRating: 4.7,
    reviewCount: 388,
    googleReviews: [
      {
        id: 'r-tss-1',
        author: 'Chloe Lim',
        rating: 5,
        relativeTime: '3 weeks ago',
        text: 'The vibe here is so calming and thoughtful. The smoothie bowls are generous and fresh. Did my nails here too and the nail artist was exceptionally gentle and professional.',
        sentiment: 'Hospitality'
      },
      {
        id: 'r-tss-2',
        author: 'Jason Tay',
        rating: 5,
        relativeTime: '2 months ago',
        text: 'One of my favorite cafes in Chinatown. Excellent iced latte, zero-waste retail section is well-curated. An exemplary social enterprise in Singapore.',
        sentiment: 'Quality'
      }
    ]
  },
  {
    id: 'hush-teabar',
    name: 'Hush TeaBar',
    tagline: 'Singapore’s pioneering silent tea reflection led by Deaf TeaRistas',
    description: 'A ground-breaking social movement and tea experience founded by Anthea Ong. Hush bridges the hearing and Deaf communities through guided silent tea sessions, nurturing emotional wellness, empathy, and mindfulness.',
    category: 'wellness',
    cause: 'disabilities',
    causeLabel: 'Deaf Community & Mental Wellness',
    address: 'Pop-Up Sessions & Studios across Singapore (HQ: Bras Basah)',
    district: 'Central / Bras Basah & Civic District',
    mrt: 'City Hall MRT (NS25/EW13) · 4 min walk',
    mrtLineColor: '#E11D48',
    lat: 1.2938,
    lng: 103.8508,
    mapX: 55,
    mapY: 64,
    phone: '+65 8892 4874',
    email: 'connect@hushteabar.com',
    website: 'https://hushteabar.com',
    openingHours: 'Sessions by booking: Thu–Sun 10:00am–7:00pm',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Enabling Mark Awardee',
    donationGoal: 18000,
    currentRaised: 13950,
    impactMetrics: {
      primaryNumber: '32,000+',
      primaryLabel: 'Participants Guided in Mindful Silence',
      secondaryNumber: '60+',
      secondaryLabel: 'Deaf TeaRistas Trained & Employed'
    },
    offerings: [
      {
        id: 'hush-1',
        name: 'Silent Tea Reflection Experience (90 mins)',
        price: '$45.00',
        description: 'Guided silent tea ritual led by Deaf TeaRistas, sign language basics, and self-reflection.',
        impactTag: 'Directly funds Deaf facilitator fees'
      },
      {
        id: 'hush-2',
        name: 'Hush Mindfulness Tea Blend Tin (Organic Oolong & Rose)',
        price: '$22.00',
        description: 'Hand-blended loose leaf whole organic floral tea packaged with reflection prompt cards.',
        impactTag: 'Packaged by mental health recovery peers'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'The Gift of Silence',
        subtitle: 'When the non-hearing lead the hearing to peace',
        narrative: 'In a noisy world that values speed and loud voices, Hush inverts the power dynamic. Deaf TeaRistas, often sidelined in traditional workplaces, become the revered masters of silence, leading stressed executives and youth into deep, healing contemplation.',
        quote: 'Silence is not the absence of sound; it is the presence of awareness and connection.',
        quoteAuthor: 'Anthea Ong, Founder & Former Nominated MP',
        metricNumber: '98%',
        metricLabel: 'Participants reporting reduced stress and anxiety',
        visualTheme: 'rose'
      }
    ],
    googleRating: 4.9,
    reviewCount: 210,
    googleReviews: [
      {
        id: 'r-hush-1',
        author: 'Jonathan Sim',
        rating: 5,
        relativeTime: '1 month ago',
        text: 'A profound, deeply moving experience. The Deaf TeaRista communicated so much warmth and serenity without a single word. Everyone living in fast-paced Singapore needs this.',
        sentiment: 'Atmosphere'
      }
    ]
  },
  {
    id: 'savh-massage',
    name: 'SAVH Mobile Massage Team',
    tagline: 'Professional massage and reflexology by certified visually impaired therapists',
    description: 'An established social enterprise initiative by the Singapore Association of the Visually Handicapped. Certified visually impaired masseurs deliver therapeutic head, shoulder, and foot reflexology, fostering self-reliance, dignity, and economic independence.',
    category: 'wellness',
    cause: 'visual_impairment',
    causeLabel: 'Visually Impaired Community',
    address: '47 Toa Payoh Rise, SAVH Headquarters',
    district: 'Central / Toa Payoh & Caldecott',
    mrt: 'Caldecott MRT (CC17/TE9) · 4 min walk',
    mrtLineColor: '#F59E0B',
    lat: 1.3392,
    lng: 103.8427,
    mapX: 50,
    mapY: 51,
    phone: '+65 6251 4331',
    email: 'mmt@savh.org.sg',
    website: 'https://savh.org.sg',
    openingHours: 'Mon–Sat 10:00am–6:00pm, By Appointment',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Enabling Mark Awardee',
    donationGoal: 22000,
    currentRaised: 17800,
    impactMetrics: {
      primaryNumber: '55+',
      primaryLabel: 'Visually Impaired Masseurs Employed Full/Part-Time',
      secondaryNumber: '100%',
      secondaryLabel: 'Therapists Hold Recognized ITEC Certifications'
    },
    offerings: [
      {
        id: 'savh-1',
        name: 'Head & Shoulder Acupressure Massage (30 mins)',
        price: '$25.00',
        description: 'Targeted acupoint therapy relieving neck stiffness, computer-strain, and tension headaches.',
        impactTag: '100% service fee goes directly to therapist'
      },
      {
        id: 'savh-2',
        name: 'Full Body Therapeutic Massage (60 mins)',
        price: '$55.00',
        description: 'Swedish and Chinese meridian pressure techniques performed in clean, private rooms.',
        impactTag: 'Sustains full-time livelihood for blind masseur'
      },
      {
        id: 'savh-3',
        name: 'Revitalizing Foot Reflexology (45 mins)',
        price: '$38.00',
        description: 'Deep foot reflex pressure stimulating circulation and relieving walking fatigue.',
        impactTag: 'Empowers senior visually impaired masseurs'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'Sight Through Touch',
        subtitle: 'Unlocking intuitive tactile mastery',
        narrative: 'When sight is diminished, the sensitivity of touch increases. SAVH masseurs undergo hundreds of hours of anatomical study and clinical massage training to master exact meridian points that alleviate chronic pain.',
        quote: 'My hands see what eyes cannot. Through my profession, I provide for my family with dignity.',
        quoteAuthor: 'Uncle Ronald (61), Senior Therapist',
        metricNumber: '40,000+',
        metricLabel: 'Therapy sessions provided to Singaporeans',
        visualTheme: 'amber'
      }
    ],
    googleRating: 4.8,
    reviewCount: 295,
    googleReviews: [
      {
        id: 'r-savh-1',
        author: 'Melissa Wong',
        rating: 5,
        relativeTime: '2 weeks ago',
        text: 'Best head and shoulder massage I have had in Singapore. Uncle Ronald located all my desk knots in minutes. Clean, respectful, and so reasonably priced. Supporting them is a no-brainer.',
        sentiment: 'Quality',
        ownerResponse: 'Thank you Melissa! Uncle Ronald sends his warmest thanks.'
      }
    ]
  },
  {
    id: 'dignity-kitchen',
    name: 'Dignity Kitchen (Project Dignity)',
    tagline: 'Asia’s first social enterprise hawker training centre for the differently-abled',
    description: 'Founded by Koh Seng Choon in Boon Keng, Dignity Kitchen is a working food court and hawker training academy. They train and employ individuals with physical, intellectual, and psychiatric disabilities, as well as elderly retrenched workers, reviving local culinary heritage.',
    category: 'fnb',
    cause: 'disabilities',
    causeLabel: 'Physical & Intellectual Disabilities, Seniors',
    address: '69 Boon Keng Road, Level 2',
    district: 'Central / Kallang & Boon Keng',
    mrt: 'Boon Keng MRT (NE9) · 3 min walk',
    mrtLineColor: '#7C3AED',
    lat: 1.3178,
    lng: 103.8643,
    mapX: 57,
    mapY: 56,
    phone: '+65 8189 7678',
    email: 'enquiry@projectdignity.com',
    website: 'https://projectdignity.com',
    openingHours: 'Mon–Sat 8:00am–4:30pm, Closed Sundays',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Enabling Mark (Apex)',
    donationGoal: 35000,
    currentRaised: 28900,
    impactMetrics: {
      primaryNumber: '2,200+',
      primaryLabel: 'Disadvantaged Hawkers Trained & Placed in Food Courts',
      secondaryNumber: '150,000+',
      secondaryLabel: 'Free Warm Meals Distributed to Needy Elderly'
    },
    offerings: [
      {
        id: 'dk-1',
        name: 'Hainanese Chicken Rice Platter',
        price: '$6.50',
        description: 'Fragrant ginger rice, tender poached chicken, and hand-pounded chili cooked by hawker trainees.',
        impactTag: 'Station operated by hearing-impaired hawkers'
      },
      {
        id: 'dk-2',
        name: 'Traditional Claypot Laksa',
        price: '$7.00',
        description: 'Rich spiced coconut broth with prawns, fishcake, tau pok, and fresh laksa leaves.',
        impactTag: 'Prepared with adapted ergonomic stations'
      },
      {
        id: 'dk-3',
        name: 'Pay-It-Forward Elderly Meal Coupon (5 Meals)',
        price: '$25.00',
        description: 'Sponsors 5 nutritious hot hawker meals for needy seniors living in Boon Keng rental flats.',
        impactTag: '100% direct food relief delivered with dignity'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'Hawker Food with a Conscience',
        subtitle: 'Restoring dignity one bowl at a time',
        narrative: 'Koh Seng Choon founded Dignity Kitchen after seeing elderly stroke survivors and people with cerebral palsy begging on the streets. Rather than handouts, he redesigned hawker stalls with custom braille controls, foot-pedal soup dispensers, and picture menus so anyone can cook.',
        quote: 'Dignity is when you can earn your own bowl of rice and say: I contributed to this society.',
        quoteAuthor: 'Koh Seng Choon, Founder',
        metricNumber: '85%',
        metricLabel: 'Hawker graduates securing open employment',
        visualTheme: 'rose'
      }
    ],
    googleRating: 4.8,
    reviewCount: 680,
    googleReviews: [
      {
        id: 'r-dk-1',
        author: 'Geraldine Goh',
        rating: 5,
        relativeTime: '1 month ago',
        text: 'The food here is legitimate hawker quality—the chicken rice and laksa are super shiok! Staff are so proud and welcoming. Bought 10 pay-it-forward meals for the uncle and aunties too.',
        sentiment: 'Quality'
      }
    ]
  },
  {
    id: 'the-art-faculty',
    name: 'The Art Faculty',
    tagline: 'Celebrated designer gifts & merchandise celebrating the special talents of autistic artists',
    description: 'A platform by Autism Resource Centre located at Enabling Village. It curates high-grade designer merchandise, lifestyle items, and apparel adorned with artwork by autistic artists. For every sale, artists earn continuous royalties, fostering long-term financial independence.',
    category: 'gifts',
    cause: 'neurodiversity',
    causeLabel: 'Autistic Artists & Creative Talents',
    address: '20 Lengkok Bahru, Enabling Village #01-07',
    district: 'West / Redhill & Bukit Merah',
    mrt: 'Redhill MRT (EW18) · 5 min walk',
    mrtLineColor: '#059669',
    lat: 1.2874,
    lng: 103.8182,
    mapX: 47,
    mapY: 66,
    phone: '+65 6474 1512',
    email: 'info@theartfaculty.sg',
    website: 'https://theartfaculty.sg',
    openingHours: 'Mon–Sat 9:30am–6:00pm, Closed Sundays',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Enabling Mark Awardee',
    donationGoal: 20000,
    currentRaised: 17200,
    impactMetrics: {
      primaryNumber: '$450,000+',
      primaryLabel: 'Royalties Distributed Directly to Autistic Artists',
      secondaryNumber: '80+',
      secondaryLabel: 'Featured Original Artworks in Production'
    },
    offerings: [
      {
        id: 'taf-1',
        name: 'Dino Series Stainless Steel Flask (Designed by See Toh)',
        price: '$29.90',
        description: 'Double-wall insulated bottle featuring intricate hand-drawn dinosaur species by autistic artist See Toh Sheng Jie.',
        impactTag: 'Direct royalty paid on every flask sold'
      },
      {
        id: 'taf-2',
        name: 'Singapore Shophouses Microfibre Umbrella',
        price: '$26.00',
        description: 'UV-protective umbrella featuring vibrant Katong architectural facade sketches.',
        impactTag: 'Empowers independent living for neurodivergent creators'
      },
      {
        id: 'taf-3',
        name: 'Fine Porcelain Peranakan Espresso Cup Set',
        price: '$38.00',
        description: 'Set of 2 bone china cups celebrating Singapore heritage motifs.',
        impactTag: 'Supports ongoing art studio supplies & coaching'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'Where Ability Outshines Disability',
        subtitle: 'Art seen by world leaders, loved by Singapore',
        narrative: 'When Singapore’s First Lady carried an intricate denim pouch created by artist See Toh Sheng Jie to the White House, the world witnessed the remarkable detail autistic minds possess. The Art Faculty ensures these talents are licensed commercially with full respect and continuous financial dividends.',
        quote: 'My art lets people see the colorful, wonderful dinosaurs that live in my imagination.',
        quoteAuthor: 'See Toh Sheng Jie, Resident Artist',
        metricNumber: '100%',
        metricLabel: 'Copyright and royalties retained by the artists',
        visualTheme: 'emerald'
      }
    ],
    googleRating: 4.9,
    reviewCount: 310,
    googleReviews: [
      {
        id: 'r-taf-1',
        author: 'Valerie Tan',
        rating: 5,
        relativeTime: '2 weeks ago',
        text: 'The best place to buy meaningful Singapore gifts! I got the dinosaur pouch and umbrella. The designs are gorgeous and the quality is premium. Staff at Enabling Village were super friendly.',
        sentiment: 'Quality',
        ownerResponse: 'Thank you Valerie! See Toh and our artist community appreciate your love and support!'
      }
    ]
  },
  {
    id: 'runninghour',
    name: 'Runninghour Co-operative',
    tagline: 'Inclusive running, tandem cycling, and outdoor fitness with special needs buddies',
    description: 'An inspiring sports co-operative established in 2009. Runninghour integrates persons with intellectual, physical, and visual challenges into mainstream sports through weekly running sessions and tandem cycling led by volunteer guides.',
    category: 'experience',
    cause: 'disabilities',
    causeLabel: 'Physical, Intellectual & Sensory Challenges',
    address: 'Weekly Gatherings at Bishan-AMK Park & Marina Bay',
    district: 'Central / Bishan & Marina Bay',
    mrt: 'Bishan MRT (NS17/CC15) · 5 min walk to park',
    mrtLineColor: '#DC2626',
    lat: 1.3625,
    lng: 103.8468,
    mapX: 54,
    mapY: 48,
    phone: '+65 9188 5602',
    email: 'members@runninghour.com',
    website: 'https://runninghour.com',
    openingHours: 'Weekly Sessions: Saturdays 7:30am–10:00am',
    wheelchairAccessible: true,
    verifiedRaiSE: true,
    enablingMark: 'Enabling Mark Awardee',
    donationGoal: 15000,
    currentRaised: 11400,
    impactMetrics: {
      primaryNumber: '450+',
      primaryLabel: 'Special Needs Members ("Runninghour Buddies") Engaged',
      secondaryNumber: '12,000+',
      secondaryLabel: 'Hours of Guided Fitness & Bonding'
    },
    offerings: [
      {
        id: 'rh-1',
        name: 'Saturday Inclusive Run & Walk Buddy Pass',
        price: 'Free / By Donation ($10)',
        description: 'Join a 5km morning run or 3km sensory stroll pairing up with a special needs running buddy in Bishan Park.',
        impactTag: 'Builds authentic friendships across abilities'
      },
      {
        id: 'rh-2',
        name: 'Tandem Cycling Pilot Training Session',
        price: '$25.00',
        description: 'Learn how to captain a tandem bicycle guiding visually impaired cyclists around Marina Bay.',
        impactTag: 'Funds tandem bicycle maintenance & safety helmets'
      },
      {
        id: 'rh-3',
        name: 'Annual "Run for Inclusion" Charity Registration',
        price: '$35.00',
        description: 'Singapore’s only mass sports event where participants run alongside differently-abled athletes.',
        impactTag: 'Sponsors 1 full year of sports insurance for 2 athletes'
      }
    ],
    storyChapters: [
      {
        chapterNumber: 1,
        title: 'Running Side-by-Side',
        subtitle: 'Breaking down invisible walls through sweat and smiles',
        narrative: 'Runninghour started with a simple belief: everyone deserves the joy of the wind in their face and the runner’s high. By tethering a volunteer guide to a visually impaired or autistic runner with a short piece of cloth or tandem bike, barriers disappear and pure camaraderie takes over.',
        quote: 'When we run together, no one looks down, no one looks away. We just cheer each other across the finish line.',
        quoteAuthor: 'John, Runninghour Volunteer Guide',
        metricNumber: '15 Years',
        metricLabel: 'Uniting Singapore through inclusive movement',
        visualTheme: 'amber'
      }
    ],
    googleRating: 4.9,
    reviewCount: 175,
    googleReviews: [
      {
        id: 'r-rh-1',
        author: 'Kenji Sato',
        rating: 5,
        relativeTime: '3 weeks ago',
        text: 'Volunteered for the first time as a running buddy on Saturday morning at Bishan Park. Heart-warming, welcoming community and so energizing! Highly recommend everyone in SG to try it.',
        sentiment: 'Inclusivity'
      }
    ]
  }
];

export const INITIAL_DONATION_RECORDS: DonationRecord[] = [
  {
    id: 'don-01',
    enterpriseId: 'foreword-coffee',
    enterpriseName: 'Foreword Coffee Roasters',
    donorName: 'Shermaine Low',
    amount: 50,
    message: 'Thank you for giving my brother a chance to learn latte art with dignity!',
    timestamp: '12 mins ago',
    paymentMethod: 'paynow',
    isMonthly: false
  },
  {
    id: 'don-02',
    enterpriseId: 'teddythotz',
    enterpriseName: 'TeddyThotz',
    donorName: 'Kelvin & Jeanette',
    amount: 100,
    message: 'For Auntie Mary and all the senior crafters in Chai Chee. Keep shining!',
    timestamp: '45 mins ago',
    paymentMethod: 'paynow',
    isMonthly: true
  },
  {
    id: 'don-03',
    enterpriseId: 'dignity-kitchen',
    enterpriseName: 'Dignity Kitchen',
    donorName: 'Tan Chin Tuan Trust Kaki',
    amount: 150,
    message: 'Sponsored 30 warm meals for Boon Keng rental flat seniors.',
    timestamp: '2 hours ago',
    paymentMethod: 'paynow',
    isMonthly: false
  },
  {
    id: 'don-04',
    enterpriseId: 'the-art-faculty',
    enterpriseName: 'The Art Faculty',
    donorName: 'Priya Sundaram',
    amount: 75,
    message: 'Love the dinosaur series by See Toh Sheng Jie. More colors to your world!',
    timestamp: '4 hours ago',
    paymentMethod: 'card',
    isMonthly: false
  },
  {
    id: 'don-05',
    enterpriseId: 'bettr-group',
    enterpriseName: 'Bettr Group',
    donorName: 'Anonymous Corporate Ally',
    amount: 250,
    message: 'Supporting the single mothers vocational scholarship pool.',
    timestamp: '6 hours ago',
    paymentMethod: 'paynow',
    isMonthly: true
  }
];
