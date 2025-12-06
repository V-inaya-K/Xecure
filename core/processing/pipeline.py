import base64
# from detectors.fake_detector import detect_ai_image
# from metadata.exif_reader import extract_metadata
# from similarity.hashing import generate_hash
# from ocr.ocr_reader import extract_text
from core.detectors.fakedetection import detect_ai_image
from core.metadata.exifreader import extract_metadata
from core.similarity.hashing import generate_hash
from core.ocr.ocrreader import extract_text


def analyze_image(image_base64: str):
    try:
        img_bytes = base64.b64decode(image_base64.split(",")[-1])
    except:
        return {"success": False, "error": "Invalid base64 image"}

    ai_score = detect_ai_image(img_bytes)
    metadata = extract_metadata(img_bytes)
    phash = generate_hash(img_bytes)
    text = extract_text(img_bytes)

    fake_score = (ai_score + 0.3) / 1.3 

    return {
        "success": True,
        "final_risk_score": fake_score,
        "ai_probability": ai_score,
        "metadata_found": len(metadata) > 0,
        "phash": phash,
        "extracted_text": text,
        "metadata": metadata,
        "label": "suspicious" if fake_score > 0.5 else "likely real",
    }
