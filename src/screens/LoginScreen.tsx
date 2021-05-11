import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = () => {};

	return (
		<>
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<StatusBar style='light' />
				<Image
					source={{
						uri: 'https://lh3.googleusercontent.com/proxy/-mslS4u40Li4X1WiWhPnTTnW8oyCvJE6HKVKZSB6EZwULkniDmUaKKFMYNiBjXNzeGGeeDs1Te34cu0vtLMa9npbvR0fh1wNS6b5Ibdqs0PTR5u4Pw',
					}}
					style={{ width: 200, height: 200, marginBottom: 20 }}
				/>
				<View style={styles.inputContainer}>
					<Input
						placeholder='Email'
						autoFocus
						type='email'
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<Input
						placeholder='Password'
						secureTextEntry
						type='password'
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>
				</View>
				<Button containerStyle={styles.button} onPress={signIn} title='Login' />
				<Button containerStyle={styles.button} type='outline' title='Register' />
			</KeyboardAvoidingView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	inputContainer: { width: 300 },
	button: { width: 200, marginTop: 10 },
});
