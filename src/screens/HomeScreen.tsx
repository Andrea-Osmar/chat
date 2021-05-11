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
import { SimpleLineIcons } from '@expo/vector-icons';

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
				<View style={{ margin: 20 }}>
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
