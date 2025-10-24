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
        const fetchCompletedTasks = async() => {
            try {
                const res = await axios.get('http://localhost:5000/completed', { withCredentials: true });
                setCompleted(res.data.completed);
                setLoading(false); 
            } catch (error: any) {
                const ErrorMessage = error.response?.data?.error;
                 setError(ErrorMessage)
            } finally {
                setLoading(false);
            }
        } 

        fetchCompletedTasks();
    }, []);
    useEffect(() => {
        const fetchTotalTasks = async() => {
            try {
                const res = await axios.get('http://localhost:5000/total', { withCredentials: true });
                setFullTask(res.data.total);
                setLoading(false); 
            } catch (error: any) {
                const ErrorMessage = error.response?.data?.error;
                 setError(ErrorMessage)
            } finally {
                setLoading(false);
            }
        } 

        fetchTotalTasks();
    }, []); 
    
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
    }, []);
  
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Moring";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }

    return (
        <View className="">
            <View className="bg-gradient-to-br to-purple-400 from-purple-300 via-green-300 p-4 h-[230px] max-h-screen">
                  <Text className="text-lg font-bold text-white ms-3 text-center mt-9">{getGreeting()}</Text>
                  <Text className="ms-3 text-[17px] text-white font-light text-center">Welcome to task remainder {userInfo} 👋</Text>
                  <View className="grid grid-cols-3  mt-7 ms-4">
                    <View className="bg-green-400 w-[100px] p-3 rounded-xl shadow-lg">
                       <Text className="text-center text-white font-bold text-[17px]">{pending}</Text>
                       <Text className="text-center text-white text-[14px] mt-2">Pending</Text>
                    </View>   
                    <View className="bg-green-400 w-[100px] p-3 rounded-xl shadow-lg">
                       <Text className="text-center text-white text-[17px]">{fullTask}</Text>
                        <Text className="text-center text-white text-[14px] mt-2">Total</Text>
                    </View>  
                     <View className="bg-green-400 w-[100px] p-3 rounded-xl shadow-lg">
                         <Text className="text-center text-white text-[17px]">{completed}</Text>
                        <Text className="text-center text-white text-[14px] mt-2">Completed</Text>
                    </View>
                  </View>
            </View>
            <View className="bg-green-300 h-screen rounded-t-[30px]">
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