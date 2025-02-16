from openai import OpenAI
import os
from dotenv import load_dotenv
import base64
import requests
import json
from base64 import b64decode
from pathlib import Path
from PIL import Image
from io import BytesIO

# Load environment variables from .env file
load_dotenv()

# Get the OPENAI_KEY
openai_key = os.getenv('OPENAI_KEY')

client = OpenAI(
    api_key=openai_key,
)


def create_image(description, base64_image):
    # Read the image from the local file system
    # Decode the base64 image and save it as test.jpeg
    image_data = b64decode(base64_image)
    image_path = "test.jpeg"
    with open(image_path, "wb") as f:
        f.write(image_data)
    image = Image.open(image_path).convert("RGBA")

    # Get the original size of the image
    original_width, original_height = image.size

    # Calculate the new size (50% smaller)
    new_width = original_width // 2
    new_height = original_height // 2

    # Resize the image
    image = image.resize((new_width, new_height))

    IMAGE_PATH = "test_resize.png"
    image.save(IMAGE_PATH, format="PNG")
    PROMPT = f"""regenerate the user face with the prediction: {description}"""
    response = client.images.edit(
        image=open(IMAGE_PATH, mode="rb"),
        n=1,
        size="1024x1024",
        response_format="url",
        prompt=PROMPT
    )
    # Print the response for debugging
    json_response = response.to_json()
    formated_response = json.loads(json_response)
    url = formated_response['data'][0]['url']
    return url
