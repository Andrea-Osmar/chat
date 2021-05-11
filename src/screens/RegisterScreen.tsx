import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

interface Register {
	navigation: any;
}

export const RegisterScreen: React.FC<Register> = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	const register = () => {};

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style='light' />
			{/* <Text style={{ marginBottom: 50, fontSize: 20 }}>
				Create a Wave Chat account
			</Text> */}
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
