import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { CustomListItem } from '../components/CustomListItem';

interface Home {
	navigation: any;
}

export const HomeScreen: React.FC<Home> = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Wave Chat',
			headerStyle: { backgroundColor: '#fff' },
			headerTitleStyle: { color: '#000' },
			headerTintColor: '#000',
		});
	}, []);

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				<CustomListItem />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {},
});
