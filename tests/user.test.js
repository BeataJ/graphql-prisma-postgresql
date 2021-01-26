const getFirstName = require('../src/utils/user');

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Beata Jasinska');

  expect(firstName).toBe('Beata');
});

test('Should return first name when given first name', () => {
  const firstName = getFirstName('beata');

  expect(firstName).toBe('beata');
});
