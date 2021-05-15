import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth, db } from '../../firebase';
import { ListItem, Avatar } from 'react-native-elements';

import { CustomListItem } from '../components/CustomListItem';
import { ListAllUsers } from '../components/ListAllUsers';
import firebase from 'firebase/app';

interface Home {
	navigation: any;
}

export const HomeScreen: React.FC<Home> = ({ navigation }) => {
	const [chats, setChats] = useState([]);

	// Create user collection in firebase
	const UserOnline = (bool: Boolean) => {
		db.collection('users').doc(auth.currentUser?.uid).set({
			name: auth.currentUser?.displayName,
			lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
			online: bool,
		});
	};

	const signOutUser = () => {
		UserOnline(false);

		auth.signOut().then(() => {
			navigation.replace('Login');
		});
	};

	useEffect(() => {
		UserOnline(true);
		const unsubscribe = db.collection('chats').onSnapshot((snapshot) =>
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);

		return unsubscribe;
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Waves Chat',
			headerTitleStyle: { color: '#fff' },
			headerTintColor: '#fff',

			headerLeft: () => (
				<View style={styles.headerLeft}>
					<TouchableOpacity onPress={signOutUser}>
						<Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
						<Text style={styles.text}>{auth.currentUser?.displayName}</Text>
					</TouchableOpacity>
				</View>
			),

			headerRight: () => (
				<View style={styles.headerRight}>
					<TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
						<SimpleLineIcons name='speech' size={24} color='#fff' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat = (id: any, chatName: any) => {
		navigation.navigate('Chat', {
			id,
			chatName,
		});
	};

	return (
		<SafeAreaView>
			<StatusBar style='dark' />
			<ScrollView style={styles.container}>
				<ListItem bottomDivider>
					<ListItem.Title h5 style={styles.title}>
						Chat Rooms
					</ListItem.Title>
				</ListItem>

				{chats.map(({ id, data: { chatName } }) => (
					<CustomListItem
						key={id}
						id={id}
						chatName={chatName}
						enterChat={enterChat}
					/>
				))}

				<ListAllUsers />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { height: '100%', backgroundColor: '#fff' },
	headerLeft: { marginLeft: 20, marginBottom: 10, marginTop: 10 },
	headerRight: {
		marginRight: 20,
	},
	text: { color: '#fff' },
	title: { fontWeight: 'bold', marginBottom: 10, fontSize: 20 },
});
