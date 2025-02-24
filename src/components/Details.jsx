import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DetailsContext from "../context/DetailsContext";

export default function Details() {
  const { details } = useContext(DetailsContext);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  // We'll store an array of damage relations—one for each type the Pokémon has.
  const [damageRelations, setDamageRelations] = useState([]);

  // Fetch species info for flavor text
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

  // Fetch damage relations for every type
  useEffect(() => {
    if (details.types && details.types.length > 0) {
      const typeUrls = details.types.map((t) => t.type.url);
      Promise.all(
        typeUrls.map((url) =>
          fetch(url).then((res) => res.json())
        )
      )
        .then((results) => {
          // Map the results to just the damage_relations objects
          const drArray = results.map((result) => result.damage_relations);
          setDamageRelations(drArray);
        })
        .catch((error) =>
          console.error("Error fetching damage relations:", error)
        );
    }
  }, [details]);

  // Loading state if details haven't been set yet
  if (!details || Object.keys(details).length === 0) {
    return <div>Loading Pokémon details...</div>;
  }

  return (
    <div className="details-container">
      <h1>{details.name.toUpperCase()}</h1>

      {/* Pokémon Image */}
      {details.sprites &&
        details.sprites.other &&
        details.sprites.other.dream_world &&
        details.sprites.other.dream_world.front_default && (
          <img
            src={details.sprites.other.dream_world.front_default}
            alt={details.name}
            className="pokemon-image"
          />
      )}

      {/* Physical Stats Section */}

        <div className="physical-stats">
          <p>ID: {details.id}</p>
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
          <p>Type: {details.types.map((t) => t.type.name).join(", ")}</p>
        </div>
    
      {/* Flavor Text Section */}
      <div className="flavor-text">
        <p>
          <strong>Flavor Text: </strong>
          {speciesInfo ? (
            speciesInfo.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            )?.flavor_text
          ) : (
            "Loading flavor text..."
          )}
        </p>
      </div>

      {/* Moves Section */}
      <div className="moves">
        <h2>Moves</h2>
        <p>{details.moves.slice(0, 10).map((m) => m.move.name).join(", ")}</p>
      </div>


      {/* Damage Relations Section */}
      <div className="damage-relations">
        {damageRelations.length > 0 ? (
          damageRelations.map((dr, index) => (
            <div key={index} className="damage-relations-type">
              <h2>Damage Relations for {details.types[index].type.name}</h2>
              <p>
                <strong>Double Damage From:</strong>{" "}
                {dr.double_damage_from.map((d) => d.name).join(", ")}
              </p>
              <p>
                <strong>Double Damage To:</strong>{" "}
                {dr.double_damage_to.map((d) => d.name).join(", ")}
              </p>
              <p>
                <strong>Half Damage From:</strong>{" "}
                {dr.half_damage_from.map((d) => d.name).join(", ")}
              </p>
              <p>
                <strong>Half Damage To:</strong>{" "}
                {dr.half_damage_to.map((d) => d.name).join(", ")}
              </p>
            </div>
          ))
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