import React, {Component} from 'react';

import {
    TouchableOpacity,
    Image
} from 'react-native';

import styles from './style';
import helpIcon from '../../../../assets/images/icon/black/Help.png';
import backIcon from '../../../../assets/images/icon/black/Back.png';
import lockIcon from '../../../../assets/images/icon/black/Lock.png';

import {
    Header,
    Right,
    Icon,
    Text
} from 'native-base'

export default class Top extends Component {
    _backAction() {
        if (!this.props.back && this.props.navigation) {
            const { goBack } = this.props.navigation
            goBack()

            return
        }

        if (this.props.back) {
            this.props.back()
        }
    }

    render() {
        return (
            <Header style={styles.header}>
                <TouchableOpacity onPress={this._backAction.bind(this)}>
                    <Image small style={styles.back} source={this.props.icon && this.props.icon == 'lock' ? lockIcon : backIcon} />
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.text}</Text>
                {
                    this.props.help ?
                        <Right>
                            <TouchableOpacity>
                                <Image small style={styles.help} source={helpIcon} />
                            </TouchableOpacity>
                        </Right> : null
                }
            </Header>
        );
    }
}