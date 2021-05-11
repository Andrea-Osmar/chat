import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { auth } from '../../firebase';

interface Login {
	navigation: any;
}

export const LoginScreen: React.FC<Login> = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		// Does not add to the stack - replaces to Home screen
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace('Home');
			}
		});
		return unsubscribe;
	}, []);

	const signIn = () => {};

	return (
		<>
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<StatusBar style='light' />
				<Image
					source={{
						uri: 'https://cdn.pixabay.com/photo/2017/10/06/10/36/graphic-2822614_960_720.png',
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
				<Button
					containerStyle={styles.button}
					onPress={() => navigation.navigate('Register')}
					type='outline'
					title='Register'
				/>
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
		backgroundColor: '#fff',
	},
	inputContainer: { width: 300 },
	button: { width: 200, marginTop: 10 },
});
