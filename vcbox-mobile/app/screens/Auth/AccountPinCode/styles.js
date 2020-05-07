import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#f5f5f5',
        height: 55,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 15,
        paddingLeft: 20
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'Rubik',
        color: '#000000',
        lineHeight: 19,
        marginLeft: 15,
        marginTop: 5
    },
    center: {
        alignSelf: 'center'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});