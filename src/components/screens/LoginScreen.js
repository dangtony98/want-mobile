import React, { Component } from 'react';
import { View, AsyncStorage, UIManager, LayoutAnimation, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Header from '../generic/Header';
import Input from '../generic/Input';
import Button from '../generic/Button';
import { login } from '../../services/api/authentication';
import { updateToken } from '../../actions/admin';

export class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputFocus: false,
            email: '',
            password: '',
            isLoggedIn: false
        }
    }

    async componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // await AsyncStorage.getItem('token').then((token) => {
        //     if (token) {
        //         this.setState({
        //             ...this.state,
        //             isLoggedIn: true
        //         }, () => {
        //             this.props.navigation.navigate('Main');
        //         })
        //     } else {
        //         this.setState({ ...this.state, isLoggedIn: false });
        //     }
        // });
    }

    onButtonPressed = () => {
        const { email, password } = this.state;
        login({ email, password }, (token) => {
            this.props.updateToken(token);
            this.props.navigation.navigate('Main');
        });
    }

    handleInputFocus = (focus) => {
        this.setState({
            ...this.state,
            inputFocus: focus
        });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    render() {
        const { inputFocus, email, password, isLoggedIn } = this.state;
        const { containerStyle, boxStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
                {(isLoggedIn == false) && (
                    <View style={{ flex: 1 }}>
                        <Header title="Login" />
                        <View style={[containerStyle, inputFocus && { justifyContent: 'flex-start' }]}>
                            <View style={boxStyle}>
                                <Input 
                                    type="solid"
                                    value={email}
                                    placeholder="Username"
                                    onFocus={() => this.handleInputFocus(true)}
                                    onBlur={() => this.handleInputFocus(false)}
                                    onChangeText={(text) => this.setState({ ...this.state, email: text })}
                                />
                                <Input 
                                    type="solid"
                                    value={password}
                                    placeholder="Password"
                                    onFocus={() => this.handleInputFocus(true)}
                                    onBlur={() => this.handleInputFocus(false)}
                                    onChangeText={(text) => this.setState({ ...this.state, password: text })}
                                    secureTextEntry
                                />
                                <Button
                                    type="solid" 
                                    title="Login"
                                    onPress={() => this.onButtonPressed()}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateToken: (token) => dispatch(updateToken(token))
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingTop: 75,
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: 'center',
        height: 180,
    },
    boxStyle: {
        height: 180,
    }
});

export default connect(null, mapDispatchToProps)(LoginScreen);