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
    padding-top: ${props => 9 * props.heightFactor}px;
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
    margin-left: ${props => 12*props.widthFactor}px;
    margin-top: ${props =>
        32.2 * props.heightFactor + (props.index - 0) * 50 * props.heightFactor}px;
    border-radius: 500px;
    background-color: #D9D9D9;
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
    border-radius: ${props => 11 * props.widthFactor}
    margin-vertical: ${props => 15 * props.heightFactor}px;
`;

const EditText = styled.Text`
    font-family: Inter-SemiBold;
    font-size: 14px;
`;

function weekOfCurr(current, first, last) {
    var week = new Array();
    let day = current.getDay()
    current.setDate(current.getDate() - day + 1);
    for (var i = 0; i < 7; i++) {
        let date = new Date(current);
        let day = date.getDate();
        if ((first && day > 7) || (last && day < 7)) {
            week.push("");
        } else {
            week.push(day);
        }
        current.setDate(current.getDate() + 1);
    }
    return week;
}

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function weekFromStartMonth(month, year) {
    var weeksInThisMonth = new Array();
    let day = 1;
    let currWeek = 0;
    let currDay = new Date().getDate();
    while (day < currDay) {
        if (day + 7 < currDay) {
            currWeek += 1;
        }
        weeksInThisMonth.push(
            weekOfCurr(
                new Date(year, month, day),
                day == 1,
                day + 7 > getDaysInMonth(month, year)
            ),
        );
        day += 7;
    }
    return {weeksInThisMonth, currWeek};
}

const MonthView = (props) => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const {palette, isDarkMode} = useContext(Context);
    const style = {
        heightFactor: windowHeight / 844,
        widthFactor: windowWidth / 390,
        palette,
    };
    const {month, year, navigation} = props;

    const {weeksInThisMonth, currWeek} = weekFromStartMonth(month, year);
    const currDay = new Date().getDate();

    return (
        <MonthBox {...style}>
            <MonthText {...style}>
                {month} {year}
            </MonthText>
            {weeksInThisMonth.map((week, index) => (
                <>
                    {index == currWeek && <WeekOpacity {...style} index={index}/>}
                    <WeekBox {...style}>
                        {week.map((day, index) => (
                            <>
                                {day == currDay && (
                                    <DayCircle {...style} index={index} />
                                )}
                                <DayText isCurrDay={day == currDay} {...style}>
                                    {day}
                                </DayText>
                            </>
                        ))}
                    </WeekBox>
                </>
            ))}
            <EditBox {...style} onPress={() => navigation.navigate("EditDraft")}>
                <EditText {...style}>
                    Edit this week's draft
                </EditText>
            </EditBox>
        </MonthBox>
    );
};

export default MonthView;
