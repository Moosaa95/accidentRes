const BACKEND_URL = "https://identitytoolkit.googleapis.com/v1/accounts";
const API_KEY = "AIzaSyBYRI8CeiHX9QivXoE6hKa3H80T0T_gzO4";

/**
 * Authenticate users by creating or logging in the user
 * @param {string} mode - Either 'signUp' or 'signInWithPassword' depending on the operation
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} The response data from Firebase
 */
async function authenticate(mode, email, password) {
  const url = `${BACKEND_URL}:${mode}?key=${API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const data = await response.json();
    console.log(data, "data", response);
    const token = data?.idToken;

    if (!response.ok) {
      // Throw an error with the error message from the server response
      throw new Error(data.error.message || "Authentication failed.");
    }

    console.log(
      `${mode === "signUp" ? "User created" : "User logged in"} successfully:`,
      data
    );
    return token;
  } catch (error) {
    console.error("Authentication error:", error.message);
    throw error; // Propagate the error to be handled by the caller
  }
}

/**
 * Create a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>}
 */
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

/**
 * Login a user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>}
 */
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
