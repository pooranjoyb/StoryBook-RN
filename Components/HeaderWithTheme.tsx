import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const HeaderWithTheme = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <Pressable
            style={styles.headerContainer}
            onPress={toggleDarkMode}
        >
            <Text style={styles.buttonText}>
                {isDarkMode ? '🌞' : '🌙'}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default HeaderWithTheme;
