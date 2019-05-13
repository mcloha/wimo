import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/actions';

class WimoHeader extends Component {
  styles = () => {
      const { darkTheme } = this.props;
      
      return {
        header: {
          display: 'flex',
          backgroundColor: darkTheme ? '#242f3e' : '#269bd8', 
          bottom: -1,
          borderColor: darkTheme ? '#f3d19c' : '#fff',
          borderTopWidth: 4
        },
        text: {
          fontSize: 25,
          color: darkTheme ? '#f3d19c' : '#fff',
          fontWeight: 'bold'
        }
      }
  }

  render() {
    const { title, navigation, toggleModal, darkTheme } = this.props;
    const { header, text } = this.styles();
    return (
      <Header 
        leftComponent={<Icon name='menu' color={darkTheme ? '#f3d19c' : '#fff'} size={35} onPress={() => navigation.openDrawer()}/>}
        centerComponent={{ text: title, style: text }}
        rightComponent={<Icon name='note-add' color={darkTheme ? '#f3d19c' : '#fff'} size={35} onPress={toggleModal}/>}
        outerContainerStyles={header}
      />
    )
  }
}

const mapStateToProps = state => ({
  darkTheme: state.darkTheme
})

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(WimoHeader)); ;
