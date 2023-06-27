import React, { useEffect, useState } from "react";
import Pokeinfo from "./PokeInfo";

const PokemonThumb = ({ image, name, type, showDetails }) => {
  return (
    <div className={`${type} thumb-container`} onClick={showDetails}>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

const url = "https://pokeapi.co/api/v2/pokemon";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loadMore, setLoadMore] = useState(`${url}?limit=20`);
  const [currIndex, setCurrIndex] = useState(null);

  const getAllPokemons = async () => {
    const response = await (await fetch(loadMore)).json();
    setLoadMore(response.next);

    const pokemons = await Promise.all(
      response.results.map(async (pokemon) => {
        return await (await fetch(`${url}/${pokemon.name}`)).json();
      })
    );
    const sortedPokemons = [...allPokemons, ...pokemons];
    sortedPokemons.sort((a, b) => a.id - b.id);
    setAllPokemons(sortedPokemons);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-contaner">
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((p, index) => {
            return (
              <PokemonThumb
                key={index}
                image={p.sprites.other.dream_world.front_default}
                name={p.name}
                type={p.types[0].type.name}
                showDetails={() => {
                  setCurrIndex(index);
                  setVisible(true);
                }}
                hideDetails={() => setVisible(false)}
              />
            );
          })}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
      <Pokeinfo
        visible={visible}
        data={allPokemons[currIndex]}
        hideDetails={() => setVisible(false)}
      />
    </div>
  );
};

export default App;
