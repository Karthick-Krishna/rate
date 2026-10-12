import React, { useState } from 'react';
import {
  BadgeCheck, ThumbsUp, Star, Share2, MoreVertical,
  Briefcase, Shield, Terminal, QrCode, Sparkles,
  CheckCircle2, Image as ImageIcon, ExternalLink
} from 'lucide-react';

/* Google Avatar Palette */
const GOOGLE_AVATAR_COLORS = [
  '#1a73e8', // Google Blue
  '#ea4335', // Google Red
  '#f9ab00', // Google Amber/Yellow
  '#34a853', // Google Green
  '#9334e8', // Purple
  '#e8710a', // Orange
  '#12b5cb', // Cyan
  '#e52592', // Pink
  '#188038', // Forest Green
  '#1967d2', // Dark Blue
];

function getAvatarBg(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GOOGLE_AVATAR_COLORS[Math.abs(hash) % GOOGLE_AVATAR_COLORS.length];
}

/* Verified Client & Location subtitle generator */
function getReviewerSubtitle(review) {
  const rawLoc = (review.location || '').trim();
  const locationText = rawLoc ? (rawLoc.includes(',') ? rawLoc.split(',')[0].trim() : rawLoc) : '';

  if (review.verified === false) {
    return locationText || '';
  }

  if (locationText) {
    return `Verified Client • ${locationText}`;
  }
  return 'Verified Client';
}

/* Format date to Google Reviews style (e.g. "3 days ago", "2 weeks ago") */
function formatGoogleTime(timestamp) {
  if (!timestamp) return 'Recently';
  try {
    const time = typeof timestamp === 'number'
      ? timestamp
      : (timestamp.toDate ? timestamp.toDate().getTime() : new Date(timestamp).getTime());

    if (isNaN(time)) return 'Recently';

    const diffMs = Date.now() - time;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay <= 0) return 'Today';
    if (diffDay === 1) return 'Yesterday';
    if (diffDay < 7) return `${diffDay} days ago`;
    const diffWeek = Math.floor(diffDay / 7);
    if (diffWeek < 4) return `${diffWeek} ${diffWeek === 1 ? 'week' : 'weeks'} ago`;
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`;
    const diffYear = Math.floor(diffDay / 365);
    return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`;
  } catch (e) {
    return 'Recently';
  }
}

function getCategoryIcon(product) {
  if (!product) return null;
  if (product === 'IT Services' || product.includes('Services')) return <Briefcase size={12} />;
  if (product.includes('Vault')) return <Shield size={12} />;
  if (product.includes('Compiler')) return <Terminal size={12} />;
  if (product.includes('QR')) return <QrCode size={12} />;
  return <Sparkles size={12} />;
}

function getCardAttributes(review) {
  if (Array.isArray(review.attributes) && review.attributes.length > 0) {
    return review.attributes.slice(0, 3);
  }
  const prod = review.product || '';
  if (prod.includes('Vault')) return ['Zero-Knowledge Security', 'Client-Side Encryption', 'High Reliability'];
  if (prod.includes('Compiler')) return ['Real-Time Execution', 'Multi-Language IDE', 'Low Latency'];
  if (prod.includes('QR')) return ['Dynamic QR Analytics', 'Custom Branding', 'Fast Scanning'];
  const hash = Math.abs(typeof review.id === 'number' ? review.id : 100001);
  const options = [
    ['Professionalism', 'Quality', 'Timely Delivery'],
    ['Responsive Team', 'Technical Depth', 'Value for Money'],
    ['Enterprise Architecture', 'High Quality', 'Clear Communication'],
    ['Scalable Delivery', 'Salesforce Expertise', 'Responsive Support']
  ];
  return options[hash % options.length];
}

import { getDisplayHelpful } from '../reviewsData';

const RatingCard = ({ review, onHelpfulClick, onPhotoClick, onShareReview, onOpenReview }) => {
  const [voted, setVoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const baseHelpful = getDisplayHelpful(review);
  const count = baseHelpful + (voted ? 1 : 0);

  const handleHelpful = () => {
    const inc = voted ? -1 : 1;
    setVoted(!voted);
    if (onHelpfulClick) onHelpfulClick(inc);
  };

  const relativeTime = formatGoogleTime(review.timestampStr || review.timestamp);
  const reviewerSubtitle = getReviewerSubtitle(review);
  const cardAttributes = getCardAttributes(review);
  const descriptionText = review.description || '';
  const isLongText = descriptionText.length > 210;
  const displayedText = isLongText && !isExpanded
    ? descriptionText.slice(0, 200) + '...'
    : descriptionText;

  return (
    <div className="google-review-card">
      {/* Reviewer Header */}
      <div className="google-card-header">
        <div
          className="google-avatar"
          style={{ background: getAvatarBg(review.name) }}
          aria-hidden="true"
        >
          {review.name?.charAt(0).toUpperCase()}
        </div>

        <div className="google-reviewer-meta">
          <div className="google-reviewer-name-row">
            <span className="google-reviewer-name">{review.name}</span>
            {review.verified !== false && (
              <span className="google-verified-badge" title="Verified Coralgenz Client">
                <BadgeCheck size={12} color="#2563eb" fill="#eff6ff" />
                Verified
              </span>
            )}
          </div>
          {reviewerSubtitle && (
            <div className="google-reviewer-badge-line">
              <span className="google-guide-text">{reviewerSubtitle}</span>
            </div>
          )}
        </div>

        {/* Share menu button */}
        <button
          type="button"
          className="google-card-menu-btn"
          onClick={() => onShareReview && onShareReview(review)}
          title="Share review"
          aria-label="Share review"
        >
          <Share2 size={15} />
        </button>
      </div>

      {/* Stars & Timestamp Row */}
      <div className="google-rating-time-row">
        <div className="google-stars-display" aria-label={`${review.rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              fill={star <= review.rating ? '#f59e0b' : '#e2e8f0'}
              color={star <= review.rating ? '#f59e0b' : '#cbd5e1'}
            />
          ))}
        </div>
        <span className="google-review-time">{relativeTime}</span>

        {/* Category Pill */}
        {review.product && (
          <span className="google-product-pill">
            {getCategoryIcon(review.product)}
            <span>{review.product}</span>
          </span>
        )}
      </div>

      {/* Positive Attributes Chips */}
      <div className="google-positive-attributes">
        <span className="google-attr-label">Verified Highlights:</span>
        {cardAttributes.map((attr, idx) => (
          <span key={idx} className="google-attr-pill">
            <CheckCircle2 size={11} className="attr-check-icon" />
            <span>{attr}</span>
          </span>
        ))}
      </div>

      {/* Review Body Text */}
      <div className="google-review-text-wrap">
        <p className="google-review-body">
          {displayedText}
          {isLongText && (
            <button
              type="button"
              className="google-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'More'}
            </button>
          )}
        </p>
      </div>

      {/* Attached Photo (Google Photos preview thumbnail) */}
      {review.photo && (
        <div
          className="google-review-photo-wrap"
          onClick={() => onPhotoClick && onPhotoClick(review.photo, review.name)}
          role="button"
          tabIndex={0}
          title="Click to expand photo"
          aria-label="Expand review photo"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onPhotoClick && onPhotoClick(review.photo, review.name);
            }
          }}
        >
          <img src={review.photo} alt={`Review by ${review.name}`} className="google-review-photo" />
          <div className="google-photo-zoom-badge">
            <ImageIcon size={12} />
            <span>View photo</span>
          </div>
        </div>
      )}

      {/* Review Actions Footer */}
      <div className="google-review-footer">
        <button
          type="button"
          onClick={handleHelpful}
          className={`google-action-btn ${voted ? 'active' : ''}`}
          aria-label={`Helpful: ${count} people found this review helpful`}
        >
          <ThumbsUp size={14} fill={voted ? '#1a73e8' : 'none'} color={voted ? '#1a73e8' : '#5f6368'} />
          <span>Helpful ({count})</span>
        </button>

        <button
          type="button"
          onClick={() => onShareReview && onShareReview(review)}
          className="google-action-btn"
          aria-label="Share review link"
        >
          <Share2 size={14} color="#5f6368" />
          <span>Share</span>
        </button>

        <a
          href={`/review/${review.id}`}
          onClick={(e) => {
            e.preventDefault();
            if (onOpenReview) onOpenReview(review);
          }}
          className="google-action-btn google-permalink-btn"
          title="Open dedicated standalone review page"
        >
          <ExternalLink size={13} color="#5f6368" />
          <span>View review</span>
        </a>
      </div>
    </div>
  );
};

export default RatingCard;
