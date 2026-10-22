import type { CapacitorConfig } from '@capacitor/cli';

// ELEMENTUM · the native shell (STORE-3). The web build in dist/ is the app;
// the shell adds the store identity, the status bar and the share sheet.
// appId: set to the bundle id registered under STORE-1 / STORE-2 before
// `npx cap add ios` / `npx cap add android` (it is baked into both projects).
const config: CapacitorConfig = {
  appId: 'life.elementum.app',
  appName: 'Elementum',
  webDir: 'dist',
  backgroundColor: '#F1E9D6',          // the paper ground, behind the web view
  ios: {
    contentInset: 'never',             // the app pads its own safe areas (env())
    backgroundColor: '#F1E9D6',
    preferredContentMode: 'mobile',
    allowsLinkPreview: false,
  },
  android: {
    backgroundColor: '#F1E9D6',
    allowMixedContent: false,
  },
  plugins: {
    StatusBar: { style: 'LIGHT', overlaysWebView: true },
    SplashScreen: { launchShowDuration: 0 },
  },
};

export default config;
