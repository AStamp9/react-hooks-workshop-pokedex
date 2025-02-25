import { useState } from "react";
import Pokemon from "./Pokemon";
import "../index.css";

export default function Home({ pokeList}) {
  const [shinyMode, setShinyMode] = useState(false);

  return (
    <div className="home-container">
      <button 
        className="shiny-button"
        onClick={() => setShinyMode((prev) => !prev)}>
        {shinyMode ? "Show Normal" : "Show Shiny"}
      </button>

      <div className="pokeList">
        {pokeList.map((pokemon) => (
          <Pokemon key={pokemon.name} pokeData={pokemon} shiny={shinyMode} />
        ))}
      </div>
    </div>
  );
}