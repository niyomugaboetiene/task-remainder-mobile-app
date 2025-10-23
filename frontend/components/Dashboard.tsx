import { View, Text, TouchableOpacity } from "react-native"
import axios from "axios"
import { useState, useEffect } from "react"

function Dashboard(){
    const [userInfo, setUserInfo] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
       const UserInfo = async() => {
        try {
            setLoading(true)
            const res = await axios.get('http://localhost:5000/loggedIn', {withCredentials: true});
            setUserInfo(res.data.user);
            setLoading(true);
        } catch (err: any) {
            setError(err?.response?.data);
            setLoading(false);
        } finally {
            setLoading(false);
        }
       }
       UserInfo();
    }, [])
  
    const getGreeting = () => {
        const hour = new Date().getHours();
    }

    return (
        <View>
            <Text>Welcome: {userInfo}</Text>
        </View>
    )
}

export default Dashboard;