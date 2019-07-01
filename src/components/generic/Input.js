import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as TextInput } from 'react-native-elements';

export default ({ type, value, placeholder, onFocus, onBlur, onChangeText, secureTextEntry, keyboardType, multiline, numberOfLines, textArea }) => {
    const { 
        solidInputStyle, 
        clearInputStyle,
        inputContainerStyle 
    } = styles;
    return (
        <TextInput 
            placeholder={placeholder}
            placeholderTextColor="rgb(189,195,199)"
            value={value}
            onChangeText={(text) => onChangeText(text)}
            onFocus={onFocus}
            onBlur={onBlur}
            inputStyle={[type == 'solid' ? solidInputStyle : clearInputStyle, (textArea == true) && { height: 200 }, type == 'textarea' && { borderBottomWidth: 0 }]}
            inputContainerStyle={inputContainerStyle}
            containerStyle={{ flex: 1 }}
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
        />
    );
}

const styles = StyleSheet.create({
    solidInputStyle: {
        borderRadius: 5,
        borderColor: 'rgb(189,195,199)',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        color: 'rgb(90, 95, 96)',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 1,
        fontFamily: 'roboto-medium',
        fontSize: 15
    },
    clearInputStyle: {
        borderBottomWidth: 0.25,
        borderBottomColor: 'rgb(189,195,199)',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 15,
        color: 'rgb(90, 95, 96)',
        fontFamily: 'roboto-medium',
        fontSize: 15
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        alignSelf: 'stretch'
    }
});