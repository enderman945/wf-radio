import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000'; //TODO use config manager instead


export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error('Failed to fetch items:', error);
    throw error;
  }
}

export async function register(user_data) {
  try {
    console.debug(user_data);
    console.debug(JSON.stringify(user_data));
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error('Failed to fetch items:', error);
    throw error;
  }
}