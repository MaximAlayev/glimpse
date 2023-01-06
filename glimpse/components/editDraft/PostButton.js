import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, View} from 'react-native';

const Button = styled.TouchableOpacity`
    margin-top: ${props => 25 * props.heightFactor}px;
    height: ${props => 45 * props.heightFactor}px;
    width: ${props => 210 * props.widthFactor}px;
    background-color: #7990e2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${props => 7 * props.widthFactor}px;
`;

const Text = styled.Text`
    font-family: Inter-SemiBold;
    font-size: 14px;
    color: white;
`;

const PostButton = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const style = {
        widthFactor: windowWidth / 390,
        heightFactor: windowHeight / 844,
    };
    return (
        <View style={{display: 'flex', alignItems: 'center'}}> 
            <Button {...style}>
                <Text {...style}>Post</Text>
            </Button>
        </View>
    );
};

export default PostButton;
