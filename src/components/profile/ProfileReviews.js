import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import uuid from 'uuid';
import { IMAGE_URL } from '../../services/variables/variables';

export default ({ data, navigation }) => {
    console.log(navigation);
    console.log(data);
    const {
        listStyle,
        containerStyle,
        rowContainerStyle,
        verticalContainerStyle,
        imageStyle,
        textStyle
    } = styles;

    const renderRating = (rating) => {
        let ratingArr = [];

        for (let i = 0; i < rating; i++) {
            ratingArr.push(
                <Icon 
                    name="star" 
                    size={20} 
                    color="rgb(88, 42, 114)"
                    key={uuid()}
                />
            )
        }
        return ratingArr;
    }

    return (
        <FlatList 
            data={data}
            keyExtractor={(review) => String(review.id)}
            renderItem={({ item }) => (
                <View 
                    style={containerStyle}
                    key={item.id}
                >
                    <View 
                        style={[rowContainerStyle, {
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }]}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.push('Profile', { user: item.user })}
                        >
                            <View style={rowContainerStyle}>
                                <Image 
                                    source={{ uri: `${IMAGE_URL}/${item.user.avatar}`}}
                                    style={imageStyle}
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
                                        {item.user.first_name}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {renderRating(item.rating)}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text style={textStyle}>
                            {item.created_at ? moment(review.created_at).format('MMMM YYYY') : moment(item.user.created_at).format('MMMM YYYY')}
                        </Text>
                    </View>
                    <Text style={[textStyle, { marginTop: 15 }]}>
                        {item.feedback}
                    </Text>
                </View>
            )}
            style={listStyle}
        />
    );
}

const styles = StyleSheet.create({
    listStyle: {
        borderTopWidth: 0.25,
        borderTopColor: 'rgb(189,195,199)'
    },
    containerStyle: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 0.25,
        borderBottomColor: 'rgb(189,195,199)'    
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
        borderRadius: 21
    },
    textStyle: {
        fontFamily: 'roboto-light',
        fontSize: 15,
        color: 'rgb(90, 95, 96)',
        lineHeight: 20
    }
});