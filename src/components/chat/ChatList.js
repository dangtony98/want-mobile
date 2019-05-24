import React, { Component } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { IMAGE_URL } from '../../services/variables/variables';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ClassList extends Component {
    componentDidMount() {
        console.log(`Screen width: ` + SCREEN_WIDTH);
    }

    render() {
        const { sender, receiver, messages } = this.props;
        const { 
            senderWrapperStyle,
            senderMessageStyle,
            receiverWrapperStyle,
            receiverMessageStyle,
            messageStyle,
            imageStyle,
            placeholderImageStyle,
            textStyle
        } = styles;
        return (
            <FlatList 
                data={messages.reverse()}
                keyExtractor={(message) => String(message.id)}
                showsVerticalScrollIndicator={false}
                inverted
                renderItem={({item, index }) => (
                    <View style={[index != messages.length - 1 && { marginBottom: 15 }]}>
                        <View 
                            style={
                                item.user_id == sender.id ? 
                                senderWrapperStyle : 
                                receiverWrapperStyle
                            }
                        >
                            {(item.user_id != sender.id && (messages[index- 1] ? item.user_id != messages[index - 1].user_id : true)) ? (
                                <Image 
                                    source={{ uri: `${IMAGE_URL}/${receiver.avatar}`}}
                                    style={[imageStyle, { marginRight: 15 }]}
                                />
                            ) : (
                                <View 
                                    style={[placeholderImageStyle, { marginRight: 15 }]}
                                />
                            )}
                            <View
                                style={
                                    item.user_id == sender.id ? 
                                    [senderMessageStyle, messageStyle, ((item.message && item.message.length > 30) && { flex: 1 })] : 
                                    [receiverMessageStyle, messageStyle, ((item.message && item.message.length) > 30 && { flex: 1 })]
                                }
                            >
                                <Text 
                                    style={[textStyle, item.user_id == sender.id ?
                                        { color: 'rgb(88, 42, 114)' } :
                                        { color: 'rgb(90, 95, 96)' }
                                    ]}
                                >
                                    {item.message}
                                </Text> 
                            </View>
                            {(item.user_id == sender.id && (messages[index - 1] ? item.user_id != messages[index - 1].user_id : true)) ? (
                                <Image 
                                    source={{ uri: `${IMAGE_URL}/${sender.avatar}`}}
                                    style={[imageStyle, { marginLeft: 15 }]}
                                />
                            ) : (
                                <View 
                                    style={[placeholderImageStyle, { marginLeft: 15 }]}
                                />
                            )}
                        </View>
                    </View>
                )}
                style={{  flex: 1 }}
            />
        )
    }
}

const styles = StyleSheet.create({
    senderWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
    },
    receiverWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    senderMessageStyle: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgb(88, 42, 114)'
    },
    receiverMessageStyle: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgb(90, 95, 96)'
    },
    messageStyle: {
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    imageStyle: {
        height: 42, 
        width: 42, 
        borderRadius: 19,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    placeholderImageStyle: {
        height: 38, 
        width: 38, 
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    textStyle: {
        fontFamily: 'roboto-light',
        fontSize: 15,
        lineHeight: 20
    }
});