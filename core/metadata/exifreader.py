# from PIL import Image
# from PIL.ExifTags import TAGS
# import io

# def extract_metadata(img_bytes):
#     try:
#         image = Image.open(io.BytesIO(img_bytes))
#         exifdata = image.getexif()
#         metadata = {}

#         for tagid in exifdata:
#             tagname = TAGS.get(tagid, tagid)
#             value = exifdata.get(tagid)
#             metadata[tagname] = str(value)

#         return metadata
#     except:
#         return {}


# from PIL import Image
# from PIL.ExifTags import TAGS
# import io

# IMPORTANT_TAGS = [
#     "Make", "Model", "DateTime",
#     "ExifImageWidth", "ExifImageHeight"
# ]

# def extract_metadata(img_bytes):
#     try:
#         image = Image.open(io.BytesIO(img_bytes))
#         exifdata = image.getexif()
#         metadata = {}

#         for tagid in exifdata:
#             tagname = TAGS.get(tagid, tagid)
#             metadata[tagname] = str(exifdata.get(tagid))

#         present = sum(1 for t in IMPORTANT_TAGS if t in metadata)

#         score = present / len(IMPORTANT_TAGS)  # 0 → 1
#         return metadata, round(score, 2)

#     except Exception:
#         return {}, 0.0


from PIL import Image
from PIL.ExifTags import TAGS
import io


def extract_metadata(img_bytes):
    metadata = {}

    try:
        img = Image.open(io.BytesIO(img_bytes))

        # 1️⃣ JPEG EXIF
        exifdata = img.getexif()
        for tag_id, value in exifdata.items():
            tag = TAGS.get(tag_id, tag_id)
            metadata[str(tag)] = str(value)

        # 2️⃣ PNG / WEBP text metadata
        if hasattr(img, "info"):
            for k, v in img.info.items():
                metadata[str(k)] = str(v)

        # 3️⃣ ICC Profile
        if "icc_profile" in img.info:
            metadata["ICC_Profile"] = "Present"

        return metadata

    except Exception:
        return {}
