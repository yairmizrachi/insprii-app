import { useState } from 'react'
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter } from 'expo-router'

import { authClient } from '~/utils/auth'

export default function Login() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [sent, setSent] = useState(false)
	const [loading, setLoading] = useState<'google' | 'magic' | null>(null)
	const [error, setError] = useState<string | null>(null)

	async function handleGoogle() {
		setLoading('google')
		setError(null)
		try {
			await authClient.signIn.social({ provider: 'google', callbackURL: '/' })
			router.replace('/')
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Google sign-in failed')
		} finally {
			setLoading(null)
		}
	}

	async function handleMagicLink() {
		if (!email) return
		setLoading('magic')
		setError(null)
		const res = await authClient.signIn.magicLink({ email, callbackURL: '/' })
		if (res.error) {
			setError(res.error.message ?? 'Failed to send magic link')
		} else {
			setSent(true)
		}
		setLoading(null)
	}

	return (
		<SafeAreaView className="bg-background flex-1">
			<Stack.Screen options={{ title: 'Sign in' }} />
			<View className="flex-1 justify-center gap-6 p-6">
				<View className="gap-1">
					<Text className="text-foreground text-center text-2xl font-semibold">Sign in</Text>
					<Text className="text-muted-foreground text-center text-sm">Choose a method to continue</Text>
				</View>

				{error ? <Text className="text-destructive text-center text-sm">{error}</Text> : null}

				<Pressable
					onPress={handleGoogle}
					disabled={loading !== null}
					className="border-border bg-background flex-row items-center justify-center gap-2 rounded-md border p-3"
				>
					{loading === 'google' ? <ActivityIndicator /> : <Text className="text-foreground text-base font-medium">Continue with Google</Text>}
				</Pressable>

				<View className="flex-row items-center gap-3">
					<View className="bg-border h-px flex-1" />
					<Text className="text-muted-foreground text-xs">or</Text>
					<View className="bg-border h-px flex-1" />
				</View>

				{sent ? (
					<View className="bg-muted rounded-md p-3">
						<Text className="text-foreground text-center text-sm">Check your inbox, we sent a sign-in link to {email}.</Text>
					</View>
				) : (
					<View className="gap-3">
						<TextInput
							value={email}
							onChangeText={setEmail}
							placeholder="Email address"
							autoCapitalize="none"
							keyboardType="email-address"
							autoComplete="email"
							className="border-border bg-background text-foreground rounded-md border p-3 text-base"
						/>
						<Pressable onPress={handleMagicLink} disabled={loading !== null} className="bg-primary items-center justify-center rounded-md p-3">
							{loading === 'magic' ? (
								<ActivityIndicator />
							) : (
								<Text className="text-primary-foreground text-base font-medium">Send magic link</Text>
							)}
						</Pressable>
					</View>
				)}
			</View>
		</SafeAreaView>
	)
}
