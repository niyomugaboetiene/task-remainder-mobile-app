import { View, Text, TouchableOpacity, FlatList } from "react-native"
import axios from "axios"
import { useState, useEffect } from "react"

function Dashboard(){
    const [userInfo, setUserInfo] = useState("");
    const [error, setError] = useState("");
    const [userTasks, setUserTasks] = useState({});
    const [loading, setLoading] = useState(false);
    const [pending, setPending] = useState(null);
    const [completed, setCompleted] = useState(null);
    const [fullTask, setFullTask] = useState(null);
 
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
    }, []);

    useEffect(() => {
        const fetchUserTasks = async() => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5000/all', { withCredentials: true });
                setUserTasks(res.data.results);
                setLoading(false);
                setError("");
            } catch (error: any) {
                const errorMessage = error.response?.data?.error;
                setError(errorMessage);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        fetchUserTasks();
    }, []) 

    useEffect(() => {
        const fetchPendingTasks = async() => {
            try {
                const res = await axios.get('http://localhost:5000/pending', { withCredentials: true });
                setPending(res.data.pending);
                setLoading(false); 
            } catch (error: any) {
                const ErrorMessage = error.response?.data?.error;
                 setError(ErrorMessage)
            } finally {
                setLoading(false);
            }
        } 

        fetchPendingTasks();
    }, [])
  
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Moring";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }

    return (
        <View className="">
            <View className="bg-gradient-to-bl from-blue-300 to-gray-300 via-green-300 p-4">
                  <Text className="font-light text-lg">{getGreeting()} {userInfo}</Text>
                  <Text>Welcome to task remainder </Text>
                  <View>
                    <Text>Pending</Text>
                    <Text>{pending}</Text>
                  </View>
            </View>
            <View>
            <Text>Your Task</Text>
            <View>
                <FlatList
                   data={userTasks}
                   keyExtractor={(item) => item.id.toString()}
                   renderItem={({ item }) => (
                        <View>
                           <Text>{item.title}</Text>
                           <Text>{item.description}</Text>
                           <Text>{item.due_date}</Text>
                           <Text>{item.status}</Text>
                           <Text>{item.created_at}</Text>
                        </View>
                   )}
                 / >

            </View>
            </View>

        </View>
    )
}

export default Dashboard;