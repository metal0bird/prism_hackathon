// maping locations to their id's
const locationIds = {
    "Beach House": "beach_house_id",
    "Home": "home_id",
    "Office": "office_id"
  };

  const roomIds = {
    "Beach House": {
      "Living Room": "beach_house_living_room_id",
      "Bedroom": "beach_house_bedroom_id",
      "Kitchen": "beach_house_kitchen_id",
    },
    "Home": {
      "Living Room": "home_living_room_id",
      "Bedroom": "home_bedroom_id",
      "Kitchen": "home_kitchen_id",
      "Bathroom": "home_bathroom_id",
    },
    "Office": {
      "Conference Room": "office_conference_room_id",
      "Break Room": "office_break_room_id",
      "Workstation 1": "office_workstation_1_id",
    }
  };

fetch('device.json')
  .then(response => response.json())
  .then(data => {
    const deviceData = data; 
  })
  .catch(error => console.error("Error fetching rooms data:", error));


  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.getElementById('video');
      video.srcObject = stream;
  
      const qrScanner = new Instascan.Scanner({ video: video });
      qrScanner.addListener('scan', (content) => {
        const deviceId = JSON.parse(content);
  
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
        const roomId = roomIds[locationName][room];
        if (!roomId) {
          console.error("Invalid Room Name. Please choose from available options:");
          console.log(Object.keys(roomData[locationName])); // List available rooms
          return;
        }
  
        // Store or process device details, location ID, and room information
        console.log("Device ID:", deviceId);
        console.log("Location ID:", locationId);
        console.log("Room ID:", roomId);
  
        // Example of storing data in an object:
        const storedData = {
          device: deviceId,
          locationId,
          roomId
        };
      });
    })
    .catch(error => console.error("Error accessing camera:", error));
  
