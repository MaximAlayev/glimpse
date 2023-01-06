import {View, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState, useContext} from 'react';
import {DraggableGrid} from 'react-native-draggable-grid';
import styled from 'styled-components/native';
import {Context} from '../../services/ContextProvider';
import addImageIcon from '../../assets/addImageIcon.png';

const Container = styled.SafeAreaView`
    background-color: ${props => props.palette.BG};
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Background = styled.View`
    background-color: ${props => props.palette.BG};
    padding-horizontal: ${props => 11 * props.widthFactor}px;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Header = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${props => 20 * props.heightFactor}px;
`;

const HeaderText = styled.Text`
    font-family: Inter-SemiBold;
    font-size: 19px;
    text-align: center;
`;

const CancelDoneText = styled.Text`
    font-family: Inter-Bold;
    font-size: 13px;
    text-align: center;
`;

const ImageBlock = styled.View`
    height: ${props => 120 * props.widthFactor}px;
    width: ${props => 120 * props.widthFactor}px;
`;

const StyledImage = styled.Image`
    height: ${props => 115 * props.widthFactor}px;
    width: ${props => 115 * props.widthFactor}px;
    border-radius: ${props => 10 * props.widthFactor}px;
    background-color: ${props => props.palette.XFG};
`;

const BlackCircle = styled.TouchableOpacity`
    position: absolute;
    background-color: ${props => props.palette.BlackText};
    width: ${props => 24 * props.widthFactor}px;
    height: ${props => 24 * props.widthFactor}px;
    border-radius: 500px;
    margin-left: ${props => 96 * props.widthFactor}px;
    margin-top: ${props => -5 * props.widthFactor}px;
    justify-content: center;
    align-items: center;
`;

const WhiteX = styled.Text`
    color: white;
    text-align: center;
`;

const AddPhotoBox = styled.TouchableOpacity`
    align-self: center;
    width: ${props => 120 * props.widthFactor}px;
    height: ${props => 40 * props.heightFactor}px;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: #4d4d4d;
    border-radius: ${props => 11 * props.widthFactor}px;
    margin-vertical: ${props => 20 * props.heightFactor}px;
`;

const AddPhotoText = styled.Text`
    font-family: Inter-SemiBold;
    font-size: 14px;
    color: #4d4d4d;
`;

const AddImageIcon = styled.Image`
    height: ${props => 115 * props.widthFactor}px;
    width: ${props => 115 * props.widthFactor}px;
`;

const EditDraft = ({route, navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const {palette} = useContext(Context);
    const style = {
        widthFactor: windowWidth / 390,
        heightFactor: windowHeight / 844,
        palette,
    };
    var initialData = [
        {name: '1', key: 'one'},
        {name: '2', key: 'two'},
        {name: '3', key: 'three'},
        {name: '4', key: 'four'},
        {name: '5', key: 'five'},
        {name: '6', key: 'six'},
        {name: '7', key: 'seven'},
        {name: '8', key: 'eight'},
        {name: '9', key: 'night'},
        {name: '0', key: 'zero'},
        {
            name: 'AddImageIcon',
            key: 'addImageIcon',
            disabledReSorted: true,
            disabledDrag: true,
        },
    ];
    const [images, setImages] = useState(initialData);
    const imageBlockHeight = 120 * style.widthFactor;
    const numCols = 3;
    const numRows = Math.ceil(images.length / numCols);

    const removeImage = key => {
        const filtered = images.filter(image => image.key !== key);
        setImages(filtered);
    };

    const renderDraggableImage = item => {
        if (item.key === 'addImageIcon') {
            return (
                <TouchableOpacity>
                    <AddImageIcon {...style} source={addImageIcon} />
                </TouchableOpacity>
            );
        } else {
            return (
                <ImageBlock {...style}>
                    <StyledImage {...style} source={item.source} />
                    <BlackCircle
                        {...style}
                        onPress={() => removeImage(item.key)}>
                        <WhiteX>X</WhiteX>
                    </BlackCircle>
                </ImageBlock>
            );
        }
    };

    return (
        <Container {...style}>
            <Background {...style}>
                <Header {...style}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CancelDoneText>Cancel</CancelDoneText>
                    </TouchableOpacity>
                    <HeaderText>January 2nd - 8th</HeaderText>
                    <TouchableOpacity>
                        <CancelDoneText>Done</CancelDoneText>
                    </TouchableOpacity>
                </Header>
                <View style={{height: (imageBlockHeight + 2) * numRows}}>
                    <DraggableGrid
                        numColumns={3}
                        renderItem={renderDraggableImage}
                        data={images}
                        onDragRelease={images => {
                            setImages(images);
                        }}
                    />
                </View>
            </Background>
        </Container>
    );
};

export default EditDraft;
