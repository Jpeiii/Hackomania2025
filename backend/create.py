from openai import OpenAI
import os
from dotenv import load_dotenv
import base64
import requests

# Load environment variables from .env file
load_dotenv()

# Get the OPENAI_KEY
openai_key = os.getenv('OPENAI_KEY')

print(f'OPENAI_KEY: {openai_key}')
client = OpenAI(
    api_key=openai_key,
)

def create_image(description, original_image_url):
    print("Running create_image")    
    # Decode the base64 image
    image_data = base64.b64decode(original_image_url)
    image_path = "decoded_image.jpg"
    
    # Write the decoded image to a file
    with open(image_path, "wb") as image_file:
        image_file.write(image_data)
    
    # Prepare the request
    url = "https://api.openai.com/v1/images/edits"
    headers = {
        "Authorization": f"Bearer {openai_key}"
    }
    files = {
        "image": open(image_path, "rb"),
        "prompt": (None, description),
        "n": (None, "1"),
        "size": (None, "256x256")
    }
    
    # Send the request
    response = requests.post(url, headers=headers, files=files)
    print(response)
    # # Check for errors
    # response.raise_for_status()
    
    # # Return the URL of the generated image
    # return response.json()["data"][0]["url"]
