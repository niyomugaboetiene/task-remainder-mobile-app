import { View, Text, TouchableOpacity, FlatList } from "react-native"
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
        if (hour < 12) return "Good Moring";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }

    return (
        <View className="min-h-screen bg-gradient-to-bl from-blue-300 to-gray-300 via-green-300 p-5">
            <Text className="text-center font-light text-xl">{getGreeting()} {userInfo} Welcome to task remainder </Text>
            <Text>Your Pending tasks</Text>
            <View>
                    <Text>Learing python</Text>
                    <Text>Learing python</Text>
                    <Text>Learing python</Text>
                    <Text>Learing python</Text>
                    <Text>Learing python</Text>
            </View>
        </View>
    )
}

export default Dashboard;