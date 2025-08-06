import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomeSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "OpusTools",
    "url": "https://opustools.xyz",
    "description": "OpusTools is an all-in-one media toolkit. Compress, convert, and optimize images, videos, audio, and PDFs. Fast, secure, and watermark-free.",
    "inLanguage": "en",
    "isPartOf": {
      "@type": "WebSite",
      "name": "OpusTools",
      "url": "https://opustools.xyz"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://opustools.xyz/logo.jpg"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OpusTools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://opustools.xyz/logo.jpg"
      }
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default HomeSchema;