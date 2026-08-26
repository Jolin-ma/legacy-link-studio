const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

/** 22-char unguessable slug — never derived from the order id. */
export function generateRevealToken(): string {
  return randomString(22);
}

export function generateOrderId(): string {
  return randomString(8);
}
