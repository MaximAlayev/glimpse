import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Provider from './services/ContextProvider';

const Stack = createNativeStackNavigator();

function NavigationStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                cardShadowEnabled: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            {
                //   <Stack.Screen name="AddFriends" component={AddFriends} />
            }
            {
                //<Stack.Screen name="Messages" component={Notifications} />
                //<Stack.Screen name="Settings" component={Settings} />
            }
        </Stack.Navigator>
    );
}

export default App = () => {
    return (
        <Provider>
            <NavigationContainer>
                <NavigationStack />
            </NavigationContainer>
        </Provider>
    );
};
