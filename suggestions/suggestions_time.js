const userLogs = [
    { timestamp: "2024-03-29 07:00:00" },  // Friday
    { timestamp: "2024-03-28 07:15:00" },  // Thursday
    { timestamp: "2024-03-27 07:30:00" },  // Wednesday
    { timestamp: "2024-03-26 07:00:00" },  // Tuesday
    { timestamp: "2024-03-25 06:45:00" },  // Monday
  

    { timestamp: "2024-03-29 08:45:00" },  // Friday
    { timestamp: "2024-03-28 08:30:00" },  // Thursday
    { timestamp: "2024-03-27 08:15:00" },  // Wednesday
    { timestamp: "2024-03-26 08:40:00" },  // Tuesday
    { timestamp: "2024-03-25 08:30:00" },  // Monday
  

    { timestamp: "2024-03-29 19:00:00" },  // Friday
    { timestamp: "2024-03-23 19:15:00" },  // Saturday
  

    { timestamp: "2024-03-29 10:45:00" },  // Friday
    { timestamp: "2024-03-28 10:15:00" },  // Thursday
    { timestamp: "2024-03-27 10:30:00" },  // Wednesday
    { timestamp: "2024-03-26 10:00:00" },  // Tuesday
    { timestamp: "2024-03-25 10:45:00" },  // Monday
  

    { timestamp: "2024-03-24 14:00:00" },  // Sunday
    { timestamp: "2024-03-23 11:30:00" },  // Saturday
  

    { timestamp: "2024-03-26 13:15:00" },  // Tuesday
    { timestamp: "2024-03-21 12:45:00" },  // Thursday
    { timestamp: "2024-03-14 13:00:00" },  // Tuesday
  

    { timestamp: "2024-03-29 18:00:00" },  // Friday
    { timestamp: "2024-03-28 17:45:00" },  // Thursday
    { timestamp: "2024-03-27 18:15:00" },  // Wednesday
    { timestamp: "2024-03-22 18:00:00" },  // Friday (previous week)
  

    { timestamp: "2024-03-29 21:00:00" },  // Friday
    { timestamp: "2024-03-28 20:15:00" } // Thursday
]
  

// for suggesting time based on user logs, to push suggestions
function processLogsForGraph(userLogs, timeframe) {
    const timeSlots = {}; // Key: Hour (0-23), Value: Count of interactions
  
    for (let i = 0; i < 24; i++) {
      timeSlots[i] = 0;
    }
  
    const endDate = new Date(); // Assuming logs are recent up to today
  
    for (let i = timeframe - 1; i >= 0; i--) {
      const day = new Date(endDate.setDate(endDate.getDate() - i));
      for (const log of userLogs) {
        const logDate = new Date(log.timestamp);
        if (logDate.getDate() === day.getDate() &&
            logDate.getMonth() === day.getMonth() &&
            logDate.getFullYear() === day.getFullYear()) {
          const hour = logDate.getHours();
          timeSlots[hour]++;
        }
      }
    }
  
    return timeSlots;
  }
  

const ctx = document.getElementById('usageGraph').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(timeSlots),
    datasets: [{
      label: 'Usage Frequency',
      data: Object.values(timeSlots),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
