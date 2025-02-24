import { useState } from "react";
import Pokemon from "./Pokemon";
import Pages from "./Pages";
import "../index.css";

export default function Home({ pokeList, goToNext, goToPrev }) {
  const [shinyMode, setShinyMode] = useState(false);

  return (
    <div className="home-container">
      <button onClick={() => setShinyMode((prev) => !prev)}>
        {shinyMode ? "Show Normal" : "Show Shiny"}
      </button>

      <div className="pokeList">
        {pokeList.map((pokemon) => (
          <Pokemon key={pokemon.name} pokeData={pokemon} shiny={shinyMode} />
        ))}
      </div>

      <Pages goToNext={goToNext} goToPrev={goToPrev} />
    </div>
  );
}