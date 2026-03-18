import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating, interactive = true, size = 24 }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isActive = interactive ? (hover || rating) >= starValue : rating >= starValue;

        return (
          <button
            key={index}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              padding: '2px',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'transform 0.15s ease, filter 0.15s ease',
              transform: interactive && hover === starValue ? 'scale(1.25)' : 'scale(1)',
              filter: interactive && hover === starValue ? 'drop-shadow(0 2px 4px rgba(245,158,11,0.4))' : 'none',
              lineHeight: 0,
            }}
            onClick={() => interactive && setRating(starValue)}
            onMouseEnter={() => interactive && setHover(starValue)}
            onMouseLeave={() => interactive && setHover(0)}
            aria-label={`Rate ${starValue} stars`}
            disabled={!interactive}
          >
            <Star
              size={size}
              fill={isActive ? 'var(--star-gold)' : 'transparent'}
              color={isActive ? 'var(--star-gold)' : 'var(--star-empty)'}
              strokeWidth={isActive ? 2 : 1.5}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
