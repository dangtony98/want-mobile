import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, ActivityIndicator, Modal, Keyboard, StyleSheet } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';
import Button from '../generic/Button';
import ProfileSummary from '../profile/ProfileSummary';
import ProfileReviews from '../profile/ProfileReviews';
import ProfileModal from '../profile/ProfileModal';
import { getProfile } from '../../services/api/profile';
import { createConvo } from '../../services/api/inbox';

export class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: null,
            modalVisible: false
        }
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params.user;
        getProfile(id, (response) => {
            console.log(response.data);
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

    onModalClose = () => {
        Keyboard.dismiss();
        this.setState({
            ...this.state,
            modalVisible: false
        });
    }

    render() {
        const { 
            headerStyle,
            modalHeaderStyle,
            modalContentStyle
        } = styles;
        const { loading, data, modalVisible } = this.state;
        const { id } = this.props.navigation.state.params.user;
        return (
            <View style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <ScrollView style={{ flex: 1 }}>
                    <View style={modalHeaderStyle}>
                        <Button 
                            title="Cancel"
                            type="clear"
                            onPress={() => this.onModalClose()}
                        />
                        <Button 
                            title="Update"
                            type="clear"
                            onPress={() => this.onFormSubmit()}
                        />
                    </View>
                    <View style={modalContentStyle}>

                    </View>
                </ScrollView>
            </Modal>
                <Header title="">
                    <View style={headerStyle}>
                        <RNEButton 
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
                            {/* <RNEButton 
                                icon={
                                    <Icon 
                                        name="plus" 
                                        size={30} 
                                        color="rgb(189,195,199)" 
                                    />
                                }
                                type='clear'
                                onPress={() => this.props.navigation.goBack()}
                            /> */}
                            {id == this.props.id && (
                                <RNEButton 
                                    icon={
                                        <Icon 
                                            name="edit" 
                                            size={27} 
                                            color="rgb(189,195,199)" 
                                        />
                                    }
                                    type='clear'
                                    onPress={() => this.setState({ ...this.state, modalVisible: true })}
                                    style={{ marginLeft: 15 }}
                                />
                            )}
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
    modalHeaderStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20
    },
    modalContentStyle: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "flex-end"
    }
});

const mapStateToProps = ({ admin }) => ({
    id: admin.id
});

export default connect(mapStateToProps)(ProfileScreen);