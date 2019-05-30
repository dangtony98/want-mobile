import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { IMAGE_URL } from '../../services/variables/variables';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default ({ data }) => {
    const {
        containerStyle,
        imageStyle,
        nameStyle,
        statisticsContainerStyle,
        statisticsText,
        descriptionContainerStyle,
        headingContainer,
        headingText,
        textStyle
    } = styles;
    return (
        <View style={containerStyle}>
            <Image 
                source={{ uri: `${IMAGE_URL}/${data.user[0].avatar}` }}
                style={imageStyle}
            />
            <View 
                style={{ 
                    paddingTop: 25,
                    paddingBottom: 15,
                    alignItems: 'center',
                    width: SCREEN_WIDTH - 40
                }}
            >
                <Text 
                    style={nameStyle}
                >
                    {data.user[0].first_name}
                </Text>
                {data.user[0].tag_line && (
                    <Text 
                        style={[textStyle, { marginTop: 5 }]}
                    >
                        {data.user[0].tag_line}
                    </Text>
                )}
            </View>
            <View 
                style={statisticsContainerStyle}
            >
                <View>
                    <Text style={statisticsText}>
                        {data.user[0].rating.current_rating}
                    </Text>
                    <Text style={[textStyle, { marginTop: 5 }]}>
                        Rating
                    </Text>
                </View>
                <View>
                    <Text style={statisticsText}>
                        {data.stats.total_fulfillment}
                    </Text>
                    <Text style={[textStyle, { marginTop: 5 }]}>
                        Fulfillments
                    </Text>
                </View>
                <View>
                    <Text style={statisticsText}>
                        {data.stats.total_reviews}
                    </Text>
                    <Text style={[textStyle, { marginTop: 5 }]}>
                        Reviews
                    </Text>
                </View>
            </View>
            {data.user[0].description && (
                <View style={descriptionContainerStyle}>
                    <Text style={textStyle}>
                        {data.user[0].description}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 15
    },
    imageStyle: {
        height: 120, 
        width: 120, 
        borderRadius: 60,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    nameStyle: {
        fontFamily: 'roboto-medium',
        fontSize: 20,
        lineHeight: 20
    },
    statisticsContainerStyle: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 40,
        justifyContent: 'space-between',
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopWidth: 0.25,
        borderTopColor: 'rgb(189,195,199)'
    },
    descriptionContainerStyle: {
        paddingTop: 15,
        borderTopWidth: 0.25,
        borderTopColor: 'rgb(189,195,199)'
    },
    statisticsText: {
        alignSelf: 'center',
        fontFamily: 'roboto-bold',
        fontSize: 30,
        color: 'rgb(88, 42, 114)'
    },
    headingContainer: {
        width: SCREEN_WIDTH - 40,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 0.25,
        borderTopColor: 'rgb(189,195,199)'  
    },
    headingText: {
        fontFamily: 'roboto-medium',
        fontSize: 20
    },
    textStyle: {
        alignSelf: 'center',
        fontFamily: 'roboto-light',
        fontSize: 15,
        color: 'rgb(90, 95, 96)',
        lineHeight: 20,
        textAlign: 'left'
    }
});