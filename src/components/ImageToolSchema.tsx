import React from 'react';
import { Helmet } from 'react-helmet-async';

const ImageToolSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Compressor - OpusTools",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "browserRequirements": "Requires JavaScript and internet",
    "url": "https://opustools.xyz/image-tool",
    "description": "Compress, convert, and optimize images with OpusTools’ free online image tool.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OpusTools",
      "url": "https://opustools.xyz"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ImageToolSchema;