import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Pressable, Alert } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { withSpring, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const SWIPE_WIDTH = 60;

const Item = ({ label, active, setOnActive, index, deleteItem, createdAt, markCompleted, completed }) => {

    const theme = useTheme();
    const translateX = useSharedValue(-300);

    useEffect(() => {

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
        Alert.alert("Delete Item? ",
            "Your goal will be deleted",
            [{ text: "OK", style: "destructive", onPress: deleteItem, }
                , { text: "Cancel", onPress: () => { closeTab() } }
            ]);
    };

    const CompletedHandler = () => {
        Alert.alert("Completed Item? ",
            "Your goal will be deleted",
            [{
                text: "OK", style: "default", onPress: () => {
                    markCompleted();
                    closeTab();
                },
            }
                , {
                text: "Cancel", onPress: () => {
                    closeTab();                    
                }
            }
            ]);

    }

    const closeTab = () => {
        'worklet';
        translateX.value = withSpring(0);
    }

    const openTabRight = () => {
        'worklet';
        translateX.value = withSpring(-SWIPE_WIDTH);
        runOnJS(setOnActive)(index);
    }
    const openTabLeft = () => {
        'worklet';
        translateX.value = withSpring(SWIPE_WIDTH);
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
                openTabRight();
            }
            else if (!completed && translateX.value > SWIPE_WIDTH / 2 + 4) {
                openTabLeft();
            }
            else {
                closeTab();
            }
        },
    });


    return (
        <View>
            <PanGestureHandler activeOffsetX={[-1, 1]} onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.container, animatedStyle, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                    <Text style={styles.hourStyle}>
                        {[new Date(createdAt).getHours(), ":", new Date(createdAt).
                            getMinutes().toString().length === 1 ? ("0" + new Date(createdAt).getMinutes()) : new Date(createdAt).getMinutes()].join(" ")}</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ ...styles.labelStyle, color: theme.colors.text }}>{label}</Text>
                    <Text style={styles.dateStyle}>{new Date(createdAt).toLocaleDateString()}</Text>
                </Animated.View>
            </PanGestureHandler>
            <View style={styles.leftSwipeContainer}>
                <Pressable
                    onPress={onPressHandler}
                >
                    <MaterialCommunityIcons name="trash-can" size={30} color="#fff" />
                </Pressable>

            </View>
            {!completed && <View style={styles.rightSwipeContainer}>
                <Pressable
                    onPress={CompletedHandler}
                >
                    <MaterialCommunityIcons name="check" size={30} color="#fff" />
                </Pressable>

            </View>}
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
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#8e8e93'
    },
    leftSwipeContainer: {

        position: 'absolute',
        zIndex: -1,
        right: 0,
        height: 60,
        width: SWIPE_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },

    labelStyle: {
        position: 'absolute',
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: 'bold',
        maxWidth: '60%',
        textAlign: 'left',
        left: '10%',
    },

    rightSwipeContainer: {

        position: 'absolute',
        zIndex: -1,
        left: 0,
        height: 60,
        width: SWIPE_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },

    dateStyle: {
        fontSize: 12,
        color: 'grey',
        position: 'absolute',
        right: 10,
        bottom: 15,
    },

    hourStyle: {
        fontSize: 12,
        color: 'grey',
        position: 'absolute',
        right: 10,
        bottom: 35,
    },




});