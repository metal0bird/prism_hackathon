function checkForHomeArrival(userLocation, homeLocation, radius) {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  
    function successCallback(position) {
      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;
  
      // Calculate distance between user and home
      const distance = calculateDistance(userLatitude, userLongitude, homeLocation.latitude, homeLocation.longitude);
  
      if (distance <= radius) {
        console.log("Welcome home! You're within", radius, "meters.");
        // Trigger your desired response (e.g., turn on lights, adjust thermostat)
      } else {
        console.log("You are", distance, "meters away from home.");
      }
    }
  
    function errorCallback(error) {
      console.error("Error getting location:", error.message);
    }
  
    // Function to calculate distance using Haversine formula (replace with preferred method if needed)
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // meters (Earth's radius)
      const φ1 = radians(lat1);
      const φ2 = radians(lat2);
      const Δφ = φ2 - φ1;
      const Δλ = radians(lon2 - lon1);
  
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      return R * c;
    }
  
    function radians(degrees) {
      return degrees * Math.PI / 180;
    }
  }
  
  const homeLocation = { latitude: 37.7749, longitude: -122.4194 }; 
  const radius = 50; 
  
  checkForHomeArrival(null, homeLocation, radius); 
  