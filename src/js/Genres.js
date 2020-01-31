import React from "react";

const Genres = ({ allGenres, genres, selectedGenres, setSelectedGenres }) => (
  <div>
    <h4 className="text-lg">Genre</h4>
    <div className="flex flex-col flex-wrap -mx-2 -my-1 md:flex-row">
      {allGenres.map(genre => {
        const { id, name } = genre;
        const checked = selectedGenres.includes(id);
        const disabled = !genres.includes(genre);

        return (
          <div className="mx-2 my-1" key={id}>
            <label className="flex items-center" htmlFor={`genre-${id}`}>
              <input
                className="inline-block -mt-1"
                name="genre"
                type="checkbox"
                id={`genre-${id}`}
                defaultChecked={checked}
                value={id}
                disabled={disabled}
                onChange={e => {
                  if (e.target.checked) {
                    return setSelectedGenres([...selectedGenres, id]);
                  }

                  return setSelectedGenres(
                    selectedGenres.filter(genreId => genreId !== id)
                  );
                }}
              />
              <span className="inline-block ml-1">{name}</span>
            </label>
          </div>
        );
      })}
    </div>
  </div>
);

export default Genres;
