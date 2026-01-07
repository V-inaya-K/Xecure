# import base64
# # from detectors.fake_detector import detect_ai_image
# # from metadata.exif_reader import extract_metadata
# # from similarity.hashing import generate_hash
# # from ocr.ocr_reader import extract_text
# from core.detectors.fakedetection import detect_ai_image
# from core.metadata.exifreader import extract_metadata
# from core.similarity.hashing import generate_hash
# from core.ocr.ocrreader import extract_text


# def analyze_image(image_base64: str):
#     try:
#         img_bytes = base64.b64decode(image_base64.split(",")[-1])
#     except:
#         return {"success": False, "error": "Invalid base64 image"}

#     ai_score = detect_ai_image(img_bytes)
#     metadata = extract_metadata(img_bytes)
#     phash = generate_hash(img_bytes)
#     text = extract_text(img_bytes)

#     fake_score = (ai_score + 0.3) / 1.3 

#     return {
#         "success": True,
#         "final_risk_score": fake_score,
#         "ai_probability": ai_score,
#         "metadata_found": len(metadata) > 0,
#         "phash": phash,
#         "extracted_text": text,
#         "metadata": metadata,
#         "label": "suspicious" if fake_score > 0.5 else "likely real",
#     }



import base64
import io
from PIL import Image, ImageChops

from core.detectors.fakedetection import detect_ai_image
from core.metadata.exifreader import extract_metadata
from core.similarity.hashing import generate_hash
from core.ocr.ocrreader import extract_text


# -----------------------------
# Helper: ELA Manipulation Score
# -----------------------------
def compute_ela_score(img_bytes, quality=90):
    try:
        original = Image.open(io.BytesIO(img_bytes)).convert("RGB")

        buffer = io.BytesIO()
        original.save(buffer, "JPEG", quality=quality)
        compressed = Image.open(io.BytesIO(buffer.getvalue()))

        diff = ImageChops.difference(original, compressed)
        extrema = diff.getextrema()

        max_diff = max(ex[1] for ex in extrema)
        return round(min(max_diff / 255, 1.0), 2)
    except Exception:
        return 0.0


# -----------------------------
# Helper: Metadata Scoring
# -----------------------------
def compute_metadata_score(metadata):
    IMPORTANT_FIELDS = [
        "Make", "Model", "DateTime",
        "ExifImageWidth", "ExifImageHeight"
    ]
    if not metadata:
        return 0.0

    present = sum(1 for f in IMPORTANT_FIELDS if f in metadata)
    return round(present / len(IMPORTANT_FIELDS), 2)


# -----------------------------
# Helper: Similarity (DB-ready)
# -----------------------------
def compute_similarity(phash):
    """
    Placeholder for DB comparison.
    Later:
    - Fetch hashes from MongoDB
    - Compute Hamming distance
    """
    similarity_score = 0.0
    matched_sources = []

    return similarity_score, matched_sources


# -----------------------------
# Helper: Source Discovery
# -----------------------------
def discover_sources(similarity_score, matched_sources):
    """
    Internal + web-ready source discovery
    """
    if similarity_score > 0.8:
        return matched_sources

    return []


# -----------------------------
# MAIN PIPELINE
# -----------------------------
def analyze_image(image_base64: str):
    # 1️⃣ Decode image
    try:
        img_bytes = base64.b64decode(image_base64.split(",")[-1])
    except Exception:
        return {"success": False, "error": "Invalid base64 image"}

    explanations = []

    # 2️⃣ AI-generated detection
    ai_probability = round(float(detect_ai_image(img_bytes)), 2)
    if ai_probability > 0.6:
        explanations.append("High probability of AI-generated image patterns")

    # 3️⃣ Metadata analysis
    metadata = extract_metadata(img_bytes)
    metadata_score = compute_metadata_score(metadata)

    if metadata_score == 0:
        explanations.append("No EXIF metadata found (possible screenshot or edited image)")
    elif metadata_score < 0.5:
        explanations.append("Partial metadata detected")

    # 4️⃣ Similarity detection
    phash = generate_hash(img_bytes)
    similarity_score, matched_sources = compute_similarity(phash)

    if similarity_score > 0.7:
        explanations.append("Image closely matches previously seen images")

    # 5️⃣ Manipulation detection (ELA)
    ela_score = compute_ela_score(img_bytes)
    if ela_score > 0.5:
        explanations.append("Compression inconsistencies detected (possible editing)")

    # 6️⃣ OCR extraction
    extracted_text = extract_text(img_bytes)
    if extracted_text.strip():
        explanations.append("Readable text detected via OCR")

    # 7️⃣ Source discovery
    sources = discover_sources(similarity_score, matched_sources)
    if sources:
        explanations.append("Potential original source(s) identified")

    # 8️⃣ Manipulation score (combined)
    manipulation_score = round(
        min((ela_score + ai_probability + (1 - metadata_score)) / 3, 1.0),
        2
    )

    # 9️⃣ Final risk aggregation
    final_risk_score = round(
        (
            ai_probability +
            manipulation_score +
            (1 - metadata_score) +
            similarity_score
        ) / 4,
        2
    )

    label = "suspicious" if final_risk_score > 0.5 else "likely real"

    # 🔟 Final response
    return {
        "success": True,

        # Scores (0–1)
        "ai_probability": ai_probability,
        "manipulation_score": manipulation_score,
        "metadata_score": metadata_score,
        "similarity_score": similarity_score,
        "final_risk_score": final_risk_score,

        # Evidence
        "metadata_found": bool(metadata),
        "metadata": metadata,
        "phash": phash,
        "extracted_text": extracted_text,
        "sources": sources,

        # Explainability
        "explanation": explanations,
        "label": label
    }
