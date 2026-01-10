from pyzbar.pyzbar import decode
from PIL import Image
import sys

try:
    img_path = r"C:\Users\user\.gemini\antigravity\brain\43102f2a-433f-459d-b28a-8b962e110739\uploaded_image_1767429225327.png"
    img = Image.open(img_path)
    decoded_objects = decode(img)
    for obj in decoded_objects:
        print(f"URL: {obj.data.decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
