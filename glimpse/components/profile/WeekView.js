import {View, Text, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {Context} from '../../services/ContextProvider';

const MonthBox = styled.View`
    display: flex;
    flex-direction: column;
    border-radius: ${props => 16 * props.widthFactor}px;
    background-color: #f0f0f0;
    padding-horizontal: ${props => 14 * props.widthFactor}px;
    padding-top: ${props => 12 * props.heightFactor}px;
`;

const MonthText = styled.Text`
    font-family: Inter-Bold;
    font-size: 15px;
    padding-horizontal: ${props => 2 * props.widthFactor}px;
`;

const WeekBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: ${props => 12 * props.widthFactor}px;
    padding-vertical: ${props => 15 * props.heightFactor}px;
`;

const DayText = styled.Text`
    font-family: Inter-Bold;
    font-size: 16px;
    width: ${props => 20 * props.widthFactor}px;
    height: ${props => 20 * props.widthFactor}px;
    text-align: center;
    color: ${props => (props.isCurrDay ? 'white' : 'black')};
`;

const DayCircle = styled.View`
    position: absolute;
    width: ${props => 30 * props.widthFactor}px;
    height: ${props => 30 * props.widthFactor}px;
    margin-left: ${props =>
        7 * props.widthFactor + props.index * 47.7 * props.widthFactor}px;
    border-radius: 500px;
    background-color: black;
    z-index: -1;
`;

const WeekOpacity = styled.View`
    position: absolute;
    width: ${props => 330 * props.widthFactor}px;
    height: ${props => 40 * props.heightFactor}px;
    margin-left: ${props => 12 * props.widthFactor}px;
    margin-top: ${props =>
        35.2 * props.heightFactor}px;
    border-radius: 500px;
    background-color: #d9d9d9;
    z-index: -1;
`;

const EditBox = styled.TouchableOpacity`
    align-self: center;
    width: ${props => 185 * props.widthFactor}px;
    height: ${props => 40 * props.heightFactor}px;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: #575757;
    border-radius: ${props => 11 * props.widthFactor}px;
    margin-vertical: ${props => 15 * props.heightFactor}px;
`;

const EditText = styled.Text`
    font-family: Inter-SemiBold;
    font-size: 14px;
`;

function weekOfCurr(current) {
    var week = new Array();
    let day = current.getDay();
    let weekIsActiveWeek = false;
    current.setDate(current.getDate() - day + 1);
    for (var i = 0; i < 7; i++) {
        let date = new Date(current);
        let currentDay = new Date();
        currentDay.setHours(0);
        currentDay.setMilliseconds(0);
        currentDay.setMinutes(0);
        currentDay.setSeconds(0);
        if (date.toDateString() == currentDay.toDateString()) {
            weekIsActiveWeek = true;
        }
        let day = date.getDate();
        week.push(day);
        current.setDate(current.getDate() + 1);
    }
    return {week, weekIsActiveWeek};
}

const WeekView = props => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const {palette, isDarkMode} = useContext(Context);
    const style = {
        heightFactor: windowHeight / 844,
        widthFactor: windowWidth / 390,
        palette,
    };
    const {day, month, year, navigation} = props;
    const {week, weekIsActiveWeek} = weekOfCurr(new Date(year, month, day));
    
    const currDay = new Date().getDate();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <>
        <MonthBox {...style}>
            <MonthText {...style}>
                {months[month]} {year}
            </MonthText>
                    <WeekBox {...style}>
                        {week.map((day, index) => (
                            <>
                                {day == currDay && (
                                    <DayCircle {...style} index={index} />
                                )}
                                <DayText key={index} isCurrDay={day==currDay} {...style}>
                                    {day}
                                </DayText>
                            </>
                        ))}
                    </WeekBox>
        </MonthBox>
            <EditBox
                {...style}
                onPress={() => navigation.navigate('EditDraft')}>
                <EditText {...style}>Edit this week's draft</EditText>
            </EditBox>
        </>
    );
};

export default WeekView;
