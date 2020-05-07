import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {Card, Container, Content, StyleProvider, Text, View} from "native-base";
import getTheme from '../../theme/components';
import material from '../../theme/variables/material';
import styles from './styles';
import baseStyles from '../../theme/base';
import { connect } from "react-redux";
import _ from 'lodash'
import CredentialList from "../Credential/CredentialList";
import {apiCredFetch} from "../../redux/actions";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let that = this
    this._timer = setInterval(()=> {
      that.props.creds.forEach(cred=>{
        if (cred.status!=='issued') {
          that.props.fetchCred(cred.id)
        }
      })
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this._timer)
  }

  render() {
    const { user } = this.props.user;

    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={styles.container}>
          <Content>
            <Text uppercase={false} style={[baseStyles.cardTitle, styles.heading]}>My Profile</Text>

            <Card style={[baseStyles.card]}>
              <Text style={styles.name}>{_.get(user, 'name', 'Unknown')}</Text>
              <View style={styles.user}>
                <View style={styles.dataLeft}>
                  <Text style={styles.userDataLeft}>Email address</Text>
                  <Text style={styles.userDataLeft}>Phone number</Text>
                  <Text style={styles.userDataLeft}>DID</Text>
                </View>
                <View>
                  <Text style={styles.userDataRight}>{_.get(user, 'email', '---')}</Text>
                  <Text style={styles.userDataRight}>{_.get(user, 'phone', '---')}</Text>
                  <Text style={styles.userDataRight}>{_.get(this.props, 'did', '---')}</Text>
                </View>
              </View>
            </Card>

            <Text uppercase={false} style={[baseStyles.cardTitle, styles.heading]}>Verifiable Credentials</Text>
            <View style={styles.transactions}>
              {
                this.props.creds.map((cred, rowID) => (
                  <CredentialList key={rowID} navigation={this.props.navigation} rowID={rowID} item={cred} />
                ))
              }
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth,
    did: state.indy.did,
    creds: state.indy.creds
  }
}

function  mapDispatchToProps(dispatch) {
  return {
    fetchCred: (req) => dispatch(apiCredFetch(req)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
