export function bufferToBase64url(buffer: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64ToBuffer(base64urlString: string): ArrayBuffer {
  let base64 = base64urlString.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}


export function base64urlToBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(base64url.length / 4) * 4, '=');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export function credentialToJSON(cred: any): any {
  if (cred instanceof ArrayBuffer) {
    return bufferToBase64url(cred);
  } else if (Array.isArray(cred)) {
    return cred.map(credentialToJSON);
  } else if (cred && typeof cred === 'object') {
    const result: any = {};
    for (const key in cred) {
      result[key] = credentialToJSON(cred[key]);
    }
    return result;
  }
  return cred;
}
