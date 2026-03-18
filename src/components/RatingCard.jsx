import React, { useState } from 'react';
import { BadgeCheck, ThumbsUp, Star } from 'lucide-react';

/* ── Avatar gradients (monochromatic range from black to gray) ── */
const avatarBgs = [
  '#0a0a0a', '#1a1a1a', '#262626', '#404040',
  '#525252', '#737373', '#171717', '#2d2d2d',
  '#3d3d3d', '#111111',
];

function pickBg(name) {
  let h = 0;
  for (let i = 0; i < (name || '').length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarBgs[Math.abs(h) % avatarBgs.length];
}

/* ── Render filled stars ── */
const StarRow = ({ rating }) => (
  <div className="stars-display">
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={13}
        fill={i <= rating ? '#f59e0b' : 'transparent'}
        color={i <= rating ? '#f59e0b' : '#d4d4d4'}
        strokeWidth={i <= rating ? 2.2 : 1.5}
      />
    ))}
  </div>
);

/* ── Rating pill class by star count ── */
function pillClass(r) {
  if (r >= 5) return 'rating-pill star-5';
  if (r >= 4) return 'rating-pill star-4';
  if (r >= 3) return 'rating-pill star-3';
  if (r >= 2) return 'rating-pill star-2';
  return 'rating-pill star-1';
}

const RatingCard = ({ review, onHelpfulClick }) => {
  const [count, setCount] = useState(review.helpful || 0);
  const [voted, setVoted] = useState(false);

  const handleHelpful = () => {
    const inc = voted ? -1 : 1;
    setCount(c => c + inc);
    setVoted(!voted);
    if (onHelpfulClick) onHelpfulClick(inc);
  };

  return (
    <div className="review-card animate-in">
      {/* Header */}
      <div className="card-header">
        {/* Avatar */}
        <div className="avatar" style={{ background: pickBg(review.name) }}>
          {review.name?.charAt(0).toUpperCase()}
        </div>

        {/* Name / location */}
        <div className="card-meta">
          <span className="reviewer-name">{review.name}</span>
          {review.verified !== false && (
            <span className="verified-badge" style={{ marginLeft: '0.35rem', verticalAlign: 'middle' }}>
              <BadgeCheck size={8} /> Verified
            </span>
          )}
          <span className="reviewer-location">{review.location || 'Customer'}</span>
        </div>

        {/* Rating pill */}
        <div className={pillClass(review.rating)}>
          <Star size={10} fill="currentColor" color="currentColor" />
          {review.rating}.0
        </div>
      </div>

      {/* Stars */}
      <StarRow rating={review.rating} />

      {/* Body text */}
      <p className="review-body">{review.description}</p>

      {/* Photo */}
      {review.photo && (
        <img
          src={review.photo}
          alt="Review"
          style={{
            marginTop: '0.7rem',
            width: '100px', height: '100px',
            objectFit: 'cover',
            borderRadius: '8px',
            border: '1px solid #e5e5e5'
          }}
        />
      )}

      {/* Actions */}
      <div className="review-actions">
        <button onClick={handleHelpful} className={`helpful-btn ${voted ? 'voted' : ''}`}>
          <ThumbsUp size={12} fill={voted ? 'currentColor' : 'transparent'} />
          {count.toLocaleString()} found this helpful
        </button>
      </div>
    </div>
  );
};

export default RatingCard;
