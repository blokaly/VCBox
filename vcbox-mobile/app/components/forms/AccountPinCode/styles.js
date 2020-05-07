import {StyleSheet} from "react-native";
import material from '../../../theme/variables/material'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    center: {
        alignSelf: 'center'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        width: 300,
    },
    error: {
        fontSize: 14,
        alignSelf: 'center',
        color: '#960909',
        justifyContent: 'center',
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    label: {
        fontSize: 14,
        marginBottom: 25,
        lineHeight: 17,
        fontFamily: 'Rubik',
        textAlign: 'center'
    },
    itemInput: {
        justifyContent: 'center',
        borderColor: "#009688",
        borderBottomWidth: 2,
        marginLeft: 0,
        width: 300
    },
    itemInputError: {
        borderColor: "#960909",
    },
    input: {
        textAlign: 'center',
        marginLeft: 0,
        width: 300
    },
});