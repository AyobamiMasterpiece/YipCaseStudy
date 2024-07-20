import React from "react";
import { View,Text, ViewBase, Image } from "react-native";

export default function Product({item}) {
  return (
    <View style={{
      backgroundColor:"#B22222",
      //  backgroundColor:"white",
          marginVertical:20,
          padding:15,
          // opacity:.2,
          // backgroundColor:'black',
       borderRadius:15,
       borderWidth:2,
       borderColor:'orange',
       zIndex:0
    }}>
      <View
        style={{
          width: "100%",
        alignItems:"center",
           
           padding:10
      
         
        }}
      >
        <Image source={{uri:item.image}} style={{
          width:150,height:150,borderRadius:20
        }}></Image>
      </View>
      <Text style={{
    fontSize:17,
    fontWeight:"bold",
        color:"white",
        marginVertical:5
      }}>{item.productName}</Text>
       <Text style={{
        fonntSize:15,
           marginVertical:5,
           color:'pink'
      }}>$ {item.productPrice}</Text>
    </View>
  );
}
