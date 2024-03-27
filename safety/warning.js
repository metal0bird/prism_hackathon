function checkThermostatSettings(targetTemp, context) {

    const MIN_SAFE_TEMP = 60; // Minimum safe temperature in Fahrenheit
    const MAX_SAFE_TEMP = 85; // Maximum safe temperature in Fahrenheit
  
    // Check 1: Basic safety range
    if (targetTemp < MIN_SAFE_TEMP || targetTemp > MAX_SAFE_TEMP) {
      alert(`Warning: Setting thermostat to ${targetTemp} degrees Fahrenheit might be harmful. 
              \nRecommended safe range: ${MIN_SAFE_TEMP}°F - ${MAX_SAFE_TEMP}°F. 
              \nPress OK to proceed or adjust the temperature.`);
      return false; // Block setting if outside basic safe range
    }
  
    // Check 2: User preference override (optional)
    if (context.userPrefOverride && targetTemp > context.userPrefOverride) {
      // User has explicitly allowed higher temperatures (with potential risks acknowledged)
      console.warn("Warning: Setting thermostat above user preference override.");
      return true; // Allow setting if user preference overrides the basic safe range
    }
  
    // check the conditions using external API's  (yet to me implemented)

    return true;
  }
  
  // Example usage
  const desiredTemp = 88; 
  const context = {
    location: "Chennai. IND", 
    userPrefOverride: null, 
  };
  
  if (checkThermostatSettings(desiredTemp, context)) {

    console.log("Thermostat set to desired temperature.");
  } else {
    console.log("Thermostat setting blocked due to safety concerns.");
  }
  