import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { CustomListItem } from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../firebase';

interface Home {
	navigation: any;
}

export const HomeScreen: React.FC<Home> = ({ navigation }) => {
	const signOutUser = () => {
		auth.signOut().then(() => {
			navigation.replace('Login');
		});
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Wave Chat',
			headerStyle: { backgroundColor: '#fff' },
			headerTitleStyle: { color: '#000' },
			headerTintColor: '#000',

			headerLeft: () => (
				<View style={{ margin: 20, marginBottom: 20 }}>
					<TouchableOpacity onPress={signOutUser}>
						<Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
						<Text>{auth.currentUser?.displayName}</Text>
					</TouchableOpacity>
				</View>
			),
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
