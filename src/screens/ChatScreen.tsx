import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

interface Chat {
	navigation: any;
	route: any;
}

export const ChatScreen: React.FC<Chat> = ({ navigation, route }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Chat',
			headerTitleAlign: 'center',
			headerBackTitleVisible: false, // remove?

			headerTitle: () => (
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Avatar
						rounded
						source={{
							uri: 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif',
						}}
					/>
					<Text style={{ color: '#fff', marginLeft: 10, fontWeight: '700' }}>
						{route.params.chatName}
					</Text>
				</View>
			),

			headerLeft: () => (
				<TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
					<AntDesign name='arrowleft' size={24} color='#fff' />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View>
			<Text>{route.params.chatName}</Text>
		</View>
	);
};

const styles = StyleSheet.create({});
