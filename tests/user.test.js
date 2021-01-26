const { getFirstName, isValidPassword } = require('../src/utils/user');

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Beata Jasinska');

  expect(firstName).toBe('Beata');
});

test('Should return first name when given first name', () => {
  const firstName = getFirstName('beata');

  expect(firstName).toBe('beata');
});

test('Should reject password shorter than 8 character', () => {
  const shorterPassword = isValidPassword('1234567');

  expect(shorterPassword).toBe(false);
});

test('Should reject password that contains word password', () => {
  const rejectPassword = isValidPassword('password');

  expect(rejectPassword).toBe(false);
});

test('Should correctly validate a valid password', () => {
  const isValid = isValidPassword('Test123456!');

  expect(isValid).toBe(true);
});
