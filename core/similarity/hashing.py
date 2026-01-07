# # ai-engine/similarity/hashing.py
# from PIL import Image
# import imagehash
# import io

# def generate_hash(img_bytes):
#     img = Image.open(io.BytesIO(img_bytes))
#     return str(imagehash.phash(img))  # perceptual hash

from PIL import Image
import imagehash
import io


def generate_hash(img_bytes):
    """
    Generates perceptual hash (pHash).
    Used for similarity detection.
    """
    img = Image.open(io.BytesIO(img_bytes))
    phash = imagehash.phash(img)
    return str(phash)
