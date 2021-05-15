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
				<ListItem.Title
					h5
					style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20 }}>
					{' '}
					User Status
				</ListItem.Title>
			</ListItem>
			<ListItem bottomDivider containerStyle={styles.container}>
				{userData.map(({ id, data }) => (
					<ListItem.Title style={styles.users} key={id}>
						<ListItem.Title style={{ marginRight: 20, fontSize: 15 }}>
							{data.online === true ? <Text>🟢</Text> : <Text>🔴</Text>}
						</ListItem.Title>
						<Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
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
		//flexWrap: 'wrap',
	},

	users: {
		marginBottom: 10,
	},
});

/*

return (
		<View style={styles.container}>
			<View>Users </View>
			<ListItem>
				{userData.map(({ id, data }) => (
					<View key={id} style={styles.userList} bottomDivider>
						<Text style={{ marginRight: 10, fontWeight: 'bold' }}>{data.name}</Text>
						{data.online === true ? <Text>🟢</Text> : <Text>🔴</Text>}
					</View>
				))}
			</ListItem>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#a6d6d6',
		flex: 1,
		marginTop: 20,
	},
	userList: {
		marginLeft: 10,
		flex: 1,
		flexDirection: 'column',
	},
});


*/
