import isEmail from 'validator/lib/isEmail'

export const emptySignUpInput = {
  email: '',
  password: '',
  repeatPassword: '',
}

export const isPasswordValid = (p) => p.length > 5

export const isInputValid = (input) =>
  !!input.email &&
  isEmail(input.email) &&
  !!input.password &&
  isPasswordValid(input.password) &&
  !!input.repeatPassword &&
  input.password === input.repeatPassword &&
  !!input.firstName &&
  !!input.lastName
