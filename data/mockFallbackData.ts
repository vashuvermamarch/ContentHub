import { GNewsArticle, TMDBMovie } from '@/types';

export const fallbackNewsArticles: GNewsArticle[] = [
  {
    title: 'OpenAI Launches GPT-5 with Advanced Multimodal Capabilities',
    description: 'The new model exhibits reasoning capabilities equivalent to a Ph.D. in science and chemistry, setting a new benchmark for generative AI.',
    content: 'OpenAI has officially unveiled its next-generation artificial intelligence model, GPT-5. The model boasts a dramatic leap in planning, coding, and logical reasoning, with OpenAI CEO stating that GPT-5 marks a critical milestone towards AGI.',
    url: 'https://openai.com',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2025-06-15T12:00:00Z',
    source: {
      name: 'TechCrunch',
      url: 'https://techcrunch.com'
    }
  },
  {
    title: 'Formula 1: Legendary Comeback Victory at Monaco Grand Prix',
    description: 'In a rain-soaked race, a stunning tactical tire change in the 52nd lap secures a historic victory against all odds.',
    content: 'The Monaco Grand Prix will go down in history as one of the most unpredictable races of the decade. As heavy rain began falling, a daring pit strategy allowed the underdog driver to take the lead and hold off the reigning champion.',
    url: 'https://formula1.com',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2025-06-15T09:30:00Z',
    source: {
      name: 'Sky Sports',
      url: 'https://skysports.com'
    }
  },
  {
    title: 'Global Inflation Rates Plummet Closer to 2% Target',
    description: 'Federal Reserve hints at potential rate cuts as labor market stabilizes and supply chain bottlenecks fully resolve.',
    content: 'Central banks around the world are celebrating a major milestone as core inflation has fallen to its lowest level in four years. Economists are predicting a period of steady growth and lower borrowing costs for consumers.',
    url: 'https://bloomberg.com',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2025-06-15T08:00:00Z',
    source: {
      name: 'Bloomberg',
      url: 'https://bloomberg.com'
    }
  },
  {
    title: 'NASA Webb Telescope Unveils Cosmic Nurseries in Deep Space',
    description: 'Newly released high-resolution infrared images showcase stellar birthplaces in detail never before captured by humanity.',
    content: 'The James Webb Space Telescope has captured a stunning mosaic of the Orion Nebula, showing thousands of young stars forming inside dusty clouds. The discovery provides invaluable insights into the birth of solar systems.',
    url: 'https://nasa.gov',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2025-06-14T20:15:00Z',
    source: {
      name: 'Nature Science',
      url: 'https://nature.com'
    }
  },
  {
    title: 'Breakthrough Cancer Vaccine Enters Phase 3 Clinical Trials',
    description: 'Custom mRNA vaccine shows 90% efficacy in preventing recurrence of high-risk melanoma in early studies.',
    content: 'A novel personalized vaccine that trains the immune system to recognize specific cancer mutations has advanced to Phase 3 trials. Scientists are optimistic that this could redefine oncology treatment within the decade.',
    url: 'https://nih.gov',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2025-06-14T14:40:00Z',
    source: {
      name: 'Reuters Health',
      url: 'https://reuters.com'
    }
  },
  {
    title: 'Next.js 15 Redefines App Performance with React 19',
    description: 'The React framework introduces a brand new Turbopack compiler, optimized server functions, and automatic caching.',
    content: 'Vercel has launched Next.js 15, integrating full support for React 19 Features. The update brings major speed improvements to page load times and simplifies the data fetching model with clean server actions.',
    url: 'https://nextjs.org',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2025-06-15T15:20:00Z',
    source: {
      name: 'Vercel Blog',
      url: 'https://vercel.com'
    }
  }
];

export const fallbackMovies: TMDBMovie[] = [
  {
    id: 101,
    title: 'Dune: Part Three',
    overview: 'Paul Atreides aligns with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster_path: '/8Gxv8Z7mQ1eJU7vIBfsC2efIQ45.jpg', // Placeholder suffix path, we can also map a nice image in MovieCard if it fails to load or starts with fallback
    backdrop_path: '/xOMo8BRK7PzsHDb6vRA64Cw1w5x.jpg',
    vote_average: 8.9,
    vote_count: 4321,
    release_date: '2025-03-01',
    genre_ids: [878, 28, 12], // Sci-Fi, Action, Adventure
    popularity: 980.5
  },
  {
    id: 102,
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster_path: '/gEU2QvH363eMIuVlR1v444W28vL.jpg',
    backdrop_path: '/rAiXDj02Zzb8602pbqCahNSr285.jpg',
    vote_average: 8.6,
    vote_count: 32900,
    release_date: '2014-11-05',
    genre_ids: [878, 18, 12], // Sci-Fi, Drama, Adventure
    popularity: 250.4
  },
  {
    id: 103,
    title: 'Spider-Man: Beyond the Spider-Verse',
    overview: 'Miles Morales embarks on a multiversal journey to protect his loved ones and rewrite his destiny.',
    poster_path: '/iiX6yGhufRpq46nws6M959c5nsy.jpg',
    backdrop_path: '/1X7v292BEZTLavgygoPVehb2nwM.jpg',
    vote_average: 9.1,
    vote_count: 1205,
    release_date: '2025-05-15',
    genre_ids: [16, 28, 12, 878], // Animation, Action, Adventure, Sci-Fi
    popularity: 740.2
  },
  {
    id: 104,
    title: 'Everything Everywhere All at Once',
    overview: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.',
    poster_path: '/w35414gyw41g23y14.jpg',
    backdrop_path: '/35414gyw41g23y14.jpg',
    vote_average: 8.7,
    vote_count: 5600,
    release_date: '2022-03-24',
    genre_ids: [28, 12, 878, 35], // Action, Adventure, Sci-Fi, Comedy
    popularity: 180.3
  }
];
