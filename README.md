## Following is the structure of the files in this repo
Note : all the API calls referenced in the following project is taken from official <a href="https://developer.smartthings.com/docs/api/public" target="_blank">Samsung SmartThings Developers</a> page

### Data files
- device.json :  contains information about a specific devices, the herirarchy goes like Location -> Room -> Devices ( id , current state )
- location.json : maps location names to their id's
- room.json : maps rooms to their id's, the herirarchy goes like Location -> Rooms
- user_logs.json :  stores all the logs for each user activity, in format { timestamp: , routine: }
- routines.json : stores details of routines, routine name -> devices

### Backend files
- adding_device.js : runs a QR code scanner and adds a new device, input { location name, room name }, uses GET /devices/{deviceID} API call, result : updates device.json with the new device
- location.js : checks users current location and confirms if the user is close to any of his pre set locations, input { users location }, uses GET /locations API call, result : to push suggestions based on location of the user
- routines_suggestions.js : based on current time and users past activities, it gives recommendations for routines, input { user logs, current time}, uses frequency, result : personalised suggestion routine 
- suggestions_time.js : suggests the perfect time to push suggestions, input { user logs }, uses frequency, result : solves when to push suggestions question
- chat_bot.py : controlls the chatbot using locally hosted LLM (LM Studio, CodeLamma 7B) and also responds to "Hey Sam" commands, uses Gradio, result : chat interaction with user
- warning.js : a POC file that gives warning if extreme settings are being changed (eg, thermostat), result : warning to avoid harm


