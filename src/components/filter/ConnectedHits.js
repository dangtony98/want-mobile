import React from 'react';
import { FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import Want from '../want/Want';

const WantList = ({ hits }) => (
    <FlatList 
        data={hits}
        keyExtractor={(hit) => String(hit.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
            return (
                <Want
                    {...item}
                    hit={item}
                />
            )
        }}
    />
);

export default connectInfiniteHits(WantList);