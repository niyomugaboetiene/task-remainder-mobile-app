import { View, Text } from "react-native"
import { useState } from "react"
import axios from "axios";

 function SignIn() {
   const [full_name, setFull_name] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const CreateAccount = async () => {
    const res = await axios.post('http://localhost:5000/sign-in', ())
   }
}