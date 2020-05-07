import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.5,
        justifyContent: 'center',
        backgroundColor: '#000',
        elevation: 40,
        zIndex: 40
    },
});