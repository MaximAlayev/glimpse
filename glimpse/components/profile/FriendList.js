import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useRef, useContext, useCallback } from 'react'
import styled from 'styled-components';

const FriendsContainer = styled(View)`
    display: flex;
    flex-direction: column;
    width: ${props => props.width*350/390}px;
`;

const ProfileContainer = styled(TouchableOpacity)`
    display; flex;
    flex-direction: row;
    width: 100%;
    height: ${props => props.height*55/844}px;
    margin-top: ${props => props.height*10/844}px;
    margin-bottom: ${props => props.height*10/844}px;
`;

const FriendPFP = styled(Image)`
    background-color: #A0A0A0;
    width: ${props => props.width*55/390}px;
    height: ${props => props.width*55/390}px;
    border-radius: ${props => props.width*15/390}px;
    resize-mode: contain;
`;

const ProfileTextChunk = styled(View)`
    margin-left: ${props => props.width*10/390}px;
    display: flex;
    flex-direction: column;
`;

const ProfileName = styled(Text)`
    margin-top: ${props => props.height*2/844}px;
    font-family: Inter-Medium;
    font-size: 15px;
    color: #000000;
`;

const ProfileUsername = styled(Text)`
    font-family: Inter-Medium;
    font-size: 13px;
    color: #A0A0A0;
`;

const EllipsesContainer = styled(TouchableOpacity)`
    position: absolute;
    margin-left: ${props => props.width*300/390}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${props => props.width*43/390}px;
    padding-left: ${props => props.width*10/390}px;
    padding-right: ${props => props.width*10/390}px;
    height: ${props => props.width*50/390}px;
`;

const Ellipses = styled(View)`
    background-color: #C0C0C0;
    width: ${props => props.width*5/390}px;
    height: ${props => props.width*5/390}px;
    border-radius: 100px;
`;

const FriendList = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const BorderLine = useCallback((props) => {
        return <View style={{borderTopWidth: props.index !== 0 ? 1 : 0, borderTopColor: "#C0C0C0"}}/>
    }, []);

    const EllipsesView = useCallback((props) => {
        if (props.isPersonal) {
            return (
                <EllipsesContainer  width={windowWidth} height={windowHeight}>
                    <Ellipses width={windowWidth}/>
                    <Ellipses width={windowWidth}/>
                    <Ellipses width={windowWidth}/>
                </EllipsesContainer>
            )
        } else {
            return <View/>
        }
    }, []);

    return (
            <FriendsContainer width={windowWidth} height={windowHeight}>
                {
                    props.list.map((user, index) => 
                        <View key={index}>
                            <BorderLine index={index}/>
                            <ProfileContainer width={windowWidth} height={windowHeight}>
                                <FriendPFP width={windowWidth} height={windowHeight}/>
                                <ProfileTextChunk width={windowWidth}>
                                    <ProfileName height={windowHeight}>{user.name}</ProfileName>
                                    <ProfileUsername>{user.username}</ProfileUsername>
                                </ProfileTextChunk>
                                <EllipsesView user={user} isPersonal={props.isPersonal} />
                            </ProfileContainer>
                        </View>
                    )
                }
            </FriendsContainer>
    )
}

export default FriendList