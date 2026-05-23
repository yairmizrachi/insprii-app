import type { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: 'Insprii',
	slug: 'insprii',
	scheme: 'insprii',
	version: '0.1.0',
	orientation: 'portrait',
	icon: './assets/icon-light.png',
	userInterfaceStyle: 'automatic',
	updates: {
		fallbackToCacheTimeout: 0,
	},
	newArchEnabled: true,
	assetBundlePatterns: ['**/*'],
	ios: {
		bundleIdentifier: 'app.insprii.app',
		supportsTablet: true,
		icon: './assets/images/app-icon-ios.png',
	},
	android: {
		package: 'app.insprii.app',
		icon: './assets/images/app-icon-android-legacy.png',
		adaptiveIcon: {
			foregroundImage: './assets/images/app-icon-android-adaptive-foreground.png',
			backgroundImage: './assets/images/app-icon-android-adaptive-background.png',
		},
		allowBackup: false,
		edgeToEdgeEnabled: true,
	},
	extra: {
		eas: {
			projectId: '2077f102-5567-45d2-8bae-acca2ae52a60',
		},
	},
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
		reactCanary: true,
		reactCompiler: true,
	},
	plugins: [
		'expo-router',
		'expo-secure-store',
		'expo-web-browser',
		[
			'expo-splash-screen',
			{
				image: './assets/images/app-icon-android-adaptive-foreground.png',
				imageWidth: 300,
				resizeMode: 'contain',
				backgroundColor: '#191015',
			},
		],
		[
			// @see https://react-native-google-signin.github.io/docs/setting-up/expo
			'@react-native-google-signin/google-signin',
			{
				iosUrlScheme: 'com.googleusercontent.apps.499811428950-ah6rk49c2k0e2av4dfsse22gl9gkbnqo',
			},
		],
	],
})
