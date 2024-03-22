const user="sanjeev";

const userLogs = [
    // Morning Routine (triggered around 7:00 AM)
    { timestamp: "2024-03-25 07:00:00", routine: "Morning Light" },
    { timestamp: "2024-03-22 07:15:00", routine: "Morning Light" },
    { timestamp: "2024-03-21 07:30:00", routine: "Morning Light" },
    { timestamp: "2024-03-20 07:00:00", routine: "Morning Light" },
    { timestamp: "2024-03-19 06:45:00", routine: "Morning Light" },
  
    // Workday Routine (triggered around 8:30 AM)
    { timestamp: "2024-03-25 08:45:00", routine: "Workday Setup" },
    { timestamp: "2024-03-22 08:30:00", routine: "Workday Setup" },
    { timestamp: "2024-03-21 08:15:00", routine: "Workday Setup" },
    { timestamp: "2024-03-20 08:40:00", routine: "Workday Setup" },
    { timestamp: "2024-03-19 08:30:00", routine: "Workday Setup" },
  
    // Movie Night Routine (triggered around 7:00 PM on weekends)
    { timestamp: "2024-03-23 19:00:00", routine: "Movie Night" },  // Saturday
    { timestamp: "2024-03-16 19:15:00", routine: "Movie Night" },  // Saturday
  
    // Goodnight Routine (triggered around 10:30 PM)
    { timestamp: "2024-03-25 10:45:00", routine: "Goodnight" },
    { timestamp: "2024-03-22 10:15:00", routine: "Goodnight" },
    { timestamp: "2024-03-21 10:30:00", routine: "Goodnight" },
    { timestamp: "2024-03-20 10:00:00", routine: "Goodnight" },
    { timestamp: "2024-03-19 10:45:00", routine: "Goodnight" },
  
    // Weekend Activity Routine (triggered on weekends with varying times)
    { timestamp: "2024-03-24 14:00:00", routine: "Weekend Activity" },  // Sunday
    { timestamp: "2024-03-17 11:30:00", routine: "Weekend Activity" },  // Sunday
  
    // Cleaning Routine (triggered on Tuesdays and Thursdays around 1:00 PM)
    { timestamp: "2024-03-26 13:15:00", routine: "Cleaning" },  // Tuesday
    { timestamp: "2024-03-21 12:45:00", routine: "Cleaning" },  // Thursday
    { timestamp: "2024-03-14 13:00:00", routine: "Cleaning" },  // Tuesday
  
    // Study Session Routine (triggered on weekdays around 6:00 PM)
    { timestamp: "2024-03-25 18:00:00", routine: "Study Session" },  // Monday
    { timestamp: "2024-03-22 18:15:00", routine: "Study Session" },  // Friday
    { timestamp: "2024-03-21 17:45:00", routine: "Study Session" },  // Thursday
]  

const routines = {
    "Movie Night": [
      { device: "TV", action: "turnOn" },
      { device: "Lights", action: "dim", value: 50 },
      { device: "Curtains", action: "close" }
    ],
    "Morning Light": [
      { device: "Lights", action: "turnOn" },
      { device: "Blinds", action: "open" }
    ],
    "Goodnight": [
      { device: "Lights", action: "turnOff" },
      { device: "Thermostat", action: "adjust", value: 18 } 
    ],
  };
  

  function recommendRoutine(userLogs, routines, currentTime) {
    // Analyze recent user logs (e.g., last 3-5 days)
    const recentLogs = userLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return (
        Math.abs(logDate - new Date(currentTime)) / (1000 * 60 * 60 * 24) <= 5
      ); // Filter logs within the last 5 days
    });
  
    // Identify most frequent routine at similar times
    const routineCounts = {};
    for (const log of recentLogs) {
      const routine = log.routine;
      const logTime = new Date(log.timestamp).getHours();
      if (!routineCounts[routine]) {
        routineCounts[routine] = { count: 0, times: [] };
      }
      routineCounts[routine].count++;
      routineCounts[routine].times.push(logTime);
    }
  
    let recommendedRoutine = null;
    let maxCount = 0;
    const currentTimeHour = new Date(currentTime).getHours();
  
    for (const routineName in routineCounts) {
      const routineData = routineCounts[routineName];
      const routineCount = routineData.count;
      const routineTimes = routineData.times;
  
      // Check if routine was triggered at a similar time before
      const similarTimes = routineTimes.filter(time => Math.abs(time - currentTimeHour) <= 1);
      if (routineCount > maxCount && similarTimes.length > 0) {
        maxCount = routineCount;
        recommendedRoutine = routineName;
      }
    }
  
    return recommendedRoutine;
  }

const currentTimestamp = new Date().toISOString();
const recommendedRoutineName = recommendRoutine(userLogs, routines, currentTimestamp);

if (recommendedRoutineName) {
    console.log("Hey ",user," do you want me to trigger ", recommendedRoutineName, " routine?");
} else {
    console.log("No routine recommendation available.");
}