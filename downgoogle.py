import io
import time
from io import BytesIO
import logging
import os
import os.path
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload


from tqdm import tqdm

from Dashboard import humanbytes

SCOPES = ['https://www.googleapis.com/auth/drive']
KEY_FILE_LOCATION = 'token.json'

def download_file(real_file_id):
    """Downloads a file
    Args:
        real_file_id: ID of the file to download
    Returns : IO object with location.

    Load pre-authorized user credentials from the environment.
    TODO(developer) - See https://developers.google.com/identity
    for guides on implementing OAuth2 for the application.
    """

    """Shows basic usage of the Drive v3 API.
        Prints the names and ids of the first 10 files the user has access to.
        """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        # create drive api client
        service = build('drive', 'v3', credentials=creds)
        chunk_size = 50 * 1024 * 1024
        file_obj = BytesIO()
        file_id = real_file_id

        # pylint: disable=maybe-no-member
        request = service.files().get_media(fileId=file_id)

        # file = io.BytesIO()
        file = io.FileIO("E:\\test\\test.rar", mode='wb')
        downloader = MediaIoBaseDownload(file, request)#, chunksize=chunk_size)#, chunksize=chunk_size
        done = False
        c_time = time.time()
        # with tqdm(unit='iB', unit_scale=True) as pbar:
        while done is False:
            status, done = downloader.next_chunk(num_retries=1)
            if status:
                f_size = status.total_size
                diff = time.time() - c_time
                downloaded = status.resumable_progress
                percentage = downloaded / f_size * 100
                speed = round(downloaded / diff, 2)
                eta = round((f_size - downloaded) / speed)

                hours = eta // 3600
                minutes = (eta % 3600) // 60
                seconds = (eta % 60)
                timecurent = f'{int(hours)}:{int(minutes)}:{int(seconds)}  '


            print(humanbytes(f_size),humanbytes(downloaded),round(percentage, 2),humanbytes(speed),timecurent)

    except HttpError as error:
        print(F'An error occurred: {error}')
        file = None

    # return file.getvalue()

if __name__ == '__main__':
    #https://drive.google.com/file/d/1h1uehMtB8QhwIy9qe1ns1LZBWEfD-9MX/view?usp=sharing
    download_file(real_file_id='1h1uehMtB8QhwIy9qe1ns1LZBWEfD-9MX')


