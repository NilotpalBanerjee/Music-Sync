import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_X_PRIVATE_SERVER_KEY;
const TOKEN_TTL = 24 * 60 * 60 * 1000; // 24 hours
// const TOKEN_TTL = 1 * 60 * 1000; // 1 MIN testinG

export function generateOneTimeToken() {
  const timestamp = Date.now();
  const nonce = CryptoJS.lib.WordArray.random(16).toString();
  const payload = `${timestamp}:${nonce}`;
  const signature = CryptoJS.HmacSHA256(payload, SECRET_KEY).toString();
  return `${timestamp}:${nonce}:${signature}`;
}


export const storeEncrypted = (key, data, secretKey) => {
  const expiresAt = Date.now() + TOKEN_TTL;

  const payload = {
    data,
    expiresAt,
  };

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    secretKey
  ).toString();

  sessionStorage.setItem(key, encrypted);

  const remainingTime = expiresAt - Date.now();

  setTimeout(() => {
    sessionStorage.removeItem(key);
    window.location.reload();
  }, remainingTime);
};


export const getDecrypted = (key, secretKey) => {
  try {
    const encrypted = sessionStorage.getItem(key);
    if (!encrypted) return null;

    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);

    if (!bytes || bytes.sigBytes <= 0) {
      sessionStorage.removeItem(key);
      window.location.reload();
      return null;
    }

    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedStr) {
      sessionStorage.removeItem(key);
      window.location.reload();
      return null;
    }

    const payload = JSON.parse(decryptedStr);

    if (!payload.expiresAt || Date.now() > payload.expiresAt) {
      sessionStorage.removeItem(key);
      window.location.reload();
      return null;
    }

    return payload.data;
  } catch (err) {
    sessionStorage.removeItem(key);
    window.location.reload();
    return null;
  }
};

