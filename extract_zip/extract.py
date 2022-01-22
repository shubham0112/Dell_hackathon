import zipfile
import os

my_dir = "extracted"
my_zip = "content.zip"

with zipfile.ZipFile(my_zip) as zip:
    for zip_info in zip.infolist():
        if zip_info.filename[-1] == '/':
            continue
        zip_info.filename = os.path.basename(zip_info.filename)
        zip.extract(zip_info, my_dir)