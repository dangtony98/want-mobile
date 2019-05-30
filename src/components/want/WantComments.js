import React from 'react';
import { FlatList } from 'react-native';
import WantComment from './WantComment';

export default ({ comments, navigation }) => {
    return (
        <FlatList 
            data={comments}
            keyExtractor={(comment) => String(comment.id)}
            scrollEnabled={false}
            renderItem={({ item }) => (
                <WantComment 
                    comment={item}
                    navigation={navigation}
                    key={item.id}
                />
            )}
            style={{ paddingTop: 20 }}
        />
    );
}
