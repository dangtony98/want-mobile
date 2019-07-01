import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pusher from 'pusher-js/react-native';
import { View, Text, AsyncStorage, KeyboardAvoidingView, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';
import ChatList from '../chat/ChatList';
import SendInput from '../generic/SendInput';
import { getMessages, sendMessage, seenMessages } from '../../services/api/inbox';
import { WANT_URL } from '../../services/variables/variables';

export class ChatScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            pusher: null,
            convo_id: null,
            messages: [],
            sender: null,
            receiver: null,
            chatInput: ''
        }
    }
    
    async componentDidMount() {
        const { convo_id, receiver } = this.props.navigation.state.params;
        const { admin } = this.props;
        Pusher.logToConsole = true;

        this.setState({ ...this.state, receiver });

        await AsyncStorage.getItem('token').then((token) => { 
            const pusher = new Pusher('78565ef6078f239cd16c', {
                cluster: 'us2',
                encrypted: true,
                authEndpoint: `${WANT_URL}/broadcasting/auth`,
                auth: {
                    headers: { 
                        Accept: 'application/json', 
                        Authorization: `Bearer ${token}` 
                    }
                }      
            });

            const channel = pusher.subscribe(`private-chat.${convo_id}`);
            channel.bind("App\\Events\\MessageSentEvent", (data) => {
                this.setState({
                    ...this.state,
                    messages: [data.message, ...this.state.messages]
                });
            });
    
            channel.bind('pusher:subscription_error', function(status) {
                console.log('pusher:subscription_error details: ');
                console.log(status);
            });
        });

        getMessages(convo_id, (response) => {
            const data = response.data;
            const adminIsSender = admin.id == data.wanter.id;

            this.setState({
                ...this.state,
                loading: false,
                convo_id: data.id,
                messages: data.messages.reverse(),
                sender: adminIsSender ? data.wanter : data.fulfiller,
                // receiver: adminIsSender ? data.fulfiller : data.wanter
            });
            seenMessages(convo_id);

        });
    }

    onSendMessage = () => {
        const { convo_id, chatInput } = this.state;
        sendMessage({
            convo_id,
            message: chatInput.trim()
        }, () => {
            this.setState({
                ...this.state,
                chatInput: ''
            });
        });
    }

    render() {
        const { 
            headerStyle, 
            headerTextStyle,
            contentStyle,
            placeholderView
        } = styles;
        const { loading, convo_id, sender, receiver, messages, chatInput } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {receiver && (
                    <View style={{ flex: 1 }}>
                        <Header>
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
                                <Text style={headerTextStyle}>{receiver.first_name}</Text>
                                <View style={placeholderView} />
                            </View>
                        </Header>
                        <View style={contentStyle}>
                            {loading ? (
                                <View 
                                    style={{ 
                                        flex: 1, 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }}
                                >
                                    <ActivityIndicator 
                                        size="small"
                                        color="rgb(88, 42, 114)"
                                    />
                                </View>
                            ) : (
                                <ChatList
                                    sender={sender}
                                    receiver={receiver}
                                    messages={messages}
                                />
                            )}
                        </View>
                        <KeyboardAvoidingView 
                            behavior="padding" 
                            keyboardVerticalOffset={0}
                            enabled
                        >
                            <SendInput 
                                value={chatInput}
                                placeholder='Write a message'
                                buttonTitle="Send"
                                onChangeText={(text) => {
                                    this.setState({ ...this.state, chatInput: text });
                                }}
                                onEnter={this.onSendMessage}
                            />
                        </KeyboardAvoidingView>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 59,
    },
    headerTextStyle: {
        fontFamily: 'roboto-medium',
        fontSize: 17.5,
        color: 'rgb(0, 0, 0)',
        lineHeight: 20
    },
    placeholderView: {
        width: 50
    },
    contentStyle: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    }
});

const mapStateToProps = ({ admin }) => ({
    admin
});

export default connect(mapStateToProps)(ChatScreen);