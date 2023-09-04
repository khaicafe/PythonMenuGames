import base64


def openfilea(file):
    with open(file, 'rb') as f:
        data = f.read()
        # return data
    f.close()
    return base64.b64encode(data)#data.decode('utf-8')
def mahoa_cach1():
    LOGO_KL = openfilea('SV-host.py')


    # encrypting
    from cryptography.fernet import Fernet
    message = "my deep dark secret".encode()
    key = Fernet.generate_key()
    print(key)
    key = b'gmjaIw5dn1i6M_fIQG61fXXCpSdBPKA1wjv_q3EHbBM='
    f = Fernet(key)
    encrypted = f.encrypt(LOGO_KL)
    print(f,encrypted)
    # decrypting

    decrypted = f.decrypt(encrypted)
    print(decrypted)


    #print(LOGO_KL)#base64.b64decode(LOGO_KL).decode('utf-8'))
    LOGO_KL = base64.b64decode(LOGO_KL).decode('utf-8')
    f = open("test.py", "w")
    for line in LOGO_KL:
        #print(line)
        try:
            f.write(line)
        except:
            pass
    f.close()

##################### Cach 2 ################################
def mahoa_cach2():
    from cryptography.fernet import Fernet

    key = Fernet.generate_key()  # store in a secure location
    print("Key:", key.decode())
from cryptography.fernet import Fernet

def encrypt(message: bytes, key: bytes) -> bytes:
    return Fernet(key).encrypt(message)

def decrypt(token: bytes, key: bytes) -> bytes:
    return Fernet(key).decrypt(token)
key = Fernet.generate_key()
print(key.decode())
message = 'John Doe'
mahoa = encrypt(message.encode(), key)
print(mahoa)
token = mahoa
giaima = decrypt(token, key).decode()
print(giaima)