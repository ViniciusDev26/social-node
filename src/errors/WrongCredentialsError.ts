class WrongCredentialsError extends Error{
  constructor() {
    super('email or password is wrong');
    this.name = 'WrongCredentialsError';
  }
}

export { WrongCredentialsError };