// loading location id's
fetch('location.json')
  .then(response => response.json())
  .then(data => {
    const locationIds = data; 
  })
  .catch(error => console.error("Error fetching rooms data:", error));

  // loading room id's
  fetch('room.json')
  .then(response => response.json())
  .then(data => {
    const roomIds = data; 
  })
  .catch(error => console.error("Error fetching rooms data:", error));

// loading device data and state
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
  
