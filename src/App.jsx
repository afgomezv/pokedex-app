//Componentes
import { Button } from "./components/Button";
import { Card } from "./components/Card";
//Icons
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
//Hooks
import { useState, useEffect } from "react";
//Styles
import "./sass/App.scss";

const App = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

  useEffect(() => {
    getEvolutions(pokemonId);
  }, [pokemonId]);

  const getEvolutions = async (id) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
    const data = await response.json();

    let pokemonEvoArray = [];

    let pokemonLv1 = data.chain.species.name;
    let pokemonLv1Img = await getPokemonImgs(pokemonLv1);
    pokemonEvoArray.push([pokemonLv1, pokemonLv1Img]);

    if (data.chain.evolves_to.length !== 0) {
      let pokemonLv2 = data.chain.evolves_to[0].species.name;
      let pokemonLv2Img = await getPokemonImgs(pokemonLv2);
      pokemonEvoArray.push([pokemonLv2, pokemonLv2Img]);

      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLv3Img = await getPokemonImgs(pokemonLv3);
        pokemonEvoArray.push([pokemonLv3, pokemonLv3Img]);
      }
    }
    setPokemonEvolutions(pokemonEvoArray);
  };

  const getPokemonImgs = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const data = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  };

  const preveClick = () => {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  };

  const nextClick = () => {
    setPokemonId(pokemonId + 1);
  };

  return (
    <div className="app">
      <div className={`card__container card${pokemonEvolutions.length}`}>
        {pokemonEvolutions.map((pokemon) => (
          <Card key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />
        ))}
      </div>
      <div className="buttons__container">
        <Button icon={<TiArrowLeftOutline />} handleClick={preveClick} />

        <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
    </div>
  );
};

export { App };
