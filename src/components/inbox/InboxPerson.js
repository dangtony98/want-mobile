import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGE_URL } from '../../services/variables/variables';
import moment from 'moment';

export class InboxPerson extends Component {
    constructor(props) {
        super(props);

        this.state = {
            receiver: null,
            want: null,
            convo_id: null
        }
    }

    componentDidMount() {
        const { admin, fulfiller, wanter, want, id } = this.props;
        const adminIsSender = admin.id == wanter.id;
        this.setState({
            ...this.state,
            receiver: adminIsSender ? fulfiller : wanter,
            want,
            convo_id: id
        });
    }

    render() {
        const { receiver, want, convo_id } = this.state;
        const { updated_at, unseen_count } = this.props;
        const { 
            containerStyle,
            rowContainerStyle,
            verticalContainerStyle,
            imageStyle,
            nameStyle,
            textStyle 
        } = styles;
        return (
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Chat', {
                    receiver,
                    want,
                    convo_id
                })}
                style={[containerStyle]}
            >
                {receiver && (
                    <View>
                        <View 
                            style={[rowContainerStyle, {
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }]}
                        >
                            <View style={rowContainerStyle}>
                                <Image 
                                    style={imageStyle}
                                    source={{ uri: `${IMAGE_URL}/${receiver.avatar}`}}
                                />
                                <View 
                                    style={[verticalContainerStyle, { 
                                        marginLeft: 15
                                    }]}
                                >
                                    <Text style={nameStyle}>
                                        {receiver.first_name}
                                    </Text>
                                    <Text style={textStyle}>
                                        {want ? want.title : '-'}
                                    </Text>
                                </View>
                            </View>
                            <View style={verticalContainerStyle}>
                                <Text style={textStyle}>
                                    {`${moment(updated_at).fromNow(true)}`}
                                </Text>
                                <Text style={textStyle}>
                                    {unseen_count == 0 ? '' : unseen_count}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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
        height: 52, 
        width: 52, 
        borderRadius: 24,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    nameStyle: {
        fontFamily: 'roboto-medium',
        fontSize: 20,
        color: 'rgb(0, 0, 0)',
        lineHeight: 20
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

export default connect(mapStateToProps)(InboxPerson);