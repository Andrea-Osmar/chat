import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { AddChatScreen } from './src/screens/AddChatScreen';
import { ChatScreen } from './src/screens/ChatScreen';

const globalScreenOptions = {
	// Global styling for all screens
	headerStyle: { backgroundColor: '#6874f9' },
	headerTitleStyle: { color: '#fff' },
};
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				//initialRouteName='Home' // Forcing to Homescreen
				screenOptions={globalScreenOptions}>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{ title: 'Sign in to Waves' }}
				/>
				<Stack.Screen name='Register' component={RegisterScreen} />
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='AddChat' component={AddChatScreen} />
				<Stack.Screen name='Chat' component={ChatScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
