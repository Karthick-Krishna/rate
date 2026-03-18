import React, { useState, useRef } from 'react';
import { Camera, X, Send, Loader2 } from 'lucide-react';
import StarRating from './StarRating';

/* Compress image to stay within Firestore 1MB doc limit */
function compressImage(dataUrl, maxWidth = 400, quality = 0.6) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width;
      let h = img.height;
      if (w > maxWidth) {
        h = (h * maxWidth) / w;
        w = maxWidth;
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
}

const RatingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    name: '',
    location: '',
    description: '',
    photo: null
  });
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size is too large. Please upload an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating < 1) {
      alert("Please select a star rating.");
      return;
    }
    setSubmitting(true);
    try {
      let photoToSave = formData.photo;
      if (photoToSave) {
        photoToSave = await compressImage(photoToSave);
      }
      await onSubmit({
        name: formData.name,
        location: formData.location,
        description: formData.description,
        rating: formData.rating,
        photo: photoToSave || null,
        verified: true
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = formData.name && formData.description && formData.rating >= 1 && !submitting;

  return (
    <div className="review-form-card">
      <h3>Share Your Experience</h3>
      <form onSubmit={handleSubmit}>
        {/* Star rating */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label>How would you rate us?</label>
          <div style={{ marginTop: '0.35rem' }}>
            <StarRating rating={formData.rating} setRating={(r) => setFormData(p => ({ ...p, rating: r }))} size={30} />
          </div>
        </div>

        {/* Name + Location row */}
        <div className="flex gap-4" style={{ flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label>Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. John Doe" />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label>Location <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(Optional)</span></label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY" />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Your Review</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Tell others about your experience with our services..." />
        </div>

        {/* Photo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label>Photo <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(Optional)</span></label>
          {formData.photo ? (
            <div style={{ position: 'relative', display: 'inline-block', marginTop: '0.35rem' }}>
              <img src={formData.photo} alt="Preview" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
              <button
                type="button"
                onClick={removePhoto}
                style={{
                  position: 'absolute', top: -6, right: -6,
                  background: 'var(--danger)', color: 'white',
                  borderRadius: '50%', border: '2px solid white',
                  width: 22, height: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', padding: 0
                }}
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div style={{ marginTop: '0.35rem' }}>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} ref={fileInputRef} style={{ display: 'none' }} id="photo-upload" />
              <label htmlFor="photo-upload" className="btn btn-outline" style={{ display: 'inline-flex', cursor: 'pointer', margin: 0, padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                <Camera size={14} /> Upload image
              </label>
            </div>
          )}
        </div>

        {/* Submit row */}
        <div className="flex justify-between items-center" style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button type="button" className="btn-text" onClick={onCancel} disabled={submitting}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={!isValid}>
            {submitting ? <><Loader2 size={14} className="spin" /> Submitting...</> : <><Send size={14} /> Submit Review</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RatingForm;
