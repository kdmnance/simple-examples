const fetchBoundaries = async () => {
  const response = await fetch("http://localhost:3002/boundaries");
  const data = await response.json();
  return data.boundaries;
};

const fetchBoundaryDetails = async (boundary) => {
  const response = await fetch("http://localhost:3002/boundaries/" + boundary.id);
  return await response.json();
};

const postSimulation = async (boundary, name) => {
  const response = await fetch("http://localhost:3002/simulations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      boundaryId: boundary.id,
      simulationName: name,
    }),
  });
  return await response.json();
};

export { fetchBoundaries, fetchBoundaryDetails, postSimulation };
