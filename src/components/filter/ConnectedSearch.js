import React, { Component } from 'react';
import { View } from 'react-native';
import { connectSearchBox } from 'react-instantsearch-native';

export class ConnectedSearch extends Component {
    componentDidUpdate() {
        const { refine, value } = this.props;
        refine(value);
    }

    render() {
        return <View />
    }
}

export default connectSearchBox(ConnectedSearch);