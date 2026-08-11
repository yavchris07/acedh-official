import CryptoJS from "crypto-js";

const SECRET_KEY = "EncryptSkool";

export function encryptId(id: string | number): string {
    const idStr = id.toString();
    const ciphertext = CryptoJS.AES.encrypt(idStr, SECRET_KEY).toString();
    return encodeURIComponent(ciphertext);
  }
  
  // Fonction pour déchiffrer l'ID
  export function decryptId(encryptedId: string): string {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  