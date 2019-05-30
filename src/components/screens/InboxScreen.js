import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';
import InboxPerson from '../inbox/InboxPerson';
import { getConvos } from '../../services/api/inbox';

export default class InboxScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            convos: null,
            isRefreshing: false,
            loading: true
        }
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ]; 

        getConvos((response) => {
            this.setState({
                ...this.state,
                convos: response.data,
                loading: false
            });
        });
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    componentDidFocus = () => {
        getConvos((response) => {
            this.setState({
                ...this.state,
                convos: response.data
            });
        });
    }

    onRefresh = () => {
        getConvos((response) => {
            this.setState({
                ...this.state,
                convos: response.data
            });
        });
    }

    render() {
        const { convos, isRefreshing, loading } = this.state;
        const { contentStyle, headerStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Header title="Inbox">
                    {/* <View style={headerStyle}>
                        <View />
                        <Button 
                            icon={
                                <Icon 
                                    name="send" 
                                    size={30} 
                                    color="rgb(189,195,199)" 
                                />
                            }
                            type='clear'
                            onPress={() => this.props.navigation.navigate('Settings')}
                        />
                    </View> */}
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
                        <FlatList 
                        data={convos}
                        keyExtractor={(convo) => String(convo.id)}
                        showsVerticalScrollIndicator={false}
                        refreshing={isRefreshing}
                        onRefresh={() => this.onRefresh()}
                        renderItem={({ item }) => {
                            return (
                                <InboxPerson 
                                    {...item} 
                                    navigation={this.props.navigation}
                                />
                            )
                        }}
                        style={{ flex: 1 }}
                    />
                    )}
                </View>
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
    },
    contentStyle: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    }
});