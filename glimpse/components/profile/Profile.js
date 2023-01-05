import React, {useContext, useState} from 'react';
import {SafeAreaView, View, Text, Image, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Context} from '../../services/ContextProvider';
import backArrow from '../../assets/backArrow.png'
import ProfileDisplayToggle from './ProfileDisplayToggle';
import FriendList from './FriendList';
import MonthView from './MonthView';
import WeekView from './WeekView';

const Container = styled(SafeAreaView)`
    background-color: ${props => props.palette.BG};
    display: flex;
    flex-direction: column;
`;

const Background = styled(View)`
    background-color: ${props => props.palette.BG};
    display: flex;
    flex-direction: column;
    padding-horizontal: ${props => (props.width * 16) / 390}px;
`;

const PFP = styled(Image)`
    margin-top: ${props => (props.height * 15) / 844}px;
    width: ${props => (props.width * 90) / 390}px;
    height: ${props => (props.width * 90) / 390}px;
    border-radius: 500px;
    background-color: ${props => props.palette.FG};
`;

const ProfileName = styled(Text)`
    font-family: Inter-SemiBold;
    font-size: 19px;
    color: ${props => props.palette.MainText};
    margin-top: ${props => (props.height * 10) / 844}px;
`;

const Username = styled(Text)`
    font-family: Inter-SemiBold;
    font-size: 14px;
    color: ${props => props.palette.GreyedText};
    margin-top: ${props => (props.height * 7) / 844}px;
`;

const BackArrowButton = styled(TouchableOpacity)`
    width: ${props => (props.width * 30) / 390}px;
    height: ${props => (props.height * 30) / 844}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BackArrowIcon = styled.Image`
    width: ${props => (props.width * 18) / 390}px;
    height: ${props => (props.height * 14.4) / 844}px;
`;

const ToggleContainer = styled.View`
    margin-top: ${props => (props.height * 16) / 844}px;
    height: auto;
`;

const Divider = styled.View`
    margin-top: ${props => (props.height * 25) / 844}px;
    height: 0px;
`;

const Profile = ({route, navigation}) => {
    const [name, setName] = useState('John Doe');
    const [username, setUsername] = useState('JohnDoe');
    const [isDisplayingFriends, setIsDisplayingFriends] = useState(false);
    const [friendCount, setFriendCount] = useState(57);
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const {palette, isDarkMode} = useContext(Context);
    const style = {height: windowHeight, width: windowWidth, palette};

    const max = {name: "Maxim Alayev", username: "max"};
    const michael = {name: "Michael Batchev", username: "michael"};
    const maximilliano = {name: "Maximimilliano Alfredoregallo", username: "maximilliano"};
    const robert = {name: "Robert", username: "robert"};
    const friends = [max, michael, maximilliano, robert];

    const month = {day: 5, month: 0, year: 2023}
    return (
        <Container {...style}>
        <Background {...style}>
            <BackArrowButton {...style} onPress={() => navigation.goBack()}>
                <BackArrowIcon {...style} source={backArrow}/>
            </BackArrowButton>
            <PFP {...style}/>
            <ProfileName {...style}>{name}</ProfileName>
            <Username {...style}>{username}</Username>
            <ToggleContainer {...style}>
                <ProfileDisplayToggle initial={isDisplayingFriends} setValue={setIsDisplayingFriends}/>
            </ToggleContainer>
            <Divider {...style}/>
            {isDisplayingFriends && <FriendList list={friends}/>}
            <WeekView {...month} navigation={navigation}/>
        </Background>
        </Container>
    );
};

export default Profile;
