import React, { useState, useEffect } from 'react';
import { X, Send, Loader2, Check, Sparkles, User, MapPin, Shield, Star } from 'lucide-react';
import StarRating from './StarRating';

const ATTRIBUTE_OPTIONS = [
  'Professionalism',
  'Quality',
  'Responsiveness',
  'Value',
  'On-time delivery'
];

const RatingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    name: '',
    role: '',
    location: '',
    product: 'IT Services',
    description: '',
    selectedAttributes: ['Professionalism', 'Quality']
  });
  const [submitting, setSubmitting] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAttribute = (attr) => {
    setFormData(prev => {
      const exists = prev.selectedAttributes.includes(attr);
      return {
        ...prev,
        selectedAttributes: exists
          ? prev.selectedAttributes.filter(a => a !== attr)
          : [...prev.selectedAttributes, attr]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating < 1) {
      alert("Please select a star rating.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        role: formData.role ? formData.role.trim() : null,
        location: formData.location ? formData.location.trim() : '',
        product: formData.product,
        description: formData.description.trim(),
        rating: formData.rating,
        photo: null,
        verified: true,
        attributes: formData.selectedAttributes
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = formData.name.trim() && formData.description.trim() && formData.rating >= 1 && !submitting;

  return (
    <div className="google-modal-backdrop" onClick={onCancel}>
      <div
        className="google-modal-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coralgenz-modal-title"
      >
        {/* Coralgenz Reviews Form Header */}
        <div className="google-modal-header">
          <div className="google-modal-brand">
            <div className="coralgenz-brand-icon-wrap">
              <Star size={18} fill="#fbbc04" color="#fbbc04" />
            </div>
            <div className="google-modal-title-text">
              <h2 id="coralgenz-modal-title" className="google-modal-title">Rate and review Coralgenz Global</h2>
              <span className="google-modal-subtitle">Posting publicly on Coralgenz Reviews</span>
            </div>
          </div>
          <button
            type="button"
            className="google-modal-close-btn"
            onClick={onCancel}
            aria-label="Close review dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="google-modal-body">
          {/* Interactive Stars */}
          <div className="google-form-section star-section">
            <label className="google-form-label">How was your experience?</label>
            <div className="google-stars-container">
              <StarRating
                rating={formData.rating}
                setRating={(r) => setFormData(p => ({ ...p, rating: r }))}
                size={34}
                showLabel={true}
              />
            </div>
          </div>

          {/* Product / Category selector */}
          <div className="google-form-section">
            <label className="google-form-label">Review Category</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="google-select"
            >
              <option value="IT Services">IT Services (Salesforce, Web, Mobile, AI & Custom Software)</option>
              <option value="Coralgenz Vault">Coralgenz Vault (Very High Secure File Encryptor)</option>
              <option value="Coralgenz Compiler">Coralgenz Compiler (Multi-Language Online IDE)</option>
              <option value="Coralgenz QR">Coralgenz QR (Smart Dynamic QR Generator)</option>
              <option value="General">General (General Feedback & Experience)</option>
            </select>
          </div>

          {/* Positive Attributes Chips */}
          <div className="google-form-section">
            <label className="google-form-label">What did you like about this service? (Optional)</label>
            <div className="google-attrs-picker">
              {ATTRIBUTE_OPTIONS.map((attr) => {
                const isSelected = formData.selectedAttributes.includes(attr);
                return (
                  <button
                    key={attr}
                    type="button"
                    className={`google-attr-select-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleAttribute(attr)}
                  >
                    {isSelected && <Check size={13} />}
                    <span>{attr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Text */}
          <div className="google-form-section">
            <label className="google-form-label">Share details of your own experience</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Help others by sharing your honest feedback about project delivery, communication, security, or product quality..."
              className="google-textarea"
            />
          </div>

          {/* Reviewer Details Row */}
          <div className="google-form-grid">
            <div className="google-form-field">
              <label className="google-form-label">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Karthik R"
                className="google-input"
              />
            </div>

            <div className="google-form-field">
              <label className="google-form-label">Role / Designation <span className="google-optional">(Optional)</span></label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. CTO, Product Manager"
                className="google-input"
              />
            </div>

            <div className="google-form-field">
              <label className="google-form-label">Location <span className="google-optional">(Optional)</span></label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Coimbatore, Tamil Nadu"
                className="google-input"
              />
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="google-modal-footer">
            <button
              type="button"
              className="google-btn-cancel"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="google-btn-post"
              disabled={!isValid}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="google-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <span>Post Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;
