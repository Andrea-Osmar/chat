import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<View>
				<StatusBar style='light' />
				<Image
					source={{
						uri: 'https://lh3.googleusercontent.com/proxy/-mslS4u40Li4X1WiWhPnTTnW8oyCvJE6HKVKZSB6EZwULkniDmUaKKFMYNiBjXNzeGGeeDs1Te34cu0vtLMa9npbvR0fh1wNS6b5Ibdqs0PTR5u4Pw',
					}}
					style={{ width: 200, height: 200, marginBottom: 20 }}
				/>
			</View>
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
				<Button containerStyle={styles.button} title='Login' />
				<Button containerStyle={styles.button} type='outline' title='Register' />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	inputContainer: {},
	button: {},
});
