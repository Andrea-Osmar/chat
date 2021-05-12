import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth, db } from '../../firebase';
import { CustomListItem } from '../components/CustomListItem';
import { ListAllUsers } from '../components/ListAllUsers';

interface Home {
	navigation: any;
}
interface enterChat {
	id: any;
	chatName: any;
}

export const HomeScreen: React.FC<Home> = ({ navigation }) => {
	const [chats, setChats] = useState([]);

	const signOutUser = () => {
		auth.signOut().then(() => {
			navigation.replace('Login');
		});
	};

	useEffect(() => {
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
			title: 'Wave Chat',
			headerStyle: { backgroundColor: '#fff' },
			headerTitleStyle: { color: '#000' },
			headerTintColor: '#000',

			headerLeft: () => (
				<View style={{ marginLeft: 20, marginBottom: 10, marginTop: 10 }}>
					<TouchableOpacity onPress={signOutUser}>
						<Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
						<Text>{auth.currentUser?.displayName}</Text>
					</TouchableOpacity>
				</View>
			),

			headerRight: () => (
				<View
					style={{
						marginRight: 20,
					}}>
					<TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
						<SimpleLineIcons name='speech' size={24} color='black' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat: React.FC<enterChat> = (id, chatName) => {
		navigation.navigate('Chat', {
			id,
			chatName,
		});
	};

	return (
		<SafeAreaView>
			<StatusBar style='dark' />

			<ScrollView style={styles.container}>
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
	container: { height: '100%' },
});
