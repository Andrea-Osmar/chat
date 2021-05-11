import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../../firebase';

interface Custom {
	id: any;
	chatName: any;
	enterChat: any;
}

export const CustomListItem: React.FC<Custom> = ({
	id,
	chatName,
	enterChat,
}) => {
	const [chatMessages, setChatMessages] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) =>
				setChatMessages(snapshot.docs.map((doc) => doc.data()))
			);
		return unsubscribe;
	}, []);
	return (
		<ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
			<Avatar
				rounded
				source={{
					uri:
						chatMessages?.[0]?.photoURL ||
						'http://www.damodarcollege.edu.in/web/wp-content/uploads/2021/01/sample-photo1.jpg',
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: 'bold' }}>{chatName}</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode={'tail'}>
					{chatMessages?.[0]?.dislayName}// {chatMessages?.[0]?.message}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

const styles = StyleSheet.create({});
