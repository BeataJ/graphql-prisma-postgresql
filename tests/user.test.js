const getFirstName = require('../src/utils/user');

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Beata Jasinska');

  expect(firstName).toBe('Beata');

  // if (firstName !== 'Beata') {
  //   throw new Error('Expected the string  Beata');
  // }
});
