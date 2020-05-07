import React, {Component} from 'react'

import {Modal, View} from 'react-native'

import {Button, Spinner, Text,} from 'native-base'

import styles from './styles'
import baseTheme from '../../theme/base'

export default class LoadingModal extends Component {

    render() {
        if (! this.props.modalVisible) {
            return null;
        }
        return (
            <Modal ref={(modal) => this.refs._modal = modal}
                   visible={this.props.modalVisible}
                   animationType={'slide'}
                   transparent
                   onRequestClose={() => this.props.onClose()}
            >
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={[baseTheme.bigTitle, {fontSize: 16, lineHeight: 19, marginBottom: 16}]}>Creating DID</Text>
                        <Spinner color='#009688'/>
                        <View style={styles.buttonContainer}>
                            <Button transparent style={styles.modalButton} onPress={() => this.props.onClose(true)}>
                                <Text style={styles.modalButtonText}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
