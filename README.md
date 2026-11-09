# Send A Scooter – Google sign-in page

Static page used by the Send A Scooter customer app (Android) for "Continue with Google".
The app opens it in Chrome with a one-time code; Google's button signs the person in; the Google ID token is
sent back to the app through an `intent://` link locked to the app's package (`za.co.sendascooter.app`).
The app checks the one-time code and signs in with Firebase itself. This page stores nothing.

Served by GitHub Pages. The page's origin must be listed under "Authorized JavaScript origins" of the
Firebase project's Web OAuth client in Google Cloud.
