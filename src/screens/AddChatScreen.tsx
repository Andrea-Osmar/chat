import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../firebase';

interface AddChat {
	navigation: any;
}

export const AddChatScreen: React.FC<AddChat> = ({ navigation }) => {
	const [input, setInput] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Add a new Chat',
			headerBackTitle: 'Chats', // working?
			headerTintColor: '#fff',
		});
	}, [navigation]);

	const createChat = async () => {
		await db
			.collection('chats')
			.add({
				chatName: input,
			})
			.then(() => {
				navigation.goBack();
			})
			.catch((error) => alert(error));
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder='Enter a chat name'
				value={input}
				onChangeText={(text) => setInput(text)}
				onSubmitEditing={createChat}
				leftIcon={<Icon name='wechat' type='antdesign' size={24} color='#000' />}
			/>
			<Button disabled={!input} onPress={createChat} title='Create a new Chat' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 30,
		height: '100%',
	},
});
