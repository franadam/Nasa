const API_URL = 'http://localhost:5000/api/v1';

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const request = await fetch(`${API_URL}/planets`);
  return await request.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
