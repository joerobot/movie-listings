import React from "react";

const Ratings = ({ rating, setRating }) => (
  <div>
    <h4 className="text-lg">Rating</h4>
    <div className="flex">
      {[...Array(10)].map((e, i) => {
        const current = i + 1;
        const checked = rating === current ? "checked" : null;

        return (
          <div className="rating-wrapper" key={current}>
            <label className="rating flex items-center justify-center" htmlFor={`rating-${current}`}>
              <input
                className={ current < rating ? 'pseudo-checked' : null}
                name="rating"
                type="radio"
                id={`rating-${current}`}
                defaultChecked={checked}
                value={current}
                onChange={() => setRating(current)}
              />
              <svg className="icon" viewBox="0 0 32 40">
                <polygon
                  className="star"
                  points="30 14, 30 12, 21 11, 21 10, 17 3, 15 3, 11 10, 11 11, 2 12, 2 14, 8 20, 8 20, 7 29, 8 30, 16 26, 16 26, 24 30, 24 30, 25 29, 24 20, 24 20"
                  strokeWidth="2"
                />
              </svg>
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

export default Ratings;
