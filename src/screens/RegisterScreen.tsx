import React, { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../firebase';
interface Register {
	navigation: any;
}

export const RegisterScreen: React.FC<Register> = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Back',
			title: 'Register for Waves',
			headerTintColor: '#fff',
		});
	}, [navigation]);

	const register = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: displayName,
					photoURL:
						imageUrl ||
						'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
				});
			})
			.catch((error) => alert(error.messge));
	};

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style='light' />

			<View style={styles.inputContainer}>
				<Input
					type='text'
					placeholder='Full Name'
					autoFocus
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<Input
					placeholder='Display Name'
					type='text'
					value={displayName}
					onChangeText={(text) => setDisplayName(text)}
				/>
				<Input
					placeholder='Email'
					type='email'
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder='Password'
					type='password'
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
				<Input
					placeholder='Profile Picture (optional)'
					type='text'
					value={imageUrl}
					onChangeText={(text) => setImageUrl(text)}
					onSubmitEditing={register}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				title='Register'
				onPress={register}
				raised
			/>
		</KeyboardAvoidingView>
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
