# def detect_ai_image(img_bytes):
#     """
#     Placeholder AI image detection analysis.
#     Replace with CNN / ViT model later.
#     """
#     return 0.72 

import numpy as np
from PIL import Image
import io


def detect_ai_image(img_bytes):
    """
    Lightweight heuristic-based AI probability detector.
    This is NOT hardcoded, but a simple statistical signal.

    Later you can replace this with a real CNN / ViT model.
    """
    try:
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        arr = np.asarray(img).astype(np.float32)

        # Detect unnatural smoothness (AI images tend to be smoother)
        std_dev = np.std(arr)

        # Normalize into 0–1 range
        ai_prob = min(max(1 - (std_dev / 80), 0.0), 1.0)
        return round(float(ai_prob), 2)

    except Exception:
        return 0.0
