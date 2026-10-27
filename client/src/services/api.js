const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Submit the ten birthday answers to the backend API.
 * Returns { success, message, submittedAt } on success.
 * Throws an Error with a user-friendly message on failure.
 */
export async function submitAnswers(answers) {
  const response = await fetch(`${BASE_URL}/api/birthday/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Relay the server error message if available
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }

  if (!data.success) {
    throw new Error(data.message || 'Submission failed. Please try again.');
  }

  return data;
}

/**
 * Check backend health
 */
export async function checkHealth() {
  const response = await fetch(`${BASE_URL}/api/birthday/health`);
  return response.ok;
}
