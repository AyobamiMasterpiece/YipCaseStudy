import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle:"Products Verse",
        headerTitleAlign:"center",
        headerTitleStyle:{
          fontWeight:'bold',
          color:"white"
        },
        headerStyle:{
          backgroundColor:"#B22222"
        }
        
       
        
      }}/>
    </Stack>
    </PaperProvider>
  );
}
