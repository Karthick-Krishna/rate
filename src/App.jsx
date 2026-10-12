import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReviewSummary from './components/ReviewSummary';
import RatingCard from './components/RatingCard';
import RatingForm from './components/RatingForm';
import SingleReviewView from './components/SingleReviewView';
import PhotoLightbox from './components/PhotoLightbox';
import Toast from './components/Toast';
import {
  Search, X, SlidersHorizontal, ChevronDown, PenSquare,
  Sparkles, Camera, MapPin, Briefcase, Shield, Terminal,
  QrCode, Star, Check, ShieldCheck, CheckCircle2, LayoutGrid, List
} from 'lucide-react';
import { getStaticReviews } from './reviewsData';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, increment, serverTimestamp } from 'firebase/firestore';

const TOPIC_CHIPS = [
  { id: 'all', label: 'All (53.7k+)', icon: null },
  { id: 'IT Services', label: 'IT Services (35k+)', icon: Briefcase },
  { id: 'Coimbatore', label: 'Coimbatore', icon: MapPin },
  { id: 'Chennai', label: 'Chennai', icon: MapPin },
  { id: 'Coralgenz Vault', label: 'Coralgenz Vault', icon: Shield },
  { id: 'Coralgenz Compiler', label: 'Coralgenz Compiler', icon: Terminal },
  { id: 'Coralgenz QR', label: 'Coralgenz QR', icon: QrCode },
  { id: 'General', label: 'General', icon: Sparkles },
  { id: 'Security', label: 'Security & Quality', icon: Shield },
  { id: '5star', label: '5 Stars Only', icon: Star },
];

function App() {
  const [firebaseReviews, setFirebaseReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const [filterStar, setFilterStar] = useState(null);
  const [activeChip, setActiveChip] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(15);

  // Standalone review & Lightbox/Toast states
  const [selectedReview, setSelectedReview] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (2 cols on desktop) | 'list' (1 col)

  const staticReviews = useMemo(() => getStaticReviews(), []);

  const allReviews = useMemo(() => {
    return [...firebaseReviews, ...staticReviews];
  }, [firebaseReviews, staticReviews]);

  // Synchronize standalone review from URL (/review/:id or ?review=:id)
  const syncReviewFromUrl = useCallback((reviewsList) => {
    if (!reviewsList || reviewsList.length === 0) return;
    const path = window.location.pathname;
    const search = window.location.search;
    let targetId = null;

    const match = path.match(/\/review\/([0-9a-zA-Z_-]+)/);
    if (match) {
      targetId = match[1];
    } else {
      const params = new URLSearchParams(search);
      if (params.get('review')) {
        targetId = params.get('review');
      }
    }

    if (targetId) {
      const found = reviewsList.find(r => String(r.id) === String(targetId));
      if (found) {
        setSelectedReview(found);
        return;
      }
    }
    setSelectedReview(null);
  }, []);

  useEffect(() => {
    if (allReviews.length > 0) {
      syncReviewFromUrl(allReviews);
    }

    const handlePopState = () => {
      syncReviewFromUrl(allReviews);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [allReviews, syncReviewFromUrl]);

  const handleOpenReview = useCallback((rev) => {
    setSelectedReview(rev);
    window.history.pushState({ reviewId: rev.id }, '', `/review/${rev.id}`);
  }, []);

  const handleBackToAll = useCallback(() => {
    setSelectedReview(null);
    window.history.pushState({}, '', '/');
  }, []);

  // Real-time Firestore sync
  useEffect(() => {
    const q = query(collection(db, "user_reviews"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviews = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        reviews.push({ ...data, id: docSnap.id, isUserReview: true });
      });
      setFirebaseReviews(reviews);
    }, (error) => {
      console.error("Firestore listener error: ", error);
    });
    return () => unsubscribe();
  }, []);

  const handleAddReview = async (newReview) => {
    try {
      const nowMs = Date.now();
      // Target cap strictly below 1000, unique per review (between 150 and 890)
      const targetHelpful = 150 + Math.floor(Math.random() * 740);
      // Growth duration between 7 and 14 days
      const growthDays = 7 + Math.floor(Math.random() * 8);

      await addDoc(collection(db, "user_reviews"), {
        ...newReview,
        isUserReview: true,
        createdAt: nowMs,
        timestamp: serverTimestamp(),
        timestampStr: new Date(nowMs).toISOString(),
        helpful: 0,
        targetHelpful,
        growthDays,
      });
      setShowForm(false);
      setFilterStar(null);
      setActiveChip('all');
      setSearchQuery('');
      setSortBy('newest');
      setToastMessage('Review posted to Coralgenz Reviews! Thank you for your feedback.');
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("Failed to add review. Please try again.");
    }
  };

  const handleHelpfulClick = async (reviewId, isFirebase, inc) => {
    if (!isFirebase) return;
    try {
      const reviewRef = doc(db, "user_reviews", reviewId);
      await updateDoc(reviewRef, {
        helpful: increment(inc)
      });
    } catch (error) {
      console.error("Error updating helpful count: ", error);
    }
  };

  const handleShareListing = useCallback(async () => {
    const shareUrl = window.location.origin;
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch (err) {
        console.warn('Clipboard API writeText failed:', err);
      }
    }
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (e) {
        console.error('execCommand copy fallback failed:', e);
      }
    }
    setToastMessage(`Coralgenz Reviews URL copied: ${shareUrl}`);
  }, []);

  const handleShareReview = useCallback(async (review) => {
    const shareUrl = `${window.location.origin}/review/${review.id}`;
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch (err) {
        console.warn('Clipboard API writeText failed:', err);
      }
    }
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (e) {
        console.error('execCommand copy fallback failed:', e);
      }
    }
    setToastMessage(`Review #${review.id} URL copied to clipboard!`);
  }, []);

  // Filter & Search pipeline
  const processedReviews = useMemo(() => {
    let result = allReviews;

    // 1. Topic Chips
    if (activeChip !== 'all') {
      if (activeChip === '5star') {
        result = result.filter(r => r.rating === 5);
      } else if (activeChip === 'Security') {
        result = result.filter(r => r.product === 'Coralgenz Vault' || (r.description && r.description.toLowerCase().includes('security')));
      } else if (activeChip === 'Coimbatore') {
        result = result.filter(r => r.location && r.location.toLowerCase().includes('coimbatore'));
      } else if (activeChip === 'Chennai') {
        result = result.filter(r => r.location && r.location.toLowerCase().includes('chennai'));
      } else {
        result = result.filter(r => r.product === activeChip);
      }
    }

    // 2. Star breakdown filter
    if (filterStar) {
      result = result.filter(r => r.rating === filterStar);
    }

    // 3. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.location && r.location.toLowerCase().includes(q)) ||
        (r.role && r.role.toLowerCase().includes(q)) ||
        (r.product && r.product.toLowerCase().includes(q))
      );
    }

    // 4. Sorting
    if (sortBy === 'highest') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      result = [...result].sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => {
        const tA = typeof a.timestamp === 'number' ? a.timestamp : (a.timestamp?.toDate ? a.timestamp.toDate().getTime() : (a.timestampStr ? new Date(a.timestampStr).getTime() : (typeof a.id === 'number' ? a.id : 0)));
        const tB = typeof b.timestamp === 'number' ? b.timestamp : (b.timestamp?.toDate ? b.timestamp.toDate().getTime() : (b.timestampStr ? new Date(b.timestampStr).getTime() : (typeof b.id === 'number' ? b.id : 0)));
        return tB - tA;
      });
    } else {
      // 'relevant': balanced enterprise curation (verified clients, quality feedback, natural variety)
      result = [...result].sort((a, b) => {
        const idA = typeof a.id === 'number' ? a.id : 100000;
        const idB = typeof b.id === 'number' ? b.id : 100000;
        const hashA = Math.abs(((idA * 2654435761) ^ 0x5bf03635) % 100);
        const hashB = Math.abs(((idB * 2654435761) ^ 0x5bf03635) % 100);
        const scoreA = (a.verified !== false ? 25 : 0) + (a.rating === 5 ? 15 : 5) + Math.min((a.description || '').length / 25, 15) + (hashA * 0.35);
        const scoreB = (b.verified !== false ? 25 : 0) + (b.rating === 5 ? 15 : 5) + Math.min((b.description || '').length / 25, 15) + (hashB * 0.35);
        return scoreB - scoreA;
      });
    }

    return result;
  }, [allReviews, activeChip, filterStar, searchQuery, sortBy]);

  const displayedReviews = useMemo(() => {
    return processedReviews.slice(0, visibleCount);
  }, [processedReviews, visibleCount]);

  const hasMore = visibleCount < processedReviews.length;
  const remaining = processedReviews.length - visibleCount;

  const resetAllFilters = () => {
    setActiveChip('all');
    setFilterStar(null);
    setSearchQuery('');
    setSortBy('relevant');
    setVisibleCount(15);
  };

  const isFiltering = activeChip !== 'all' || filterStar !== null || searchQuery.trim().length > 0;

  return (
    <div className="google-app-container">
      {/* Top App Bar with Coralgenz Reviews Branding */}
      <header className="google-top-app-bar">
        <div className="google-bar-inner">
          <div
            className="coralgenz-brand-header-wrap"
            onClick={handleBackToAll}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleBackToAll(); }}
            title="Coralgenz Reviews Home"
          >
            <div className="coralgenz-header-emblem">
              <span className="coralgenz-brand-letter">C</span>
              <span className="coralgenz-star-dot">★</span>
            </div>
            <div className="coralgenz-brand-header-text">
              <span className="coralgenz-bar-title">Coralgenz Reviews</span>
              <span className="coralgenz-bar-sub">Verified Ratings & Trust Platform</span>
            </div>
          </div>

          <div className="top-trust-badge">
            <ShieldCheck size={14} color="#1d4ed8" />
            <span>Verified Trust Index • 4.9 ★</span>
          </div>

          <div className="google-bar-actions">
            <button
              type="button"
              className="google-bar-rate-btn"
              onClick={() => setShowForm(true)}
            >
              <PenSquare size={15} />
              <span>Write a review</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="google-main-content">
        {selectedReview ? (
          <SingleReviewView
            review={selectedReview}
            onBack={handleBackToAll}
            onHelpfulClick={(inc) => handleHelpfulClick(selectedReview.id, typeof selectedReview.id === 'string', inc)}
            onShareReview={handleShareReview}
            allReviews={allReviews}
            onSelectReview={handleOpenReview}
          />
        ) : (
          <>
            {/* Total Ratings Hero Box & Rating Breakdown (Count Box) */}
            <ReviewSummary
              reviews={allReviews}
              filterStar={filterStar}
              setFilterStar={(star) => { setFilterStar(star); setVisibleCount(15); }}
            />

            {/* Highlighted Write a Review Button Section */}
            <div className="google-highlight-cta-banner">
              <div className="google-highlight-cta-content">
                <div className="google-highlight-cta-text">
                  <div className="google-highlight-badge">
                    <span className="google-sparkle-dot"></span>
                    <span>Share Your Experience</span>
                  </div>
                  <h1 className="google-highlight-title">Coralgenz Customer Reviews & Ratings</h1>
                  <p className="google-highlight-subtitle">
                    Authentic verified feedback from clients across Coimbatore, Chennai, Pan-India & Global engagements.
                  </p>
                  <div className="google-highlight-metrics">
                    <span className="hero-metric-item"><CheckCircle2 size={13} color="#2563eb" /> 53,766 Authenticated Reviews</span>
                    <span className="hero-metric-item"><CheckCircle2 size={13} color="#2563eb" /> Zero-Knowledge Security Verified</span>
                    <span className="hero-metric-item"><CheckCircle2 size={13} color="#2563eb" /> 95% 5-Star Satisfaction</span>
                  </div>
                </div>
                <div className="google-highlight-cta-action">
                  <button
                    type="button"
                    className="google-highlight-write-btn"
                    onClick={() => setShowForm(true)}
                    aria-label="Write a review"
                  >
                    <div className="google-star-burst">
                      <Star size={20} fill="#fbbc04" color="#fbbc04" />
                    </div>
                    <span className="google-btn-main-text">Write a Review</span>
                    <PenSquare size={17} className="google-btn-icon" />
                  </button>
                </div>
              </div>
            </div>

            {/* Google Reviews Real-Time Search Bar */}
            <div className="google-search-section">
              <div className="google-search-bar">
                <Search size={18} className="google-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(15); }}
                  placeholder="Search reviews by keyword, location, or name (e.g. Coimbatore, Vault, fast, React)..."
                  className="google-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="google-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Google Reviews Horizontal Topic Chips */}
            <div className="google-chips-carousel" role="toolbar" aria-label="Topic filters">
              {TOPIC_CHIPS.map((chip) => {
                const IconComp = chip.icon;
                const isSelected = activeChip === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    className={`google-topic-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setActiveChip(chip.id);
                      setVisibleCount(15);
                    }}
                  >
                    {IconComp && <IconComp size={13} className="google-chip-icon" />}
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Reviews Feed Toolbar */}
            <div className="google-feed-toolbar">
              <div className="google-toolbar-left">
                <h2 className="google-toolbar-heading">
                  Reviews
                  <span className="google-feed-count">
                    ({processedReviews.length.toLocaleString()})
                  </span>
                </h2>

                {isFiltering && (
                  <button
                    type="button"
                    className="google-reset-filters-btn"
                    onClick={resetAllFilters}
                  >
                    Reset filters
                  </button>
                )}
              </div>

              <div className="google-toolbar-right">
                <div className="google-view-mode-toggle" role="group" aria-label="Layout view">
                  <button
                    type="button"
                    className={`google-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view (2 columns on desktop)"
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    type="button"
                    className={`google-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view (single column)"
                    aria-label="List view"
                  >
                    <List size={15} />
                  </button>
                </div>

                <div className="google-sort-dropdown">
                  <SlidersHorizontal size={14} className="google-sort-icon" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort reviews"
                    className="google-sort-select"
                  >
                    <option value="relevant">Most relevant</option>
                    <option value="newest">Newest</option>
                    <option value="highest">Highest rating</option>
                    <option value="lowest">Lowest rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews Feed List */}
            <div className={`google-reviews-feed ${viewMode === 'grid' ? 'desktop-grid-mode' : 'desktop-list-mode'}`}>
              {displayedReviews.map((review) => (
                <RatingCard
                  key={review.id}
                  review={review}
                  onHelpfulClick={(inc) => handleHelpfulClick(review.id, typeof review.id === 'string', inc)}
                  onPhotoClick={(photo, name) => setActivePhoto({ photo, name })}
                  onShareReview={handleShareReview}
                  onOpenReview={handleOpenReview}
                />
              ))}

              {processedReviews.length === 0 && (
                <div className="google-empty-state">
                  <div className="google-empty-icon">
                    <Search size={32} color="#5f6368" />
                  </div>
                  <h3 className="google-empty-title">No reviews match your search or filter</h3>
                  <p className="google-empty-desc">
                    Try searching for another keyword, clearing the star filter, or selecting "All".
                  </p>
                  <button
                    type="button"
                    className="google-btn-primary"
                    onClick={resetAllFilters}
                  >
                    Show all reviews
                  </button>
                </div>
              )}

              {hasMore && (
                <div className="google-load-more-section">
                  <button
                    type="button"
                    className="google-load-more-btn"
                    onClick={() => setVisibleCount(prev => Math.min(prev + 30, processedReviews.length))}
                  >
                    <ChevronDown size={18} />
                    <span>
                      Load more reviews ({remaining > 30 ? 30 : remaining} of {remaining.toLocaleString()} remaining)
                    </span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button (FAB) on Mobile UI for effortless thumb tap */}
      <div className="google-mobile-fab-wrap">
        <button
          type="button"
          className="google-mobile-fab"
          onClick={() => setShowForm(true)}
          aria-label="Write a review"
        >
          <PenSquare size={18} />
          <span>Write a review</span>
        </button>
      </div>

      {/* Write Review Modal / Bottom Sheet */}
      {showForm && (
        <RatingForm
          onSubmit={handleAddReview}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Google Photos Lightbox */}
      {activePhoto && (
        <PhotoLightbox
          photo={activePhoto.photo}
          reviewerName={activePhoto.name}
          onClose={() => setActivePhoto(null)}
        />
      )}

      {/* Google Toast Notifications */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}

export default App;
