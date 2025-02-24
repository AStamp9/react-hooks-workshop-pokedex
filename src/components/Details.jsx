import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DetailsContext from "../context/DetailsContext";

export default function Details() {
  const { details } = useContext(DetailsContext);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [damageRelations, setDamageRelations] = useState(null);

  useEffect(() => {
    if (details.species && details.species.url) {
      fetch(details.species.url)
        .then((res) => res.json())
        .then((data) => setSpeciesInfo(data))
        .catch((error) =>
          console.error("Error fetching species info:", error)
        );
    }
  }, [details]);

  useEffect(() => {
    if (details.types && details.types.length > 0) {
      const typeUrl = details.types[0].type.url;
      fetch(typeUrl)
        .then((res) => res.json())
        .then((data) => setDamageRelations(data.damage_relations))
        .catch((error) =>
          console.error("Error fetching damage relations:", error)
        );
    }
  }, [details]);

  if (!details || Object.keys(details).length === 0) {
    return <div>Loading Pokémon details...</div>;
  }

  return (
    <div className="details-container">
      <h1>{details.name.toUpperCase()}</h1>

      {details.sprites && details.sprites.other && details.sprites.other.dream_world &&
        details.sprites.other.dream_world.front_default && (
          <img
            src={details.sprites.other.dream_world.front_default}
            alt={details.name}
            className="pokemon-image"
          />
      )}

      <div className="physical-stats">
        <p>ID: {details.id}</p>
        <p>Height: {details.height}</p>
        <p>Weight: {details.weight}</p>
        <p>Type: {details.types.map((t) => t.type.name).join(", ")}</p>
      </div>

      <div className="moves">
        <h2>Moves</h2>
        <p>
          {details.moves.slice(0, 5).map((m) => m.move.name).join(", ")}
        </p>
      </div>

      <div className="flavor-text">
        <h2>Flavor Text</h2>
        {speciesInfo ? (
          <p>
            {
              speciesInfo.flavor_text_entries.find(
                (entry) => entry.language.name === "en"
              )?.flavor_text
            }
          </p>
        ) : (
          <p>Loading flavor text...</p>
        )}
      </div>

      <div className="damage-relations">
        <h2>Damage Relations for {details.types[0].type.name} type</h2>
        {damageRelations ? (
          <>
            <p>
              Double Damage From:{" "}
              {damageRelations.double_damage_from
                .map((type) => type.name)
                .join(", ")}
            </p>
            <p>
              Double Damage To:{" "}
              {damageRelations.double_damage_to
                .map((type) => type.name)
                .join(", ")}
            </p>
          </>
        ) : (
          <p>Loading damage relations...</p>
        )}
      </div>

      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}