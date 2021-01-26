const getFirstName = require('../src/utils/user');

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Beata Jasinska');

  if (firstName !== 'Beata') {
    throw new Error('Expected the string  Beata');
  }
});
