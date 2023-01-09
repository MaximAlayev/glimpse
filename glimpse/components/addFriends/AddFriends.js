import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    SafeAreaView,
} from 'react-native';
import React, {useContext} from 'react';
import SearchIconLight from '../../assets/SearchIconLight.png';
import styled from 'styled-components';
import backArrow from '../../assets/backArrow.png';
import {Context} from '../../services/ContextProvider';

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

const StyledSearchIcon = styled(Image)`
    position: absolute;
    margin-top: ${props => (props.height * 10) / 844}px;
    margin-left: ${props => (props.height * 76) / 844}px;
    width: ${props => (props.width * 20) / 390}px;
    height: ${props => (props.width * 20) / 390}px;
    resize-mode: contain;
`;

const StyledSearchBar = styled(TextInput)`
    padding-left: ${props => (props.width * 40) / 390}px;
    border-radius: ${props => (props.width * 10) / 390}px;
    height: ${props => (props.height * 40) / 844}px;
    width: ${props => (props.width * 300) / 390}px;
    margin-left: ${props => (props.width * 20) / 390}px;
    background-color: #ececec;
    font-size: 14px;
`;

const ResultsContainer = styled(View)`
    margin-top: ${props => (props.height * 15) / 844}px;
    display: flex;
    flex-direction: column;
    width: ${props => (props.width * 350) / 390}px;
`;

const ProfileContainer = styled(TouchableOpacity)`
    display; flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    height: ${props => (props.height * 70) / 844}px;
    margin-vertical: ${props => (props.height * 10) / 844}px;
`;

const PFP = styled(Image)`
    background-color: #a0a0a0;
    width: ${props => (props.width * 60) / 390}px;
    height: ${props => (props.width * 60) / 390}px;
    border-radius: ${props => (props.width * 15) / 390}px;
    resize-mode: contain;
`;

const ProfileTextChunk = styled(View)`
    margin-left: ${props => (props.width * 10) / 390}px;
    display: flex;
    flex-direction: column;
`;

const ProfileName = styled(Text)`
    font-family: Inter-SemiBold;
    font-size: 15px;
    color: #000000;
`;

const ProfileUsername = styled(Text)`
    font-family: Inter-Medium;
    font-size: 13px;
    color: #a0a0a0;
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

const Header = styled.View`
    display: flex;
    flex-direction: row;
    width: auto;
    height: ${props => (props.height * 40) / 844}px;
    align-items: center;
`;

const AddFriends = ({route, navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const max = {name: 'Maxim Alayev', username: 'max'};
    const michael = {name: 'Michael Batchev', username: 'michael'};
    const maximilliano = {
        name: 'Maximimilliano Alfredoregallo',
        username: 'maximilliano',
    };
    const robert = {name: 'Robert', username: 'robert'};
    const searchResults = [max, michael, maximilliano, robert];
    const {palette, isDarkMode} = useContext(Context);
    const style = {height: windowHeight, width: windowWidth, palette};

    return (
        <Container {...style}>
            <Background {...style}>
                <Header {...style}>
                    <BackArrowButton
                        {...style}
                        onPress={() => navigation.goBack()}>
                        <BackArrowIcon {...style} source={backArrow} />
                    </BackArrowButton>
                    <StyledSearchBar
                        placeholder="Search for friends"
                        placeholderTextColor="#6D6D6D"
                        width={windowWidth}
                        height={windowHeight}
                    />
                </Header>
                <StyledSearchIcon
                    width={windowWidth}
                    height={windowHeight}
                    source={SearchIconLight}
                />
                <ResultsContainer width={windowWidth} height={windowHeight}>
                    {searchResults.map(user => (
                        <ProfileContainer
                            key={user.username}
                            width={windowWidth}
                            height={windowHeight}>
                            <PFP width={windowWidth} height={windowHeight} />
                            <ProfileTextChunk width={windowWidth}>
                                <ProfileName height={windowHeight}>
                                    {user.name}
                                </ProfileName>
                                <ProfileUsername>
                                    {user.username}
                                </ProfileUsername>
                            </ProfileTextChunk>
                        </ProfileContainer>
                    ))}
                </ResultsContainer>
            </Background>
        </Container>
    );
};

export default AddFriends;
