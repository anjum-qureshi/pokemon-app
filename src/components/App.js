import React, { useEffect, useState } from 'react';

const PokemonThumb = ({ image, name, type, showDetails }) => {
  return (
    <div className={`${type} thumb-container`} onClick={showDetails} data-testid="pokemon-tile">
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

const url = 'https://pokeapi.co/api/v2/pokemon';

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loadMore, setLoadMore] = useState(`${url}?limit=2`);
  const [currIndex, setCurrIndex] = useState(null);

  const getAllPokemons = async () => {
    const resData = await fetch(loadMore);
    const response = await resData.json();
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

  const currentPokemon = allPokemons[currIndex];

  return (
    <div className="app-contaner">
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((p, index) => {
            return (
              <div
                key={`pokemon-${index}`}
                className={`${p.types[0].type.name} thumb-container`}
                onClick={() => {
                  setCurrIndex(index);
                  setVisible(true);
                }}
                data-testid="pokemon-tile"
              >
                <img src={p.sprites.other.dream_world.front_default} alt={p.name} />
                <div className="detail-wrapper">
                  <h3>{p.name}</h3>
                </div>
              </div>
              // <PokemonThumb
              //   key={index}
              //   image={p.sprites.other.dream_world.front_default}
              //   name={p.name}
              //   type={p.types[0].type.name}
              // showDetails={() => {
              //   setCurrIndex(index);
              //   setVisible(true);
              // }}
              //   hideDetails={() => setVisible(false)}
              // />
            );
          })}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load More
        </button>
      </div>
      {visible && (
        <div className={`popup ${visible ? 'show' : 'hide'}`}>
          <h2>{currentPokemon.name}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${currentPokemon.id}.svg`}
            alt=""
          />
          <div className="abilities">
            {currentPokemon.abilities.map((poke, idx) => (
              <div className="group" key={`group-poke-${idx}`}>
                <h2>{poke.ability.name}</h2>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {currentPokemon.stats.map((poke) => {
              return (
                <h3>
                  {poke.stat.name}:{poke.base_stat}
                </h3>
              );
            })}
          </div>
          <button className="load-more" onClick={() => setVisible(false)}>
            close
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
