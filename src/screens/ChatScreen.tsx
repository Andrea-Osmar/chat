import React, { useLayoutEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

interface Chat {
	navigation: any;
	route: any;
}

export const ChatScreen: React.FC<Chat> = ({ navigation, route }) => {
	const [input, setInput] = useState('');

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

	const sendMessage = () => {};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
				keyboardVerticalOffset={90}>
				<>
					<ScrollView>{/*Chat here*/}</ScrollView>
					<View style={styles.footer}>
						<TextInput
							value={input}
							onChangeText={(text) => setInput(text)}
							placeholder='Message'
							style={styles.textInput}
						/>

						<TouchableOpacity onPress={sendMessage}>
							<Ionicons name='send' size={24} color='#2c6bed' />
						</TouchableOpacity>
					</View>
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: '#ECECEC',
		padding: 10,
		color: 'grey',
		borderRadius: 30,
	},
});

/*<Text>{route.params.chatName}</Text>*/
