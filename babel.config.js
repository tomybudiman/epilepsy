module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@utils': './src/utils',
          '@store': './src/redux',
          '@modules': './src/modules',
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
  ],
};
