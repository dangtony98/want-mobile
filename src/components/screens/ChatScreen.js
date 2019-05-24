import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';
import Input from '../generic/Input';
import ChatList from '../chat/ChatList';
import { getMessages, seenMessages } from '../../services/api/inbox';

export class ChatScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pusher: null,
            convo_id: null,
            messages: [],
            sender: null,
            receiver: null,
            chatInput: ''
        }
    }
    componentDidMount() {
        const { convo_id } = this.props.navigation.state.params;
        const { admin } = this.props;

        getMessages(convo_id, (response) => {
            const data = response.data;
            const adminIsSender = admin.id == data.wanter.id;
            console.log('getMessages response: ');
            console.log(response.data);

            this.setState({
                ...this.state,
                convo_id: data.id,
                messages: data.messages,
                sender: adminIsSender ? data.wanter : data.fulfiller,
                receiver: adminIsSender ? data.fulfiller : data.wanter
            });
        })

    }

    render() {
        const { 
            headerStyle, 
            contentStyle,
            inputContainerStyle
        } = styles;
        const { sender, receiver, messages, chatInput } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {receiver && (
                    <View style={{ flex: 1 }}>
                        <Header title={`${receiver.first_name}`}>
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
                        <View style={contentStyle}>
                            <ChatList
                                sender={sender}
                                receiver={receiver}
                                messages={messages}
                            />
                        </View>
                        <View style={inputContainerStyle}>
                            <Input 
                                value={chatInput}
                                placeholder='Send "hello"'
                                // onFocus={() => this.handleInputFocus(true)}
                                // onBlur={() => this.handleInputFocus(false)}
                                // onChangeText={(text) => this.setState({ ...this.state, searchTerm: text})}
                            />
                        </View>
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
        paddingTop: 44,
        marginLeft: -15
    },
    contentStyle: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    inputContainerStyle: {
        flex: 0.15,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgb(237,240,241)'
    }
});

const mapStateToProps = ({ admin }) => ({
    admin
});

export default connect(mapStateToProps)(ChatScreen);