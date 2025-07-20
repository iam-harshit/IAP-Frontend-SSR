export const PLANS = {
  hourly: {
    title: 'Hourly Calls',
    priceRange: [20, 100],
    offerings: [
      'Live sessions via Google Meet, Zoom, or calls.',
      'Feedback on deliverables (e.g., resumes, portfolios).',
    ],
  },
  shortTerm: {
    durations: [
      {
        title: '7-Day Plan',
        priceRange: [200, 500],
        offerings: [
          'Live sessions via Google Meet, Zoom, or calls.',
          'Quick problem-solving sessions.',
          'Feedback on deliverables (e.g., resumes, portfolios).',
          'Rapid skill-building plans focused on short-term goals.',
          'One follow-up check-in post-plan.',
        ],
      },
      {
        title: '14-Day Plan',
        priceRange: [400, 800],
        offerings: [
          'Live sessions via Google Meet, Zoom, or calls.',
          'Quick problem-solving sessions.',
          'Feedback on deliverables (e.g., resumes, portfolios).',
          'Access to curated resources (e.g., study materials).',
          'Rapid skill-building plans focused on short-term goals.',
          'Two follow-up check-ins post-plan.',
        ],
      },
    ],
  },

  longTerm: {
    durations: [
      {
        duration: '1 month',
        priceRange: [1000, 5000],
        offerings: [
          'Regular live sessions via Google Meet, Zoom, or calls.',
          'Personalized goal-setting session.',
          'Customized learning plan.',
          'Monthly progress reports.',
          'Access to mentorship group for collaborative learning.',
          'Invitations to exclusive mentorship events (e.g., webinars, workshops).',
        ],
      },
      {
        duration: '3 months',
        priceRange: [3000, 15000],
        offerings: [
          'Regular live sessions via Google Meet, Zoom, or calls.',
          'Comprehensive goal-setting and progress tracking.',
          'Customized learning plan.',
          'Bi-monthly progress reports.',
          'Priority support or access to the mentorship inner circle.',
          'Bonus resource bundle (e.g., curated reading lists).',
        ],
      },
      {
        duration: '6 months',
        priceRange: [6000, 30000],
        offerings: [
          'Regular live sessions via Google Meet, Zoom, or calls.',
          'Long-term personalized mentorship plan.',
          'Monthly progress reviews and updates.',
          'Access to exclusive mentorship resources.',
          'Networking opportunities with other mentees.',
          'Priority invitations to mentorship events.',
        ],
      },
    ],
  },
};
