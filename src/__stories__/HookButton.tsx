import React, { useState } from 'react';

import { Button } from 'react-native';
export default function HookButton() {
	const [buttonText, setButtonText] = useState('Click me, please');
	function handleClick() {
		return setButtonText('Thanks, been clicked!');
	}
	return <Button onPress={handleClick} title={buttonText} />;
}
