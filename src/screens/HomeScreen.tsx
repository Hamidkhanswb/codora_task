import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../assets/style/Colors";

const HomeScreen = ({navigation}: any) =>{
    return(
        <View style={styles?.container}>
            <TouchableOpacity 
                style={styles?.btn}
                onPress={() => {navigation.navigate('SendTokensScreen')}}
            >
                <Text style={{color: 'white', fontSize: 16}}>Send Tokens Screen</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors?.dark
    },
    btn:{
        backgroundColor:"blue",
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default HomeScreen