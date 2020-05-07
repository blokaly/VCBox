import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {RNCamera} from "react-native-camera";
import {useIsFocused} from '@react-navigation/native';
import {connect} from "react-redux";
import {apiFetch, resetCredRequest} from "../../redux/actions";

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {codeRead:false};
    this.barcodeRecognized = this.barcodeRecognized.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.isFocused) {
      return {codeRead: false}
    }
    return null
  }

  barcodeRecognized(barcode) {
    if (!this.state.codeRead) {
      let navigation = this.props.navigation
      let fetch = this.props.fetch;
      let reset = this.props.reset;
      this.setState({codeRead: true}, () => {
        let url = barcode.data;
        fetch(url)
        reset()
        navigation.navigate('Fetch')
      })
    }
  }

  render() {
    const { isFocused } = this.props;
    return (
      <View style={styles.container}>
        {isFocused &&
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
          }}
          onBarCodeRead={this.barcodeRecognized}
          captureAudio={false}
        >
        </RNCamera>
        }
      </View>
    );
  }
}

const WrappedScanner = function(props) {
  const isFocused = useIsFocused();
  return <Scanner {...props} isFocused={isFocused} />;
}

const styles = StyleSheet.create({
  container: {
    height: 650,
    width: null,
    flex: 1,
    flexDirection: "row",
    padding: 0
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  viewFinder: {
    backgroundColor: "transparent"
  }
});

function mapStateToProps(state) {
  return {

  }
}

function  mapDispatchToProps(dispatch) {
  return {
    fetch: (url) => dispatch(apiFetch(url)),
    reset: () => dispatch(resetCredRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedScanner)

