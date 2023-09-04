import os
import time
import urllib
from urllib.request import urlretrieve
import zipfile
import requests
from progressbar import ProgressBar, Percentage, Bar, RotatingMarker, ETA, FileTransferSpeed


# from requests import async

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file),
                       os.path.relpath(os.path.join(root, file),
                                       os.path.join(path, '..')))

def zipextract(path_to_zip_file, directory_to_extract_to):
    import zipfile
    with zipfile.ZipFile(path_to_zip_file, 'r') as zip_ref:
        zip_ref.extractall(directory_to_extract_to)

def download_file(url):
    local_filename = url.split('/')[-1]
    # NOTE the stream=True parameter below
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(f"E:\\test\\giainen\\client\\{local_filename}", 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk:
                f.write(chunk)
    return local_filename

# ===================== func zip & upload ================== #
filename = 'Python.zip'
# print('nen file', f'E:\\test\\giainen\\client\\zipfile\\{filename}')
# with zipfile.ZipFile(f'E:\\test\\giainen\\client\\zipfile\\{filename}', 'w', zipfile.ZIP_DEFLATED) as zipf:
#     zipdir('static/', zipf)
# print('upload', f'E:\\test\\giainen\\client\\zipfile\\{filename}')
# url = 'http://127.0.0.1:8100/upload'
# file = {'file': open(f'E:\\test\\giainen\\client\\zipfile\\{filename}', 'rb')}
# resp = requests.post(url=url, files=file)
# print(resp.json())


# ================ func download & unzip ================== #
# print(f'download save E:\\test\\giainen\\client\\{filename}')
url = f'http://localhost:8100/download/{filename}'
# download_file(url)
#
# print('giai nen', filename, "E:\\test\\giainen\\client")
# zipextract(f"E:\\test\\giainen\\client\\{filename}", "E:\\test\\giainen\\client\\unzip")

# ==============================
widgets = ['Test: ', Percentage(), ' ', Bar(marker=RotatingMarker()), ' ', ETA(), ' ', FileTransferSpeed()]
pbar = ProgressBar(widgets=widgets)

def dlProgress(count, blockSize, totalSize):
    if pbar.maxval is None:
        pbar.maxval = totalSize
        pbar.start()
    # time.sleep(1)
    pbar.update(min(count*blockSize, totalSize))

urlretrieve(url, filename, reporthook=dlProgress)
pbar.finish()

