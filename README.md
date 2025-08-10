# Welcome to easywebauthn 👋

[![Version](https://img.shields.io/npm/v/easywebauthn.svg)](https://www.npmjs.com/package/easywebauthn)

> The EasyWebAuthN project helps reduce the amount of work needed to incorporate WebAuthn into a website.

## Install

```sh
npm install easywebauthn@latest
```

## Exported Methods

The `easywebauthn` package exports two primary methods for WebAuthn integration:

- `startRegistration`: Initiates the WebAuthn registration process.
- `startAuthentication`: Initiates the WebAuthn authentication process.

**Note**: Utility methods (`bufferToBase64url`, `base64ToBuffer`, `base64urlToBuffer`, `credentialToJSON`) are internal and not exported for external use.

## Types

| Type | Description | Fields |
|------|-------------|--------|
| `StartRegistrationOptions` | Configuration for WebAuthn registration | `challenge: string`<br>`rp: { name: string }`<br>`user: { id: string, name: string, displayName: string }`<br>`pubKeyCredParams: PublicKeyCredentialParameters[]`<br>`timeout?: number`<br>`attestation?: AttestationConveyancePreference`<br>`authenticatorSelection?: AuthenticatorSelectionCriteria`<br>`extensions?: AuthenticationExtensionsClientInputs` |
| `StartAuthenticationOptions` | Configuration for WebAuthn authentication | `challenge: string`<br>`allowCredentials?: PublicKeyCredentialDescriptor[]`<br>`timeout?: number`<br>`userVerification?: UserVerificationRequirement`<br>`extensions?: AuthenticationExtensionsClientInputs` |
| `RegistrationResult` | Result of WebAuthn registration | `id: string`<br>`rawId: string`<br>`response: { attestationObject: string, clientDataJSON: string }`<br>`type: PublicKeyCredentialType`<br>`clientExtensionResults: AuthenticationExtensionsClientOutputs` |
| `AuthenticationResult` | Result of WebAuthn authentication | `id: string`<br>`rawId: string`<br>`response: { authenticatorData: string, clientDataJSON: string, signature: string, userHandle: string \| null }`<br>`type: PublicKeyCredentialType`<br>`clientExtensionResults: AuthenticationExtensionsClientOutputs` |

## Usage

### `startRegistration`

Initiates the WebAuthn registration process to create a new public key credential.

**Parameters**:
- `options: StartRegistrationOptions`
  - `challenge`: Base64url-encoded challenge string.
  - `user`: Object containing user details (`id`, `name`, `displayName`).
  - `excludeCredentials`: Optional array of credentials to exclude (`id`, `type`).
  - Other WebAuthn `PublicKeyCredentialCreationOptions` properties.

**Returns**:
- `Promise<RegistrationResult>`:
  - `id`: Credential ID.
  - `rawId`: Base64url-encoded raw credential ID.
  - `response`: Object containing:
    - `attestationObject`: Base64url-encoded attestation object.
    - `clientDataJSON`: Base64url-encoded client data JSON.
  - `type`: Credential type.

**Example**:
```javascript
import { startRegistration } from 'easywebauthn';

const options = {
  challenge: 'base64url-challenge',
  rp: { name: 'Example Corp' },
  user: {
    id: 'base64url-user-id',
    name: 'user@example.com',
    displayName: 'User Name',
  },
  pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
};

const result = await startRegistration(options);
console.log(result);
```

**Throws**:
- `Error`: If WebAuthn is not supported by the browser or if credential creation fails.

### `startAuthentication`

Initiates the WebAuthn authentication process to verify a user's identity.

**Parameters**:
- `options: StartAuthenticationOptions`
  - `challenge`: Base64url-encoded challenge string.
  - `allowCredentials`: Optional array of allowed credentials (`id`, `type`, `transports`).
  - `timeout`: Optional timeout in milliseconds.
  - `userVerification`: Optional user verification requirement (`preferred`, `required`, `discouraged`).

**Returns**:
- `Promise<AuthenticationResult>`: JSON representation of the WebAuthn assertion.

**Example**:
```javascript
import { startAuthentication } from 'easywebauthn';

const options = {
  challenge: 'base64url-challenge',
  allowCredentials: [{ id: 'base64url-cred-id', type: 'public-key', transports: ['usb'] }],
  timeout: 60000,
  userVerification: 'preferred',
};

const assertion = await startAuthentication(options);
console.log(assertion);
```

## Author

👤 **Timur Lebedev**

- Website: [itlebedev.ru](https://itlebedev.ru)
- Github: [@scheffio](https://github.com/scheffio)

## Show your support

Give a ⭐️ if this project helped you!