import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DetailsContext from "../context/DetailsContext";

export default function Pokemon({ pokeData, shiny }) {
  const [details, setLocalDetails] = useState({});
  const [pokeSprite, setPokeSprite] = useState("");
  const [pokeSpriteShiny, setPokeSpriteShiny] = useState("");
  const [type, setType] = useState("");
  const { setDetails } = useContext(DetailsContext);

  useEffect(() => {
    fetch(pokeData.url)
      .then((res) => res.json())
      .then((data) => {
        setLocalDetails(data);
        setPokeSprite(data.sprites.other['official-artwork'].front_default);
        setPokeSpriteShiny(data.sprites.other['official-artwork'].front_shiny);
        setType(data.types[0].type.name);
      });
  }, [pokeData.url]);

  return (
    <div className={`pokeman ${type}`}>
      <h2 className="listName">{shiny ? `Shiny ${pokeData.name}` : pokeData.name}</h2>
      <Link to="/details">
        <img
          className="pokemon-img"
          alt={pokeData.name}
          src={shiny ? pokeSpriteShiny : pokeSprite}
          onClick={() => setDetails(details)}
        />
      </Link>
    </div>
  );
}