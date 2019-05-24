import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';

export default class ProfileScreen extends Component {
    render() {
        const { headerStyle, containerStyle } = styles;
        console.log(this.props);
        return (
            <View style={{ flex: 1 }}>
                <Header title={`${this.props.navigation.state.params.user.first_name}`}>
                    <View style={headerStyle}>
                        <Button 
                            icon={
                                <Icon 
                                    name="chevron-left" 
                                    size={30} 
                                    color="rgb(189,195,199)" 
                                />
                            }
                            type='clear'
                            onPress={() => this.props.navigation.goBack()}
                        />
                        <View />
                    </View>
                </Header>
                <View style={containerStyle}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 44,
        marginLeft: -15
    },
    containerStyle: {
        
    }
});