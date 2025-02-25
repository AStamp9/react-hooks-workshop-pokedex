import { useState, useEffect } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './index.css'

import Home from "./components/Home"
import Details from "./components/Details"

import DetailsContext from './context/DetailsContext'

function App() {
  const [curr, setCurr] = useState("https://pokeapi.co/api/v2/pokemon?limit=151");
  const [pokeList, setPokeList] = useState([]);
  const [details, setDetails] = useState({});  

  useEffect(() => {
    fetch(curr)
      .then((res) => res.json())
      .then((data) => {

        const filteredResults = data.results.filter((pokemon) => {
          const parts = pokemon.url.split('/').filter(Boolean);
          const id = parseInt(parts[parts.length - 1], 10);
          return id <= 151;
        });

        setPokeList(filteredResults);
      });
  }, [curr]);

  return (
    <>
      <DetailsContext.Provider value={{details, setDetails}}>
        <div className="homepage">

          <nav className="navBar">
            <Link to="/">
              <button 
              className="home-button"
              onClick={() => setCurr("https://pokeapi.co/api/v2/pokemon?limit=151")}> 
                <h2>HOME</h2>
              </button>
            </Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  pokeList={pokeList}
                />
              }
            />
            <Route path="/details" element={<Details />} />
        </Routes>
        </div>
      </DetailsContext.Provider>
    </>
  )
  
}

export default App
