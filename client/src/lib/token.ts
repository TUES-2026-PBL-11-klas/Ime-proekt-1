import { decodeString } from "./base64";

export function decodeJWT(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode the payload (second part)
    const payload = parts[1];
    if (!payload) {
      return null;
    }
    
    // Base64URL decode (replace - with +, _ with /, and add padding if needed)
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    
    // Decode from base64
    const decoded = decodeString(padded)
    
    // Parse the JSON payload
    return JSON.parse(decoded);
  } catch (error) {
    // Return null if decoding fails
    return null;
  }
}
