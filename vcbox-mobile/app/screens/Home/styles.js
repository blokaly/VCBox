import {PixelRatio, StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    heading: {
        paddingLeft: 16,
        marginTop: 15,
        marginBottom: 15
    },
    header: {
        backgroundColor: '#f5f5f5',
        height: PixelRatio.roundToNearestPixel(55),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 15,
        paddingLeft: 20,
        borderColor: 'transparent',
        borderBottomWidth: 0
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'Rubik',
        color: '#000000',
        lineHeight: 19,
        marginLeft: 15,
        marginTop: 5
    },
    wrapper: {
        paddingVertical: 4
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    connected: {
        fontSize: 14,
        lineHeight: 17,
        color: 'rgba(0,0,0,0.54)',
        fontFamily: 'Rubik',
        fontWeight: '500',
        marginTop: 7
    },
    name: {
        fontSize: 14,
        lineHeight: 17,
        color: '#000000',
        fontFamily: 'Rubik',
        fontWeight: '500',
        marginBottom: 5
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    dataLeft: {
        width: 130
    },
    userDataLeft: {
        fontSize: 12,
        lineHeight: 30,
        color: '#9e9e9e',
        fontFamily: 'Rubik'
    },
    userDataRight: {
        fontSize: 14,
        lineHeight: 30,
        color: '#000000',
        fontFamily: 'Rubik'
    },
    accounts: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 15
    },
    account: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15
    },
    accountLogo: {
        width: 28,
        height: 28,
        backgroundColor: '#d8d8d8',
        borderRadius: 100/2,
        marginRight: 15
    },
    accountName: {
        lineHeight: 23,
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Rubik',
        margin: 0,
        padding: 0
    },
    cardLogout: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 20,
        paddingBottom: 19
    },
    logout: {
        fontSize: 14,
        lineHeight: 17
    },
    transactions: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flex: 1,
        flexDirection: 'column'
    },
});
