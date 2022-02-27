import { StyleSheet } from 'react-native';
import adjust from '../utils/fontAdjust';

export default StyleSheet.create({
    tabBar: {
      // backgroundColor:"#fbfbff",
    },
    titleTextNote:{
      fontSize:adjust(30),
      fontFamily:'MavenPro-Medium',
      alignSelf: "center",
    },
    titleCardNote:{
      fontSize:adjust(16),
      fontFamily:"MavenPro-SemiBold",
    },
    descriptionCardNote:{
      marginTop:10,
      fontSize: adjust(12),
      fontFamily:"MavenPro-Regular",
      textAlign:"auto"
    },
    container: {
       flex: 1,
       justifyContent: "center",
       backgroundColor: "#ebe9e9", //white-soft
       marginTop: 2,
      },
    navContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      position: 'absolute',
      marginBottom:10,
      bottom:0,
    },
    buttonBookNav: {
      padding:5,
      marginHorizontal:10,
      backgroundColor: '#2196F3',
      elevation: 4,
      borderRadius:10,
    },
    input:{
       tintColor: "#FFF"
    },
    inputTextEditor:{
      alignSelf:'stretch',
      color:'#fff',
      fontSize:25,
      padding:20,
      paddingTop:46,
      height: 320,
      backgroundColor:'#252525',
      borderTopWidth:2,
      borderTopColor:'#ededed'
  },
    scrollView: {
      backgroundColor: "#fbfbff", //white-soft
      marginHorizontal: 4,
      marginBottom: 3
    },
     vers: {
       fontSize: 16,
       color: '#040f16',
       marginTop: 15,
       marginBottom: 5,
     },
     selector: {
      fontSize: adjust(16),
      color: '#040f16',
      alignSelf: "center",
      marginTop: 15,
    },
    selectorCap: { 
      fontSize: 24,
       color: '#040f16',
       alignSelf: "center",
       marginTop: 15,
    },
     title: {
      fontSize: adjust(25),
      fontFamily:'Cormorant-SemiBold',
      textAlign: "justify",
      color: '#040f16',
      marginLeft: 15,
      marginRight: 15,
      marginTop:60,
      alignSelf: "center",
      
    },
    subtitle: {
      fontSize: 24,
      textAlign: "justify",
      color: '#FFF',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginTop: 15
    },
    versRef: {
      fontSize: 14,
      textAlign: "right",
      color: 'black',
      marginRight:30,
      fontFamily:'MavenPro-SemiBold'
    },
    ScrollSelector: {
       alignContent: "space-between",
       flexDirection: "row",
       marginBottom:20
    },
    itemSelecionado:{
      color: '#3581b8',
      fontWeight:"bold",
      fontSize: adjust(18),
      textAlign: "justify",
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      marginTop: 15
    },
    selectedCap:{
      color: '#3581b8',
      fontWeight:"bold",
      fontSize: 24,
      textAlign: "justify",
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      marginTop: 15
    },
  centeredView: {
   flex: 1,
   justifyContent: 'space-between',
   alignItems: 'center',
   marginTop: 22,
 },
 modalView: {
   margin: "4%",
   marginVertical: "30%",
   backgroundColor: '#dee2d6', //soft grey
   borderRadius: 20,
   paddingTop:"5%",
   paddingHorizontal:"5%",
   paddingBottom:"15%",
   alignItems: 'center',
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5,
 },
 buttonModal: {
   borderRadius: 20,
   padding: 10,
   elevation: 2,
 },
 buttonOpen: {
   backgroundColor: '#F194FF',
 },
 buttonClose: {
   backgroundColor: '#2196F3',
 },
 inactiveIconButton: { 
   elevation: 4, 
   backgroundColor:"#f3f8f2", //white 
   shadowOpacity:1, 
   borderColor:"#ebe9e9", //grey 
   borderRadius:25, 
   borderWidth:3
 },
 activeIconButton: { 
   elevation: 4, 
   backgroundColor:"#f3f8f2", 
   shadowOpacity:1, 
   borderColor:"#ebe9e9", 
   borderRadius:25, 
   borderWidth:3
 },
 textStyle: {
   color: '#f3f8f2', //white
   fontWeight: 'bold',
   textAlign: 'center',
 },
 modalText: {
   marginBottom: 15,
   textAlign: 'center',
 },
 itemGrid: {
   alignItems: "center",
   backgroundColor: "transparent",
   borderWidth: 1,
   borderColor: "thistle",
   borderRadius: 30,
   flexBasis: 0,
   flexGrow: 1,
   margin: 2,
   padding: "4.6%"
 },
 itemGridSelected: {
   alignItems: "center",
   backgroundColor: "transparent",
   borderWidth: 2,
   borderColor: "#3581b8",
   borderRadius: 30,
   flexBasis: 0,
   flexGrow: 1,
   margin: 2,
   padding: "4.4%"
 },
 itemEmpty: {
   borderWidth: 0,
   backgroundColor: "transparent",
   borderRadius: 30,
   flexBasis: 0,
   flexGrow: 1,
   margin: 2,
   padding: "4.4%"
 },
 textItemGrid: {
   color: "#040f16", //black
   fontSize: adjust(20),
 },
 textItemGridSelected: {
   color: "#3581b8",
   fontSize: adjust(20),
 },
 buttonColorMark: {
   alignItems:'center',
   borderColor: '#040f16',
   borderWidth: 1,
   marginHorizontal:4, 
   padding:18, 
   borderRadius: 15, 
   justifyContent:'flex-start'
 }
 });