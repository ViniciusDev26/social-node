class VerificationCodeError extends Error {
  constructor() {
    super('Error to verification code');
    this.name = "VerificationCodeError";
  }
}

export { VerificationCodeError };