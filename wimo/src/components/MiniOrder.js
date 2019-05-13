import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { connect } from 'react-redux';
import { setOrder, toggleModal } from '../actions/actions';

class MiniOrder extends Component {
  styles = () => {
    const { darkTheme } = this.props;
    
    return {
      container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        borderBottomColor: darkTheme ? '#f3d19c' : '#fff',
        borderBottomWidth: 2
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center'
      },
      orderText: {
        flex: 1
      },
      selected: {
          color: '#9ca5b3'
      },
      text: {
        color: darkTheme ? '#f3d19c' : '#fff'
      }
    }
  }

  checkIfActive = () => {
    const { orderData, setOrder, selectedOrder } = this.props;
    const { date, oid, from } = orderData;
    const { container, row, orderText, selected, text } = this.styles();
    const selectedOID = selectedOrder ? selectedOrder.oid: null;

    if(oid === selectedOID) {
      return (
        <TouchableOpacity style={container} onPress={() => setOrder(orderData)}>
          <View style={orderText}>
            <View style={row}>
              <Text style={selected}>{date}</Text>
            </View>
            <View style={row}>
              <Text style={selected}>{from}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={container} onPress={() => setOrder(orderData)}>
          <View style={orderText}>
            <View style={row}>
              <Text style={text}>{date}</Text>
            </View>
            <View style={row}>
              <Text style={text}>{from}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      this.checkIfActive()
    )
  }
}

const mapStateToProps = (state) => ({
    selectedOrder: state.selectedOrder,
    darkTheme: state.darkTheme
})

const mapDispatchToProps = (dispatch) => ({
    setOrder: order => dispatch(setOrder(order)),
    toggleModal: () => dispatch(toggleModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniOrder);