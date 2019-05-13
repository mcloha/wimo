import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { setOrder } from '../actions/actions';
import * as firebase from 'firebase';

class Order extends Component {
  orderArived = (orderData) => {

    const { isAdmin } = this.props;
    const { oid } = orderData;

    if(isAdmin) {
      firebase.database().ref(`orders/${oid}/status`).set('arrived');
    }
  }

  styles = () => {
    const { darkTheme } = this.props;
    
    return {
      container: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        borderBottomColor: darkTheme ? '#f3d19c' : '#fff',
        borderBottomWidth: 2
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      orderIcon :{
        padding: 10
      },
      orderText: {
        flex: 1
      },
      active: {
        color: '#6b9a76'
      },
      selected: {
        color: '#9ca5b3'
      },
      text: {
        color: darkTheme ? '#f3d19c' : '#fff'
      },
      arrived: {
        color: '#B22222'
      }
    }
  }

  checkIfDisabled = () => {
    const { orderData, selectedOrder, setOrder } = this.props;
    const { date, email, from, status, oid } = orderData;
    const { container, row, active, selected, orderIcon, orderText, text, arrived } = this.styles();
    const selectedOID = selectedOrder ? selectedOrder.oid: null;

    if(status === 'active') {
      if (oid === selectedOID) {
        return (
          <TouchableOpacity style={container} onLongPress={() => this.orderArived(orderData)}>
              <View style={orderIcon}>
                <Icon name="directions" color="#9ca5b3" size={35}/>
              </View>
              <View style={orderText}>
                <View style={row}>
                  <Text style={selected}>{date}</Text>
                  <Text style={selected}>{status}</Text>
                </View>
                <View style={row}>
                  <Text style={selected}>{email}</Text>
                  <Text style={selected}>{from}</Text>
                </View>
              </View>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={container} onPress={() => setOrder(orderData)} onLongPress={() => this.orderArived(orderData)}>
            <View style={orderIcon}>
              <Icon name="directions" color="#6b9a76" size={35}/>
            </View>
            <View style={orderText}>
              <View style={row}>
                <Text style={text}>{date}</Text>
                <Text style={active}>{status}</Text>
              </View>
              <View style={row}>
                <Text style={text}>{email}</Text>
                <Text style={text}>{from}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      }
    } else {
      return (
        <View style={container}>
          <View style={orderIcon}>
            <Icon name="history" color="#B22222" size={35}/>
          </View>
          <View style={orderText}>
            <View style={row}>
              <Text style={text}>{date}</Text>
              <Text style={arrived}>{status}</Text>
            </View>
            <View style={row}>
              <Text style={text}>{email}</Text>
              <Text style={text}>{from}</Text>
            </View>
          </View>
        </View>
      )
    }
  }
  render() {
    return (
      this.checkIfDisabled()
    )
  }
}

const mapStateToProps = state => ({
  selectedOrder: state.selectedOrder,
  isAdmin: state.isAdmin,
  darkTheme: state.darkTheme
})

const mapDispatchToProps = dispatch => ({
  setOrder: order => dispatch((setOrder(order)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Order);