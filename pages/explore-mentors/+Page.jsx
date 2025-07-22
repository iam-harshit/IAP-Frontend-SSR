import React from 'react';
import MentorHome from '@/components/pages/Mentor-Page/MentorHome';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// 1. Vike passes `pageProps` from your data hook here.
export default function ExploreMentorsPage({
  initialMentors,
  initialMetadata,
}) {
  return (
    <>
      <Header />
      {/* 2. Pass the pre-fetched data down to your actual component */}
      <MentorHome
        initialMentors={initialMentors}
        initialMetadata={initialMetadata}
      />
      <Footer />
    </>
  );
}
