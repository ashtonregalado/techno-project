import { CONFIG } from "../constants/config";

const API_URL = CONFIG.ESP32_URL;

export async function startFeed() {
  try {
    const response = await fetch(`${API_URL}/feed`, {
      method: "POST",
    });
    console.log("Start feed response:", response);
    return response.text();
  } catch (error) {
    console.error("Error starting feed:", error);
    throw error;
  }
}

export async function stopFeed() {
  try {
    const response = await fetch(`${API_URL}/feed`, {
      method: "DELETE",
    });
    return response.text();
  } catch (error) {
    console.error("Error stopping feed:", error);
    throw error;
  }
}

export async function updateFeedRate(amount: number) {
  try {
    const response = await fetch(`${API_URL}/feed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    return response.text();
  } catch (error) {
    console.error("Error adjusting feed:", error);
    throw error;
  }
}

export async function getStatus() {
  const response = await fetch(`${API_URL}/status`);

  return response.json();
}

export async function setSchedule(hour: string) {
  const response = await fetch(`${API_URL}/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hour,
    }),
  });

  return response.json();
}

export async function startMachine() {
  try {
    const response = await fetch(`${API_URL}/machine`, {
      method: "POST",
    });
    console.log("Start machine response:", response);
    return response.text();
  } catch (error) {
    console.error("Error starting machine:", error);
    throw error;
  }
}

export async function stopMachine() {
  try {
    const response = await fetch(`${API_URL}/machine`, {
      method: "DELETE",
    });
    return response.text();
  } catch (error) {
    console.error("Error stopping machine:", error);
    throw error;
  }
}
