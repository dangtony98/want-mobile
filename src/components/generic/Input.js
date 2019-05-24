import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input as TextInput } from 'react-native-elements';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    render() {
        const { value } = this.props;
        const { placeholder, onFocus, onBlur, onChangeText, secureTextEntry } = this.props;
        const { inputStyle, inputContainerStyle } = styles;
        return (
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
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        borderRadius: 5,
        borderColor: 'rgb(189,195,199)',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        color: 'rgb(0, 0, 0)',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 1,
        fontFamily: 'roboto-medium',
        fontSize: 15
    },
    inputContainerStyle: {
        borderBottomWidth: 0    
    }
});