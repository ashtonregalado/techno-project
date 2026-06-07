import { CONFIG } from "../constants/config";

const API_URL = CONFIG.ESP32_URL;

/*
=========================================
TYPES
=========================================
*/

export type MachineDirection = "forward" | "reverse" | "stop";
export type FeederSide = "both" | null;
export type Layer = "first" | "second";

export interface MachineStatus {
  active: boolean;
  direction: MachineDirection;
  speed: number;
}

export interface FeederStatus {
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
  try {
    const response = await fetch(`${API_URL}/machine/power`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });

    if (!response.ok) throw new Error("Failed to update machine power");

    return response.json();
  } catch (error) {
    console.error("Machine power error:", error);
    throw error;
  }
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

/*
=========================================
FEEDER CONTROLS
=========================================
*/

/**
 * Toggles the feeder on/off for a given layer.
 * active=true  → feeder powered on
 * active=false → feeder powered off, side reset to null
 */

export async function setFeederPower(active: boolean) {
  const response = await fetch(`${API_URL}/feeder/power`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active }),
  });

  if (!response.ok) throw new Error("Feeder power failed");
  return response.json();
}

/**
 * Sets the active feeder side for a given layer.
 * side="both" → start feeding
 * side=null   → stop feeding
 */
export async function setFeederSide(side: FeederSide) {
  const response = await fetch(`${API_URL}/feeder/side`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ side }),
  });

  if (!response.ok) throw new Error("Feeder side failed");
  return response.json();
}

/*
=========================================
LAYER TOGGLES
=========================================
*/

export async function setFeederLayer(layer: Layer) {
  try {
    const response = await fetch(`${API_URL}/feeder/layer`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layer }),
    });

    if (!response.ok) throw new Error("Failed to update feeder layer");

    return response.json();
  } catch (error) {
    console.error("Feeder layer error:", error);
    throw error;
  }
}

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
