import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input as TextInput } from 'react-native-elements';
import Button from './Button';

export default class SendInput extends Component {
    render() {
        const { value, placeholder, onFocus, onBlur, onChangeText, secureTextEntry, onEnter, buttonTitle } = this.props;
        const { containerStyle, inputStyle, inputContainerStyle } = styles;
        return (
            <View style={containerStyle}>
                <TextInput 
                    placeholder={placeholder}
                    placeholderTextColor="rgb(189,195,199)"
                    value={value}
                    onChangeText={(text) => onChangeText(text)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    inputStyle={inputStyle}
                    inputContainerStyle={inputContainerStyle}
                    containerStyle={{ flex: 1 }}
                    autoCorrect={false}
                    secureTextEntry={secureTextEntry}
                />
                <Button
                    title={buttonTitle}
                    type="clear"
                    onPress={() => onEnter()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 10,
        borderTopWidth: 0.25,
        borderTopColor: 'rgb(189,195,199)'
    },
    inputStyle: {
        flex: 1,
        backgroundColor: '#fff',
        color: 'rgb(90, 95, 96)',
        fontFamily: 'roboto-light',
        fontSize: 15
    },
    inputContainerStyle: {
        flex: 1,
        borderBottomWidth: 0    
    }
});