import firebase from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../firebase';
import { ListItem, Avatar } from 'react-native-elements';
import { Divider } from 'react-native-elements';

import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

export const ListAllUsers = () => {
	const [userData, setUserData] = useState([]);
	useEffect(() => {
		const userList = db.collection('users').onSnapshot((snapshot) =>
			setUserData(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
		//console.log('userlist', userList);
		return userList;
	}, []);

	console.log('userdata', userData);
	return (
		<>
			<ListItem bottomDivider containerStyle={styles.container}>
				<ListItem.Title h5 style={styles.title}>
					User Status
				</ListItem.Title>
			</ListItem>
			<ListItem bottomDivider containerStyle={styles.container}>
				{userData.map(({ id, data }) => (
					<ListItem.Title style={styles.users} key={id}>
						<ListItem.Title style={styles.status}>
							{data.online === true ? <Text>🟢</Text> : <Text>🔴</Text>}
						</ListItem.Title>
						<Text style={styles.text}>{data.name}</Text>
					</ListItem.Title>
				))}
			</ListItem>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		minWidth: '100%',
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'column',
	},
	title: {
		fontWeight: 'bold',
		marginBottom: 10,
		fontSize: 20,
	},
	text: { fontWeight: 'bold' },
	status: {
		marginRight: 20,
		fontSize: 15,
	},
	users: {
		marginBottom: 10,
	},
});
