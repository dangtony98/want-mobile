import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../generic/Header';
import InboxPerson from '../inbox/InboxPerson';
import { getConvos } from '../../services/api/inbox';

export default class InboxScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            convos: []
        }
    }

    componentDidMount() {
        getConvos((response) => {
            this.setState({
                ...this.state,
                convos: response.data
            });
        });
    }

    render() {
        const { convos, chatInput } = this.state;
        const { contentStyle, headerStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Header title="Inbox">
                    <View style={headerStyle}>
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
                    </View>
                </Header>
                <View style={contentStyle}>
                    {convos.length > 0 && (
                        <FlatList 
                            data={convos}
                            keyExtractor={(convo) => String(convo.id)}
                            showsVerticalScrollIndicator={false}
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
        paddingTop: 44,
    },
    contentStyle: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    }
});