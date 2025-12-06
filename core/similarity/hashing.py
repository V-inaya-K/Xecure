# ai-engine/similarity/hashing.py
from PIL import Image
import imagehash
import io

def generate_hash(img_bytes):
    img = Image.open(io.BytesIO(img_bytes))
    return str(imagehash.phash(img))  # perceptual hash
