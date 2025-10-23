import { View, Text, } from "react-native"
import axios from "axios"
import { useState } from "react";

function SignUp() {
       const [username, setUsername] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [success, setSuccess] = useState("");
       const [error, setError] = useState("");

       const Login = async () => {
          const res = await axios.post('http://localhost:5000/sign-in', {
            username, email, password
          }, {
            withCredentials: true
          })
       }
}