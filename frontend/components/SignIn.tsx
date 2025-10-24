import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

 function SignIn() {
   const [full_name, setFull_name] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   const CreateAccount = async () => {
    try {
      if (username && password && full_name && email) {
          const res = await axios.post('http://localhost:5000/sign-in', {full_name, username, email, password}, { withCredentials: true });
          setSuccess(res.data.message);
          setFull_name("");
          setEmail("");
          setPassword("");
          setUsername("");
      } else {
         setError("Fill out all fields");
         return;
      }
    } catch (error) {
        setError("Unable to create Account");
    }
   }

   return (
    <View className="min-h-screen bg-gradient-to-bl from-blue-300 to-gray-300 via-green-300 p-5">
        <Text className="text-xl text-center text-black font-bold">Sign Up</Text>
        <View className="mt-4">
           <Text className="text-lg text-gray-700">Full Name</Text>
           <TextInput 
               className="bg-gray-700 rounded-lg p-4 placeholder:text-white text-white"
              placeholder="Enter your full name"
              onChangeText={setFull_name}
           />
        </View>
        <View className="mt-4">      
           <Text className="text-lg text-gray-700">Username</Text>
           <TextInput 
               className="bg-gray-700 rounded-lg placeholder:text-white text-white p-4"
               placeholder="Enter your user name"
               onChangeText={setUsername}
            />
        </View>
        <View className="mt-4">
           <Text className="text-lg text-gray-700">Email</Text>
           <TextInput 
              className="bg-gray-700 rounded-lg placeholder:text-white text-white p-4"
              placeholder="Enter your email"
              onChangeText={setEmail}
            />
        </View>
        <View className="mt-4">
           <Text className="text-gray-700 text-lg">Password</Text>
           <TextInput 
              className="rounded-lg bg-gray-700 placeholder:text-white text-white p-4"
              placeholder="Enter your password" 
              onChangeText={setPassword}
            />
          </View>

           <View className="mt-4">
            <TouchableOpacity 
              className="bg-green-200 p-4 rounded-lg active:bg-green-400"
              onPress={CreateAccount}
            >
                <View>
                    <Text className="text-center font-bold">Sign Up</Text>
                </View>
            </TouchableOpacity>
           </View>
        
         <View className="mt-4">
            {success && (
               <Text className="text-green-600 font-bold">{success}</Text>
            )}
         </View>  
      <View className="mt-4">
            {error && (
               <Text className="text-lg text-red-500">{error}</Text>
            )}
         </View>

    </View>
   )
}

export default SignIn;