import firebase from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../firebase';

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
		<View style={styles.container}>
			<View>
				{userData.map(({ id, data }) => (
					<View key={id}>
						<Text>{data.name}</Text>
						<Text>{
							if (data.online)
							
						(data.online)} </Text>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#a6d6d6',
	},
});