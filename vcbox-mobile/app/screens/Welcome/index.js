import React, {Component} from 'react';
import {connect} from "react-redux";
import {TouchableOpacity, View} from 'react-native';
import {Container, Spinner, StyleProvider, Text} from 'native-base';
import getTheme from '../../theme/components';
import material from '../../theme/variables/material';
import NewAccountModal from '../../components/NewAccountModal'
import {setOverlay} from "../../redux/actions";
import styles from './style';
import baseStyles from '../../theme/base';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isLoggedIn, authenticated } = this.props;
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={baseStyles.wrapper}>

          { isLoggedIn || authenticated ?
            <Spinner />
            :
            <View style={styles.content}>
              <Text style={[baseStyles.cardTitle, styles.welcomeText]}>Welcome Screen</Text>

              <TouchableOpacity onPress={() => {
                this.props.showOverlay(true);
                this.setState({modalVisible: true})
              }}>
                <Text style={styles.link}>click to create an account</Text>
              </TouchableOpacity>
            </View>
          }
          <NewAccountModal modalVisible={this.state.modalVisible} onClose={(redirect) => {
            this.props.showOverlay(false);
            this.setState({
              modalVisible: false
            });

            if (redirect) {
              navigate('Register')
            }
          }}/>
        </Container>
      </StyleProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    isLoggedIn: state.auth.isLoggedIn
  }
}

function  mapDispatchToProps(dispatch) {
  return {
    showOverlay: (show) => dispatch(setOverlay(show))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
