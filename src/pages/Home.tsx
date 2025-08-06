import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HomeSchema from "../components/HomeSchema";
import './Home.css';

// Helper component for tool cards
interface ToolCardProps {
  iconClass: string;
  title: string;
  description: string;
  linkTo: string;
  isComingSoon?: boolean;
  iconText?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  iconClass,
  title,
  description,
  linkTo,
  isComingSoon,
  iconText
}) => (
  <div className={`tool-card ${isComingSoon ? 'coming-soon' : ''}`}>
    <div className={`tool-icon ${iconClass}`}>{iconText}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    {isComingSoon ? (
      <span className="tool-status">Coming Soon</span>
    ) : (
      <Link to={linkTo} className="tool-card-button">
        Use Tool
      </Link>
    )}
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Helmet>
        <title>OpusTools — Free Online Image Compressor & High-Quality Converter</title>
        <meta
          name="description"
          content="OpusTools is a privacy-first image tool offering a free online image compressor, best free image resizer, and SEO-focused image optimization. Convert, compress, and resize in seconds—no watermark, no signup."
        />
      </Helmet>
      <HomeSchema />

      <header className="home-hero">
        <h1>Free Online Image Compressor & Converter</h1>
        <h2>High-Quality Resizer | Privacy-First | SEO-Optimized Images</h2>
        <p className="tagline">
          Simplify your digital life: Convert, Compress, Edit, and Manage Images, Videos, Audio,
          and PDFs effortlessly, right from your browser.
        </p>
        <div className="hero-cta-buttons">
          <Link to="/image-tool" className="hero-button primary">
            Start with Image Tools
          </Link>
        </div>
      </header>

      <section className="tools-showcase">
        <h2>Explore Our Powerful Tools</h2>
        <div className="tool-cards-container">
          <ToolCard
            iconClass="image-icon"
            iconText="🖼️"
            title="Image Tools"
            description="Compress, resize, and convert JPG, PNG, GIF, and WebP images. Optimize photos for web, social media, and email without compromising quality."
            linkTo="/image-tool"
          />
          <ToolCard
            iconClass="pdf-icon"
            iconText="📄"
            title="PDF Tools"
            description="Merge, split, compress, and convert PDF documents. Protect PDFs with passwords or unlock them easily."
            linkTo="/pdf-tool"
            isComingSoon={true}
          />
          <ToolCard
            iconClass="audio-icon"
            iconText="🎵"
            title="Audio Tools"
            description="Convert audio formats (MP3, WAV, AAC), trim, cut, and join audio files. Perfect for podcasters and music enthusiasts."
            linkTo="/audio-tool"
            isComingSoon={true}
          />
          <ToolCard
            iconClass="video-icon"
            iconText="🎬"
            title="Video Tools"
            description="Compress, convert, resize, and trim video files. Extract audio from video or convert videos to GIFs."
            linkTo="/video-tool"
            isComingSoon={true}
          />
        </div>
      </section>

      <section className="benefits-section">
        <h2>Why Choose OpusTools?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h3>Completely Free</h3>
            <p>Access our powerful tools without any hidden costs or subscriptions.</p>
          </div>
          <div className="benefit-item">
            <h3>Fast & Efficient</h3>
            <p>Our cloud-based processing ensures quick conversions and downloads.</p>
          </div>
          <div className="benefit-item">
            <h3>Secure & Private</h3>
            <p>Your files are processed securely and deleted after a short period.</p>
          </div>
          <div className="benefit-item">
            <h3>No Software Needed</h3>
            <p>Works entirely in your browser. No downloads or installations required.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
