import { base64ToBuffer, bufferToBase64url } from './utils';

export async function startRegistration(options: StartRegistrationOptions): Promise<RegistrationResult> {
  if (!window.PublicKeyCredential) {
    throw new Error('WebAuthn does not support this browser');
  }

  const publicKey: PublicKeyCredentialCreationOptions = {
    ...options,
    challenge: base64ToBuffer(options.challenge),
    excludeCredentials: options.excludeCredentials?.map((cred: any) => ({
      id: base64ToBuffer(cred.id),
      type: cred.type,
    })),
    user: {
      ...options.user,
      id: base64ToBuffer(options.user.id),
    },
  };

  const credential = await navigator.credentials.create({ publicKey }) as PublicKeyCredential;

  if (!credential || !credential.response) {
    throw new Error('Unable to create credential');
  }

  const attestationResponse = credential.response as AuthenticatorAttestationResponse;

  return {
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    response: {
      attestationObject: bufferToBase64url(attestationResponse.attestationObject),
      clientDataJSON: bufferToBase64url(attestationResponse.clientDataJSON),
    },
    type: credential.type,
  };
}
