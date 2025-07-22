import React from 'react';
// 1. Correct the import to handle the CommonJS module correctly.
// We import the entire module as a single object.
import * as HelmetAsync from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const SEO = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  structuredData,
}) => {
  // 2. The Helmet component is now a property of the imported module.
  const { Helmet } = HelmetAsync;
  const location = useLocation();
  const defaultCanonical = `https://inspirationapp.org${location.pathname}`;
  const defaultImage = `https://shorturl.at/GOMfE`; //WIP : We need to change this

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical || defaultCanonical} />

      {/*---Optional OG Tags---*/}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical || defaultCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image || defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/*----Structured Data (Schema.org JSON-LD)----*/}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  structuredData: PropTypes.object,
};

export default SEO;
