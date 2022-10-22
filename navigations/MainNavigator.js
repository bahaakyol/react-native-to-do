import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ToDo from '../screens/ToDo';
import Completed from '../screens/Completed';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function MainNavigator(props) {

    const {goals, setGoals, completed, setCompleted} = props;

    const theme = useTheme();
    return (
        <NavigationContainer theme={theme}>
            <Tab.Navigator 
                initialRouteName="ToDo"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: 'mediumturquoise',
                    tabBarIcon: ({ focused, color, size, padding }) => {

                        let iconName;
                        if (route.name == 'ToDo') {
                            iconName = 'list-alt';
                        } else if (route.name == 'Completed') {
                            iconName = 'check-double';
                        }
                        return (
                            <FontAwesome5 name={iconName} size={size} color={color} style={{ paddingBottom: padding }}></FontAwesome5>
                        );
                    },
                })}>
                <Tab.Screen name="ToDo" children={() => <ToDo goals={goals} setGoals={setGoals} completed={completed} setCompleted={setCompleted}/>} />
                <Tab.Screen name="Completed" children={() => <Completed completed={completed} setCompleted={setCompleted} />} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}