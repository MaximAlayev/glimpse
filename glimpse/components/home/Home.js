import {Text, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import AddFriendIconImage from '../../assets/addFriendIcon.png';
import Post from './Post'

const Container = styled.SafeAreaView`
    display: flex;
    flex-direction: column;
`;

const Header = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: ${props => (15 / 390) * props.width}px;
`;

const AddFriendButton = styled.TouchableOpacity`
    width: ${props => (props.width * 30) / 390}px;
    height: ${props => (props.height * 30) / 844}px;
    display: flex;
    justify-contents: center;
    align-items: center;
`;

const AddFriendIcon = styled.Image`
    width: ${props => (30 / 390) * props.width}px;
    height: ${props => (30 / 390) * props.width}px;
`;

const ProfileButton = styled.TouchableOpacity``;

const ProfileIcon = styled.Image`
    width: ${props => (40 / 390) * props.width}px;
    height: ${props => (40 / 390) * props.width}px;
    border-radius: 500px;
    background-color: grey;
`;

const Title = styled.Text`
    font-family: Inter-Bold;
    font-size: 26px;
`;

const Home = ({route, navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const style = {width: windowWidth, height: windowHeight};
    return (
        <Container>
            <Header width={windowWidth}>
                <AddFriendButton {...style}>
                    <AddFriendIcon source={AddFriendIconImage} width={windowWidth} />
                </AddFriendButton>
                <Title>Glimpse</Title>
                <ProfileButton onPress={() => navigation.navigate("Profile")}>
                    <ProfileIcon width={windowWidth}/>
                </ProfileButton>
            </Header>
            <ScrollView>
                <Post/>
                <Post/>
            </ScrollView>
        </Container>
    );
};

export default Home;
