
export interface StartRegistrationOptions {
  challenge: string
  rp: {
    name: string
  }
  user: {
    id: string
    name: string
    displayName: string
  }
  pubKeyCredParams: PublicKeyCredentialParameters[]
  timeout?: number
  attestation?: AttestationConveyancePreference
  authenticatorSelection?: AuthenticatorSelectionCriteria
  extensions?: AuthenticationExtensionsClientInputs
}

export interface StartAuthenticationOptions {
  challenge: string
  allowCredentials?: PublicKeyCredentialDescriptor[]
  timeout?: number
  userVerification?: UserVerificationRequirement
  extensions?: AuthenticationExtensionsClientInputs
}

export interface RegistrationResult {
  id: string
  rawId: string
  response: {
    attestationObject: string
    clientDataJSON: string
  }
  type: PublicKeyCredentialType
  clientExtensionResults: AuthenticationExtensionsClientOutputs
}

export interface AuthenticationResult {
  id: string
  rawId: string
  response: {
    authenticatorData: string
    clientDataJSON: string
    signature: string
    userHandle: string | null
  }
  type: PublicKeyCredentialType
  clientExtensionResults: AuthenticationExtensionsClientOutputs
}

declare global {
  type StartRegistrationOptions = import('./webauthn-types').StartRegistrationOptions
  type StartAuthenticationOptions = import('./webauthn-types').StartAuthenticationOptions
  type RegistrationResult = import('./webauthn-types').RegistrationResult
  type AuthenticationResult = import('./webauthn-types').AuthenticationResult
}