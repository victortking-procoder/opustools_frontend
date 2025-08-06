// src/components/GlobalSeo.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async'; // <--- CHANGE THIS IMPORT

const GlobalSeo: React.FC = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OpusTools",
    "url": "https://opustools.xyz",
    "description": "Compress, convert, and optimize your media files with OpusTools",
    "publisher": {
      "@type": "Organization",
      "name": "OpusTools",
      "url": "https://opustools.xyz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://opustools.xyz/logo.jpg"
      }
    },
    "sameAs": [
      "https://x.com/Opus_Tools",
      "https://www.linkedin.com/in/opus-tools-265b92378"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://opustools.xyz/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default GlobalSeo;