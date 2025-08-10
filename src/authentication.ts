import { credentialToJSON, base64urlToBuffer } from './utils';

export async function startAuthentication(options: StartAuthenticationOptions): Promise<any> {
  const publicKey: PublicKeyCredentialRequestOptions = {
    challenge: base64urlToBuffer(options.challenge),
    allowCredentials: options.allowCredentials?.map((cred: any) => ({
      id: base64urlToBuffer(cred.id),
      type: cred.type,
      transports: cred.transports
    })),
    timeout: options.timeout,
    userVerification: options.userVerification
  };

  const assertion = await navigator.credentials.get({ publicKey });
  return credentialToJSON(assertion);
}
