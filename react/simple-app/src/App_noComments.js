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

  const selectBoundary = (boundary) => {
    setSelectedBoundary(boundary);
    updateBoundaryDetails(boundary);
  };

  const updateBoundaryDetails = async (boundary) => {
    setBoundaryDetails(await fetchBoundaryDetails(boundary));
  };

  const startSimulation = async () => {
    setResponse(await postSimulation(selectedBoundary, name));
    clearSelections();
  };

  const clearSelections = () => {
    setSelectedBoundary({});
    setBoundaryDetails("");
    setName("");
  };

  useEffect(() => {
    fetchBoundaries().then((boundaries) => setBoundaries(boundaries));
  }, []);

  return (
    <div className="App">
      <h1 className="heading">SIMple</h1>
      <h2 className="subheading">New simulation</h2>

      {boundaries.length > 0 && (
        <BoundariesList
          items={boundaries}
          selected={selectedBoundary}
          onSelectBoundary={selectBoundary}
        />
      )}

      {boundaryDetails && (
        <BoundaryDetails description={boundaryDetails.description} />
      )}

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={startSimulation} className="start-simulation-button">
        Start Simulation
      </button>

      {response && (
        <SuccessMessage response={response} />
      )}
    </div>
  );
}

export default App;
