// frontend/src/components/ImageUpload.tsx

import React, {
  useState,
  useCallback,
  ChangeEvent,
  DragEvent,
  useRef
} from 'react';
import './ImageUpload.css'; // Component-specific styles

// Maximum upload size (5 MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memoized validator
  const validateAndSelectFile = useCallback((file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      return false;
    }
    setFileError(null);
    setSelectedFile(file);
    onFileSelect(file);

    // generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    return true;
  }, [onFileSelect]);

  // Drop handler
  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFileError('Please drop a valid image file.');
        return;
      }
      validateAndSelectFile(file);
      e.dataTransfer.clearData();
    }
  }, [validateAndSelectFile]);

  // File-input handler
  const onFileInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file.');
      e.target.value = '';
      return;
    }
    validateAndSelectFile(file);
  }, [validateAndSelectFile]);

  // Remove file
  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileError(null);
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [onFileSelect]);

  // Drag-n-drop UI handlers
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(false); };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); };

  // Pretty-print file sizes
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes','KB','MB','GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="image-upload-container">
      {!selectedFile ? (
        <div
          className={`drag-drop-area ${isDragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileInputChange}
            accept="image/*"
            className="file-input-hidden"
          />
          <p>Drag &amp; Drop Image Here</p>
          <p className="or-text">or</p>
          <button type="button" className="browse-button">Click to Browse</button>
          <p className="supported-formats">Supported: JPG, PNG, GIF, WebP, BMP</p>
          <p className="file-limit-note">Max file size: 5 MB</p>
          {fileError && <p className="error-message">{fileError}</p>}
        </div>
      ) : (
        <div className="file-preview-card">
          {previewUrl && (
            <div className="preview-thumbnail-wrapper">
              <img src={previewUrl} alt="Preview" className="preview-thumbnail" />
            </div>
          )}
          <div className="file-details">
            <p className="file-name"><strong>File:</strong> {selectedFile.name}</p>
            <p className="file-size"><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
            <button type="button" onClick={handleRemoveFile} className="remove-file-button">
              Remove File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
