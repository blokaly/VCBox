import React, {Component} from 'react';
import {Container, StyleProvider} from 'native-base';
import {connect} from 'react-redux';
import {setRegisterData} from '../../../redux/actions'
import getTheme from '../../../theme/components';
import material from '../../../theme/variables/material';
import RegisterForm from "../../../components/forms/Register/RegisterForm";
import baseStyles from '../../../theme/base';

class Register extends Component {
    render() {
        return (
          <StyleProvider style={getTheme(material)}>
              <Container style={baseStyles.wrapper}>
                  <RegisterForm onSubmit={(data) => {
                      this.props.setData(data)
                      this.props.navigation.navigate('AccountPinCode')
                  }}/>
              </Container>
          </StyleProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.register
    }
}

function  mapDispatchToProps(dispatch) {
    return {
        setData: (data) => dispatch(setRegisterData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
