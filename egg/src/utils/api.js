// Central API layer for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL;

/* Health check */
export const healthCheck = async () => {
  const res = await fetch(`${API_BASE_URL}/api/health`);
  return res.json();
};

/* Timer APIs */
export const startTimer = async (level) => {
  const res = await fetch(`${API_BASE_URL}/api/timer/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level }),
  });
  return res.json();
};

/* Recipes */
export const fetchRecipes = async () => {
  const res = await fetch(`${API_BASE_URL}/api/recipes`);
  return res.json();
};

/* Stats */
export const fetchStats = async () => {
  const res = await fetch(`${API_BASE_URL}/api/stats`);
  return res.json();
};
