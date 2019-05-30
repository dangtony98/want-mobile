import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';

export default class UserScreen extends Component {
    render() {
        const { headerStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Header title="Hello Tuan,">
                    <View style={headerStyle}>
                        <View />
                        <Button 
                            icon={
                                <Icon 
                                    name="settings" 
                                    size={30} 
                                    color="rgb(189,195,199)" 
                                />
                            }
                            type='clear'
                            onPress={() => this.props.navigation.navigate('Settings')}
                        />
                    </View>
                </Header>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 59
    }
});