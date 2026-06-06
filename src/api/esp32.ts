import { CONFIG } from "../constants/config";

const API_URL = CONFIG.ESP32_URL;

/*
=========================================
TYPES
=========================================
*/

export type MachineDirection = "forward" | "reverse" | "stop";
export type FeederSide = "left" | "right" | "both" | null;
export type Layer = "first" | "second";

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

// export async function getStatus(): Promise<DeviceStatus> {
//   try {
//     const response = await fetch(`${API_URL}/status`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch device status");
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error fetching status:", error);
//     throw error;
//   }
// }

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

export async function setFeederPower(layer: Layer, active: boolean) {
  const response = await fetch(`${API_URL}/feeder/power`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ layer, active }),
  });

  if (!response.ok) throw new Error("Feeder power failed");
  return response.json();
}

export async function setFeederSide(layer: Layer, side: FeederSide) {
  const response = await fetch(`${API_URL}/feeder/side`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ layer, side }),
  });

  if (!response.ok) throw new Error("Feeder side failed");
  return response.json();
}

/**
 * Feed rate slider
 */
export async function setFeedRate(layer: Layer, rate: number) {
  const response = await fetch(`${API_URL}/feeder/rate`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ layer, rate }),
  });

  if (!response.ok) throw new Error("Feed rate failed");
  return response.json();
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
// export async function setLayerState(firstLayer: boolean, secondLayer: boolean) {
//   const response = await fetch(`${API_URL}/feeder/layers`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       firstLayer,
//       secondLayer,
//     }),
//   });

//   if (!response.ok) throw new Error("Layer update failed");
//   return response.json();
// }
