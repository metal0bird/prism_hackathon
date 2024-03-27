from datetime import datetime, timedelta

def find_usage_hotspots(user_logs, timeframe=7):
  """
  Analyzes user logs to identify hotspots of app usage within the last `timeframe` days.

  Args:
      user_logs: A list of dictionaries, where each dictionary represents a user interaction log entry.
          Each entry should have the following keys:
              - timestamp: (str) The timestamp of the interaction in a parsable format (e.g., YYYY-MM-DD HH:MM:SS).
              - action: (str) The action performed by the user (optional).
  Returns:
      A dictionary with two keys:
          - 'daily_hotspots': A list of dictionaries, where each dictionary represents a daily hotspot.
              Each daily hotspot dictionary has the following keys:
                  - 'date': (str) The date of the hotspot in YYYY-MM-DD format.
                  - 'hour': (int) The hour of the day (0-23) with the most interactions.
                  - 'count': (int) The number of interactions at the hotspot hour.
          - 'overall_hotspot': A dictionary with the following keys (if applicable):
              - 'hour': (int) The hour of the day (0-23) with the most interactions across all days.
              - 'count': (int) The number of interactions at the overall hotspot hour.
  """

  # Initialize variables
  daily_hotspots = []
  overall_counts = {hour: 0 for hour in range(24)}

  # Set the start date for the timeframe
  today = datetime.now()
  start_date = today - timedelta(days=timeframe - 1)

  # Process user logs
  for log in user_logs:
    # Parse timestamp
    timestamp = datetime.strptime(log['timestamp'], "%Y-%m-%d %H:%M:%S")

    # Check if timestamp is within the timeframe
    if start_date <= timestamp <= today:
      # Extract hour
      hour = timestamp.hour

      # Update daily and overall counts
      daily_hotspots.append({'date': timestamp.strftime("%Y-%m-%d"), 'hour': hour, 'count': 0})
      overall_counts[hour] += 1

  # Find daily hotspots
  for hotspot in daily_hotspots:
    date = hotspot['date']
    max_count = 0
    max_hour = None
    for log in user_logs:
      if log['timestamp'].startswith(date) and log['hour'] == hotspot['hour']:
        max_count += 1
    hotspot['count'] = max_count

  # Find overall hotspot (if applicable)
  overall_hotspot = None
  max_count = 0
  for hour, count in overall_counts.items():
    if count > max_count:
      max_count = count
      overall_hotspot = {'hour': hour, 'count': count}

  return {
    'daily_hotspots': daily_hotspots,
    'overall_hotspot': overall_hotspot
  }

# Example usage
user_logs = [
  # ... your user logs here (refer to previous examples for structure)
]

hotspots = find_usage_hotspots(user_logs)

print("Daily Hotspots:")
for hotspot in hotspots['daily_hotspots']:
  print(f"  Date: {hotspot['date']}, Hour: {hotspot['hour']}, Count: {hotspot['count']}")

if hotspots['overall_hotspot']:
  print("Overall Hotspot:")
  print(f"  Hour: {hotspots['overall_hotspot']['hour']}, Count: {hotspots['overall_hotspot']['count']}")
else:
  print("No overall hotspot found within the timeframe.")
