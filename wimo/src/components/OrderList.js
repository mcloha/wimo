import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet } from 'react-native'; 
import { Order, MiniOrder } from './';
import { connect } from 'react-redux';

class OrderList extends Component {
  styles = () => {
    const { darkTheme } = this.props;
    
    return {
      listTitle: {
        textAlign: 'center',
        fontSize: 25,
        color: darkTheme ? '#f3d19c' : '#fff',
      }
    }
  }

  checkIfMinified = () => {
    const { minified, orders } = this.props;
    const { listTitle } = this.styles();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    if (!minified) {
      return (
        <View>
           <Text style={listTitle}>Active Orders</Text>
           <ListView 
            dataSource={ds.cloneWithRows(orders)}
            renderRow={(rowData) => <Order orderData={rowData}/>}
          />
        </View>
      )
    } else {
      return (
        <View>
          <Text style={listTitle}>Active Orders</Text>
          <ListView 
            dataSource={ds.cloneWithRows(orders)}
            renderRow={(rowData) => rowData.status === 'active' ? <MiniOrder orderData={rowData} /> : null}
          />
        </View>
      )
    }
  }
  
  render() {
    return (
      <View>
        {this.checkIfMinified()}
      </View>
    )
  }
}


mapStateToProps = (state) => ({
  orders: state.orders,
  darkTheme: state.darkTheme
})

export default connect(mapStateToProps, null)(OrderList);
