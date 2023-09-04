from base64 import b64encode, b64decode

import rsa

# generate public and private keys with
# rsa.newkeys method,this method accepts
# key length as its parameter
# key length should be atleast 16
publicKey, privateKey = rsa.newkeys(512)
# Export public key in PKCS#1 format, PEM encoded
publicKeyPkcs1PEM = publicKey.save_pkcs1("PEM")
# publicKeyPkcs1PEM = publicKey.save_pkcs1().decode('utf8')
# print(publicKeyPkcs1PEM)
# Export private key in PKCS#1 format, PEM encoded
privateKeyPkcs1PEM = privateKey.save_pkcs1("PEM")
# privateKeyPkcs1PEM = privateKey.save_pkcs1().decode('utf8')
# print(privateKeyPkcs1PEM)


# Save and load the PEM encoded keys as you like
# with open ("private_rsa.pem", "wb") as prv_file:
#     prv_file.write(privateKeyPkcs1PEM)
#     prv_file.close()
# with open ("public_rsa.pem", "wb") as prv_file:
#     prv_file.write(publicKeyPkcs1PEM)
#     prv_file.close()


# Import public key in PKCS#1 format, PEM encoded
# with open ("public_rsa.pem", "rb") as f:
#     publicKeyReloaded = rsa.PublicKey.load_pkcs1(f.read())
# with open ("private_rsa.pem", "rb") as f:
#     privateKeyReloaded = rsa.PrivateKey.load_pkcs1(f.read())


# publicKeyReloaded = rsa.PublicKey.load_pkcs1(publicKeyPkcs1PEM.encode('utf8'))
# publicKeyReloaded = rsa.PublicKey.load_pkcs1(publicKeyPkcs1PEM)
# Import private key in PKCS#1 format, PEM encoded
# privateKeyReloaded = rsa.PrivateKey.load_pkcs1(privateKeyPkcs1PEM.encode('utf8'))

# plaintext = "khaicafe".encode('utf8')
# print("Plaintext: ", plaintext)
# #
# ciphertext = rsa.encrypt(plaintext, publicKeyReloaded)
# print("Ciphertext: ", ciphertext)
# with open ("pass_mahoa.txt", "wb") as prv_file:
#     # prv_file.write(ciphertext)
#     prv_file.write(b64encode(ciphertext))
#     prv_file.close()

privateKey = '''-----BEGIN RSA PRIVATE KEY-----
MIIBPQIBAAJBAOpRm/tCx1yM+BNeXsXrnLFIpKqkUB0cquJbnE3tjyMFHsGKhSS5
BE2Sd+IJ5qCV4TBWKCCmwzCq3mMG3VVfoVkCAwEAAQJBAKXgI+XZPjxcZvl/IuRF
iOVPoZJTQ4t4UdhwNdRMyQ+Y6SbifJbouvlZTe1CXZ/o/pg9ZylZydVq5bb/nhm1
nAECIwDv3mQXikyVatUkROQyF9zOi2mA4mbd0T/apZvd8whKnjcZAh8A+hOrif0L
/XiimfeITnqi3DaOvqxWu91jKCHYOURBAiJa5biiXwtEd/aLRvv+q6JGNvhlGeaH
WltLPQTC5+0Vcb1JAh5QaxDnv+MiMLABWTORISjMLhM7R8pggXIIjtGsoMECIwCz
Xi54OmOCttG1j7jewUmBo4HzshxrXdX2QRc3kibTfUjo
-----END RSA PRIVATE KEY-----'''
privateKeyReloaded = rsa.PrivateKey.load_pkcs1(privateKey)

with open ("pass_mahoa.txt", "rb") as f:
    ciphertext = f.read()
    ciphertext = b64decode(ciphertext)
    print(ciphertext)


decryptedMessage = rsa.decrypt(ciphertext, privateKeyReloaded)
print("Decrypted message: ", decryptedMessage.decode('utf8'),'\n')


# signature = rsa.sign(plaintext, privateKeyReloaded, "SHA-256")
# with open("signature", "wb") as f:
#     f.write(signature)

