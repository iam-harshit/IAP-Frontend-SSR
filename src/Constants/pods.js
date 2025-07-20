const CDN_BASE = 'https://api.cbss3.coolify.curiousecosystem.org/inspirationapp/podsPage';

const pods = [
  {
    key: 'technology',
    label: 'Technology',
    banner: `${CDN_BASE}/podsBanner/technologyPodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/technologyPodLogo.webp`,
    img: `${CDN_BASE}/podsImages/technologyPod.webp`,
    description:
      'Share innovations, tech trends, and futuristic ideas shaping tomorrow.',
    link: '/pods/technology',
  },
  {
    key: 'spirituality',
    label: 'Spirituality',
    banner: `${CDN_BASE}/podsBanner/spiritualityPodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/spiritualityPodLogo.webp`,
    img: `${CDN_BASE}/podsImages/spiritualityPod.webp`,
    description:
      'Share thoughts, practices, and reflections that nurture the soul and inner peace.',
    link: '/pods/spirituality',
  },
  {
    key: 'business',
    label: 'Business',
    banner: `${CDN_BASE}/podsBanner/businessPodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/businessPodLogo.webp`,
    img: `${CDN_BASE}/podsImages/businessPod.webp`,
    description:
      'Share ideas, ventures, and opportunities shaping the world of business.',
    link: '/pods/business',
  },
  {
    key: 'health-fitness',
    label: 'Health & Fitness',
    banner: `${CDN_BASE}/podsBanner/healthAndFitnessPodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/healthPodLogo.webp`,
    img: `${CDN_BASE}/podsImages/healthPod.webp`,
    description:
      'Post tips, routines, and insights to inspire a healthier, stronger lifestyle.',
    link: '/pods/health-fitness',
  },
  {
    key: 'hiring',
    label: 'Hiring',
    banner: `${CDN_BASE}/podsBanner/hiringPodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/hiringPodLogo.webp`,
    img: `${CDN_BASE}/podsImages/hiringPod.webp`,
    description:
      "Share openings, insights, and discussions shaping hiring's future.",
    link: '/pods/hiring',
  },
  {
    key: 'ai',
    label: 'AI',
    banner: `${CDN_BASE}/podsBanner/aiPodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/aiPodLogo.webp`,
    img: `${CDN_BASE}/podsImages/aiPod.webp`,
    description:
      'Share breakthroughs, ideas, and discussions shaping the future of artificial intelligence',
    link: '/pods/ai',
  },
  {
    key: 'random',
    label: 'Random',
    banner: `${CDN_BASE}/podsBanner/randomPodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/randomPodLogo.webp`,
    img: `${CDN_BASE}/podsImages/randomPod.webp`,
    description:
      'Post anything under the sun—curiosities, thoughts, or just what’s on your mind!',
    link: '/pods/random',
  },
  {
    key: 'peak-mode',
    label: 'Peak Mode',
    banner: `${CDN_BASE}/podsBanner/peakmodePodBanner.webp`,
    logo: `${CDN_BASE}/podsLogo/peakmodePodLogo.webp`,
    img: `${CDN_BASE}/podsImages/peakmodePod.webp`,
    description:
      'Share routines, reflections, and insights that ignite clarity, focus, and personal excellence.',
    link: '/pods/peak-mode',
  },
];

export default pods;
