import openai
import gradio as gr
import json


def add_routine(new_routine, filename="/Users/aman/Github bs/website_prism/prisma-hackathon/routines.json"):
  if isinstance(new_routine, str):
      try:
          new_routine = json.loads(new_routine)
      except json.JSONDecodeError:
          print("Invalid JSON format for new routine. Please check the data.")
          return
  try:
      with open(filename, "r") as file:
          routines = json.load(file)
  except FileNotFoundError:
      routines = []

  routines.append(new_routine)

  with open(filename, "w") as file:
      json.dump(routines, file, indent=4)

def add_device(new_device, filename="/Users/aman/Github bs/website_prism/prisma-hackathon/device.json"):
  if isinstance(new_device, str):
      try:
          new_routine = json.loads(new_device)
      except json.JSONDecodeError:
          print("Invalid JSON format for new device. Please check the data.")
          return
  try:
      with open(filename, "r") as file:
          devices = json.load(file)
  except FileNotFoundError:
      devices = []

  devices.append(new_device)

  with open(filename, "w") as file:
      json.dump(devices, file, indent=4)

# Point to the local server
client = openai.OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

def routine(user_input):

    messages = [{"role": "system", "content": 
    """ 

    You are a helpful Samsung home Automation helper. You are here to help users with their home automation needs. 

     Here is the user's query: hey sam can you add a routine named Wake up that turns on the bedroom light, coffee maker, thermostat, and newscaster.

     I will give you users query, return the name of the routine and list of devices like the example given below.
     Eg: 
      {
        "name": "Wake Up",
        "devices": [
            "Bedroom Light",
            "Coffee Maker",
            "Thermostat",
            "Newscaster"
        ]
    }
    """
      },
      {"role": "user", "content": user_input}]
    
    completion = client.chat.completions.create(
      model="local-model",  # Unused currently, but included for consistency
      messages=messages,
      #temperature=0.7,
    )

    new_routine = completion.choices[0].message.content
    add_routine(new_routine)
    
    response = "Routine added, can I help you with something else?"
    return response  # Returns response 

def device(user_input):

    messages = [{"role": "system", "content": 
    """ 

    You are a helpful Samsung home Automation helper. You are here to help users with their home automation needs. 

     Here is the user's query: hey sam can you add a device named 'light' to the kitchen.

     I will give you users query, return the id, state and name of the device in the format given below.
     Eg: 
      "exhause": {
                    "id": "home_bedroom_exhaust_id",
                    "state": "on"
                }
    """
      },
      {"role": "user", "content": user_input}]
    
    completion = client.chat.completions.create(
      model="local-model",  # Unused currently, but included for consistency
      messages=messages,
      #temperature=0.7,
    )

    new_device = completion.choices[0].message.content
    #add_device(new_device)
    response = "Device added, can I help you with something else?"
    return response  # Returns response 


def chat(user_input):

    messages = [{"role": "system", "content": 
    """ 
    You are Sam a home automation assitant. 
    Here's a list of devices that you can control: 
      1. Living Room Light
      2. Living Room Blinds
      3. Living Room TV
      4. Living Room AC
      5. Living Room Vacuum Cleaner
      6. Bed Room Light
      7. Bed Room Blinds
      8. Bed Room TV
      9. Bed Room AC
      10. Kicthen Exhaust
      11. Front Door Lock
      12. Back Door Lock

      Return a short response to user's query. 
      For example: 
      <|User|>` I want to watch Fight Club`
      <|Assistant|> `Streaming Fight Club on Living Room TV, closing Living Room Blinds and dimming down the lights.`
      """
      },
      {"role": "user", "content": user_input}]
    
    completion = client.chat.completions.create(
      model="local-model",  # Unused currently, but included for consistency
      messages=messages,
      #temperature=0.7,
    )
    response = completion.choices[0].message.content
    return response  # Returns response 

    
with gr.Blocks() as demo:
    chatbot = gr.Chatbot()
    msg = gr.Textbox()
    clear = gr.ClearButton([msg, chatbot])
    

    def respond(message, chat_history):

        if message.lower().startswith("hey sam"):
            if "add a routine" in message.lower():
                response=routine(message)
            if "add a device" in message.lower():
                response=device(message)
        else:
            response=chat(message)
        chat_history.append((message, response))
        return "", chat_history

    msg.submit(respond, [msg, chatbot], [msg, chatbot])

if __name__ == "__main__":
    demo.launch()




