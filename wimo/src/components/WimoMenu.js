import React from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, View, Image, Switch } from 'react-native';
import * as firebase from 'firebase';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { logOut, toggleTheme } from '../actions/actions';

WimoMenu = (props) => {
    const { logOut, toggleTheme, darkTheme } = props;
    const { currentUser } = firebase.auth();
    const { displayName } = currentUser;

    const styles = (props) => {
        const { darkTheme } = props;
        
        return {
            container: {
                backgroundColor: darkTheme ? '#242f3e' : '#269bd8' 
            },
            title: {
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: darkTheme ? '#f3d19c': '#fff'
            },  
            row: {
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            text: {
                fontWeight: 'bold',
                margin: 10,
                color: darkTheme ? '#f3d19c' : '#fff'
            }
        }
    }

    const { container, title, text, row } = styles(props);

    return (
        <ScrollView style={container}>
            <View>
                <Text style={title}>Hello {displayName}</Text>
                <Image source={{uri: currentUser.photoURL}}/>
            </View>
            <DrawerItems {...props} />
            <View style={row}>
                <Text style={text}>Dark Theme</Text>
                <Switch value={darkTheme} onValueChange={toggleTheme}/>
            </View>
            <TouchableOpacity onPress={logOut}>
                <Text style={text}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    toggleTheme: () => dispatch(toggleTheme())
});

const mapStateToProps = state => ({
    darkTheme: state.darkTheme
});

export default connect(mapStateToProps, mapDispatchToProps)(WimoMenu);




