from PIL import Image
from PIL.ExifTags import TAGS
import io

def extract_metadata(img_bytes):
    try:
        image = Image.open(io.BytesIO(img_bytes))
        exifdata = image.getexif()
        metadata = {}

        for tagid in exifdata:
            tagname = TAGS.get(tagid, tagid)
            value = exifdata.get(tagid)
            metadata[tagname] = str(value)

        return metadata
    except:
        return {}
