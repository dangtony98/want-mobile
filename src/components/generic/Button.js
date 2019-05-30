import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default ({ title, type, onPress }) => {
    const { 
        solidButtonStyle,
        clearButtonStyle,
        solidTextStyle,
        clearTextStyle
    } = styles;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={
                type == 'solid' ? 
                solidButtonStyle : clearButtonStyle
            }
        >
            <Text 
                style={
                    type == 'solid' ? 
                    solidTextStyle : clearTextStyle
                }
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    solidButtonStyle: {
        backgroundColor: 'rgb(88, 42, 114)',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 1,
        alignSelf: 'stretch'
    },
    clearButtonStyle: {
        backgroundColor: 'transparent',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'stretch'
    },
    solidTextStyle: {
        fontSize: 15,
        fontFamily: 'roboto-medium',
        alignSelf: 'center',
        color: 'rgb(255, 255, 255)'
    },
    clearTextStyle: {
        fontSize: 15,
        fontFamily: 'roboto-medium',
        alignSelf: 'center',
        color: 'rgb(88, 42, 114)'
    }
});