import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16
   },
   form: {
      padding: 0,
      margin: 0
   },
   item: {
      marginTop: 0,
      marginLeft: 0,
      marginBottom: 15,
      borderBottomColor: 'rgba(0,0,0,0.12)',
      borderBottomWidth: 2
   },
   itemSuccess: {
      borderBottomColor: '#009688'
   },
   itemError: {
      borderBottomColor: '#f1504f'
   },
   input: {
      paddingLeft: 1,
      paddingRight: 1
   },
   label: {
      color: 'rgba(158,158,158,0.87)',
      fontSize: 14,
      lineHeight: 24
   },
   submit: {
      marginTop: 50,
      backgroundColor: '#fff',
      width: 280,
      alignSelf: 'center'
   },
   error: {
      color: "red",
      fontSize: 12,
      paddingLeft: 15
   },
   btnText: {
      fontSize: 14,
      fontFamily: 'Rubik'
   },
   btnTextDisabled: {
      color: '#e0e0e0'
   }
})
