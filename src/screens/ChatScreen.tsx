import React, { useLayoutEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
	Keyboard,
	Platform,
	TextInput,
	TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { db, auth } from '../../firebase';
import firebase from 'firebase/app';

interface Chat {
	navigation: any;
	route: any;
}

export const ChatScreen: React.FC<Chat> = ({ navigation, route }) => {
	const [input, setInput] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Chat',
			headerTitleAlign: 'center',
			headerBackTitleVisible: false, // remove?

			headerTitle: () => (
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Avatar
						rounded
						source={{
							uri: 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif',
						}}
					/>
					<Text style={{ color: '#fff', marginLeft: 10, fontWeight: '700' }}>
						{route.params.chatName}
					</Text>
				</View>
			),

			headerLeft: () => (
				<TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
					<AntDesign name='arrowleft' size={24} color='#fff' />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const sendMessage = () => {
		Keyboard.dismiss();

		db.collection('chats').doc(route.params.id).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			massage: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL,
		});
		setInput('');
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
				keyboardVerticalOffset={90}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<ScrollView>{/*Chat here*/}</ScrollView>
						<View style={styles.footer}>
							<TextInput
								value={input}
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={sendMessage}
								placeholder='Message'
								style={styles.textInput}
							/>
							<TouchableOpacity onPress={sendMessage}>
								<Ionicons name='send' size={24} color='#2c6bed' />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: '#ECECEC',
		padding: 10,
		color: 'grey',
		borderRadius: 30,
	},
});
