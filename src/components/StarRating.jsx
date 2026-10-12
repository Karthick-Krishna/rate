import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RATING_LABELS = {
  1: 'Hated it',
  2: 'Disliked it',
  3: 'It was OK',
  4: 'Liked it',
  5: 'Loved it'
};

const StarRating = ({
  rating,
  setRating,
  interactive = true,
  size = 24,
  showLabel = false
}) => {
  const [hover, setHover] = useState(0);

  const activeValue = hover || rating;

  return (
    <div className="google-star-rating-wrap">
      <div className="google-star-row" role="radiogroup" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isFilled = activeValue >= starValue;

          return (
            <button
              key={starValue}
              type="button"
              className={`google-star-btn ${interactive ? 'interactive' : 'static'} ${isFilled ? 'filled' : 'empty'}`}
              onClick={() => interactive && setRating && setRating(starValue)}
              onMouseEnter={() => interactive && setHover(starValue)}
              onMouseLeave={() => interactive && setHover(0)}
              aria-label={`${starValue} Star${starValue > 1 ? 's' : ''}: ${RATING_LABELS[starValue]}`}
              disabled={!interactive}
            >
              <Star
                size={size}
                fill={isFilled ? '#fbbc04' : '#ffffff'}
                color={isFilled ? '#e37400' : '#dadce0'}
                strokeWidth={isFilled ? 1.5 : 1.75}
              />
            </button>
          );
        })}
      </div>
      {showLabel && activeValue > 0 && (
        <span className="google-star-rating-label">
          {RATING_LABELS[activeValue]}
        </span>
      )}
    </div>
  );
};

export default StarRating;
