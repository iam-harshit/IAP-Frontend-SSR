import React, { useEffect, useState } from 'react';
import TopSection from '@/Components/pages/FeaturePage/TopSection';
import LaunchedFeatureCard from '@/Components/pages/FeaturePage/LaunchedFeatureCard';
import ComingSoonSection from '@/Components/pages/FeaturePage/ComingSoonSection';
import SEO from '@/Components/common/SEO';
import ScrollToTop from '@/Components/common/ScrollToTop';

function FeaturePage() {
  const [show, setShow] = useState(false)
  useEffect(()=>{
    setShow(true)
  }, [])
  return (
    <>
      <SEO
        title="Feature-Page"
        description="We’re not just a mentorship platform — we’re a space for clarity, confidence, and connection. Let your growth journey begin here."
        canonical="https://inspirationapp.org/featurepage"
      />
      {show && <ScrollToTop />}
      <TopSection />
      <LaunchedFeatureCard />
      <ComingSoonSection />
    </>
  );
}

export default FeaturePage;
