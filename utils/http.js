const BACKENDURL = "https://detention-b48d8-default-rtdb.firebaseio.com";

export async function storeEmergency(emergencyData) {
  try {
    const response = await fetch(BACKENDURL + "/emergency.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emergencyData),
    });

    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("Failed to store contact");
    }

    const data = await response.json();
    console.log("Stored successfully:", data);

    // Firebase typically returns a response with a name field that is the ID of the newly created item
    const newEmergencyId = data.name;
    console.log("New Emergrer ID:", newEmergencyId);
    return newEmergencyId; // Returning the ID might be useful if the caller needs it
  } catch (error) {
    console.error("Error storing expense:", error);
    throw error; // Rethrowing the error is useful if you need to handle it in the calling function
  }
}

export async function fetchEmergencies() {
  try {
    const response = await fetch(BACKENDURL + "/emergency.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch emergencies");
    }

    const data = await response.json();
    const emergencies = [];

    for (const key in data) {
      const emergencyObj = {
        id: key,
        ...data[key],
      };
      emergencies.push(emergencyObj);
    }

    return emergencies;
  } catch (error) {
    console.error("Error fetching emergencies:", error);
    throw error;
  }
}

export async function updateEmergency(id, emergencyData) {
  try {
    const response = await fetch(`${BACKENDURL}/emergency/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emergencyData),
    });

    if (!response.ok) {
      throw new Error("Failed to update emergency");
    }

    const data = await response.json();
    console.log("Updated successfully:", data);
  } catch (error) {
    console.error("Error updating emergency:", error);
    throw error;
  }
}

export async function deleteEmergency(id) {
  try {
    const response = await fetch(`${BACKENDURL}/emergency/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete emergency");
    }

    console.log("Deleted successfully");
  } catch (error) {
    console.error("Error deleting emergency:", error);
    throw error;
  }
}
