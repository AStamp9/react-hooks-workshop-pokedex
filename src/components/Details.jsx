import { useContext } from "react";
import { Link } from "react-router-dom";
import DetailsContext from "../context/DetailsContext";

export default function Details() {
  const { details } = useContext(DetailsContext);

  return (
    <div className="details-container">
      {/* Display details; for now, just show a placeholder */}
      <h1>{details.name ? details.name.toUpperCase() : "No Pokemon Selected"}</h1>
      {/* You can add flavor text, height, weight, stats, etc. here */}

      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}