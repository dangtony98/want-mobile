import React from 'react';
import { Text } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';

const Highlight = (props) => {
    const { highlight, attribute, hit } = props;
    const parsedHit = highlight({
        attribute,
        hit,
        highlightProperty: '_highlightResult',
      });
    const highlightedHit = parsedHit.map((part, idx) => {
        if (part.isHighlighted) {
            return (
                <Text key={idx} style={{ backgroundColor: "rgb(88, 42, 114)", color: "rgb(255, 255, 255)" }}>
                    {part.value}
                </Text>
            );
        }
        return part.value;
    });

    return <Text>{highlightedHit}</Text>
}

export default connectHighlight(Highlight);