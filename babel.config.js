module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: '.',
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          alias: {
            "~": "./src",
          }
        },
      ],
<<<<<<< HEAD
      'react-native-reanimated/plugin',
      
=======
      [
        "module:react-native-dotenv", {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true
        }
      ]
>>>>>>> 3d9ecdc3d2c7cc99f45538b9c1e7cf60b954558b
    ],
  };
};
