import React, { Component } from 'react';
import { KeyboardAvoidingView , StyleSheet } from 'react-native';
import { Map, WimoHeader, WimoModal } from './';
import { getOrders } from '../actions/actions';
import { connect } from 'react-redux';
import haversine from 'haversine';

class Main extends Component {
    componentWillMount() {
        const { getOrders, isAdmin, darkTheme } = this.props;

        getOrders(isAdmin);
    }
    calculateDistance = () => {
        const { selectedOrder } = this.props;
        let message = 'Select your order';

        if(selectedOrder) {
            const distance = haversine(selectedOrder.coords, selectedOrder.dest);
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
                <Map />
                <WimoHeader title={this.calculateDistance()}/>
            </KeyboardAvoidingView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#242f3e'
    }
})

const mapStateToProps = (state) => ({
    selectedOrder: state.selectedOrder,
    location: state.location,
    isAdmin: state.isAdmin,
    darkTheme: state.darkTheme
})

const mapDispatchToProps = (dispatch) => ({
    getOrders: isAdmin => dispatch(getOrders(isAdmin))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Main);