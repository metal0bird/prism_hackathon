import cv2
from pyzbar import pyzbar

# Function to scan QR code from webcam feed
def scan_qr_code():
  cap = cv2.VideoCapture(0)  # Open webcam (change index for multiple cameras)
  while True:
    ret, frame = cap.read()
    # Display webcam feed (optional)
    cv2.imshow('QR Code Scanner', frame)
    # Decode QR codes in the frame
    codes = decode_qr_codes(frame)
    if codes:
      # Close webcam and return the first scanned code
      cap.release()
      cv2.destroyAllWindows()
      return codes[0].data.decode('utf-8')
    # Exit on 'q' key press
    if cv2.waitKey(1) == ord('q'):
      break
  cap.release()
  cv2.destroyAllWindows()
  return None  

# Function to decode QR codes from a frame
def decode_qr_codes(frame):
  # Convert to grayscale for better QR code detection
  gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
  # Find barcodes in the grayscale frame
  return pyzbar.decode(gray)

# Scan the QR code from the webcam
device_id = scan_qr_code()

if device_id:
  # Prompt user for location and room name
  location_name = input("Enter the location name (e.g., Living Room): ")
  room_name = input("Enter the room name (e.g., Main Floor): ")

  # Print information about the added device
  print(f"Device added successfully!")
  print(f"Device ID: {device_id}")
  print(f"Location: {location_name}")
  print(f"Room Name: {room_name}")
else:
  print("Failed to scan QR code. Please try again.")

