import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#fafafa'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 64
    },
    welcomeText: {
        marginBottom: 16
    },
    text: {
        marginBottom: 16
    },
    button: {
        backgroundColor: '#fff',
        marginTop: 40
    },
    link: {
        color: '#9e9e9e',
        fontSize: 14,
        fontFamily: 'Rubik',
        lineHeight: 17,
        textDecorationLine: 'underline',
        textDecorationColor: '#9e9e9e',
        textAlign: 'center',
        marginTop: 40
    },
    logo: {
        width: 55,
        height: 64,
        marginBottom: 40
    },
    cardItemHeader: {
        marginBottom: 10
    },
    cardItemBorder: {
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 1
    },
    cardItemWrapper: {
        paddingLeft: 0,
        paddingBottom: 17,
        paddingTop: 18,
        paddingRight: 16,
        marginLeft: 16
    },
    cardItemSingle: {
        paddingBottom: 10,
        paddingTop: 10
    },
    cardItem: {
        marginTop: -10,
        paddingBottom: 5,
        paddingTop: 5
    },
    ListCard: {
        paddingVertical: 5
    },
    listTitle: {
        fontSize: 14,
        lineHeight: 17,
        fontFamily: 'Rubik',
        color: "#9e9e9e"
    },
    listItem: {
        padding: 0,
        height: 17
    },
    listItemName: {
        fontSize: 12,
        lineHeight: 16
    },
    bottomCard: {
        paddingTop: 15
    },
    listActions: {
        marginTop: 5
    },
    listAction: {
        marginRight: 20,
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '500',
        fontFamily: 'Rubik',
        color: "#009688"
    },
    cardItemText: {
        fontSize: 10,
        lineHeight: 17,
        fontFamily: 'Rubik'
    }
});
