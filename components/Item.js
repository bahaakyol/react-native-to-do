import React, { useEffect } from 'react';
import { Text, StyleSheet, View , Pressable, Alert } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { withSpring, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const SWIPE_WIDTH = 60;

const Item = ({ label, active, setOnActive, index, deleteItem}) => {

    const theme = useTheme();
    const translateX = useSharedValue(-300);

    useEffect(() => {
        console.log("active changed to ", active);
        (active !== index) && closeTab();
    }, [active]);

    useEffect(() => {
        translateX.value = withSpring(0);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
            ],
        };
    });

    const onPressHandler = () => {
        Alert.alert("Delete Item? " , 
        "Your goal will be deleted" , 
        [ {text: "OK", style : "destructive", onPress: deleteItem,}  
        , {text: "Cancel", onPress: ()=> {closeTab()}}
    ] );
    };

    const closeTab = () => {
        'worklet';
        translateX.value = withSpring(0);
    }

    const openTab = () => {
        'worklet';
        translateX.value = withSpring(-SWIPE_WIDTH);
        runOnJS(setOnActive)(index);
    }

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
            runOnJS(setOnActive)(index);
        },
        onEnd: () => {
            if (translateX.value < -SWIPE_WIDTH / 2) {
                openTab();
            }
            else {
                closeTab();
            }
        },
    });

    return (
        <View>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.container, animatedStyle, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
                    <Text style={{...styles.label, color: theme.colors.text}}>{label}</Text>
                </Animated.View>
            </PanGestureHandler>
            <View style={styles.swipeContainer}>
                <Pressable 
                onPress={onPressHandler}
                >
                <MaterialCommunityIcons name="trash-can" size={30} color="#fff" />
                </Pressable>
            </View>
        </View>
    )
}

export default Item;


const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderColor: '#8e8e93'
    },
    swipeContainer: {
        position: 'absolute',
        zIndex: -1,
        right: 0,
        height: 60,
        width: SWIPE_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
});