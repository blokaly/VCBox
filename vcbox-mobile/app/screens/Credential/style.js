import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: 64,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    grid: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
    },
    thumb: {
        width: 16,
        height: 16,
        marginRight: 16,
        alignSelf: 'center'
    },
    textCol: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        fontSize: 11,
        lineHeight: 15
    },
    time: {
        fontSize: 12,
        color: '#9e9e9e',
        marginTop: 4,
        lineHeight: 14
    },
    status: {
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'right'
    },
    quantity: {
        fontSize: 12,
        color: '#9e9e9e',
        marginTop: 4,
        lineHeight: 14,
        textAlign: 'right'
    },
    icon: {
        alignSelf: 'center',
        marginLeft: 16
    },
    colLeft: {
        width: 110,
        flexDirection: 'column',
        marginRight: 0
    },
    colRight: {
        flexDirection: 'column'
    },
    transactionLeftText: {
        color: '#999',
        fontSize: 12,
        marginBottom: 7.8,
        lineHeight: 17,
        fontFamily: 'Rubik'
    },
    transactionRightText: {
        color: '#000',
        fontSize: 12,
        marginBottom: 8,
        lineHeight: 17,
        fontFamily: 'Rubik'
    },
    transactionRow: {
        marginBottom: 0
    }
});
