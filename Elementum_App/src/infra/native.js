// ===================================================================
// ELEMENTUM · the native shell adapter (Capacitor, STORE-3)
// ===================================================================
// One file stands between the web app and the native shell. On the web
// every function is a no-op or the existing browser path; inside the
// Capacitor wrap the plugins load on demand (dynamic imports, so the web
// bundle never carries them). Nothing else in the app knows which it is.
//   isNative()        true inside the iOS / Android wrap
//   initNative()      status bar style, Android back button → history
//   shareFile(blob)   the native share sheet with the card image, or
//                     'web' so the caller uses navigator.share / download
// ===================================================================

const cap = () => (typeof window !== 'undefined' ? window.Capacitor : null);

export function isNative() {
  const c = cap();
  return !!(c && typeof c.isNativePlatform === 'function' && c.isNativePlatform());
}

export async function initNative() {
  if (!isNative()) return;
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    // The app ground is paper: a light status bar with dark glyphs. The web
    // view runs under the bar; the app's own safe-area padding clears it.
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setOverlaysWebView({ overlay: true });
  } catch { /* the plugin is absent on this platform */ }
  try {
    const { App } = await import('@capacitor/app');
    // Android back: step the hash history; on the first screen, let the OS
    // background the app rather than closing it dead.
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) window.history.back(); else App.minimizeApp();
    });
  } catch { /* the plugin is absent on this platform */ }
}

// Writes the PNG to the app's cache and hands its file URL to the native
// share sheet. Returns 'shared' | 'cancelled' | 'web' (fall back to the web
// path) — the caller keeps its download fallback.
export async function shareFile(blob, { filename = 'elementum-card.png', title, text } = {}) {
  if (!isNative()) return 'web';
  try {
    const [{ Filesystem, Directory }, { Share }] = await Promise.all([import('@capacitor/filesystem'), import('@capacitor/share')]);
    const data = await new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result).split(',')[1]); r.onerror = reject; r.readAsDataURL(blob); });
    const file = await Filesystem.writeFile({ path: filename, data, directory: Directory.Cache });
    await Share.share({ title, text, files: [file.uri], dialogTitle: title });
    return 'shared';
  } catch (e) {
    if (e && /cancel/i.test(String(e.message || e))) return 'cancelled';
    return 'web';
  }
}
