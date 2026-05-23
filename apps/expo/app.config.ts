import type { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: 'Your App',
	slug: 'your-app',
	scheme: 'yourapp',
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
		bundleIdentifier: 'your.bundle.identifier', // e.g. com.yourcompany.yourappname
		supportsTablet: true,
		icon: './assets/images/app-icon-ios.png',
	},
	android: {
		package: 'your.bundle.identifier',
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
			projectId: process.env.EAS_PROJECT_ID,
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
				// Reversed iOS Google client ID from GoogleService-Info.plist
				iosUrlScheme: 'com.googleusercontent.apps.YOUR_REVERSED_CLIENT_ID',
			},
		],
	],
})
