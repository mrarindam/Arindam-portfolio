import prj1 from '../media/Projects/prj1.webp';
import prj2 from '../media/Projects/prj2.webp';
import prj3 from '../media/Projects/prj3.webp';
import prj4 from '../media/Projects/prj4.webp';
import prj5 from '../media/Projects/prj5.webp';
import prj6 from '../media/Projects/prj6.webp';
import prj7 from '../media/Projects/prj7.webp';
import prj8 from '../media/Projects/prj8.webp';

export const mainProjects = [
  {
    id: 1,
    name: 'Tokensight AI',
    stack: ['Next Js', 'Tailwind CSS'],
    description: 'Scan any Solana token in seconds. Analyze liquidity, holder concentration, creator behavior and price momentum with real-time, AI-driven risk signals.',
    image: prj1,
    categories: ['Web3', 'SaaS Website'],
    demoLink: 'https://tokensightai.tech/',
    githubLink: 'https://github.com/mrarindam/TokenSight-Ai'
  },
  {
    id: 2,
    name: 'Text Editions',
    stack: ['React Native'],
    description: 'A robust text-editing utility designed with performance and clean architecture for smooth mobile editing workflows.',
    image: prj2,
    categories: ['Tool', 'SaaS Website'],
    demoLink: 'https://arindamk143.github.io/text-edit/',
    githubLink: 'https://github.com/Arindamk143/text-edit'
  },
  {
    id: 3,
    name: 'Solar System',
    stack: ['WebGL', 'Three Js'],
    description: 'An immersive, fully interactive 3D web experience showcasing the planets with stunning graphics and real-time rendering.',
    image: prj3,
    categories: ['WebGL'],
    demoLink: 'https://solar-system-ca.web.app/',
    githubLink: 'https://github.com/Arindamk143/Solar-System'
  },
  {
    id: 4,
    name: 'Skate Escape',
    stack: ['React Native', 'Three Js', 'React Three Fiber', 'Vite'],
    description: 'A high-performance 3D mobile game integrating advanced interactive physics and immersive gameplay concepts.',
    image: prj5,
    categories: ['Gaming'],
    demoLink: 'https://skate-escape.vercel.app/',
    githubLink: 'https://github.com/mrarindam/Skate-Escape'
  },
  {
    id: 5,
    name: 'Typo Tester',
    stack: ['React Native', 'Ether.Js', 'SupaBase DB', 'Vite', 'Base Ecosystem'],
    description: 'A Web3-integrated typing test platform built on the Base ecosystem featuring secure database integration and real-time metric tracking.',
    image: prj6,
    categories: ['Web3', 'SaaS Website'],
    demoLink: 'https://typotester.vercel.app/',
    githubLink: 'https://github.com/mrarindam/TypoTester'
  }
];

export const otherProjects = [
  {
    id: 1,
    name: 'Find About You',
    stack: ['Ip.Api', 'React Native'],
    description: 'An intuitive mobile application that gathers detailed network and location data to provide comprehensive user insights.',
    image: prj4,
    categories: ['Tool'],
    demoLink: 'https://arindamk143.github.io/GetaboutU/',
    githubLink: 'https://github.com/Arindamk143/GetaboutU'
  },
  {
    id: 2,
    name: 'We Say GM',
    stack: ['React Native', 'Ether.Js', 'Base Ecosystem', 'Vite'],
    description: 'A clean decentralized application focused on Web3 social interactions, deployed on the Base network for fast, low-cost operations.',
    image: prj7,
    categories: [],
    demoLink: 'https://saygmlouder.vercel.app/',
    githubLink: 'https://github.com/mrarindam/'
  },
  {
    id: 3,
    name: 'KURO THE VOICE ASSISTANCE',
    stack: ['React Native'],
    description: 'A cutting-edge AI-driven voice assistant built for seamless mobile experiences, featuring intuitive natural language processing.',
    image: prj8,
    categories: ['Tool'],
    demoLink: 'https://arindamk143.github.io/Kuro-Assistance/',
    githubLink: 'https://github.com/Arindamk143/Kuro-Assistance/'
  }
];
