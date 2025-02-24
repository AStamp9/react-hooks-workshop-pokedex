import { useState, useEffect } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'

import Home from "./components/Home"
import Details from "./components/Details"

import DetailsContext from './context/DetailsContext'

function App() {
  const [curr, setCurr] = useState("https://pokeapi.co/api/v2/pokemon?limit=25");
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [pokeList, setPokeList] = useState([]);
  const [details, setDetails] = useState({});  

  const goToNext = () => setCurr(nextPage);
  const goToPrev = () => setCurr(prevPage);

  useEffect(() => {
    fetch(curr)
      .then((res) => res.json())
      .then((data) => {
        setNextPage(data.next);
        setPrevPage(data.previous);
        setPokeList(data.results);
      });
  }, [curr]);

  return (
    <>
      <DetailsContext.Provider value={{details, setDetails}}>
        <div className="homepage">

          <nav className="navBar">
            <Link to="/">
              <button onClick={() => setCurr("https://pokeapi.co/api/v2/pokemon?limit=25")}> 
                <h2> HOME </h2>
              </button>
            </Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  pokeList={pokeList}
                  goToNext={nextPage ? goToNext : null}
                  goToPrev={prevPage ? goToPrev : null}
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
