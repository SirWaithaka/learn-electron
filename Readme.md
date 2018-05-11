## Electron Lessons

### Lesson 5

#### Keytar
A native Node module to get, add, replace, and delete passwords in system's keychain. On macOS the passwords are managed by the Keychain, on Linux they are managed by the Secret Service API/libsecret, and on Windows they are managed by Credential Vault.

In this lesson we store sensitive data using system level libraries provided by the OS. To achieve this we use node module `[keytar v4.2.1](https://www.npmjs.com/package/keytar)`.

All functions in this version of keytar node module are asynchronous and return a promise. Always remember to catch errors.
