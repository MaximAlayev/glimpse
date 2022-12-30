import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Animated,
    View,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import {Context} from '../../services/ContextProvider';
import circleIcon from '../../assets/circleIcon.png';
import friendIcon from '../../assets/friendIcon.png';

const StyledView = styled(View)`
    width: 60px;
    height: 30px;
`;

const Toggle = styled(Animated.View)`
    width: ${props => (props.width * 32) / 390}px;
    height: ${props => (props.height * 28) / 844}px;
    background-color: white;
    border-radius: ${props => (props.width * 5) / 390}px;
`;

const ToggleBG = styled(View)`
    width: 60px;
    height: 30px;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.palette.FG};
    width: ${props => (props.width * 72) / 390}px;
    height: ${props => (props.height *36) / 844}px;
    border-radius: ${props => (props.width * 5) / 390}px;
`;

const CircleIcon = styled.Image`
    position: absolute;
    width: ${props => (props.width * 15) / 390}px;
    height: ${props => (props.height*15) / 844}px;
    margin-left: ${props => (props.width * 12) / 390}px;
`;

const FriendIcon = styled.Image`
    position: absolute;
    width: ${props => (props.width * 17) / 390}px;
    height: ${props => (props.height*15.23) / 844}px;
    margin-left: ${props => (props.width * 44) / 390}px;
`;

const ProfileDisplayToggle = props => {
    const [toggled, setToggled] = useState(props.initial);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const {palette, isDarkMode} = useContext(Context);
    const style = {height: windowHeight, width: windowWidth, palette};

    const slideAnim = useRef(new Animated.Value(0)).current;

    const togglePressed = () => {
        props.setValue(!toggled);
        setToggled(!toggled);
    };

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: toggled
                ? (36 / 390) * windowWidth
                : (4 / 390) * windowWidth,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [toggled]);

    return (
        <StyledView>
            <TouchableWithoutFeedback
                disabled={props.disabled}
                onPress={togglePressed}>
                <ToggleBG {...style}>
                    <Toggle
                        toggled={toggled}
                        {...style}
                        style={{marginLeft: slideAnim}}
                    />
                    <CircleIcon {...style} source={circleIcon}/>
                    <FriendIcon {...style} source={friendIcon}/>
                </ToggleBG>
            </TouchableWithoutFeedback>
        </StyledView>
    );
};

export default ProfileDisplayToggle;
