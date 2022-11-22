import 'dotenv/config';

export default {
  expo: {
    name: "ceunspMap",
    slug: "CeunspMap",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/playstore.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/playstore.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.ceunsp.map"
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    extra: {
      // Add your extra configs here
      ENV_BASE_ENDPOINT: process.env.ENV_BASE_ENDPOINT,
      eas: {
        projectId: "9b197e29-6890-4d14-8292-4fab693caa20"
      }
    }
  }
}
