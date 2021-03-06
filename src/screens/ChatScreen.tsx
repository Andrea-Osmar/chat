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
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { db, auth } from '../../firebase';
import firebase from 'firebase/app';

interface Chat {
	navigation: any;
	route: any;
}

export const ChatScreen: React.FC<Chat> = ({ navigation, route }) => {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Chat',
			headerTitleAlign: 'center',
			headerBackTitleVisible: false, // remove?

			headerTitle: () => (
				<View style={styles.header}>
					<Avatar
						rounded
						source={{
							uri:
								messages[0]?.data.photoURL ||
								'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
						}}
					/>

					<Text style={styles.headerTitle}>{route.params.chatName}</Text>
				</View>
			),

			headerLeft: () => (
				<TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
					<AntDesign name='arrowleft' size={24} color='#fff' />
				</TouchableOpacity>
			),
		});
	}, [navigation, messages]);

	const sendMessage = () => {
		Keyboard.dismiss();
		// Create chat collection in Firebase
		db.collection('chats').doc(route.params.id).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL,
		});
		setInput('');
	};

	useLayoutEffect(() => {
		const unsubscribe = db
			.collection('chats')
			.doc(route.params.id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
		return unsubscribe;
	}, [route]);

	return (
		<SafeAreaView style={styles.areaContainer}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
				keyboardVerticalOffset={90}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<ScrollView contentContainerStyle={{ paddingTop: 15 }}>
							{messages.map(({ id, data }) =>
								data.email === auth.currentUser.email ? (
									<View key={id} style={styles.reciever}>
										<Avatar
											rounded
											size={30}
											position='absolute'
											bottom={-15}
											right={-5}
											source={{
												uri: data.photoURL,
											}}
											//Web
											containerStyle={{ position: 'absolute', bottom: -15, right: -5 }}
										/>
										<Text style={styles.recieverText}> {data.message} </Text>
									</View>
								) : (
									<View key={id} style={styles.sender}>
										<Avatar
											rounded
											position='absolute'
											size={30}
											bottom={-10}
											left={-5}
											source={{
												uri: data.photoURL,
											}}
											// For Web
											containerStyle={{
												position: 'absolute',
												left: -5,
												bottom: -10,
											}}
										/>
										<Text style={styles.senderText}> {data.message} </Text>
										<Text style={styles.senderText}>/{data.displayName} </Text>
									</View>
								)
							)}
						</ScrollView>
						<View style={styles.footer}>
							<TextInput
								value={input}
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={sendMessage}
								placeholder='Enter Message'
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
	areaContainer: { flex: 1, backgroundColor: '#fff' },
	header: { flexDirection: 'row', alignItems: 'center' },
	headerTitle: { color: '#fff', marginLeft: 10, fontWeight: '700' },
	backButton: { marginLeft: 10 },
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
	reciever: {
		padding: 15,
		backgroundColor: '#ECECEC',
		alignSelf: 'flex-end',
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: '80%',
		position: 'relative',
	},
	sender: {
		padding: 15,
		backgroundColor: '#6b9bff',
		alignSelf: 'flex-start',
		borderRadius: 20,
		margin: 15,
		maxWidth: '80%',
		position: 'relative',
	},
	recieverText: {
		fontWeight: '500',
		marginLeft: 10,
	},
	senderText: {
		paddingLeft: 10,
		fontWeight: '500',
		marginBottom: 15,
	},
});
