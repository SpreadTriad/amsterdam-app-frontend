# Amsterdam App

We are creating a native app for citizens, entrepreneurs, and visitors of the City of Amsterdam to provide information, allow communication, and streamline transactions.

## Installation

The [React Native docs](https://reactnative.dev/docs/environment-setup) offer a good overview of how to set up your development environment. Specific instructions for this project:

- Clone the repository
  - from Azure: `git clone git@ssh.dev.azure.com:v3/CloudCompetenceCenter/Amsterdam-App/Amsterdam-App amsterdam-app-frontend`
  - or from GitHub: `git clone git@github.com:Amsterdam/amsterdam-app-frontend.git` (please check if it is up to date)
- Set Node version
  - Install the used node version:
    - Linux/MacOS: `nvm install`
    - Windows: `nvm install $(Get-Content .nvmrc)`
  - Select the used node version
    - Linux/MacOS: `nvm use`
    - Windows: `nvm use $(Get-Content .nvmrc)`
- Install Node dependencies: `npm i`.
- For iOS development, install other dependencies:
  - Check if you have Ruby Gems (`gem -v`), if not, install via homebrew `brew install brew-gem` or <https://rubygems.org/>
  - Install bundler (Ruby gem manager): `gem install bundler:2.4.16`
  - Install/update the gems with bundler: `bundle update`
  - Go to `/ios`
  - Install pods: `pod install`
- Get the necessary files and add them to the project
  - See "Secret files" below
- To run the app on a simulator/emulator
  - Start the iOS phone simulator: `npm run ios:phone:dev`
  - Start the Android phone emulator: `npm run android:phone:dev`
  - Other options are available: to build a production version of the app or to run on tablet simulator/emulator
    - Make sure to add @Pixel_C_API_30 to your devices in Android Studio's AVD Manager (Android tablet emulator)
- We recommend installing the [Flipper](https://fbflipper.com/) debugger

### Secret files

To build the app locally, you need these files. Because they contain credentials or API keys, they are not part of the repo, but stored securely.

#### Keepass

You can find these files in the Keepass database. To access this database:

- Clone the [Keepass repo](https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_git/Keepass)
- Make sure you are in the `main` branch to have access to the most recent file `KP Database.kdbx`
- Install a [Keepass client](https://keepass.info/) and use it to open the `.kpdx` file
- Request the password from a colleague
- The files can be found in Keepass under `General` and `Signing`

#### Files

- `.env` - Environment variables to be used in the JS. This should be added to the project root. Also see `.env.example`.
- `sentry.properties` - The Sentry config/key for both platforms. This should be added to the project root.
- `android/app/google-services.json` - Production Firebase config/key for Android ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/android:nl.amsterdam.app)).
- `android/app/src/debug/google-services.json` - Development Firebase config/key for Android ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/android:nl.amsterdam.app.dev)).
- `ios/GoogleService-Info-Prod.plist` - Production Firebase config/key for iOS ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/ios:nl.amsterdam.app)).
- `ios/GoogleService-Info-Test.plist` - Development Firebase config/key for iOS ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/ios:nl.amsterdam.app.dev)).

## Git

Our workflow and approach is documented [here](https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_wiki/wikis/Amsterdam-App.wiki/11135/Samenwerken-aan-code)

## Push notifications

To test push notifications locally, do the following:

1. Log into Chrome with the Team Communicare account
2. Go to <https://developers.google.com/oauthplayground/>
3. Fill in for scope: `https://www.googleapis.com/auth/firebase.messaging`
4. Select Team Communicare account
5. Click button ‘Exchange authorization code for tokens’ and get the `access_token`
6. Open your Postman app
7. Set header: `Authorization: Bearer /[access_token/]`
8. Enter body of this signature, where `token` is the Firebase token of your device (see code):

```json
{
  "message": {
    "token": "alovelyfcmtoken",
    "data": {
      "linkSourceid": "f296eba1-189f-477e-8302-44ffc369f032",
      "type": "WarningCreatedByProjectManager"
    },
    "notification": {
      "body": "Er is nieuws over een project!",
      "title": "Nieuws-update Bullebak"
    }
  }
}
```

## Deeplinks

These are links from outside the app that will open the app and trigger something:

- Authorizing project managers: `amsterdam://project-manager/:id` (`id` is generated by our backend).

## Keep your code secure

Add new files containing API keys or credentials to `.gitignore`. These files may not be pushed to the repo.

We use `detect-secrets` to scan the codebase for secrets. This results in a .secrets.baseline file in the root of the project:

- <https://github.com/Yelp/detect-secrets>

## Storybook

- Run locally with `npm run storybook`
- [Production URL] (<https://amsterdam.github.io/amsterdam-app-storybook>)

## Icons

- When creating an icon, please copy the SVG code from [ASC](https://amsterdam.github.io/amsterdam-styled-components) and add it to the assets folder.
- Optimise the markup through [SVGOMG](https://jakearchibald.github.io/svgomg/) with the default options. We aim for minimal SVG markup and usage of `path` elements only.
- Import the icon from within the app repository.

## Typescript

- Global types are defined in `src/custom.d.ts`

## Issues

We still wait for issues to be solved in library's we use. Once solved, we can clean up the code. These are:

### React Navigation

- [Incorrect screen reader focus on transition](https://github.com/react-navigation/react-navigation/issues/7056) (Clean-up: Search code for issue.)

### React Native

- [Accessibility for nested text components](https://github.com/facebook/react-native/issues/32004) (Clean-up: Search code for issue.)
- [Can't focus into text fields, Android + external keyboard](https://github.com/facebook/react-native/issues/31820) (Clean-up: revert commit 39bf5d8a)

### Piwik Pro

- [TypeScript typing not working and not available](https://github.com/PiwikPRO/react-native-piwik-pro-sdk/issues/55) (Clean-up: Search code for issue.)

## More documentation

More documentation can be found in the `.docs` folder:

- [Build documentation](./.docs/build.md)
- [Pushing code to GitHub](./.docs/push-code-to-github.md)
- [Cache durations](./.docs/cache-durations.md)
- [Troubleshooting](./.docs/frequently-solved-problems.md)
- [Sentry](./.docs/sentry.md)
- [Test automation](./.docs/test-automation.md)
