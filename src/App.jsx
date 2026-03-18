import React, { useState, useEffect, useMemo } from 'react';
import RatingForm from './components/RatingForm';
import RatingCard from './components/RatingCard';
import ReviewSummary from './components/ReviewSummary';
import { MessageSquare, SlidersHorizontal, Star, ChevronDown } from 'lucide-react';
import staticReviews from './data.json';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, increment, serverTimestamp } from 'firebase/firestore';

function App() {
  const [firebaseReviews, setFirebaseReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterStar, setFilterStar] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const allReviews = useMemo(() => {
    return [...firebaseReviews, ...staticReviews];
  }, [firebaseReviews]);

  useEffect(() => {
    const q = query(collection(db, "user_reviews"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviews = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        // serverTimestamp() may be null on local-pending writes — include them anyway
        reviews.push({ ...data, id: docSnap.id });
      });
      setFirebaseReviews(reviews);
    }, (error) => {
      console.error("Firestore listener error: ", error);
    });
    return () => unsubscribe();
  }, []);

  const handleAddReview = async (newReview) => {
    try {
      await addDoc(collection(db, "user_reviews"), {
        ...newReview,
        timestamp: serverTimestamp(),
        timestampStr: new Date().toISOString(),
        helpful: 0,
      });
      setShowForm(false);
      setFilterStar(null);
      setSortBy('newest');
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

  const processedReviews = useMemo(() => {
    let result = [...allReviews];

    if (filterStar) {
      result = result.filter(r => r.rating === filterStar);
    }

    if (sortBy === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      result.sort((a, b) => a.rating - b.rating);
    } else {
      result.sort((a, b) => {
        const getTime = (r) => {
          if (r.timestamp?.toDate) return r.timestamp.toDate().getTime();
          if (r.timestampStr) return new Date(r.timestampStr).getTime();
          if (r.timestamp) return new Date(r.timestamp).getTime();
          return typeof r.id === 'number' ? r.id : 0;
        };
        return getTime(b) - getTime(a);
      });
    }

    return result;
  }, [allReviews, sortBy, filterStar]);

  const displayedReviews = processedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < processedReviews.length;
  const remaining = processedReviews.length - visibleCount;

  return (
    <div className="app-wrapper">
      <div className="container">
        {/* Page header */}
        <div className="page-header">
          <h1>Customer Reviews</h1>
          <p className="subtitle">Expert feedback on Coralgenz IT services, Coralgenz QR & Coralgenz Vault.</p>
        </div>

        {/* Summary — full width on top */}
        <ReviewSummary
          reviews={allReviews}
          filterStar={filterStar}
          setFilterStar={(star) => { setFilterStar(star); setVisibleCount(10); }}
        />

        {/* Toolbar */}
        <div className="reviews-toolbar">
          <h2>
            <MessageSquare size={18} />
            Reviews
            <span className="count-badge">{processedReviews.length.toLocaleString()}</span>
            {filterStar && (
              <span className="filter-label">
                — {filterStar} <Star size={11} fill="var(--star-gold)" color="var(--star-gold)" style={{ marginBottom: '-1px' }} /> only
              </span>
            )}
          </h2>
          <div className="toolbar-actions">
            <div className="sort-wrapper">
              <SlidersHorizontal size={13} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>
            </div>
            {!showForm && (
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Rate Us
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <RatingForm
            onSubmit={handleAddReview}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Reviews list */}
        <div className="reviews-list">
          {displayedReviews.map(review => (
            <RatingCard
              key={review.id}
              review={review}
              onHelpfulClick={(inc) => handleHelpfulClick(review.id, typeof review.id === 'string', inc)}
            />
          ))}

          {processedReviews.length === 0 && (
            <div className="empty-state">
              <p>No reviews match your filter.</p>
              <button className="btn btn-outline" onClick={() => setFilterStar(null)}>
                Clear Filters
              </button>
            </div>
          )}

          {hasMore && (
            <div className="load-more-section">
              <button
                className="btn btn-outline"
                onClick={() => setVisibleCount(prev => prev + 20)}
              >
                <ChevronDown size={16} />
                Load More ({remaining > 20 ? 20 : remaining} of {remaining.toLocaleString()} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
