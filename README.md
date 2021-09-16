# Amsterdam App

We’re creating a native app for Amsterdam citizens to receive information and interact with the municipality – much an
alternative to the web presences of [amsterdam.nl](https://www.amsterdam/nl)
and [Mijn Amsterdam](https://mijn.amsterdam.nl).

## Installation

The [React Native docs](https://reactnative.dev/docs/environment-setup) offer a good overview of how to set up your
development environment. To summarize:

- Clone repo: `git clone git@ssh.dev.azure.com:v3/CloudCompetenceCenter/Amsterdam-App/Amsterdam-App amsterdam-app`.
- Install Node dependencies: `npm i`.
- Install XCode dependencies: `cd amsterdam-app && pod install && cd ..`.
- Start [Metro](https://facebook.github.io/metro/), the JavaScript bundler for React Native: `npm start`. Or, more
  specifically:
    - Start the iOS-phone emulator: `npm run ios:phone`.
    - Start the iOS-tablet emulator: `npm run ios:tablet`.
    - Start the Android-phone emulator: `npm run android:phone`.
    - Start the Android-tablet emulator: `npm run android:phone`.
        - Make sure to add @Pixel_C_API_30 to your devices in Android Studio's AVD Manager
- We recommend installing this [React Native debugger](https://github.com/jhen0409/react-native-debugger) additionally:
  `brew install --cask react-native-debugger`.

## Publication

Follow the steps below to release a new version of the app into the (test) stores.

### Android

- Add your account to Gemeente Amsterdam’s developer account. To get access, send an e-mail to
  the [web team](mailto:webteamcommunicatiebureau@amsterdam.nl).
- Go to the [Google Play console](https://play.google.com/console/), log in, and verify that you have access to this
  app.
- Click on the app, then on “Internal test” on the left.
- Click the button "Create new release" in the upper-right. Follow the instructions to sign the app and, once done,
  upload your signed app bundle.
- Add release notes to the textarea at the bottom.
- Click “Save” and continue to "Review and publish".
- Select your test audience in the tab "Testers" testers. At the bottom, copy the link of the test app in the Play
  Store, and include it in an e-mail to your testers to allow downloading the new version of the app.

### iOS

- In Xcode, change the version in the “General” tab of your target.
- In the “Signing & Capabilities” tab, change “Bundle identifier for Signing (Release)” to:
  `org.reactjs.native.undefined.StadsApp`.
- Make sure the Build configuration is "Release" (Menu: Product > Scheme > Edit scheme)
- Make a backup of the app: Product -> Archive.
- Go to Window -> Organiser and select your archive. Click "Distribute App".
- Choose "App store connect", then "Upload".
- Select all distribution options and after that: "Automatically manage signing".
- Upload.
- Choose "No".
- The app is getting prepared. All the testers will receive an e-mail about the new release which they can download in
  TestFlight.
- Afterwards, turn the build configuration back to "Debug" for further development.

## Tips and tricks

1. To see what's in the async store, type `showAsyncStorageContentInDev()` in the React Native Debugger console.
