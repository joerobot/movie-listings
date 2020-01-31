import React from "react";

const Listings = ({ listings, allListings }) =>
  listings.length === 0 ? (
    <h1>No results found for your selection</h1>
  ) : (
    <div>
      <h4 className="mb-4 text-right">Showing {listings.length} of {allListings.length} movies</h4>
      <ul className="listing-grid">
        {listings.map(movie => (
          <li key={movie.id} className="flex flex-col justify-between">
            <img
              className="block max-w-full mx-auto md:ml-0"
              alt={`Poster for ${movie.title}`}
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            />
            <h5 className="text-center md:text-left">{movie.title}</h5>
          </li>
        ))}
      </ul>
    </div>
  );

export default Listings;
