import userProfilePic from '@/assets/DashboardAssets/dummyImg.avif';

const podThread = [
  {
    id: 1,
    profilePicture: userProfilePic,
    userName: 'Anurag Tripathi',
    postedOn: '2023-10-01T12:00:00Z',
    postText: `Technology isn’t just about writing code or deploying apps — it’s about persistence, creativity, and solving real-world problems with logic and vision.
We celebrate the big wins: a product launch, a GitHub star, or a clean pull request.
So, tell me — what’s been your biggest lesson or proudest moment in tech so far? Technology isn’t just about writing code or deploying apps — it’s about persistence, creativity, and solving real-world problems with logic and vision.
We celebrate the big wins: a product launch, a GitHub star, or a clean pull request.
So, tell me — what’s been your biggest lesson or proudest moment in tech so far?`,
    likes: 24,
    comments: 3,
    podCategory: 'Technology',
    media: [
      { type: 'image', url: 'https://example.com/image1.jpg' },
      { type: 'video', url: 'https://example.com/video1.mp4' }
    ],
    commentsArray: [
      {
        id: 101,
        userName: 'Sneha Verma',
        profilePicture: userProfilePic,
        commentText: ' Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.Love this! Persistence really is key.',
        commentedOn: '2023-10-02T08:15:00Z',
        likes: 2,
        comments: 3,
      },
      {
        id: 102,
        userName: 'Ravi Kumar',
        profilePicture: userProfilePic,
        commentText: 'This resonates with my journey as a dev.',
        commentedOn: '2023-10-02T10:30:00Z',
        likes: 4,
        comments: 3,
      }, {
        id: 103,
        userName: 'Ravi Kumar',
        profilePicture: userProfilePic,
        commentText: 'This resonates with my journey as a dev.',
        commentedOn: '2023-10-02T10:30:00Z',
        likes: 4,
        comments: 3,
      }
    ]
  },
  {
    id: 2,
    profilePicture: userProfilePic,
    userName: 'Priya Singh',
    postedOn: '2023-11-10T14:20:00Z',
    postText: `Building something new always feels like a rollercoaster — lots of ups and downs. But the thrill of solving problems keeps me going.`,
    likes: 15,
    comments: 1,
    podCategory: 'Hiring',
    media: [
      { type: 'image', url: 'https://example.com/inspiration1.jpg' }
    ],
    commentsArray: [
      {
        id: 201,
        userName: 'Manish Patel',
        profilePicture: userProfilePic,
        commentText: 'Totally agree! The journey is as important as the destination.',
        commentedOn: '2023-11-11T09:00:00Z',
         likes: 0,
    comments: 0,
    
      }
    ]
  }
];

export default podThread;