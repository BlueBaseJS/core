import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
    // Material design blue from https://material.google.com/style/color.html#color-color-palette
		backgroundColor: '#2196F3',
		borderRadius: 2,
		color: 'white',
		fontWeight: '500',
		padding: 8,
		textAlign: 'center',
	},
	buttonDisabled: {},
	text: {
		color: 'white',
		fontWeight: '500',
		padding: 8,
		textAlign: 'center',
	},
	textDisabled: {
		color: '#a1a1a1',
	},
});