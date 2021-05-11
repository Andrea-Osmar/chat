import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export const CustomListItem = () => {
	return (
		<ListItem>
			<Avatar
				rounded
				source={{
					uri: 'http://www.damodarcollege.edu.in/web/wp-content/uploads/2021/01/sample-photo1.jpg',
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: 'bold' }}>Wave Chat</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode={'tail'}>
					Subtitle Text
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

const styles = StyleSheet.create({});
