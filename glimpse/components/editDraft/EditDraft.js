import {View, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState, useContext} from 'react';
import {DraggableGrid} from 'react-native-draggable-grid';
import styled from 'styled-components/native';
import {Context} from '../../services/ContextProvider';
import addImageIcon from '../../assets/addImageIcon.png';
import PostButton from './PostButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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

const AddImageIcon = styled.Image`
    height: ${props => 115 * props.widthFactor}px;
    width: ${props => 115 * props.widthFactor}px;
`;

const DescriptionBox = styled.TextInput`
    margin-top: ${props => 25 * props.heightFactor}px;
    font-family: Inter-SemiBold;
    font-size: 14px;
    display: flex;
    justify-contents: flex-start;
    width: ${props => 370 * props.widthFactor}px;
    height: ${props => 145 * props.heightFactor}px;
    padding: ${props => 15 * props.widthFactor}px;
    border-color: #575757;
    border-radius: ${props => 10 * props.widthFactor}px;
    border-width: 2px;
`;

const EditDraft = ({route, navigation}) => {
    const [description, setDescription] = useState('');
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

    const addPhoto = () => {
        launchImageLibrary(null, (response) => {
            if (!response.didCancel && !response.error) {
                console.log('Response = ', response);
            }
            let data = response.assets[0]
            // make sure to put the add image button at end as well
            let all_images_except_last = images.splice(0, images.length - 1);
            let new_images = [...all_images_except_last, {name: data.fileName, key: data.fileName, uri: data.uri}, images[images.length - 1]];
            setImages(new_images);
        });
    }

    const renderDraggableImage = item => {
        if (item.key === 'addImageIcon') {
            return (
                <TouchableOpacity onPress={addPhoto}>
                    <AddImageIcon {...style} source={addImageIcon} />
                </TouchableOpacity>
            );
        } else {
            return (
                <ImageBlock {...style}>
                    <StyledImage {...style} source={{uri: item.uri}} />
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
                <DescriptionBox
                    placeholder="Enter description..."
                    value={description}
                    multiline={true}
                    onChangeText={setDescription}
                    {...style}
                />
                <PostButton/>
            </Background>
        </Container>
    );
};

export default EditDraft;
