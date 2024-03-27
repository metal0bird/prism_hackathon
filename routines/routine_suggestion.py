from datetime import datetime, timedelta

def recommend_routine(user_logs, current_time, timeframe=7):
  """
  Recommends a routine based on user logs, current time, and recent usage patterns.

  Args:
      user_logs: A list of dictionaries, where each dictionary represents a user interaction log entry.
          Each entry should have the following keys:
              - timestamp: (str) The timestamp of the interaction in a parsable format (e.g., YYYY-MM-DD HH:MM:SS).
              - routine: (str) The name of the routine triggered by the user.
  Returns:
      The recommended routine name (str) or None if no suitable recommendation is found.
  """

  # Set the start date for the timeframe
  today = datetime.now()
  start_date = today - timedelta(days=timeframe - 1)

  # Initialize variables
  routine_counts = {}  # Dictionary to store routine counts with current time as key

  # Process user logs within timeframe
  for log in user_logs:
    # Parse timestamp
    timestamp = datetime.strptime(log['timestamp'], "%Y-%m-%d %H:%M:%S")

    # Check if timestamp is within the timeframe
    if start_date <= timestamp <= today:
      # Extract hour and routine name
      hour = timestamp.hour
      routine_name = log['action']

      # Update routine counts with key based on hour and current day (avoid collisions)
      current_day = timestamp.strftime("%Y-%m-%d")
      key = (hour, current_day)
      routine_counts.setdefault(key, 0)  # Initialize count to 0 if key doesn't exist
      routine_counts[key] += 1

  # Find routine triggered most often at the current time
  current_key = (current_time.hour, current_time.strftime("%Y-%m-%d"))
  recommended_routine = None
  max_count = 0
  for key, count in routine_counts.items():
    if key[0] == current_time.hour and count > max_count:
      max_count = count
      recommended_routine = user_logs[user_logs.index({'timestamp': key[1], 'action': key[0]})]['action']

  return recommended_routine

user_logs = [
  {
    "timestamp": "2024-03-24 08:00:00",
    "action": "Turned on bedroom light"
  },
  {
    "timestamp": "2024-03-24 10:30:00",
    "action": "Adjusted living room thermostat to 72°F"
  },
  {
    "timestamp": "2024-03-24 12:15:00",
    "action": "Ordered lunch"
  },
  {
    "timestamp": "2024-03-24 19:00:00",
    "action": "Turned on living room TV"
  },

  # Logs from March 23rd (yesterday)
  {
    "timestamp": "2024-03-23 18:00:00",
    "action": "Increased kitchen light brightness"
  },
  {
    "timestamp": "2024-03-23 20:30:00",
    "action": "Turned on living room TV"
  },
  {
    "timestamp": "2024-03-23 22:00:00",
    "action": "Turned off all lights"
  },

  # Logs from March 22nd (day before yesterday)
  {
    "timestamp": "2024-03-22 10:00:00",
    "action": "Turned on kitchen light"
  },
  {
    "timestamp": "2024-03-22 17:30:00",
    "action": "Turned on living room TV"
  },
  {
    "timestamp": "2024-03-22 22:00:00",
    "action": "Decreased bedroom temperature by 1°F"
  },
]



current_time = datetime.now()  # Replace with the actual current time
print(current_time)
current_time = datetime.strptime("2024-03-24 22:00:00", "%Y-%m-%d %H:%M:%S")
print(current_time)
recommended_routine = recommend_routine(user_logs, current_time)

if recommended_routine:
  print(f"Recommended routine: {recommended_routine}")
else:
  print("No suitable routine recommendation based on current time and recent usage patterns.")

