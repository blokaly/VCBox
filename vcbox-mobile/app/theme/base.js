import {StyleSheet, Platform, Dimensions} from "react-native";
const {width, height} = Dimensions.get('window');

export default styles = StyleSheet.create({
    iosTopBarBackgroundGray: {
        width: '100%',
        height: Platform.OS == 'ios' && height == 812 ? 48 : 24,
        backgroundColor: '#e0e0e0'
    },
    iosTopBarBackgroundGreen: {
        width: '100%',
        height: Platform.OS == 'ios' && height == 812 ? 48 : 24,
        backgroundColor: '#007065'
    },
    bigTitle: {
        color: 'rgba(0,0,0,0.87)',
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'Rubik',
        fontWeight: '500'
    },
    title: {
        color: '#000',
        fontSize: 14,
        lineHeight: 17,
        fontFamily: 'Rubik',
    },
    filterTitle: {
        color: '#000',
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'Rubik',
    },
    filterSubtitle: {
        color: '#9e9e9e',
        fontSize: 10,
        lineHeight: 12,
        fontFamily: 'Rubik',
    },
    subtitle: {
        color: '#9e9e9e',
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'Rubik',
    },
    cardTitle: {
        fontWeight: '500',
        fontFamily: 'Rubik',
        fontSize: 14,
        lineHeight: 17,
        opacity: 0.54,
        color: '#000'
    },
    holdingTextWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 1,
        height: 15
    },
    holdingText: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#999',
        fontFamily: 'Rubik',
        height: 15,
        lineHeight: 12,
        paddingLeft: 5,
        paddingRight: 5
    },
    redTextColor: {
        color: '#f44336'
    },
    greenTextColor: {
        color: '#4caf50'
    },
    row: {
        flexDirection: 'row'
    },
    col: {
        flexDirection: 'column'
    },
    fullWidth: {
        width: '100%'
    },
    hide: {
        display: 'none'
    },
    screenBackgroundColor: {
        backgroundColor: '#fafafa'
    },
    flexStart: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    card: {
        flex: 1,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 2,
        borderColor: 'transparent'
    },
    cardMore: {
        paddingBottom: 0
    },
    cardNoPadding: {
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    paragraph: {
        color: '#000',
        fontSize: 14,
        lineHeight: 17,
        fontFamily: 'Rubik',
    },
    checkbox: {
        height: 18,
        width: 18,
        paddingRight: 2,
        backgroundColor: '#fff',
        borderColor: '#757575',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    checkboxChecked: {
        backgroundColor: '#009688',
        borderColor: '#009688'
    },
    greenDotColor: {
        backgroundColor: '#009688'
    },
    greenDotActiveColor: {
        backgroundColor: '#4caf50'
    }
});