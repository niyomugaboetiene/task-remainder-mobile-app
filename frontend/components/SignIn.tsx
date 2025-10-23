import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react"
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
       const res = await axios.post('http://localhost:5000/sign-in', {full_name, username, email, password}, { withCredentials: true });
       setSuccess(res.data.message);
       setFull_name("");
       setEmail("");
       setPassword("");
       setUsername("");
    } catch (error) {
        setError("Unable to create Account");
    }
   }

   return (
    <View className="min-h-screen bg-gradient-to-bl from-blue-300 to-gray-300 via-green-300 p-5">
        <Text className="text-xl text-center text-white font-bold">Create Account</Text>
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
        <View>
           <Text>Password</Text>
           <TextInput 
              placeholder="Enter your password" 
              onChangeText={setPassword}
            />

            <TouchableOpacity 
              onPress={CreateAccount}
            >
                <View>
                    <Text>Create Account</Text>
                </View>
            </TouchableOpacity>
        </View>

        {success && (
         <Text>{success}</Text>
        )}
    </View>
   )
}

export default SignIn;