import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default ({ title, type, onPress }) => {
    const { buttonStyle } = styles;
    return (
        <Button 
            title={title}
            type={type ? type : 'solid'}
            onPress={onPress}
            buttonStyle={buttonStyle}
        />
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'rgb(88, 42, 114)',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 1
    }
});