import React from 'react';
import { Star, ShieldCheck, Award } from 'lucide-react';

const ReviewSummary = ({ reviews, filterStar, setFilterStar }) => {
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: totalReviews > 0
      ? (reviews.filter(r => r.rating === star).length / totalReviews) * 100
      : 0
  }));

  return (
    <div className="summary-card">
      <div className="summary-title">Reviews Summary</div>

      <div className="summary-content">
        {/* Left — Big rating + stars */}
        <div className="summary-left">
          <div className="big-rating">{averageRating}</div>
          <div>
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.round(averageRating) ? '#f59e0b' : 'transparent'}
                  color={i < Math.round(averageRating) ? '#f59e0b' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={2}
                />
              ))}
            </div>
            <div className="rating-label">
              Based on <strong style={{ color: '#e2e8f0' }}>{totalReviews.toLocaleString()}</strong> reviews
            </div>
          </div>
        </div>

        {/* Center — Bars */}
        <div className="summary-center">
          {ratingCounts.map(({ star, count, percentage }) => (
            <div
              key={star}
              className={`rating-bar-row ${filterStar === star ? 'active' : ''} ${filterStar && filterStar !== star ? 'dimmed' : ''}`}
              onClick={() => setFilterStar(filterStar === star ? null : star)}
              title={`Filter by ${star} star reviews`}
            >
              <span className="star-num">{star}</span>
              <Star size={11} fill="#f59e0b" color="#f59e0b" />
              <div className="rating-bar-track">
                <div className="rating-bar-fill" style={{ width: `${percentage}%` }} />
              </div>
              <span className="bar-count">{count.toLocaleString()}</span>
            </div>
          ))}
          {filterStar && (
            <button className="clear-filter-btn" onClick={() => setFilterStar(null)}>
              Clear Filter
            </button>
          )}
        </div>

        {/* Right — Verified */}
        <div className="summary-right">
          <div className="verified-section">
            <h4>
              <ShieldCheck size={14} color="#10b981" />
              Verified Reviews
            </h4>
            <p>
              All reviews are collected from verified customers. We ensure transparency and authenticity in every review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
