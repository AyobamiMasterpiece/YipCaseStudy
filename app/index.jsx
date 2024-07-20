import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Image, Modal, Pressable, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import  Product  from "../components/Product";
import * as ImagePicker from 'expo-image-picker';
export default function Index() {
  const [productItems,setProductItems]=useState([])
   const [image, setImage] = useState(null);

  

  const [isModalOpen,setIsmodal]=useState(false)
  const [productName,setProductName]=useState('')
   const [productPrice,setProductPrice]=useState('')
   const inputProps=[productName,productPrice,setProductName,setProductPrice,setProductItems,productItems,isModalOpen,setIsmodal,image,setImage]
   console.log(productItems.length,'arr');
  return (
    <View
      style={{
        flex: 1,
        padding:20,
        backgroundColor:"white",
        position:"relative"
      
      }}
    >
      <ModalLayout inputProps={inputProps}></ModalLayout>


      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        zIndex:-10
      }} style={{}}>

      <Text style={{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:30,
        color:'#4D4D4D'
      }}>Hey 👋
</Text>

 <Text style={{
        fontSize:14,
        // fontWeight:"bold",
        marginBottom:20,
        color:'#4D4D4D',
        textAlign:"center"
      }}> You can get to display your products on products verse with a name, price and Image. there is a catch though you can only add five items
</Text>
<Text style={{
  color:'grey',
  fontSize:16,
  textAlign:"center",
  fontWeight:"bold",
}}>{productItems.length==0 ? 'Oops , No products added yet':'Take a look at your current products'}</Text>

{
   productItems.map((item)=>{
   
   return  <Product item={item} key={new Date().toString()+Math.random()}></Product>
  })
}



 </ScrollView>


   <Pressable style={({pressed})=> [
    {
   position:"absolute",
      bottom:'7%',
      right:7,
     zIndex:1000,
    // backgroundColor:"green",
     padding:20,
     borderRadius:35
     
      },
      pressed && {
      bottom:'10%',
         
          borderColor:'white'
      }
   ]
      
   }
   android_ripple={{
    radius:55,
    color:"red",
    borderless:true
   }}
   onPress={()=>{
    if (productItems.length==5){

Alert.alert('Wait a sec!','Sorry ,but I told you you can only add five items to Products verse',[
{
  text:'Ok'
},
{
  text:'No dont even think of it'
}
],{
  cancelable:true
})
      return
    }
    setIsmodal(!isModalOpen)

   }}
   >
       <View style={{
      
          backgroundColor:'red',
            backgroundColor:"#B22222",
        // backgroundColor:'black',
      borderColor:'orange',
      borderWidth:3,
      ////remve top
      borderRadius:25,
      padding:20,
      alignItems:"center",
      justifyContent:"center",
      width:70,
      height:70,
      // zIndex:10
   
       }}
       
       >
<AntDesign name="plus" color={'white'} size={25}></AntDesign>
      </View>
   </Pressable>
  
    </View>

//
  );
};



const ModalLayout=(props)=>{
  console.log(props);
  const [btndisabled,setBtnDisabled]=useState(false)
  const [errMessage,setErrMessage]=useState(false)
 
  const [productName,productPrice,setProductName,setProductPrice,setProductItems,productItems,isModalOpen,setIsmodal,image,setImage]= props.inputProps
   console.log(image,'image');
  const onCreate =()=>{
    if (image===null||productName==''||productPrice=='') {

      if (productName==''){
        setErrMessage('Your product should have a name')
      }
      else if (productPrice==''||isNaN(productPrice)){
        console.log('nvm');
         setErrMessage('Your product should have a price')

      }
      else if (image===null){
        console.log('lol');
setErrMessage('Your product should have an Image')
      }


      return
      
    }
    const obj={
      productName:productName,
      productPrice,
      image
    }
    const arr=[...productItems,obj]
    setProductItems(arr)
    setIsmodal(!isModalOpen)
    setImage(null),
    setProductName('')
    setProductPrice('')
    setErrMessage(false)




  }


  const pickImage = async () => {
    setBtnDisabled(true)
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setBtnDisabled(false)
  };
  return <Modal transparent={false} animationType="slide" visible={isModalOpen}>
   <View style={{
    flex:1,
  justifyContent:"flex-end",

   }}>
    <View style={{
      height:'80%',
      // backgroundColor:"#B22222",
      // backgroundColor:"#B22222",
     backgroundColor:"white",
      borderTopColor:'#B22222',
      
          borderTopEndRadius:30,
     borderTopStartRadius:30,
     borderLeftColor:"white",
     borderRightColor:'white',
     borderWidth:1.5,
     borderBottomWidth:0,
    //  borderLeftWidth:0,
    //  borderRightWidth:0,
      padding:10
    }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* <View
      style={{
        width:'25%',
        alignSelf:"center",
        padding:3,
        borderRadius:50,
        borderWidth:2,
        backgroundColor:"black",
        borderColor:'black',
       
      }}
      >

      </View> */}
   <TouchableOpacity
   onPress={()=>{
        setIsmodal(!isModalOpen)
      }}
   >
       <Ionicons name="close" size={35}  color='red' style={{
        alignSelf:'center',
        marginVertical:7,
      }} ></Ionicons>
   </TouchableOpacity>
  <Text style={{
    textAlign:'center',
    color:'black',
    fontSize:20,
    marginVertical:20,
    fontWeight:"bold"
    
    
    
  }}>Create a New Product</Text>

<TextInput placeholder="Product Name" style={{
  backgroundColor:"white",
  marginVertical:20
  // borderRadius:20
  
}} mode="outlined" label={'Product Name'} outlineColor="grey" activeOutlineColor='black' textColor="black" value={productName} onChangeText={(e)=>{
setProductName(e)
}}  error={errMessage&&productName==''}></TextInput>


<TextInput placeholder="Product Price" style={{
  backgroundColor:"white",
    marginVertical:20,
   
  // borderRadius:20
}} mode="outlined" label={'Product Price'} outlineColor="grey" activeOutlineColor='black' textColor="black"  value={productPrice} onChangeText={(e)=>{
       setProductPrice(e)
}} inputMode="numeric" error={errMessage&&productPrice==''} ></TextInput>

<TouchableHighlight underlayColor={'#A9A9A9'}  onPress={()=>{
pickImage()
}} style={{
  backgroundColor: btndisabled ? '#A9A9A9':"#B22222",
    marginVertical:20,
  padding:10,
 borderRadius:20,
 width:'85%',
 alignSelf:"center",
 
  
}}
disabled={btndisabled}
>
  <View style={{
  alignItems:"center"
}}>
  {image==null?<AntDesign name="picture" size={50} color={'white'}></AntDesign>:<Image source={{ uri: image }} style={{
    width:200,height:200,borderRadius:20,marginVertical:7
  }}></Image>}
<Text style={{
  fontWeight:"bold",
  fontSize:15,
  marginTop:10,
  color:'white'
}}>{image==null ? 'Choose an Image' : btndisabled ? <ActivityIndicator color="red"></ActivityIndicator>:'Change Image'}</Text>  
</View>
</TouchableHighlight>
<Text style={{
  textAlign:'center',
  marginVertical:2,
  color:"red"
}}>{errMessage}</Text>
<TouchableHighlight style={{
  alignItems:'center',
  justifyContent:"center",
   marginVertical:20,
   backgroundColor:"#B22222",
   padding:10,
   borderRadius:20
}} underlayColor={'#A9A9A9'}  onPress={onCreate}>
  <Text style={{
    color:'white',
    fontWeight:"bold",
    fontSize:15,
    letterSpacing:.7
  }}>Create</Text>
</TouchableHighlight>
  </ScrollView>
    </View>

   </View>
  </Modal>
}