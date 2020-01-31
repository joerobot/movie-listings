import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { API_KEY, API_BASE_URL } from './api';
import Ratings from "./Ratings";
import Genres from "./Genres";
import Listings from "./Listings";


const nowPlayingUrl = `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&region=GB&page=1`;
const genreUrl = `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;

const App = () => {
  const [allListings, setAllListings] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);

  const fetchData = url =>
    fetch(url)
      .then(res => res.json())
      .catch(() => {
        setLoading(false);
        setError(`Couldn't fetch necessary data`);
      });

  const getRelevantGenres = ({ results, availableGenres }) => {
    const ids = results.reduce(
      (ids, movie) => [...ids, ...movie.genre_ids],
      [],
    );

    return [...new Set(ids)].map(genreId =>
      availableGenres.find(genre => genre.id === genreId),
    );
  };

  useEffect(() => {
    Promise.all([nowPlayingUrl, genreUrl].map(fetchData)).then(
      ([{ results }, { genres: allApiGenres }]) => {
        setLoading(false);

        const listingsByPopularity = results.sort((a, b) => {
          if (a.popularity > b.popularity) return -1;
          if (a.popularity < b.popularity) return 1;
          return 0;
        });

        const allRelevantGenres = getRelevantGenres({ results, availableGenres: allApiGenres })

        setAllListings(listingsByPopularity);
        setAllGenres(allRelevantGenres);

        setListings(listingsByPopularity);
        setGenres(allRelevantGenres);
      },
    );
  }, []);

  useEffect(() => {
    const filtered = allListings
      .filter(movie => movie.vote_average >= rating)
      .filter(movie => {
        if (selectedGenres.length === 0) {
          return true;
        }

        return selectedGenres.every(genre => movie.genre_ids.includes(genre));
      })
    setListings(filtered)
    setGenres(getRelevantGenres({ results: filtered, availableGenres: allGenres }))
  }, [rating, selectedGenres])

  return (
    <div>
      <header className="flex items-center justify-center wrapper">
        <h1 className="text-2xl lg:text-3xl leading-none py-4">Movie Listings</h1>
      </header>
      <main className="static">
        {(loading) ? (
          <div className="absolute inset-0 flex items-center justify-center h-screen">
            <span className="loader "></span>
          </div>
        ) : (
          <div className="wrapper">
            <h3 className="text-xl">Filter by</h3>
            <div className="bg-navy text-warm p-4">
              <form onSubmit={e => e.preventDefault()}>
                <Ratings rating={rating} setRating={setRating} />
                <Genres
                  allGenres={allGenres}
                  genres={genres}
                  selectedGenres={selectedGenres}
                  setSelectedGenres={setSelectedGenres}
                />
              </form>
            </div>
            <div className="mt-8">
              <Listings
                allListings={allListings}
                listings={listings}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
