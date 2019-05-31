import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal, TouchableOpacity, Picker, Alert, UIManager, LayoutAnimation, Dimensions, KeyboardAvoidingView, Keyboard, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../generic/Input';
import Button from '../generic/Button';
import numeral from 'numeral';
import { getFeed } from '../../services/api/feed';
import { updateFeed } from '../../actions/feed';
import { getCategories } from '../../services/api/filter';
import { post } from '../../services/api/post';

const SCREEN_WIDTH = Dimensions.get('window').width;

export class PostScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name="plus" size={35} color={tintColor} />
        )
    }

    constructor(props) {
        super(props);
        
        this.state = {
            modalVisible: true,
            pickerVisible: false,
            options: [],
            chosen: {
                title: '',
                description: '',
                cost: '',
                category: null
            }
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        let selectOptions = [];

        this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ]; 

        getCategories((categories) => {
            categories.forEach((category) => {
                const option = { value: category.id, label: category.name };
                selectOptions.push(option);
            });
            this.setState({
                ...this.state,
                options: selectOptions,
                chosen: {
                    ...this.state.chosen,
                    category: selectOptions[0]
                }
            });
        });
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    componentDidFocus = () => {
        this.setState({
            ...this.state,
            modalVisible: true,
            chosen: {
                ...this.state.chosen,
                title: '',
                description: '',
                cost: ''
            }
        });
    }

    onFormSubmit = () => {
        const { title, cost, description, category } = this.state.chosen;
        if (title != '' && cost != '' && description != '' && category != null) {
            post({
                    ...this.state.chosen,
                    cost: numeral(numeral(`$${this.state.chosen.cost}`).format('$0,0.00'))._value * 100,
                    category: this.state.chosen.category.value
                }, () => {
                    this.onModalClose();
                    getFeed((response) => {
                        this.props.updateFeed(response.data);
                    });
                });
        }
    }

    onModalClose = () => {
        Keyboard.dismiss();
        this.setState({
            ...this.state,
            modalVisible: false
        }, () => {
            this.props.navigation.navigate('Home');
            getFeed((response) => {
                this.props.updateFeed(response.data);
            });
        });
    }

    onInputFocus() {
        this.setState({ 
            ...this.state, 
            pickerVisible: false 
        });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    onChangeNumber = (text) => {
        this.setState({ 
            ...this.state, 
            chosen: {
                ...this.state.chosen,
                cost: text
            }
        })
    }

    handlePickerAnimation = () => {
        this.setState((prevState) => ({ 
            ...this.state, 
            pickerVisible: !prevState.pickerVisible 
        }));
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    render() {
        const { modalVisible, pickerVisible, options } = this.state;
        const { title, description, cost, category } = this.state.chosen;
        const {
            headerStyle,
            contentStyle,
            selectStyle,
            textStyle,
        } = styles;
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
                <View style={{ flex: 1 }}>
                        <KeyboardAvoidingView
                            behavior="padding"
                            keyboardVerticalOffset={0}
                            enabled
                            style={{ flex: 1 }}
                        >
                            <View style={headerStyle}>
                                <Button 
                                    title="Cancel"
                                    type="clear"
                                    onPress={() => this.onModalClose()}
                                />
                                <Button 
                                    title="Post"
                                    type="clear"
                                    onPress={() => this.onFormSubmit()}
                                />
                            </View>
                            {(options.length != 0 && category) && (
                                <View style={contentStyle}>
                                    <View style={{ height: pickerVisible ? 446 : 240 }}>
                                        <Input
                                            type="clear" 
                                            value={title}
                                            placeholder='Title'
                                            onChangeText={(text) => this.setState({ 
                                                ...this.state,
                                                chosen: {
                                                    ...this.state.chosen,
                                                    title: text
                                                }
                                            })}
                                            onFocus={() => this.onInputFocus()}
                                        />
                                        <TouchableOpacity 
                                            onPress={() => this.handlePickerAnimation()}
                                            style={selectStyle}
                                        >
                                            <Text style={textStyle}>
                                                Category
                                            </Text>
                                            <Text style={textStyle}>
                                                {options[category.value - 1].label}
                                            </Text>
                                        </TouchableOpacity>
                                        {pickerVisible && (
                                            <Picker
                                                selectedValue={category.value}
                                                style={{ height: 216, width: SCREEN_WIDTH - 40, marginBottom: 10 }}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    this.setState({
                                                        ...this.state,
                                                        chosen: {
                                                            ...this.state.chosen,
                                                            category: { label: options[itemValue - 1].label, value: itemIndex + 1 } 
                                                        }
                                                    });
                                                }}
                                            >
                                                {options.map((option) => {
                                                    return (
                                                        <Picker.Item 
                                                            label={option.label} 
                                                            value={option.value} 
                                                            key={option.value}
                                                        />
                                                    );
                                                })}
                                            </Picker>
                                        )}       
                                        <Input
                                            type="clear" 
                                            value={cost}
                                            placeholder='Pay amount (e.g. $5.00)'
                                            onChangeText={(text) => this.onChangeNumber(text)}
                                            onFocus={() => this.onInputFocus()}
                                            keyboardType="numeric"
                                        />
                                        <Input
                                            type="clear" 
                                            value={description}
                                            placeholder='Description'
                                            onChangeText={(text) => this.setState({ 
                                                ...this.state, 
                                                chosen: {
                                                    ...this.state.chosen,
                                                    description: text
                                                }
                                            })}
                                            onFocus={() => this.onInputFocus()}
                                            multiline={true}
                                            numberOfLines={5}
                                            style={{ marginBottom: 10 }}
                                            textArea={true}
                                        />
                                        
                                    </View>  
                                    <View style={{ flex: 1 }} />  
                                </View>
                            )}       
                        </KeyboardAvoidingView>
                </View>
            </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
    },
    contentStyle: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "flex-end",
    },
    selectStyle: {
        flexDirection: "row",
        alignSelf: 'stretch',
        borderBottomWidth: 0.25,
        borderBottomColor: 'rgb(189,195,199)',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    textStyle: {
        color: 'rgb(90, 95, 96)',
        fontFamily: 'roboto-medium',
        fontSize: 15
    }
});

const mapDispatchToProps = (dispatch) => ({
    updateFeed: (feed) => dispatch(updateFeed(feed))
});

export default connect(null, mapDispatchToProps)(PostScreen);