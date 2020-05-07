import React, {Component} from 'react'
import {TouchableOpacity} from 'react-native'
import {Text, View} from 'native-base'
import Icon from 'react-native-vector-icons/Entypo'

import styles from './style'

export default class CredentialList extends Component {
  _goToSingle() {
    this.props.navigation.navigate('Credential', {item:this.props.item})
  }

  render() {

    return (
      <TouchableOpacity onPress={() => this._goToSingle()} key={this.props.rowID}>
        <View style={styles.listItem}>
          <View style={styles.textCol}>
            <Text style={styles.title}>{this.props.item.def.id}</Text>
          </View>
          <View style={styles.textCol}>
            <Text style={styles.status}>{this.props.item.status}</Text>
          </View>
          <Icon size={20} color={'#000'} name="chevron-right" style={styles.icon}/>
        </View>
      </TouchableOpacity>
    );
  }
}
