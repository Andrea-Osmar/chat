import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export const ListAllUsers = () => {
	return (
		<View style={styles.container}>
			<Text>List of All users</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#a6d6d6',
	},
});
