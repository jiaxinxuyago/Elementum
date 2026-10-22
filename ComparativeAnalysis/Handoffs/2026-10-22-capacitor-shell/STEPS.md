# The Capacitor shell · steps on the owner's Mac (STORE-3, branch `capacitor-shell`)

> Prepared 2026-10-22 from the cloud session. The branch carries the config, the native adapter and the scripts; it does not carry the `ios/` and `android/` projects (they need Xcode and the Android SDK to generate and build, and they bake in the bundle id). Nothing on this branch changes the web app's behaviour: every native call is a no-op on the web.

## 0 · Before
- Register the bundle id under STORE-1 (Apple) and STORE-2 (Google Play), and put it in `capacitor.config.ts` → `appId` (placeholder today: `life.elementum.app`).
- Xcode 16+, CocoaPods, Android Studio with SDK 35, Node 22.

## 1 · Build the web app and add the platforms
```
git checkout capacitor-shell
cd Elementum_App
npm install
npm run build
npx cap add ios
npx cap add android
npx cap sync
```
`cap sync` copies `dist/` into both projects and installs the plugin pods. Run it after every `npm run build`.

## 2 · Open and run
```
npx cap open ios        # Xcode → pick a simulator or your iPhone → Run
npx cap open android    # Android Studio → Run
```
`npm run cap:ios` / `npm run cap:android` do build + sync + open in one go.

## 3 · What to check on the device (the WebKit pass the cloud session cannot do)
The app's CSS leans on a few features that are fine on current iOS but worth eyeballing once on a real phone:
- `color-mix()` tints (75 uses: the presence bars, the balance box, the tile veils) — iOS 16.2+.
- `mask-image` fades (the Naming's peaks and island, the first reading's ground) — prefixed and unprefixed are both set.
- `mix-blend-mode: multiply` (the island under the Naming) and `backdrop-filter` (the tab bar).
- `text-wrap: balance` on titles — iOS 17.5+; older WebKit simply ignores it.
- The dissolve: after the last card the seal descends onto the wheel, the five dots ink in, the album emerges.
- Safe areas: the journey's first row sits under the status bar on no screen (fixed 2026-10-22; the DevBar's Device shell previews it on desktop).
- Scrolling: the card runs tap left/right; the Almanac ribbons scroll sideways without the page rubber-banding.
- Share: the identity card opens the native share sheet with the image attached.

## 4 · Still to do under STORE-3 (owner accounts)
- In-app purchase and Play Billing with the dual-grantor webhook.
- Push: Web Push does not carry over; move the Almanac reminders to APNs / FCM (INF_01 §4.4).
- Sign in with Apple once Google sign-in ships in-store.
- App icons and the launch screen in the native projects (the PWA icons in `public/icons` are the source).
- TestFlight, then review (budget one rejection; astrology-category scrutiny).
