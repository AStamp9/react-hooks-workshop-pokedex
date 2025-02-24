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
        // Update with appropriate sprite sources; adjust as needed.
        setPokeSprite(data.sprites.other.home.front_default);
        setPokeSpriteShiny(data.sprites.other.home.front_shiny);
        setType(data.types[0].type.name);
      });
  }, [pokeData.url]);

  return (
    <div className={`pokeman ${type}`}>
      <h2 className="listName">{shiny ? `Shiny ${pokeData.name}` : pokeData.name}</h2>
      <Link to="/details">
        <img
          className="onlymon"
          alt={pokeData.name}
          src={shiny ? pokeSpriteShiny : pokeSprite}
          onClick={() => setDetails(details)}
        />
      </Link>
    </div>
  );
}