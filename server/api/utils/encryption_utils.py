from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
import binascii

from config import envs

encrypt_key = binascii.unhexlify(envs.ENCRYPT_KEY)

def encrypt(text: str) -> dict:
    iv = os.urandom(12) 
    encryptor = Cipher(
        algorithms.AES(encrypt_key),
        modes.GCM(iv),
        backend=default_backend()
    ).encryptor()

    encrypted_data = encryptor.update(text.encode()) + encryptor.finalize()
    auth_tag = encryptor.tag

    return {
        'iv': binascii.hexlify(iv).decode(),
        'encryptedData': binascii.hexlify(encrypted_data).decode(),
        'authTag': binascii.hexlify(auth_tag).decode()
    }

def decrypt(data: dict) -> list[str]:
    iv = binascii.unhexlify(data['iv'])
    encrypted_data = binascii.unhexlify(data['encryptedData'])
    auth_tag = binascii.unhexlify(data['authTag'])

    decryptor = Cipher(
        algorithms.AES(encrypt_key),
        modes.GCM(iv, auth_tag),
        backend=default_backend()
    ).decryptor()

    decrypted = decryptor.update(encrypted_data) + decryptor.finalize()
    return decrypted.decode().split('.')
