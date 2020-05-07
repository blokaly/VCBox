import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        marginRight: 40,
        marginLeft: 40,
        paddingTop: 24,
        paddingBottom: 0,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 48,
        marginTop: 26,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modalButtonText: {
        paddingTop: 0,
        marginTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        fontFamily: 'Rubik',
        color: '#009688',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center'
    },
    modalButton: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 9,
        paddingBottom: 10,
        marginLeft: 8,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0
    },
});