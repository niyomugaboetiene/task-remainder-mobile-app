import { View, Text } from "react-native"
import { useState } from "react"
import axios from "axios";

 function SignIn() {
   const [full_name, setFull_name] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [success, setSuccess] = useState("");
   const [error, setMessage] = useState(null);

   const CreateAccount = async () => {
    try {
       const res = await axios.post('http://localhost:5000/sign-in', {full_name, username, email, }, { withCredentials: true });
       setSuccess(res.data.message);
       setFull_name("");
       setEmail("");
       setPassword("");
       setUsername("");
    } catch (error) {
        setEmail("Unable to create Account");
    }

   }
}