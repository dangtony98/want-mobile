import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';

export default class PostScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name="plus" size={35} color={tintColor} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Post" />
            </View>
        );
    }
}