import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setLogin, setUserPin} from '../../../redux/actions'
import AccountPinCodeForm from '../../../components/forms/AccountPinCode';

import {Container, Content, StyleProvider, View} from 'native-base';

import getTheme from '../../../theme/components';
import material from '../../../theme/variables/material';
import styles from "./styles";
import baseTheme from "../../../theme/base";

class AccountPinCode extends Component {
    constructor(props) {
        super(props);

        this.pin = null;
        this.confirm = false;
        this.load = false;
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content style={baseTheme.screenBackgroundColor}>
                        <View style={styles.container}>
                            <AccountPinCodeForm
                                callback={(pin) => {
                                    this.props.setPin(pin);
                                    this.props.setLogin();
                                }}/>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPin: (data) => dispatch(setUserPin(data)),
        setLogin: () => dispatch(setLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPinCode)
