import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Keyboard, UIManager, LayoutAnimation, StyleSheet } from 'react-native';
import { InstantSearch } from 'react-instantsearch-native';
import Input from '../generic/Input';
import ConnectedSearch from '../filter/ConnectedSearch';
import ConnectedHits from '../filter/ConnectedHits';
import Want from '../want/Want';
import { getFeed, handleLoadWants } from '../../services/api/feed';
import { getUser } from '../../services/api/admin';
import { updateFeed, addWants, setNextPageUrl } from '../../actions/feed';
import { setUser } from '../../actions/admin';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.handleLoadWants = this.handleLoadWants.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);

        this.state = {
            searchTerm: '',
            inputFocus: false
        }
    }

    async componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        getUser((response) => {
            this.props.setUser(response.data.user);
            getFeed((response) => {
                this.props.updateFeed(response.data);
            });
        });    
    } 

    async handleLoadWants() {
        const { next_page_url } = this.props;

        if (next_page_url != null) {
            await handleLoadWants(next_page_url, (response) => {
                this.props.addWants(response.data.data);
                if (response.data.next_page_url != null) {
                    this.props.setNextPageUrl(response.data.next_page_url);
                } else {
                    this.props.setNextPageUrl(null);
                }
            });
        }
    }

    handleInputFocus = (focus) => {
        if (!focus) Keyboard.dismiss();

        this.setState({
            ...this.state,
            inputFocus: focus
        });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    render() {
        const { screenStyle, headerStyle, contentStyle, cancelButtonStyle, textStyle } = styles;
        const { searchTerm, inputFocus } = this.state;
        const { wants } = this.props;
        return (
            <View style={screenStyle}>
                <View style={headerStyle}>
                    <Input 
                        value={searchTerm}
                        placeholder='Try "homework"'
                        onFocus={() => this.handleInputFocus(true)}
                        onBlur={() => this.handleInputFocus(false)}
                        onChangeText={(text) => this.setState({ ...this.state, searchTerm: text})}
                    />
                    {inputFocus && (
                        <TouchableOpacity 
                            style={cancelButtonStyle}
                            onPress={() => this.handleInputFocus(false)}
                        >
                            <Text style={textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {searchTerm == '' && wants ? (
                    <View style={contentStyle}>
                        <FlatList 
                            data={wants}
                            keyExtractor={(want) => String(want.id)}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => this.handleLoadWants()}
                            onEndReachedThreshold={0.1}
                            renderItem={({ item }) => (
                                <Want 
                                    {...item} 
                                    navigation={this.props.navigation}
                                />
                            )}
                            style={{ flex: 1 }}
                        />
                    </View>
                ) : (
                    <View style={contentStyle}>
                        <InstantSearch
                            appId="F4OYFK126T"
                            apiKey="0b5b337016e53d122a72c477668057e5"
                            indexName="wants"
                        >
                            <ConnectedSearch value={searchTerm} />
                            <ConnectedHits />
                        </InstantSearch>
                    </View>
                )}
            </View>
        );
    }
}

const mapStateToProps = ({ feed }) => ({
    wants: feed.wants,
    next_page_url: feed.next_page_url
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    updateFeed: (feed) => dispatch(updateFeed(feed)),
    addWants: (wants) => dispatch(addWants(wants)),
    setNextPageUrl: (url) => dispatch(setNextPageUrl(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 60, 
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10, 
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 1,
        backgroundColor: 'rgb(237,240,241)'
    },
    contentStyle: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    cancelButtonStyle: { 
        alignSelf: 'center', 
        paddingLeft: 7, 
        paddingRight: 12 
    },
    textStyle: {
        fontFamily: 'roboto-medium',
        fontSize: 15,
        color: 'rgb(90, 95, 96)',
        lineHeight: 20
    }
});