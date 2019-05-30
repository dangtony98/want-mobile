import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGE_URL } from '../../services/variables/variables';

export class WantComment extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            replyActive: false,
            replies: [],
            collapsedReplies: true
        }
    }

    componentDidMount() {
        
    }

    render() {
        const { comment, navigation } = this.props;
        const { 
            containerStyle,
            imageStyle,
            commentStyle,
            textStyle 
        } = styles;
        return (
            <View style={containerStyle}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile', { user: comment.user })}
                >
                    <Image 
                        style={imageStyle}
                        source={{ uri: `${IMAGE_URL}/${comment.user.avatar}` }}
                    />
                </TouchableOpacity>
                <View style={[commentStyle, comment.body.length > 32 && { flex: 1 }]}>
                    <Text style={textStyle}>{comment.body}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingBottom: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    commentStyle: {
        // flex: 1,
        marginLeft: 15,
        borderRadius: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: 'rgb(90, 95, 96)'
    },
    textStyle: {
        fontFamily: 'roboto-light',
        fontSize: 15,
        lineHeight: 20,
        color: 'rgb(90, 95, 96)'
    }
});

const mapStateToProps = ({ admin }) => ({
    admin
});

export default connect(mapStateToProps)(WantComment);
