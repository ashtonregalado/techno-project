import { CONFIG } from "../constants/config";

const API_URL = CONFIG.ESP32_URL;

/*
=========================================
TYPES
=========================================
*/

export type MachineDirection = "forward" | "reverse" | "stop";

export interface MachineStatus {
  active: boolean;
  direction: MachineDirection;
  speed: number;
}

export interface FeederStatus {
  left: boolean;
  right: boolean;
  feedRate: number;
  firstLayer: boolean;
  secondLayer: boolean;
}

export interface DeviceStatus {
  machine: MachineStatus;
  feeder: FeederStatus;
}

/*
=========================================
STATUS
=========================================
*/

export async function getStatus(): Promise<DeviceStatus> {
  try {
    const response = await fetch(`${API_URL}/status`);

    if (!response.ok) {
      throw new Error("Failed to fetch device status");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching status:", error);
    throw error;
  }
}

/*
=========================================
MACHINE CONTROLS
=========================================
*/

/**
 * Forward / Reverse / Stop
 *
 * Used for:
 * - Forward button
 * - Reverse button
 *
 * Toggle behavior handled in UI
 */

export async function setMachinePower(active: boolean) {
  const response = await fetch(`${API_URL}/machine/power`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      active,
    }),
  });

  return response.json();
}

export async function setMachineDirection(direction: MachineDirection) {
  try {
    const response = await fetch(`${API_URL}/machine/movement`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direction,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update movement");
    }

    return response.json();
  } catch (error) {
    console.error("Machine movement error:", error);
    throw error;
  }
}

/**
 * Speed slider
 */
export async function setMachineSpeed(speed: number) {
  try {
    const response = await fetch(`${API_URL}/machine/speed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        speed,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update speed");
    }

    return response.json();
  } catch (error) {
    console.error("Machine speed error:", error);
    throw error;
  }
}

/*
=========================================
FEEDER CONTROLS
=========================================
*/

/**
 * Toggle feeder buttons
 *
 * Left button:
 * left=true
 *
 * Right button:
 * right=true
 */

export async function setFeederPower(active: boolean) {
  const response = await fetch(`${API_URL}/feeder/power`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      active,
    }),
  });

  return response.json();
}

export async function setFeederSides(
  left: boolean,
  right: boolean,
  both: boolean,
) {
  const response = await fetch(`${API_URL}/feeder/sides`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      left,
      right,
      both,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to set feeder sides");
  }

  return response.json();
}

/**
 * Feed rate slider
 */
export async function setFeedRate(rate: number) {
  try {
    const response = await fetch(`${API_URL}/feeder/rate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rate,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update feed rate");
    }

    return response.json();
  } catch (error) {
    console.error("Feed rate error:", error);
    throw error;
  }
}

/*
=========================================
LAYER TOGGLES
=========================================
*/

/**
 * Toggle switches
 *
 * First layer ON/OFF
 * Second layer ON/OFF
 */
export async function setLayerState(firstLayer: boolean, secondLayer: boolean) {
  try {
    const response = await fetch(`${API_URL}/feeder/layers`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstLayer,
        secondLayer,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update layers");
    }

    return response.json();
  } catch (error) {
    console.error("Layer update error:", error);
    throw error;
  }
}
