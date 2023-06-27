import React from "react";

const Pokeinfo = ({ data, visible, hideDetails }) => {
  if (!data) {
    return "";
  }
  return (
    <div className={`popup ${visible ? "show" : "hide"}`}>
      <h2>{data.name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
        alt=""
      />
      <div className="abilities">
        {data.abilities.map((poke, idx) => (
          <div className="group" key={`group-poke-${idx}`}>
            <h2>{poke.ability.name}</h2>
          </div>
        ))}
      </div>
      <div className="base-stat">
        {data.stats.map((poke) => {
          return (
            <>
              <h3>
                {poke.stat.name}:{poke.base_stat}
              </h3>
            </>
          );
        })}
      </div>
      <button className="load-more" onClick={hideDetails}>
        close
      </button>
    </div>
  );
};
export default Pokeinfo;
