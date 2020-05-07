import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    header: {
        backgroundColor: '#f5f5f5',
        height: 56,
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomColor: 'transparent',
        justifyContent: 'flex-start',
        paddingTop: 0,
        paddingBottom: 0,
        elevation: 7,
        shadowColor: 'rgba(0,0,0,0.15)',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 5
    },
    text: {
        fontSize: 16,
        fontFamily: 'Rubik',
        color: '#000000',
        lineHeight: 19,
        marginLeft: 8
    },
    back: {
        width: 24,
        height: 24
    },
    help: {
        width: 24,
        height: 24
    },
});