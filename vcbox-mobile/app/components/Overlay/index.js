import React, {Component} from 'react'
import {View,} from 'react-native'
import styles from './styles'
import {connect} from "react-redux";

class Overlay extends Component {
    render() {
        if (this.props.overlay.overlay !== true) {
            return null;
        }
        return (
          <View style={styles.overlay}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        overlay: state.overlay
    }
}

export default connect(mapStateToProps, null)(Overlay)
