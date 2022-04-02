const base = require('@srclaunch/dx/.eslintrc');

module.exports = {
  ...base,
  overrides: [
    {
      rules: {
        'no-console': 'off',
        'functional/prefer-readonly-type': 'off',
      },
    },
  ],
};
