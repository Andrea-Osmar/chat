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

export const HomeScreen = () => {
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
