import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
    display: flex;
    flex-direction: column;
`;

const PostHeaderContainer = styled.View`
    padding-top: ${props => (props.winHeight * 15) / 844}px;
    padding-left: ${props => (props.width * 15) / 390}px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PFP = styled.Image`
    background-color: grey;
    width: ${props => (props.width * 32) / 390}px;
    height: ${props => (props.width * 32) / 390}px;
    border-radius: 500px;
`;

const PostImageContainer = styled.View`
    display: flex;
    flex-direction: column;
    padding-top: ${props => (props.winHeight * 10) / 844}px;
    align-items: center;
`;

const PostImage = styled.View`
    background-color: grey;
    width: ${props => (props.width * 300) / 390}px;
    height: ${props => (props.winHeight * 400) / 844}px;
    border-radius: ${props => (props.width * 17) / 390}px;
`;

const ProfileName = styled.Text`
    font-family: Inter-SemiBold;
    padding-left: ${props => (props.width * 10) / 390}px;
    font-size: 14px;
`;

const PostText = styled.Text`
    font-family: Inter-SemiBold;
    font-size: 14px;
    padding-top: ${props => (props.winHeight * 10) / 844}px;
    padding-horizontal: ${props => (props.winWidth * 15) / 390}px;
`;

const Post = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <Container winHeight={windowHeight}>
            <PostHeaderContainer width={windowWidth} winHeight={windowHeight}>
                <PFP width={windowWidth} />
                <ProfileName width={windowWidth}>fart</ProfileName>
            </PostHeaderContainer>
            <PostImageContainer winHeight={windowHeight}>
                <PostImage width={windowWidth} winHeight={windowHeight} />
            </PostImageContainer>
            <PostText winHeight={windowHeight} winWidth={windowWidth}>
                {' '}
                Fart fart
            </PostText>
        </Container>
    );
};

export default Post;
