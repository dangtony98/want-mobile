import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, Picker, UIManager, LayoutAnimation, Dimensions, StyleSheet } from 'react-native';
import Button from '../generic/Button';
import { applyFilters, getCategories } from '../../services/api/filter';
import { updateFeed, setNextPageUrl } from '../../actions/feed';
import { setCategories, setFilters } from '../../actions/filters';

const SCREEN_WIDTH = Dimensions.get('window').width;

export class FiltersModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterPickerVisible: false,
            sortPickerVisible: false,
            filterOptions: [],
            sortOptions: [
                { value: '', label: 'None' },
                { value: 'created_at#desc', label: 'Newest' },
                { value: 'created_at#asc', label: 'Oldest' },
                { value: 'cost#desc', label: 'Pay (High-Low)' },
                { value: 'cost#asc', label: 'Pay (Low-High)' }
            ],
            chosen: {
                category: { value: 0, label: 'None' },
                sort_by: { value: '', label: 'None' }
            }
        }
    }

    async componentDidMount() {
        const { category, sort_by, categories } = this.props;
        console.log('FiltersModal props: ');
        console.log(this.props);

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        let filterOptions = [{ value: 0, label: 'None' }];

        if (categories) {
            categories.forEach((category) => {
                const option = { value: category.id, label: category.name };
                filterOptions.push(option);
            });
            this.setState({
                ...this.state,
                filterOptions,
                chosen: {
                    ...this.state.chosen,
                    category,
                    sort_by
                }
            });
        }

        getCategories((categories) => {
            filterOptions = [{ value: 0, label: 'None' }];
            categories.forEach((category) => {
                const option = { value: category.id, label: category.name };
                filterOptions.push(option);
            });
            this.setState({
                ...this.state,
                filterOptions,
                chosen: {
                    ...this.state.chosen,
                    category,
                    sort_by
                }
            });
        });
    }

    onFormSubmit = () => {
        const { category, sort_by } = this.state.chosen;
        applyFilters({
            categories: [category.value == 0 ? '' : [category.value]],
            sort_by: sort_by.value
        }, (response) => {
            this.props.updateFeed(response.data);
            this.props.setFilters(this.state.chosen);
            this.props.rightButtonPressed();
        });
    }

    render() {
        const { filterPickerVisible, sortPickerVisible, filterOptions, sortOptions } = this.state;
        const { category, sort_by } = this.state.chosen;
        const { leftButtonPressed, rightButtonPressed } = this.props;
        const { 
            headerStyle, 
            contentStyle,
            selectStyle,
            textStyle 
        } = styles;
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={headerStyle}>
                <Button 
                    title="Cancel"
                    type="clear"
                    onPress={() => leftButtonPressed()}
                />
                <Button 
                    title="Apply"
                    type="clear"
                    onPress={() => this.onFormSubmit()}
                />
                </View>
                {(filterOptions.length != 0 && (
                    <View style={contentStyle}>
                        <TouchableOpacity 
                            onPress={() => {
                                this.setState((prevState) => ({ 
                                    ...this.state, 
                                    filterPickerVisible: !prevState.filterPickerVisible,
                                    sortPickerVisible: false
                                }));
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            }}
                            style={[selectStyle, { marginBottom: 10 }]}
                        >
                            <Text style={textStyle}>
                                Filter by
                            </Text>
                            <Text style={textStyle}>
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                        {filterPickerVisible && (
                            <Picker
                                selectedValue={category.value}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({
                                        ...this.state,
                                        chosen: {
                                            ...this.state.chosen,
                                            category: { label: filterOptions[itemValue].label, value: itemIndex } 
                                        }
                                    });
                                }}
                            >
                                {filterOptions.map((option) => {
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
                        <TouchableOpacity 
                            onPress={() => {
                                this.setState((prevState) => ({ 
                                    ...this.state, 
                                    filterPickerVisible: false,
                                    sortPickerVisible: !prevState.sortPickerVisible, 
                                }));
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            }}
                            style={selectStyle}
                        >
                            <Text style={textStyle}>
                                Sort by
                            </Text>
                            <Text style={textStyle}>
                                {sort_by.label}
                            </Text>
                        </TouchableOpacity>
                        {sortPickerVisible && (
                            <Picker
                                selectedValue={sort_by.value}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({
                                        ...this.state,
                                        chosen: {
                                            ...this.state.chosen,
                                            sort_by: { label: sortOptions[itemIndex].label, value: itemValue } 
                                        }
                                    });
                                }}
                            >
                                {sortOptions.map((option) => (
                                    <Picker.Item 
                                        label={option.label}
                                        value={option.value}
                                        key={option.value}
                                    />
                                ))}
                            </Picker>
                        )}
                        <View />
                    </View>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingLeft: 10,
        paddingRight: 10
    },
    contentStyle: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "flex-end"
    },
    selectStyle: {
        flexDirection: "row",
        alignSelf: 'stretch',
        borderBottomWidth: 0.25,
        borderBottomColor: 'rgb(189,195,199)',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
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

const mapStateToProps = ({ filters }) => ({
    category: filters.category,
    sort_by: filters.sort_by,
    categories: filters.categories,
    filters
});

const mapDispatchToProps = (dispatch) => ({
    updateFeed: (feed) => dispatch(updateFeed(feed)),
    setNextPageUrl: (url) => dispatch(setNextPageUrl(url)),
    setCategories: (categories) => dispatch(setCategories(categories)),
    setFilters: (filters) => dispatch(setFilters(filters))
})

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);