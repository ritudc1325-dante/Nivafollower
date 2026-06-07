// File generated from google-services.json (project: newprojectniva)
// DO NOT EDIT manually — re-generate if you update Firebase settings

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) return web;
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.windows:
        return windows;
      default:
        return android;
    }
  }

  // ── Android (from google-services.json) ──────────────────
  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDPEHEImi4OwLEWjlsvRTbSoxolbGpP5dY',
    appId: '1:712567778818:android:1225e6a6c6527e708d411b',
    messagingSenderId: '712567778818',
    projectId: 'newprojectniva',
    storageBucket: 'newprojectniva.firebasestorage.app',
  );

  // ── iOS (from GoogleService-Info.plist) ──────────────────
  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyCy8J6kt2PRz2SolqCe6Rq87LBs0F5q91g',
    appId: '1:712567778818:ios:488b72c8d3880f078d411b',
    messagingSenderId: '712567778818',
    projectId: 'newprojectniva',
    storageBucket: 'newprojectniva.firebasestorage.app',
    databaseURL: 'https://newprojectniva-default-rtdb.firebaseio.com',
    iosBundleId: 'ritu.raj7',
  );

  // ── Web ──────────────────────────────────────────────────
  // Add a Web app in Firebase Console to get real web credentials
  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDPEHEImi4OwLEWjlsvRTbSoxolbGpP5dY',
    appId: '1:712567778818:android:1225e6a6c6527e708d411b',
    messagingSenderId: '712567778818',
    projectId: 'newprojectniva',
    storageBucket: 'newprojectniva.firebasestorage.app',
  );

  // ── Windows Desktop ──────────────────────────────────────
  // Windows uses same project, no separate config file needed
  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyDPEHEImi4OwLEWjlsvRTbSoxolbGpP5dY',
    appId: '1:712567778818:android:1225e6a6c6527e708d411b',
    messagingSenderId: '712567778818',
    projectId: 'newprojectniva',
    storageBucket: 'newprojectniva.firebasestorage.app',
  );
}
