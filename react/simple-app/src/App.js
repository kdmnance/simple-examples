import { useEffect, useState } from "react";
import { fetchBoundaries, fetchBoundaryDetails, postSimulation } from "./api";
import BoundariesList from "./components/boundariesList";
import BoundaryDetails from "./components/boundaryDetails";
import SuccessMessage from "./components/successMessage";
import "./App.css";

function App() {
  const [boundaries, setBoundaries] = useState([]);
  const [selectedBoundary, setSelectedBoundary] = useState({});
  const [boundaryDetails, setBoundaryDetails] = useState("");

  const [name, setName] = useState("");
  const [response, setResponse] = useState(null);

  // This does the same as selectBoundary in basic/js/example.js
  const selectBoundary = (boundary) => {
    // Set the selectedBoundary state to the clicked boundary
    // The updated state will cause the BoundariesList component to rerender
    setSelectedBoundary(boundary);

    // Update the boundary details
    updateBoundaryDetails(boundary);
  };

  // This does the same as updateBoundaryDetails in basic/js/example.js
  const updateBoundaryDetails = async (boundary) => {
    // Set the boundaryDetails state to the boundary details
    // The updated state will cause the BoundaryDetails component to rerender
    setBoundaryDetails(await fetchBoundaryDetails(boundary));
  };

  // This does the same as startSimulation in basic/js/example.js
  const startSimulation = async () => {
    // Set the response state to the response from the server
    // The updated state will cause the SuccessMessage component to rerender
    setResponse(await postSimulation(selectedBoundary, name));
    clearSelections();
  };

  // This does the same as clearSelections in basic/js/example.js
  const clearSelections = () => {
    // Because these are state variables, the updated state will cause the components to rerender
    setSelectedBoundary({});
    setBoundaryDetails("");
    setName("");
  };

  // This does the same as <body onload="getBoundaries()"> in basic/html_plus_backend.html
  useEffect(() => {
    fetchBoundaries().then((boundaries) => setBoundaries(boundaries));
  }, []);

  return (
    <div className="App">
      <h1 className="heading">SIMple</h1>
      <h2 className="subheading">New simulation</h2>

      {/* This is the same as renderBoundaries in basic/html_plus_backend.html */}
      {boundaries.length > 0 && (
        <BoundariesList
          items={boundaries}
          selected={selectedBoundary}
          onSelectBoundary={selectBoundary}
        />
      )}

      {/* This is the same as renderBoundaryDetails in basic/html_plus_backend.html */}
      {boundaryDetails && <BoundaryDetails description={boundaryDetails.description} />}

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={startSimulation} className="start-simulation-button">
        Start Simulation
      </button>

      {response && <SuccessMessage response={response} />}
    </div>
  );
}

export default App;
