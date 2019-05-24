import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

export default ({ title, children }) => {
    const { containerStyle, textStyle } = styles;
    return (
        <View style={[containerStyle, children && { paddingTop: 0 }]}>
            <View>
                {children}
            </View>
            <Text style={textStyle}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 90,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
    },
    textStyle: {
        fontSize: 30,
        color: 'rgb(88, 42, 114)',
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
        marginTop: 5
    }
});