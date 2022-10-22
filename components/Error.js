import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Error = () => {

    const translateX = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: 0,
            friction: 2,
            tension: 140,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <View style={styles.centered}>
            <Animated.View style={{ transform: [{ translateX }] }}>
                <MaterialIcons name="error" size={60} color='grey' />
            </Animated.View>
            <Text style={styles.emptyText}>
                Item not found !
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'grey',
        marginTop: 20,
    }
})

export default Error;