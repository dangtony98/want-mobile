import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';
import ProfileSummary from '../profile/ProfileSummary';
import ProfileReviews from '../profile/ProfileReviews';
import { getProfile } from '../../services/api/profile';
import { createConvo } from '../../services/api/inbox';

export class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params.user;
        
        getProfile(id, (response) => {
            this.setState({
                ...this.state,
                loading: false,
                data: response.data
            });
        });
    }

    onCreateConvo = () => {
        const { id } = this.props.navigation.state.params.user;
        createConvo({
            wanter_id: this.props.id,
            fulfiller_id: id,
            want_id: null
        }, () => {
            this.props.navigation.navigate('Inbox');
        });
    }

    render() {
        const { 
            headerStyle,
            headingContainer,
            headingText
        } = styles;
        const { loading, data } = this.state;
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
                                        name="plus" 
                                        size={30} 
                                        color="rgb(189,195,199)" 
                                    />
                                }
                                type='clear'
                                onPress={() => this.props.navigation.goBack()}
                                style={{ marginLeft: 10 }}
                            />
                        </View>
                    </View>
                </Header>
                {(loading && data == null) ? (
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
                    <ScrollView 
                        style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}
                    >
                        <View style={{ flex: 1 }}>
                            <ProfileSummary data={data} />
                            {data.review.data.length > 0 && (
                                <View>
                                    <ProfileReviews 
                                        data={data.review.data} 
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            )}
                        </View>
                    </ScrollView>  
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
        paddingTop: 59,
        marginLeft: -15
    },
    headingContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 0.25,
        borderTopColor: 'rgb(189,195,199)'  
    },
    headingText: {
        fontFamily: 'roboto-medium',
        fontSize: 20
    }
});

const mapStateToProps = ({ admin }) => ({
    id: admin.id
});

export default connect(mapStateToProps)(ProfileScreen);