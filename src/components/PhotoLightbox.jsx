import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

const PhotoLightbox = ({ photo, reviewerName, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!photo) return null;

  return (
    <div className="google-lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="google-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="google-lightbox-header">
          <div className="google-lightbox-title">
            <span>Photo from {reviewerName || 'Google Reviewer'}</span>
          </div>
          <button
            className="google-lightbox-close"
            onClick={onClose}
            aria-label="Close photo preview"
          >
            <X size={20} />
          </button>
        </div>
        <div className="google-lightbox-image-wrap">
          <img src={photo} alt={`Review photo by ${reviewerName}`} className="google-lightbox-img" />
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;
