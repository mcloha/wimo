import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/actions';
import Dialog from "react-native-dialog";
import Modal from 'react-native-modalbox';
import { OrderList } from './';

const screen = Dimensions.get('window');
class WimoModal extends Component {
    checkModalHeight = () => {
        const { orders } = this.props;
        let height = 0;
        orders.map(order => {
            if (order.status === 'active') {
                height++;
            }
        })
        return height * 50;
    }
    render() {
        const { isToggled, darkTheme } = this.props;

        return (
            <Modal
                style={{
                    width: screen.width - 100,
                    height: 210,
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: darkTheme ? '#242f3e' : '#269bd8'
                }}
                isOpen={isToggled}
                backdrop={true}
                onClosed={() => {}}>
                <OrderList minified={true}/>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    isToggled: state.isToggled,
    orders: state.orders,
    darkTheme: state.darkTheme
});

const mapDispatchToProps = (dispatch) => ({
    toggleModal: () => dispatch(toggleModal())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(WimoModal);