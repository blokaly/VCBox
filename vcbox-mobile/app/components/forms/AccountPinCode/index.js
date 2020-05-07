import React, {Component} from 'react';
import {ActivityIndicator, KeyboardAvoidingView} from 'react-native';

import {Field, reduxForm} from 'redux-form';

import {Container, Form, Input, Item, Text} from 'native-base';

import styles from './styles'
import baseTheme from '../../../theme/base'
import renderIf from "./renderIf";

const validate = (values, props) => {
    const error = {};

    let pin = values.pin;

    if (values.pin === undefined) {
        pin = '';
    }

    if (pin.length < 4 && pin !== '') {
        error.pin = 'PIN code is too short';
    }

    if (pin.length > 6) {
        error.pin = 'Max. 6 characters';
    }

    if (pin.length >=4 && pin.length <=6 && ! /^\d+$/.test(pin)) {
        error.pin = 'PIN Code has to contain digits only.';
    }

    return error;
};

class AccountPinCodeForm extends Component {
    constructor(props) {
        super(props);

        this.renderInput = this.renderInput.bind(this);

        this.state = {
            label: 'Create 4 to 6 digit PIN',
            pin: '',
            displayError: false,
            confirmPin: '',
            confirm: false,
            load: false
        };

        this.txtInputRef = null
    }

    updateValue(pin) {
        if (!this.state.confirm) {
            this.setState({
                displayError: false,
                pin: pin
            });
        }
        else
        {
            this.setState({
                displayError: false,
                confirmPin: pin
            });
        }
    }

    submit(hasError) {
        if (hasError) {
            this.setState({
                displayError: true
            });

            return;
        }

        this.setState({
            displayError: false
        });

        if (!this.state.confirm && !this.props.savedPin) {
            this.setState({
                label: 'Confirm PIN to continue',
                confirm: true
            });

            this.txtInputRef._root.clear();
            this.txtInputRef._root.focus();
        } else if (this.state.pin === this.state.confirmPin || this.state.pin === this.props.savedPin) {
            this.setState({
                load: true
            })

            this.props.callback(this.state.pin);
        }
    }

    renderInput({input, label, type, meta: {touched, error, warning}}) {
        let hasError = false;

        if (error === undefined && this.state.confirm &&
            this.state.pin !== this.state.confirmPin &&
            (!this.props.savedPin || this.state.pin !== this.props.savedPin) &&
            this.state.confirmPin.length >= 4) {
            error = 'Confirm PIN doesn\'t match';
        }

        if (error !== undefined) {
            hasError = true;
        }

        return (
            <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={'position'} contentContainerStyle={styles.content}>
                <Text style={styles.label}>{label}</Text>
                <Item style={[styles.itemInput, this.state.displayError && hasError && styles.itemInputError]}>
                    <Input
                        autoCorrect={false}
                        autoFocus={true}
                        ref={ref => this.txtInputRef = ref}
                        style={styles.input} secureTextEntry={true}
                        onChangeText={(text) => this.updateValue(text)}
                        value={this.props.savedPin ? '' : (this.state.confirm ? this.state.confirmPin : this.state.pin)}
                        onSubmitEditing={() => this.submit(hasError)}
                        returnKeyType={'done'}
                        keyboardType="numeric" maxLength={6} {...input}/>
                </Item>
                {this.state.displayError && hasError ?
                    <Text style={styles.error}>{error}</Text> : null
                }
                {this.state.displayError && this.state.load ?
                    <Text style={styles.error}>{error}</Text> : null
                }
            </KeyboardAvoidingView>
        )
    }

    render() {
        return (
            <Container style={[styles.container, baseTheme.screenBackgroundColor]}>
                <Form form={'pincode'} style={styles.form} ref={ref => this.formRef = ref}>
                    {renderIf(!this.state.load,
                        <Field label={this.state.label} style={ styles.form } name={"pin"} component={this.renderInput} />
                    )}
                    {renderIf(this.state.load,
                        <ActivityIndicator size="small" color="#ddd" style={styles.loader} />
                    )}
                </Form>
            </Container>
        );
    }
}

export default reduxForm({
    form: 'pincode',
    validate
})(AccountPinCodeForm)
