import React from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MentorCard from '@/components/pages/Mentor-Page/MentorCard'; // Assuming you have a MentorCard component

export default function ExploreMentorsPage() {
  // Read the mentors data from the Redux store.
  // This data was pre-loaded on the server by your +data.js file.
  const {
    list: mentors,
    loading,
    error,
  } = useSelector((state) => state.mentors);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Explore Our Mentors</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Check if mentors array is empty */}
        {!loading && !error && mentors.length === 0 && <p>No mentors found.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard mentor={mentor} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
