// frontend/src/components/ConversionOptions.tsx

import React from 'react';
import './ConversionOptions.css'; // NEW: Import a dedicated CSS file for spacing

// Define props interface for ConversionOptions component
interface ConversionOptionsProps {
  toolType: string;
  onToolTypeChange: (toolType: string) => void;
  quality: number;
  onQualityChange: (quality: number) => void;
  width: number | null;
  onWidthChange: (width: number | null) => void;
  height: number | null;
  onHeightChange: (height: number | null) => void;
  maintainAspectRatio: boolean;
  onMaintainAspectRatioChange: (maintain: boolean) => void;
  originalWidth: number | null;
  originalHeight: number | null;
  targetFormat: string | null;
  onTargetFormatChange: (format: string | null) => void;
  onConvert: () => void;
  isConverting: boolean;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  toolType,
  onToolTypeChange,
  quality,
  onQualityChange,
  width,
  onWidthChange,
  height,
  onHeightChange,
  maintainAspectRatio,
  onMaintainAspectRatioChange,
  originalWidth,
  originalHeight,
  targetFormat,
  onTargetFormatChange,
  onConvert,
  isConverting,
}) => {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? null : parseInt(value, 10);
    if (numValue !== null && (isNaN(numValue) || numValue < 1)) return;
    onWidthChange(numValue);

    if (maintainAspectRatio && numValue !== null && originalWidth && originalHeight) {
      const newHeight = Math.round((numValue / originalWidth) * originalHeight);
      onHeightChange(newHeight);
    } else if (value === '') {
      onHeightChange(null);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? null : parseInt(value, 10);
    if (numValue !== null && (isNaN(numValue) || numValue < 1)) return;
    onHeightChange(numValue);

    if (maintainAspectRatio && numValue !== null && originalWidth && originalHeight) {
      const newWidth = Math.round((numValue / originalHeight) * originalWidth);
      onWidthChange(newWidth);
    } else if (value === '') {
      onWidthChange(null);
    }
  };

  const handleToolTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newToolType = e.target.value;
    onToolTypeChange(newToolType);
    // Reset relevant states when tool type changes for cleaner UX
    if (newToolType === 'image_compressor') {
      onWidthChange(null);
      onHeightChange(null);
      onMaintainAspectRatioChange(false);
      // No need to reset targetFormat here, as it can be used as an override
    } else if (newToolType === 'image_resizer') {
      onQualityChange(90);
      // No need to reset targetFormat here
    } else if (newToolType === 'image_converter') {
      onQualityChange(90);
      onWidthChange(null); // Clear width when switching to converter
      onHeightChange(null); // Clear height when switching to converter
      onMaintainAspectRatioChange(false); // Clear aspect ratio when switching to converter
      // We explicitly want targetFormat to be selected for converter,
      // so we don't clear it here. User will be prompted if not selected on convert.
    }
  };

  const commonFormats = [
    { value: 'JPEG', label: 'JPEG' },
    { value: 'PNG', label: 'PNG' },
    { value: 'WEBP', label: 'WebP' },
    { value: 'GIF', label: 'GIF' },
    { value: 'BMP', label: 'BMP' },
    { value: 'TIFF', label: 'TIFF' },
  ];

  return (
    <div className="conversion-options-container">
      <div className="form-group">
        <label htmlFor="toolType">Select Tool:</label>
        <select id="toolType" value={toolType} onChange={handleToolTypeChange} className="select-input">
          <option value="image_compressor">Image Compressor</option>
          <option value="image_resizer">Image Resizer</option>
          <option value="image_converter">Image Converter</option>
        </select>
      </div>

      {/* Conditionally render based on toolType */}
      {toolType === 'image_compressor' && (
        <div className="form-group">
          <label htmlFor="quality">Quality (0-100):</label>
          <input
            type="range"
            id="quality"
            min="0"
            max="100"
            value={quality}
            onChange={(e) => onQualityChange(parseInt(e.target.value, 10))}
            className="slider-input"
          />
          <span className="slider-value">{quality}%</span>
        </div>
      )}

      {toolType === 'image_resizer' && (
        <>
          <div className="form-group">
            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              placeholder={originalWidth ? `Original: ${originalWidth}px` : "Enter width"}
              value={width === null ? '' : width}
              onChange={handleWidthChange}
              min="1"
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              placeholder={originalHeight ? `Original: ${originalHeight}px` : "Enter height"}
              value={height === null ? '' : height}
              onChange={handleHeightChange}
              min="1"
              className="text-input"
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="maintainAspectRatio"
              checked={maintainAspectRatio}
              onChange={(e) => onMaintainAspectRatioChange(e.target.checked)}
            />
            <label htmlFor="maintainAspectRatio">Maintain Aspect Ratio</label>
          </div>
        </>
      )}

      {/* Target Format Selection - Always displayed, but can be the only option for 'image_converter' */}
      <div className="form-group">
        <label htmlFor="targetFormat">Output Format:</label>
        <select
          id="targetFormat"
          value={targetFormat || ''} // Use empty string for initial null state
          onChange={(e) => onTargetFormatChange(e.target.value === '' ? null : e.target.value)}
          className="select-input"
        >
          <option value="">Maintain Original Format (Default)</option>
          {commonFormats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
      </div>


      <button
        onClick={onConvert}
        disabled={isConverting}
        className="convert-button"
      >
        {isConverting ? 'Processing...' : 'Convert Image'}
      </button>
    </div>
  );
};

export default ConversionOptions;