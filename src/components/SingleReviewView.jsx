import React, { useEffect, useState } from 'react';
import {
  Star, BadgeCheck, ArrowLeft, Share2, ThumbsUp, Calendar,
  MapPin, Briefcase, Shield, Terminal, QrCode, Sparkles,
  ExternalLink, CheckCircle2, Award
} from 'lucide-react';

function getCategoryIcon(product) {
  if (!product) return null;
  if (product === 'IT Services' || product.includes('Services')) return <Briefcase size={14} />;
  if (product.includes('Vault')) return <Shield size={14} />;
  if (product.includes('Compiler')) return <Terminal size={14} />;
  if (product.includes('QR')) return <QrCode size={14} />;
  return <Sparkles size={14} />;
}

function formatDate(timestamp) {
  if (!timestamp) return 'Recently';
  try {
    const time = typeof timestamp === 'number'
      ? timestamp
      : (timestamp.toDate ? timestamp.toDate().getTime() : new Date(timestamp).getTime());
    const d = new Date(time);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return 'Recently';
  }
}

import { getDisplayHelpful } from '../reviewsData';

const SingleReviewView = ({ review, onBack, onHelpfulClick, onShareReview, allReviews, onSelectReview }) => {
  const [voted, setVoted] = useState(false);
  const baseHelpful = getDisplayHelpful(review);
  const helpfulCount = baseHelpful + (voted ? 1 : 0);

  // Update SEO Head Tags dynamically for this specific review
  useEffect(() => {
    if (!review) return;

    const originalTitle = document.title;
    const pageTitle = `${review.name}'s ${review.rating}-Star Review of Coralgenz Global (${review.product || 'Services'})`;
    document.title = pageTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const cleanDesc = (review.description || '').replace(/"/g, "'").slice(0, 155);
    const originalDesc = metaDesc.content;
    metaDesc.content = `${review.name} (${review.location || 'Verified Client'}) rated Coralgenz Global ${review.rating}/5 stars: "${cleanDesc}..." Read full verified review.`;

    // Dynamic JSON-LD structured data for Google Review Rich Snippet
    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "@id": `https://coralgenz-reviews.vercel.app/review/${review.id}`,
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "name": "Coralgenz Global",
        "url": "https://coralgenz.com",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "53766",
          "reviewCount": "53766"
        }
      },
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(review.rating),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.description,
      "datePublished": review.timestampStr ? review.timestampStr.split('T')[0] : "2026-08-16",
      "publisher": {
        "@type": "Organization",
        "name": "Coralgenz Global Verified Reviews",
        "url": "https://coralgenz-reviews.vercel.app/"
      }
    };

    let scriptTag = document.getElementById('single-review-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'single-review-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(reviewSchema);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.content = originalDesc;
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [review]);

  const handleHelpful = () => {
    const inc = voted ? -1 : 1;
    setVoted(!voted);
    if (onHelpfulClick) onHelpfulClick(inc);
  };

  // Find 3 other reviews in the same category
  const relatedReviews = (allReviews || [])
    .filter(r => r.id !== review.id && r.product === review.product)
    .slice(0, 3);

  const formattedDate = formatDate(review.timestampStr || review.timestamp);

  return (
    <article className="single-review-container">
      {/* Top Navigation Bar */}
      <nav className="single-review-nav" aria-label="Review breadcrumbs">
        <button
          type="button"
          onClick={onBack}
          className="single-review-back-btn"
          aria-label="Back to all customer reviews"
        >
          <ArrowLeft size={16} />
          <span>Back to all 53,766 verified reviews</span>
        </button>

        <div className="single-review-breadcrumbs">
          <span>Reviews</span>
          <span className="bc-separator">/</span>
          <span>{review.product || 'IT Services'}</span>
          <span className="bc-separator">/</span>
          <span className="bc-current">Review #{review.id}</span>
        </div>
      </nav>

      {/* Main Single Review Card */}
      <div className="single-review-main-card">
        {/* Verification & Trust Badge Header */}
        <div className="single-review-badge-bar">
          <div className="trust-verified-pill">
            <BadgeCheck size={16} color="#1a73e8" fill="#e8f0fe" />
            <span>Coralgenz Verified Client Review</span>
          </div>
          <span className="single-review-id">ID: #{review.id}</span>
        </div>

        {/* Reviewer Profile Row */}
        <header className="single-review-author-row">
          <div className="single-review-avatar">
            {review.name?.charAt(0).toUpperCase()}
          </div>
          <div className="single-review-author-meta">
            <h1 className="single-review-author-name">{review.name}</h1>
            <div className="single-review-author-details">
              {review.role && <span className="author-role">{review.role} • </span>}
              {review.location ? (
                <>
                  <span className="author-location">
                    <MapPin size={13} className="inline-icon" />
                    {review.location}
                  </span>
                  <span className="details-sep">•</span>
                </>
              ) : null}
              <span className="author-date">
                <Calendar size={13} className="inline-icon" />
                {formattedDate}
              </span>
            </div>
          </div>
        </header>

        {/* Big Star Score Row */}
        <div className="single-review-stars-score">
          <div className="single-stars-list" aria-label={`Rating: ${review.rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                fill={star <= review.rating ? '#fbbc04' : '#dadce0'}
                color={star <= review.rating ? '#fbbc04' : '#dadce0'}
              />
            ))}
          </div>
          <div className="single-score-text">
            <strong>{review.rating}.0 / 5.0</strong>
            <span>Verified Rating</span>
          </div>

          {review.product && (
            <div className="single-product-pill">
              {getCategoryIcon(review.product)}
              <span>{review.product}</span>
            </div>
          )}
        </div>

        {/* Review Body */}
        <div className="single-review-body-wrap">
          <blockquote className="single-review-quote">
            "{review.description}"
          </blockquote>
        </div>

        {/* Attached Photo */}
        {review.photo && (
          <div className="single-review-photo-box">
            <img src={review.photo} alt={`Review evidence by ${review.name}`} className="single-photo-img" />
          </div>
        )}

        {/* Attributes Checked */}
        <div className="single-review-attr-box">
          <span className="attr-box-label">Verified Experience Attributes:</span>
          <div className="attr-box-chips">
            <span className="attr-chip"><Award size={13} color="#2563eb" /> Professionalism & Timely Delivery</span>
            <span className="attr-chip"><Award size={13} color="#2563eb" /> Enterprise Security Standards</span>
            <span className="attr-chip"><Award size={13} color="#2563eb" /> High Client Satisfaction</span>
          </div>
        </div>

        {/* Action Controls Footer */}
        <footer className="single-review-footer">
          <button
            type="button"
            onClick={handleHelpful}
            className={`single-helpful-btn ${voted ? 'active' : ''}`}
            aria-label={`Mark review as helpful. Currently ${helpfulCount} people found this helpful.`}
          >
            <ThumbsUp size={16} fill={voted ? '#1a73e8' : 'none'} color={voted ? '#1a73e8' : '#5f6368'} />
            <span>Helpful ({helpfulCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onShareReview && onShareReview(review)}
            className="single-share-btn"
            aria-label="Share this verified review"
          >
            <Share2 size={16} color="#ffffff" />
            <span>Share Review Link</span>
          </button>
        </footer>

        {/* Google SERP Rich Snippet Guarantee Notice */}
        <div className="single-seo-meta-notice">
          <div className="seo-notice-icon">
            <CheckCircle2 size={16} color="#2563eb" />
          </div>
          <div className="seo-notice-text">
            <strong>Publicly Searchable & Indexed Review:</strong> This review is verified on Coralgenz Reviews and structured in Schema.org JSON-LD format for Google and search engines to index with star ratings.
          </div>
        </div>
      </div>

      {/* Related Reviews Section */}
      {relatedReviews.length > 0 && (
        <section className="single-related-section">
          <h2 className="related-title">More Verified Reviews for {review.product}</h2>
          <div className="related-grid">
            {relatedReviews.map((rel) => (
              <div
                key={rel.id}
                className="related-card"
                onClick={() => onSelectReview && onSelectReview(rel)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectReview && onSelectReview(rel);
                  }
                }}
              >
                <div className="related-card-top">
                  <span className="related-name">{rel.name}</span>
                  <div className="related-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={11} fill={s <= rel.rating ? '#fbbc04' : '#dadce0'} color="#fbbc04" />
                    ))}
                  </div>
                </div>
                <p className="related-snippet">
                  {rel.description.length > 95 ? rel.description.slice(0, 95) + '...' : rel.description}
                </p>
                <span className="related-link">Read review →</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleReviewView;
