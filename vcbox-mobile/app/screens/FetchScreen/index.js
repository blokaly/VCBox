import React, {Component} from 'react'
import {Card, CardItem, Container, Left, Right, Spinner, StyleProvider, Text, Content} from "native-base";
import getTheme from '../../theme/components';
import material from '../../theme/variables/material';
import {connect} from "react-redux";
import styles from './style';
import baseStyles from '../../theme/base';
import { StackActions } from '@react-navigation/native'
import {TouchableOpacity} from 'react-native'
import _ from 'lodash'
import {createCredRequest} from "../../redux/actions";
class Fetch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {isFetching, url, data, error} = this.props.restapi

    let offerCard = () => {
      let def = JSON.parse(Buffer.from(data.data.definition, 'base64').toString())
      let offer = JSON.parse(Buffer.from(data.data.offer, 'base64').toString())
      let defId = _.get(offer, 'cred_def_id')
      let issuer = defId.split(':').slice(0,1)
      return (
        <Card style={[baseStyles.card, baseStyles.cardNoPadding]}>
          <CardItem>
            <Text style={baseStyles.cardTitle}>Credential Offer</Text>
          </CardItem>
          <CardItem style={styles.listItem}>
            <Left>
              <Text style={styles.listItemName}>Schema</Text>
            </Left>
            <Text style={styles.cardItemText}>{_.get(offer, 'schema_id')}</Text>
          </CardItem>
          <CardItem style={styles.listItem}>
            <Left>
              <Text style={styles.listItemName}>Definition</Text>
            </Left>
            <Text style={styles.cardItemText}>{defId}</Text>
          </CardItem>
          <CardItem style={styles.listItem}>
            <Left>
              <Text style={styles.listItemName}>Issuer</Text>
            </Left>
            <Text style={styles.cardItemText}>{issuer}</Text>
          </CardItem>
          {
            this.props.credreq==null ?
              (
                <CardItem style={styles.listActions}>
                  <TouchableOpacity onPress={() => {
                    this.props.navigation.dispatch(StackActions.popToTop())
                    this.props.navigation.navigate('Home');
                  }}>
                    <Text style={styles.listAction} uppercase={true}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    let req = {}
                    req['did'] = this.props.did
                    req['def'] = def
                    req['offer'] = offer
                    this.props.submitRequest(req)
                  }}>
                    <Text style={styles.listAction} uppercase={true}>Apply</Text>
                  </TouchableOpacity>
                </CardItem>
              ) : (
                <CardItem style={styles.listActions}>
                  <TouchableOpacity onPress={() => {
                    this.props.navigation.dispatch(StackActions.popToTop())
                    this.props.navigation.navigate('Home');
                  }}>
                    <Text style={styles.listAction} uppercase={true}>Done</Text>
                  </TouchableOpacity>
                </CardItem>
              )
          }
        </Card>
      )
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Text style={[baseStyles.cardTitle, styles.welcomeText]}>{url}</Text>
            {isFetching && <Spinner color='#009688'/>}
            {data!==null && offerCard()}
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    restapi: state.restapi,
    did: state.indy.did,
    credreq: state.indy.credreq
  }
}

function  mapDispatchToProps(dispatch) {
  return {
    submitRequest: (req) => dispatch(createCredRequest(req))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fetch)
