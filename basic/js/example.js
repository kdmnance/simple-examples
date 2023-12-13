let boundaries = [];
let selectedBoundary = null;
let boundaryDetails = null;

function getBoundaries() {
  // get the boundaries from localhost:3002/boundaries
  fetch("http://localhost:3002/boundaries")
    .then(function (response) {
      // convert the response to JSON
      return response.json();
    })
    .then(function (data) {
      // render the data to the page
      boundaries = data.boundaries;
      renderBoundaries();
    });
}

function renderBoundaries() {
  // get the boundaries list element
  const boundariesList = document.querySelector(".boundaries");

  // loop through the boundaries
  boundaries.forEach(function (boundary) {
    // create an li element for each boundary
    const li = document.createElement("li");
    li.className = "boundary";

    // set the text of the li to the boundary name
    li.textContent = boundary.name;

    // add a click listener to the li to select the boundary
    li.addEventListener("click", function () {
      selectBoundary(li);
    });

    // append the li to the boundaries list
    boundariesList.appendChild(li);
  });
}

function selectBoundary(element) {
  // remove "selected" class from all list items
  const listItems = document.querySelectorAll(".boundaries li");
  listItems.forEach(function (li) {
    li.classList.remove("selected");
  });

  // add "selected" class to the clicked list item
  element.classList.add("selected");

  // set the selectedBoundary variable to the clicked boundary
  const selectedBoundaryName = element.textContent;
  selectedBoundary = boundaries.find(function (boundary) {
    return boundary.name === selectedBoundaryName;
  });

  // update the boundary details
  updateBoundaryDetails();
}

async function getBoundaryDetails() {
  // get the boundary details from localhost:3002/boundaries/:id
  const response = await fetch("http://localhost:3002/boundaries/" + selectedBoundary.id);
  return await response.json();
}

async function updateBoundaryDetails() {
  // show the boundary details on the page
  boundaryDetails = await getBoundaryDetails();
  renderBoundaryDetails(boundaryDetails);
}

function renderBoundaryDetails() {
  // get the boundary description element
  const boundaryDescription = document.querySelector(".boundary-description");

  // set the text of the element to the selected boundary description
  boundaryDescription.textContent = boundaryDetails.description;
}

function startSimulation() {
  const name = document.getElementById("name").value;

  // post the simulation to localhost:3002/simulations
  fetch("http://localhost:3002/simulations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      boundaryId: selectedBoundary.id,
      simulationName: name,
    }),
  })
    .then(function (response) {
      // convert the response to JSON
      return response.json();
    })
    .then(function (data) {
      // render the data to the page
      renderSuccessMessage(data);
    });
}

function renderSuccessMessage(response) {
  // get the success message element
  const successMessage = document.querySelector(".success-message");

  // set the text of the element to the response message
  successMessage.textContent = "Success! Simulation ID: " + response.simulationId;

  // clear the selections
  clearSelections();
}

function clearSelections() {
  // clear the selected boundary
  selectedBoundary = null;

  // clear the boundary details
  boundaryDetails = null;

  // clear the name
  document.getElementById("name").value = "";

  // clear the selected boundary
  const listItems = document.querySelectorAll(".boundaries li");
  listItems.forEach(function (li) {
    li.classList.remove("selected");
  });

  // clear the boundary description
  const boundaryDescription = document.querySelector(".boundary-description");
  boundaryDescription.textContent = "";
}
