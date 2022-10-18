import { StyleSheet, TextInput, Dimensions, Text, View, Pressable } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
const screenHeight = Dimensions.get('window').height;

const Header = ({ title, text, setText, addToDo  }) => {
    const theme = useTheme();

    
    return (
        <View style={{...styles.container, backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border}}>
            <Text style={{...styles.headerText, color: theme.colors.text }}>{title}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    onChangeText={text => setText(text)}
                    style={{...styles.input, color: theme.colors.text}}
                    placeholder='Enter goal'
                    placeholderTextColor={'grey'}
                />
                <View style={styles.iconContainer}>
                    <EvilIcons name="plus" size={35} color="grey" />
                </View>
                {text.length > 0 && <View style={styles.addContainer}>
                    <TouchableOpacity onPress={addToDo}>
                        <Text style={{...styles.addText, color: theme.colors.primary}}>Add</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: screenHeight / 6,
        
    },

    addContainer: {
        right: '7.5%',
        position: 'absolute',
        zIndex: 5,
    },

    addText: {
        color: 'blue',
        fontWeight: '500',

    },

    iconContainer: {
        left: '3.5%',
        position: 'absolute',
    },

    inputContainer: {
        justifyContent: 'center',
        
    },

    headerText: {
        padding: '5%',
        fontSize: 30,
        fontWeight: 'bold',
    },

    input: {
        width: '95%',
        alignSelf: 'center',
        height: 40,
        backgroundColor: '#c2c2c250',
        borderRadius: 20,
        paddingLeft: '10%',
        paddingRight: '13%',
    }
})