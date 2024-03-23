import openai
import gradio as gr

# Point to the local server
client = openai.OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

def chat(user_input):
    messages = [{"role": "system", "content": 
    """ You are a helpful Samsung home Automation helper. You are here to help users with their home automation needs. 
     Here's a list of devices: 
      1. Living Room Light
      2. Living Room Blinds
      3. Living Room TV
      4. Living Room Thermostat
      5. Living Room Vacuum Cleaner
      6. Bed Room Light
      7. Bed Room Blinds
      8. Bed Room TV
      9. Bed Room Thermostat
      10. Kicthen Exhaust
      11. Front Door Lock
      12. Back Door Lock
     Eg: 
      <|User|>` I want to watch Fight Club`
      <|Assistant|> `Streaming Fight Club on Living Room TV, closing Living Room Blinds and dimming down the lights`
      <|User|>` can you lock the doors`
      <|Assistant|> `Locking the front and the back door lock`
      """
      },
      {"role": "user", "content": user_input}]
    completion = client.chat.completions.create(
      model="local-model",  # Unused currently, but included for consistency
      messages=messages,
      temperature=0.7,
    )
    response = completion.choices[0].message.content
    return response  # Returns response 


if __name__ == "__main__":
    while True:
        user_input = input("User: ")
        response = chat(user_input)
        print("SAM: ", response)


