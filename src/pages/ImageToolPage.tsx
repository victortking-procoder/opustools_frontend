import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../App.css';
import ImageUpload from '../components/ImageUpload';
import ConversionOptions from '../components/ConversionOptions';
import ImageToolSchema from '../components/ImageToolSchema';
import api from '../utils/api';
import {
  API_BASE_URL,
  CONVERT_IMAGE_ENDPOINT,
  GET_JOB_STATUS_BASE_ENDPOINT
} from '../api';
import { useAuth } from '../context/AuthContext';

// ConversionResponse & JobStatusResponse interfaces
interface ConversionResponse {
  id: string;
  status: string;
  output_url?: string;
  error?: string;
}

interface JobStatusResponse {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  output_url?: string;
  error_message?: string;
}

const ImageToolPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localOriginalImageUrl, setLocalOriginalImageUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);

  const [toolType, setToolType] = useState<string>('image_compressor');
  const [quality, setQuality] = useState<number>(90);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(false);
  const [targetFormat, setTargetFormat] = useState<string | null>(null);

  const [conversionStatus, setConversionStatus] = useState<
    'idle' | 'pending' | 'converting' | 'completed' | 'failed'
  >('idle');
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [showSignupPrompt, setShowSignupPrompt] = useState<boolean>(false);

  const handleFileSelect = useCallback((file: File | null) => {
    // clean up old URL
    if (localOriginalImageUrl) {
      URL.revokeObjectURL(localOriginalImageUrl);
    }
    setLocalOriginalImageUrl(null);
    setSelectedFile(file);
    setConversionStatus('idle');
    setConvertedImageUrl(null);
    setErrorMessage(null);
    setJobId(null);
    setWidth(null);
    setHeight(null);
    setMaintainAspectRatio(false);
    setToolType('image_compressor');
    setTargetFormat(null);
    setOriginalWidth(null);
    setOriginalHeight(null);
    setShowSignupPrompt(false);

    if (file) {
      const url = URL.createObjectURL(file);
      setLocalOriginalImageUrl(url);
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        setLocalOriginalImageUrl(null);
      };
      img.src = url;
    }
  }, [localOriginalImageUrl]);

  // Cleanup URL on unmount
  useEffect(() => {
    return () => {
      if (localOriginalImageUrl) {
        URL.revokeObjectURL(localOriginalImageUrl);
      }
    };
  }, [localOriginalImageUrl]);

  const handleConvert = async () => {
    if (!selectedFile) {
      alert('Please upload an image first!');
      return;
    }
    setConversionStatus('converting');
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('uploaded_file', selectedFile);
    formData.append('tool_type', toolType);
    if (toolType === 'image_compressor') {
      formData.append('quality', quality.toString());
    } else if (toolType === 'image_resizer') {
      if (width !== null) formData.append('width', width.toString());
      if (height !== null) formData.append('height', height.toString());
    }
    if (targetFormat) {
      formData.append('target_format', targetFormat);
    }

    try {
      const { data } = await api.post<ConversionResponse>(CONVERT_IMAGE_ENDPOINT, formData);
      setJobId(data.id);
      setConversionStatus('pending');
    } catch (err: any) {
      setConversionStatus('failed');
      const resp = err.response;
      if (resp?.data?.code === 'conversion_limit_exceeded') {
        setErrorMessage(resp.data.detail);
        if (!isAuthenticated) setShowSignupPrompt(true);
      } else {
        setErrorMessage(resp.data?.error || resp.data?.detail || err.message);
      }
    }
  };

  // Polling for status
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (jobId && (conversionStatus === 'pending' || conversionStatus === 'converting')) {
      interval = setInterval(async () => {
        try {
          const { data } = await api.get<JobStatusResponse>(
            `${GET_JOB_STATUS_BASE_ENDPOINT}${jobId}/status/`
          );
          setConversionStatus(data.status.toLowerCase() as any);
          if (data.status === 'COMPLETED') {
            setConvertedImageUrl(data.output_url || null);
            clearInterval(interval);
          }
          if (data.status === 'FAILED') {
            setErrorMessage(data.error_message || 'Conversion failed.');
            clearInterval(interval);
          }
        } catch (e: any) {
          setConversionStatus('failed');
          setErrorMessage(e.response?.data?.detail || e.message);
          clearInterval(interval);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [jobId, conversionStatus]);

  return (
    <div className="App-main-content">
      <Helmet>
        <title>Image Tool | Instant & Secure JPG → WebP Converter + Bulk Optimizer</title>
        <meta
          name="description"
          content="Upload your photos and convert JPG to WebP, optimize in bulk, and reduce image file size for web instantly. Our free online photo resizer & secure image converter delivers no-watermark results—fast, private, and high-quality."
        />
      </Helmet>
      <ImageToolSchema />

      <h1>Your Go-To Image Optimizer</h1>
      <h2>Convert JPG to WebP • Bulk Optimizer • No-Watermark • Secure & Fast</h2>

      <section className="section-container introduction-text">
        <p>
          Welcome to OpusTools, your all-in-one free online <strong>Image Converter</strong>! Whether you need to{' '}
          <strong>compress JPG</strong>, <strong>resize photos</strong>, or{' '}
          <strong>convert images</strong> to <strong>PNG, GIF</strong>, or <strong>WebP</strong>, our intuitive tool
          makes it easy. Optimize your images without losing quality.
        </p>
      </section>

      <section className="section-container">
        <h3>Upload Your Image</h3>
        <ImageUpload onFileSelect={handleFileSelect} />
      </section>

      <section className="section-container">
        <h3>Conversion Options</h3>
        {selectedFile ? (
          <ConversionOptions
            toolType={toolType}
            onToolTypeChange={setToolType}
            quality={quality}
            onQualityChange={setQuality}
            width={width}
            onWidthChange={setWidth}
            height={height}
            onHeightChange={setHeight}
            maintainAspectRatio={maintainAspectRatio}
            onMaintainAspectRatioChange={setMaintainAspectRatio}
            originalWidth={originalWidth}
            originalHeight={originalHeight}
            targetFormat={targetFormat}
            onTargetFormatChange={setTargetFormat}
            onConvert={handleConvert}
            isConverting={conversionStatus === 'converting' || conversionStatus === 'pending'}
          />
        ) : (
          <p>Ready to get started? Upload an image above to unlock powerful conversion options!</p>
        )}
      </section>

      <section className="section-container">
        <h3>Job Status & History</h3>
        {selectedFile && conversionStatus !== 'idle' ? (
          <div className="job-status-area">
            {jobId && (
              <p>
                Job ID: <strong>{jobId}</strong>
              </p>
            )}
            <p>Status: <strong>{conversionStatus.toUpperCase()}</strong></p>

            {(conversionStatus === 'pending' || conversionStatus === 'converting') && (
              <p>Processing your image... please wait.</p>
            )}
            {conversionStatus === 'completed' && convertedImageUrl && (
              <div>
                <p className="success-message">Conversion Complete!</p>
                <a
                  href={`${API_BASE_URL}/api/image/jobs/${jobId}/download/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                  download
                >
                  Download Converted Image
                </a>
                <div className="converted-preview">
                  <h4>Converted Preview</h4>
                  <img
                    src={convertedImageUrl.startsWith('http') ? convertedImageUrl : `${API_BASE_URL}${convertedImageUrl}`}
                    alt="Converted Preview"
                    className="converted-image-preview"
                  />
                </div>
              </div>
            )}
            {conversionStatus === 'failed' && errorMessage && (
              <p className="error-message">Error: {errorMessage}</p>
            )}

            {showSignupPrompt && (
              <div className="signup-prompt">
                <p>You've reached your limit of free conversions.</p>
                <p>
                  <Link to="/register">Sign up for an account</Link> to get unlimited access and more features!
                </p>
                <p>
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            )}
          </div>
        ) : (
          <p>Your conversion job status will appear here.</p>
        )}
      </section>
    </div>
  );
};

export default ImageToolPage;
