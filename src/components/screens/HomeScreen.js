import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Modal, Keyboard, UIManager, LayoutAnimation, ActivityIndicator, StyleSheet } from 'react-native';
import { InstantSearch } from 'react-instantsearch-native';
import Input from '../generic/Input';
import ConnectedSearch from '../filter/ConnectedSearch';
import ConnectedHits from '../filter/ConnectedHits';
import Want from '../want/Want';
import FiltersModal from '../modals/FiltersModal';
import { getFeed, handleLoadWants } from '../../services/api/feed';
import { getUser } from '../../services/api/admin';
import { applyFilters } from '../../services/api/filter';
import { updateFeed, addWants, setNextPageUrl } from '../../actions/feed';
import { setUser } from '../../actions/admin';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            modalVisible: false,
            searchTerm: '',
            isRefreshing: false,
            inputFocus: false
        }
    }

    componentDidMount() {
        console.log('HomeScreen componentDidMount()');
        const { category, sort_by } = this.props;

        Keyboard.dismiss();
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ]; 

        getUser((response) => {
            this.props.setUser(response.data.user);
            // getFeed((response) => {
            //     this.props.updateFeed(response.data);
            //     this.setState({
            //         ...this.state,
            //         loading: false
            //     });
            // });

            applyFilters({
                categories: [category.value == 0 ? '' : [category.value]],
                sort_by: sort_by.value
            }, (response) => {
                this.props.updateFeed(response.data);
                this.setState({ ...this.state, loading: false });
            });
        });    
    } 

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    componentDidFocus = () => {
        Keyboard.dismiss();
    }

    handleLoadWants = async () => {
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

    onRefresh = () => {
        const { category, sort_by } = this.props;
        this.setState({
            ...this.state,
            isRefreshing: true
        }, () => {
            applyFilters({
                categories: [category.value == 0 ? '' : [category.value]],
                sort_by: sort_by.value
            }, (response) => {
                this.props.updateFeed(response.data);
                this.setState({ ...this.state, isRefreshing: false });
            });
        });
    }

    handleInputFocus = (focus) => {
        if (!focus) Keyboard.dismiss();

        this.setState((prevState) => ({
            ...this.state,
            searchTerm: !focus ? '' : prevState.searchTerm,
            inputFocus: focus
        }));
        
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    render() {
        const { 
            screenStyle, 
            headerStyle, 
            contentStyle,
            wantContainerStyle, 
            cancelButtonStyle,
            filtersRowStyle,
            filtersButtonStyle, 
            filtersButtonTextStyle,
            filtersTabStyle,
            filtersTabTextStyle,
            textStyle
        } = styles;
        const { 
            loading, 
            modalVisible, 
            searchTerm, 
            isRefreshing, 
            inputFocus
        } = this.state;
        const { wants, category, sort_by } = this.props;
        
        return (
            <View style={screenStyle}>
                <Modal 
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                >
                    <FiltersModal 
                        leftButtonPressed={() => this.setState({ ...this.state, modalVisible: false })}
                        rightButtonPressed={() => this.setState({ ...this.state, modalVisible: false })}
                    />
                </Modal>
                <View style={headerStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input
                            type="solid" 
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
                    <View style={filtersRowStyle}>
                        <TouchableOpacity 
                            style={filtersButtonStyle}
                            onPress={() => this.setState({ 
                                ...this.state, 
                                modalVisible: true 
                            })}
                        >
                            <Text style={filtersButtonTextStyle}>Filters</Text>
                        </TouchableOpacity>
                        {category.value != 0 && (
                            <View 
                                style={[filtersTabStyle, { marginLeft: 10 }]}
                            >
                                <Text style={filtersTabTextStyle}>
                                    {category.label}
                                </Text>
                            </View>
                        )}
                        {sort_by.value != "" && (
                            <View 
                                style={[filtersTabStyle, { marginLeft: 10 }]}
                            >
                                <Text style={filtersTabTextStyle}>
                                    {sort_by.label}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                {searchTerm == '' && wants ? (
                    <View style={contentStyle}>
                        { loading ? (
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
                                data={wants}
                                keyExtractor={(want) => String(want.id)}
                                showsVerticalScrollIndicator={false}
                                onEndReached={() => this.handleLoadWants()}
                                onEndReachedThreshold={0.1}
                                refreshing={isRefreshing}
                                onRefresh={() => this.onRefresh()}
                                onScroll={this.onScroll}
                                renderItem={({ item, index }) => (
                                    <View style={index < wants.length - 1 && wantContainerStyle}>
                                        <Want 
                                            {...item} 
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    
                                )}
                                style={{ flex: 1 }}
                            />
                        )}
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

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    headerStyle: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 60, 
        paddingBottom: 10,
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
    wantContainerStyle: {
        borderBottomWidth: 0.25,
        borderBottomColor: 'rgb(189,195,199)'
    },
    cancelButtonStyle: { 
        alignSelf: 'center', 
        paddingLeft: 7, 
        paddingRight: 12 
    },
    filtersRowStyle: {
        flexDirection: 'row',
        paddingLeft: 10, 
        marginTop: 10
    },
    filtersButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderColor: 'rgb(88, 42, 114)',
        shadowColor: 'rgb(88, 42, 114)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 1,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    filtersButtonTextStyle: {
        fontFamily: 'roboto-medium',
        lineHeight: 20,
        fontSize: 12, 
        color: 'rgb(88, 42, 114)'
    },
    filtersTabStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderColor: 'rgb(88, 42, 114)',
        shadowColor: 'rgb(88, 42, 114)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 1,
        backgroundColor: 'rgb(151, 117, 170)'
    },
    filtersTabTextStyle: {
        fontFamily: 'roboto-medium',
        lineHeight: 20,
        fontSize: 12, 
        color: 'rgb(255, 255, 255)'
    },
    textStyle: {
        fontFamily: 'roboto-medium',
        fontSize: 15,
        color: 'rgb(90, 95, 96)',
        lineHeight: 20
    }
});

const mapStateToProps = ({ feed, filters }) => ({
    wants: feed.wants,
    next_page_url: feed.next_page_url,
    category: filters.category,
    sort_by: filters.sort_by
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    updateFeed: (feed) => dispatch(updateFeed(feed)),
    addWants: (wants) => dispatch(addWants(wants)),
    setNextPageUrl: (url) => dispatch(setNextPageUrl(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);