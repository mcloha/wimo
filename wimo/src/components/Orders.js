import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { OrderList } from '.';
import { connect } from 'react-redux';

class Orders extends Component {
  styles = () => {
    const { darkTheme } = this.props;
    
    return {
      container: {
        flex: 1,
        padding: 5,
        backgroundColor: darkTheme ? '#242f3e': '#269bd8'
      }
    }
  }

  render() {
    const {container} = this.styles();

    return (
      <View style={container}>
        <OrderList />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  darkTheme: state.darkTheme
})

export default connect(mapStateToProps, null)(Orders);