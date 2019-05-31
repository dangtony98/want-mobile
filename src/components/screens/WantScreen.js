import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import numeral from 'numeral';
import Header from '../generic/Header';
import SendInput from '../generic/SendInput';
import WantComments from '../want/WantComments';
import { getWant, commentWant } from '../../services/api/want';
import { createConvo } from '../../services/api/inbox';
import { IMAGE_URL } from '../../services/variables/variables';

export class WantScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            want: null,
            commentInput: '',
            comments: []
        }
    }
    componentDidMount() {
        const { id } = this.props.navigation.state.params;

        getWant(id, (response) => {
            this.setState({
                ...this.state,
                want: response.data.want,
                comments: response.data.want.comments
            });
        });
    }

    onCreateConvo = () => {
        const { want } = this.state;
        const { admin } = this.props;
        createConvo({
            wanter_id: admin.id,
            fulfiller_id: want.user.id,
            want_id: want.id
        }, () => {
            this.props.navigation.navigate('Inbox');
        });
    }

    onPostComment = () => {
        const { commentInput, want} = this.state;
        const { admin } = this.props;
        commentWant(commentInput, want.id, () => {
            this.setState((prevState) => ({
                ...this.state,
                commentInput: '',
                comments: [...prevState.comments, {
                    user: {
                        id: admin.id,
                        avatar: admin.photo
                    },
                    body: commentInput.trim(),
                    created_at: new Date(),
                    replies: []
                }]
            }));
            this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
        });
    }

    render() {
        const { 
            headerStyle, 
            containerStyle,
            bottomContainerStyle,
            rowContainerStyle,
            verticalContainerStyle,
            imageStyle,
            titleStyle,
            textStyle 
        } = styles;
        const { want, comments, commentInput } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header title="">
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
                        <View style={{ flexDirection: 'row' }}>
                            <Button 
                                icon={
                                    <Icon 
                                        name="message-square" 
                                        size={30} 
                                        color="rgb(189,195,199)" 
                                    />
                                }
                                type='clear'
                                onPress={() => this.onCreateConvo()}
                            />
                            <Button 
                                icon={
                                    <Icon 
                                        name="bookmark" 
                                        size={30} 
                                        color="rgb(189,195,199)" 
                                    />
                                }
                                type='clear'
                                onPress={() => this.onCreateConvo()}
                                style={{ marginLeft: 10 }}
                            />
                        </View>
                    </View>
                </Header>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref="scrollView"
                >
                    <View style={containerStyle}>
                        {want && (
                            <View style={{ flex: 1 }}>
                                <View 
                                    style={[rowContainerStyle, {
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }]}
                                >
                                    <TouchableOpacity 
                                        onPress={() => this.props.navigation.navigate('Profile', { user: want.user })}
                                    >
                                        <View style={rowContainerStyle}>
                                            <Image 
                                                style={imageStyle}
                                                source={{ uri: `${IMAGE_URL}/${want.user.avatar}`}}
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
                                                    {want.user.first_name}
                                                </Text>
                                                <Text style={textStyle}>{`${moment(want.created_at).fromNow(true)} ago`}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Text 
                                        style={[textStyle, {
                                            fontFamily: 'roboto-bold',
                                            color: 'rgb(46,204,113)'
                                        }]}
                                    >
                                        {want.cost == 0 ? 'FREE' : numeral(want.cost / 100).format('$0,0.00')}
                                    </Text>
                                </View>
                                <View style={bottomContainerStyle}>
                                    <Text style={titleStyle}>
                                        {want.title}
                                    </Text>
                                    <Text style={[textStyle, { marginTop: 10 }]}>
                                        {want.description}
                                    </Text>
                                </View>
                                <WantComments 
                                    comments={comments}
                                    navigation={this.props.navigation}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
                <KeyboardAvoidingView
                    behavior="padding" 
                    keyboardVerticalOffset={0}
                    enabled
                >
                    <SendInput
                        value={commentInput} 
                        placeholder="Write a comment"
                        buttonTitle="Post"
                        onChangeText={(text) => {
                            this.setState({... this.state, commentInput: text })
                        }}
                        onEnter={this.onPostComment}
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 59,
        marginLeft: -15
    },
    containerStyle: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    bottomContainerStyle: {
        paddingTop: 10,
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

const mapStateToProps = ({ admin }) => ({
    admin
});

export default connect(mapStateToProps)(WantScreen);