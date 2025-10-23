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
    <View>
        <Text>Create Account</Text>
        <View>
           <Text>Full Name</Text>
           <TextInput 
              placeholder="Enter your full name"
              onChangeText={setFull_name}
           />
        </View>
        <View>      
           <Text>Username</Text>
           <TextInput 
               placeholder="Enter your user name"
               onChangeText={setUsername}
            />
        </View>
        <View>
           <Text>Email</Text>
           <TextInput 
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