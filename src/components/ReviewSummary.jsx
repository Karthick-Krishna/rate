import React from 'react';
import { Star, ShieldCheck, Award, Layers, Sparkles, CheckCircle2, TrendingUp, Lock } from 'lucide-react';

const ReviewSummary = ({ reviews, filterStar, setFilterStar }) => {
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : '4.9';

  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const fiveStarPct = totalReviews > 0 ? ((fiveStarCount / totalReviews) * 100).toFixed(0) : 95;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    return {
      star,
      count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0
    };
  });

  return (
    <div className="google-summary-card enterprise-summary-card">
      <div className="enterprise-summary-desktop-grid">
        {/* Left Column: Total Count, TrustScore Box & Highlights */}
        <div className="enterprise-summary-left-pane">
          <div className="google-badge-tag enterprise-trust-tag">
            <span className="google-live-dot"></span>
            <span>TOTAL VERIFIED CORALGENZ RATINGS</span>
            <span className="enterprise-live-pill">LIVE INDEX</span>
          </div>

          <div className="enterprise-count-and-score-row">
            <div className="google-count-wrapper">
              <span className="google-large-count">{totalReviews.toLocaleString()}</span>
              <div className="google-count-meta">
                <span className="google-count-title">Verified Customer & Client Ratings</span>
                <span className="google-count-sub">Across IT Services, Salesforce Consulting, Vault, Compiler & QR</span>
              </div>
            </div>

            {/* High-End TrustScore Score Box */}
            <div className="google-score-box enterprise-score-box">
              <div className="enterprise-score-badge-header">
                <ShieldCheck size={15} color="#1d4ed8" />
                <span>TrustScore <strong>{averageRating}</strong> / 5.0</span>
              </div>

              <div className="enterprise-score-main-row">
                <div className="google-score-number">{averageRating}</div>
                <div className="google-score-details">
                  <div className="google-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={17}
                        fill={i < Math.round(Number(averageRating)) ? '#f59e0b' : '#e2e8f0'}
                        color={i < Math.round(Number(averageRating)) ? '#f59e0b' : '#cbd5e1'}
                      />
                    ))}
                  </div>
                  <span className="google-satisfaction-text">
                    <strong>{fiveStarPct}%</strong> 5-Star Satisfaction
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Service Highlights Chips */}
          <div className="google-highlights-row enterprise-highlights-row">
            <div className="google-stat-chip">
              <Layers size={13} color="#2563eb" />
              <span><strong>35.5k+</strong> IT Services</span>
            </div>
            <div className="google-stat-chip">
              <Award size={13} color="#0284c7" />
              <span><strong>18.2k+</strong> Products</span>
            </div>
            <div className="google-stat-chip">
              <Lock size={13} color="#0369a1" />
              <span><strong>Zero-Knowledge</strong> Encryption</span>
            </div>
            <div className="google-stat-chip highlight-chip">
              <ShieldCheck size={13} color="#1d4ed8" />
              <span><strong>100%</strong> Authenticated Feedback</span>
            </div>
          </div>
        </div>

        {/* Right Column: Rating Distribution Breakdown & Attributes */}
        <div className="enterprise-summary-right-pane">
          <div className="google-breakdown-container">
            <div className="google-breakdown-header">
              <div className="breakdown-title-wrap">
                <span className="google-breakdown-heading">Rating Distribution Breakdown:</span>
                <span className="breakdown-subtitle">Click any star tier to filter reviews</span>
              </div>
              {filterStar && (
                <button
                  type="button"
                  className="google-clear-star-btn"
                  onClick={() => setFilterStar(null)}
                  aria-label="Clear active star filter"
                >
                  Clear {filterStar}★ Filter
                </button>
              )}
            </div>

            <div className="google-bars-list">
              {ratingCounts.map(({ star, count, percentage }) => (
                <div
                  key={star}
                  className={`google-bar-row ${filterStar === star ? 'selected' : ''} ${filterStar && filterStar !== star ? 'faded' : ''}`}
                  onClick={() => setFilterStar(filterStar === star ? null : star)}
                  title={`Click to filter by ${star} star reviews`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setFilterStar(filterStar === star ? null : star);
                    }
                  }}
                >
                  <div className="google-bar-star-num">
                    <span>{star}</span>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  </div>
                  <div className="google-bar-track">
                    <div
                      className="google-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="google-bar-meta-col">
                    <span className="google-bar-pct">{percentage > 0 ? `${percentage.toFixed(0)}%` : '0%'}</span>
                    <span className="google-bar-count">({count.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Enterprise Service Attribute Scorecards */}
            <div className="google-attributes-row enterprise-attributes-grid">
              <div className="google-attr-item">
                <div className="attr-item-top">
                  <span className="google-attr-name">Quality</span>
                  <span className="google-attr-score">4.9 ★</span>
                </div>
                <div className="attr-progress-bar"><div className="attr-fill" style={{ width: '98%' }}></div></div>
              </div>
              <div className="google-attr-item">
                <div className="attr-item-top">
                  <span className="google-attr-name">Professionalism</span>
                  <span className="google-attr-score">4.9 ★</span>
                </div>
                <div className="attr-progress-bar"><div className="attr-fill" style={{ width: '98%' }}></div></div>
              </div>
              <div className="google-attr-item">
                <div className="attr-item-top">
                  <span className="google-attr-name">Responsiveness</span>
                  <span className="google-attr-score">4.8 ★</span>
                </div>
                <div className="attr-progress-bar"><div className="attr-fill" style={{ width: '96%' }}></div></div>
              </div>
              <div className="google-attr-item">
                <div className="attr-item-top">
                  <span className="google-attr-name">Security & Value</span>
                  <span className="google-attr-score">4.9 ★</span>
                </div>
                <div className="attr-progress-bar"><div className="attr-fill" style={{ width: '98%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
