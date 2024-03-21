const locationIds = {
    "Living Room": "living_room_id",
    "Kitchen": "kitchen_id",
    "Bedroom": "bedroom_id",
    "Bathroom": "bathroom_id",
    // Add more locations and IDs as needed
  };
  const roomIds = {
    "Living Room": "living_room_id",
    "Kitchen": "kitchen_id",
    "Bedroom": "bedroom_id",
    "Bathroom": "bathroom_id",
    // Add more locations and IDs as needed
  };
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.getElementById('video');
      video.srcObject = stream;
  
      const qrScanner = new Instascan.Scanner({ video: video });
      qrScanner.addListener('scan', (content) => {
        const deviceData = JSON.parse(content);
  
        // Get location name from user input:
        const locationName = prompt("Enter Location Name:");
  
        // Check if location ID exists
        const locationId = locationIds[locationName];
        if (!locationId) {
          console.error("Invalid Location Name. Please choose from available options:");
          console.log(Object.keys(locationIds)); // List available locations
          return;
        }
  
        // Prompt for room name
        const room = prompt("Enter Room Name:");
  
        // Store or process device details, location ID, and room information
        console.log("Device Details:", deviceData);
        console.log("Location ID:", locationId);
        console.log("Room:", room);
  
        // Example of storing data in an object:
        const storedData = {
          device: deviceData,
          locationId,
          room
        };
  
        // ... Use storedData for further actions
      });
    })
    .catch(error => console.error("Error accessing camera:", error));
  
