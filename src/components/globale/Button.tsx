import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    backgroundColor?: string;
    textColor?: string;
    style?: object;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, backgroundColor = '#007BFF', textColor = '#FFFFFF', style,disabled }) => {
    return (
        <TouchableOpacity
        disabled={disabled}
            style={[styles.button, { backgroundColor }, style]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    },
});

export default Button;