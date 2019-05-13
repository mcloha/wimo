import React, { Component } from 'react';
import { KeyboardAvoidingView , StyleSheet } from 'react-native';
import { AdminMap, WimoHeader, WimoModal } from './';
import { getOrders } from '../actions/actions';
import { connect } from 'react-redux';
import haversine from 'haversine';

class AdminMain extends Component {

    componentWillMount() {
        const { getOrders, isAdmin } = this.props;

        getOrders(isAdmin);
    }

    calculateDistance = () => {
        const { location, selectedOrder } = this.props;
        let message = 'Select your order';

        if(location && selectedOrder) {
            const distance = haversine(location, selectedOrder.dest);
            const time =  distance / 40 * 60;
            message = `${time.toString().substring(0, time.toString().indexOf('.'))} minutes left`;
        }
        return message;
    }

    styles = () => {
        const { darkTheme } = this.props;
        
        return {
            container: {
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: darkTheme ? '#242f3e' : '#2196f3'
            }
        }
    }

    render() {
        const { container } = this.styles();

        return (
            <KeyboardAvoidingView  style={container}>
                <WimoModal />
                <AdminMap />
                <WimoHeader title={this.calculateDistance()}/>
            </KeyboardAvoidingView >
        )
    }
}

const mapStateToProps = (state) => ({
    selectedOrder: state.selectedOrder,
    location: state.location,
    isAdmin: state.isAdmin,
    darkTheme: state.darkTheme
})

const mapDispatchToProps = (dispatch) => ({
    getOrders: isAdmin => dispatch(getOrders(isAdmin))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);