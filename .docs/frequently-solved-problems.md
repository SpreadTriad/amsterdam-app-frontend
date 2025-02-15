# Frequently solved problems

Here we document useful tips and solutions to (relatively) common problems with building the app.

## Ruby install issues

If you run into issues installing the correct Ruby version via gems, you can manually install the correct version using http://rbenv.org/ or https://rvm.io/

## react-native start fails

Sometimes building the JS fails due to caching issues, for example after changes in the import aliases or the babel config. If the cause of the issue is unclear, a good place to start is to clear all relevant caches:

- `$ npm cache clear -f` (clear npm cache)
- `$ watchman watch-del-all` (clear watchman cache)
- `$ npx react-native start --reset-cache` (clear metro cache and start RN)

## Android or iOS build fails

When faced with an unclear error during the native build, some options are:

- Remove `package-lock.json` and `/node_modules`
- Run `npm i`

## iOS specific

Occasionally a build fails because of outdated data in the build folder. When building with XCode, there is an option to clear the build folder: CMND+SHIFT+K. Alternatively, you can usually find the path to the build folder in the build/error logs and manually delete the folder.

- Remove `ios/Pods` and `Podfile.lock`
- In `/ios`:
  - `bundle update` (update Ruby gems, including Cocoapods)
  - `pod install --repo-update` (install Pods and force downloading the latest versions of the repos)

After you've reinstalled npm packages and pods, it can happen that pods have been downgraded. Whenever this is the case, do the following:

- Run `pod repo update` (Updates the local clone of pods + versions)
- If some pods are still downgraded, run `pod update` (Updates the pods to the latest version possible)

### Archive failed

During the Fastlane `build_app` task:

```shell
** ARCHIVE FAILED **
[...]
Exit status: 65
```

This will happen if in Xcode, in the list of "Supported Destinations" there are destinations other than iPhone and iPad, e.g. "Mac Catalyst" or "Mac designed for iPhone" (see: https://stackoverflow.com/questions/74275390/fastlane-with-xcode-14-archive-failed). If any target has any "Mac" destination, the build may fail. Known issue (sort of) for Xcode 14; seen with Xcode 14.3.

## Sentry pod issue

Installing the Sentry pod may result in an invalid syntax in `project.pbxproject` which will cause the build to fail on an unclear error.

```
SyntaxError: Expected "{" [...] but ";" found
```

The solution is to rewrite this:

```
{
  value = D76C6CCC2729820200E1460A;
  comment = ;
},
```

To this:

```
  D76C6CCC2729820200E1460A,
```
