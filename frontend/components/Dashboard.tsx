import { View, Text, TouchableOpacity } from "react-native"
import axios from "axios"
import { useState } from "react"

function Dashboard(){
    const [userInfo, setUserInfo] = useState("");

    const res: any = axios.get('/http://localhost:5000/loggedIn', {withCredentials: true});
    setUserInfo(res);
}