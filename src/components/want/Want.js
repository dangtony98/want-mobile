import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Highlight from '../filter/Highlight';
import { IMAGE_URL } from '../../services/variables/variables';
import numeral from 'numeral';
import moment from 'moment';

export default class Want extends Component {
    render() {
        const { cost, created_at, description, title, user, id } = this.props;
        const { 
            containerStyle,
            rowContainerStyle, 
            verticalContainerStyle, 
            imageStyle,
            titleStyle,
            textStyle
        } = styles;
        return (
            <View style={containerStyle}>
                <View 
                    style={[rowContainerStyle, {
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }]}
                >
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Profile', { user })}
                    >
                        <View style={rowContainerStyle}>
                            <Image 
                                style={imageStyle}
                                source={{ uri: `${IMAGE_URL}/${user.avatar}`}}
                            />
                            <View 
                                style={[verticalContainerStyle, { 
                                    marginLeft: 15 
                                }]}
                            >
                                <Text 
                                    style={[textStyle, { 
                                        fontFamily: 'roboto-medium', 
                                        color: 'rgb(0, 0, 0)' 
                                    }]}
                                >
                                    {user.first_name}
                                </Text>
                                <Text style={textStyle}>{`${moment(created_at).fromNow(true)} ago`}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text 
                        style={[textStyle, {
                            fontFamily: 'roboto-bold',
                            color: 'rgb(46,204,113)'
                        }]}
                    >
                        {cost == 0 ? 'FREE' : numeral(cost / 100).format('$0,0.00')}
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Want', { title, id })}
                    >
                        <Text style={titleStyle}>
                            {this.props.hit ? (<Highlight attribute="title" hit={this.props.hit} />) : title}
                        </Text>
                        <Text style={[textStyle, { marginTop: 10 }]}>
                            {this.props.hit ? (<Highlight attribute="description" hit={this.props.hit} />) : description}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 20,
        paddingBottom: 20
    },
    rowContainerStyle: {
        flexDirection: 'row'
    },
    verticalContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    imageStyle: {
        height: 42, 
        width: 42, 
        borderRadius: 21,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    titleStyle: {
        fontFamily: 'roboto-bold',
        fontSize: 20,
        lineHeight: 25
    },
    textStyle: {
        fontFamily: 'roboto-light',
        fontSize: 15,
        color: 'rgb(90, 95, 96)',
        lineHeight: 20
    }
});