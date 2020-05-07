import React, { Component } from 'react'

import {
  View,
  Text
} from 'native-base'

import styles from './style'

export default class TransactionData extends Component {
  render() {

    let {item} = this.props.route.params
    let issuer = item.def.id.split(':').slice(0,1)
    return (
      <View style={styles.grid}>
        <View style={styles.colLeft}>
          <Text style={styles.transactionLeftText}>Request ID</Text>
          <Text style={styles.transactionLeftText}>Status</Text>
          <Text style={styles.transactionLeftText}>Issuer</Text>
          <Text style={styles.transactionLeftText}>Definition ID</Text>
        </View>
        <View style={styles.colRight}>
          <Text style={styles.transactionRightText}>{item.id}</Text>
          <Text style={styles.transactionRightText}>{item.status}</Text>
          <Text style={styles.transactionRightText}>{issuer}</Text>
          <Text style={styles.transactionRightText}>{item.def.id}</Text>
        </View>
      </View>
    );
  }
}
