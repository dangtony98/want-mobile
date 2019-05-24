import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => {
    const { containerStyle, textStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={textStyle}>want</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textStyle: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'rgb(88, 42, 114)'
    }
});