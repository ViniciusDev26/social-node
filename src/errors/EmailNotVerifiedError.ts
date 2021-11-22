class EmailNotVerifiedError extends Error {
  constructor(email: string) {
    super(`Email ${email} is not verified`);
    this.name = 'EmailNotVerifiedError';
  }
}

export { EmailNotVerifiedError };