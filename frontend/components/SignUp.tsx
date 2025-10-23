import { View, Text, TouchableOpacity, TextInput} from "react-native"
import axios from "axios"
import { useState } from "react";

function SignUp() {
       const [username, setUsername] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [success, setSuccess] = useState("");
       const [error, setError] = useState("");
       const [isLoggedIn, setIsLoggedIn] = useState(false);

       const Login = async () => {
        try {
             const res = await axios.post('http://localhost:5000/sign-up', { username, email, password }, { withCredentials: true  });
             setIsLoggedIn(true);
             setUsername("");
             setPassword("");
             setEmail("");
             setSuccess(`Logged In successfully ${res.data.name}`);
             setTimeout(() => {
                setSuccess("")
             }, 5000);
        } catch (err: any) {
             setError(err.data.message);
            setIsLoggedIn(false);
            setTimeout(() => {
                setError("")
            }, 3000);
        }
       }

       return (
         <View className="min-h-screen bg-gradient-to-bl from-blue-300 to-gray-300 via-green-300 p-5">
                <Text className="text-xl text-center text-black font-bold">Sign In</Text>
    
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
                      onPress={Login}
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

export default SignUp