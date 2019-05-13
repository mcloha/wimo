import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Button extends Component {
  render() {
    const { onClick, text, icon, color } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => onClick()} >
            <Icon name={icon} color={color}/>
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#269bd8'
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20
    },
    buttonText: {
      fontWeight: "bold",
      color: '#fff'
    }
})
