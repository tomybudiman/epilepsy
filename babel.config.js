module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@utils': './src/utils',
          '@store': './src/redux',
          '@styles': './src/styles',
          '@modules': './src/modules',
          '@components': './src/components',
          '@localization': './src/i18n/index',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        safe: true,
        path: '.env',
        blacklist: null,
        whitelist: null,
        moduleName: '@env',
        allowUndefined: false,
      },
    ],
    'optional-require',
  ],
};
