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
        <View className="bg-gradient-to-br to-purple-400 from-purple-300 via-green-300 max-h-screen">
            <View className=" p-4 h-[230px]">
                  <Text className="text-lg font-bold text-white ms-3 text-center mt-9">{getGreeting()}</Text>
                  <Text className="ms-3 text-[17px] text-white font-light text-center">Welcome to task remainder {userInfo} 👋</Text>
                  <View className="grid grid-cols-3  mt-7 ms-4">
                    <View className="bg-blue-400 w-[100px] p-3 rounded-xl shadow-lg">
                       <Text className="text-center text-white font-bold text-[17px]">{pending}</Text>
                       <Text className="text-center text-white text-[14px] mt-2">Pending</Text>
                    </View>   
                    <View className="bg-yellow-400 w-[100px] p-3 rounded-xl shadow-lg">
                       <Text className="text-center text-white font-bold text-[17px]">{fullTask}</Text>
                        <Text className="text-center text-white text-[14px] mt-2">Total</Text>
                    </View>  
                     <View className="bg-purple-400 w-[100px] p-3 rounded-xl shadow-lg">
                         <Text className="text-center font-bold text-white text-[17px]">{completed}</Text>
                        <Text className="text-center text-white text-[14px] mt-2">Completed</Text>
                    </View>
                  </View>
            </View>
         <View className="bg-white h-screen rounded-t-[30px] p-5">
    <Text className="text-2xl font-bold text-gray-800 mb-2">Your Tasks</Text>
    <Text className="text-gray-500 mb-6">Manage your daily tasks efficiently</Text>
    
    <View className="flex-1">
        <FlatList
            data={userTasks}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
                const colors = ["#FEF3C7", "#E0E7FF", "#FEE2E2", "#D1FAE5", "#DBEAFE", "#FFEDD5"];
                const textColors = ["#92400E", "#3730A3", "#991B1B", "#065F46", "#1E40AF", "#9A3412"];
                const bgColor = colors[index % colors.length];
                const textColor = textColors[index % textColors.length];
                
                return (
                    <View 
                        style={{ backgroundColor: bgColor }} 
                        className="p-4 mb-4 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <View className="flex-row justify-between items-start mb-2">
                            <Text className="text-lg font-semibold" style={{ color: textColor }}>
                                {item.title}
                            </Text>
                            <View className={`px-2 py-1 rounded-full ${
                                item.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                                <Text className={`text-xs font-medium ${
                                    item.status === 'completed' ? 'text-green-800' : 'text-yellow-800'
                                }`}>
                                    {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                                </Text>
                            </View>
                        </View>
                        
                        <Text className="text-gray-600 text-sm mb-3 leading-5">
                            {item.description}
                        </Text>
                        
                        <View className="flex-row justify-between items-center pt-2 border-t border-gray-200">
                            <View className="flex-row items-center">
                                <Text className="text-xs text-gray-500 font-medium">
                                    📅 {new Date(item.due_date).toLocaleDateString()}
                                </Text>
                            </View>
                            <Text className="text-xs text-gray-400">
                                Created: {new Date(item.created_at).toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                )
            }}
            ListEmptyComponent={
                <View className="items-center justify-center py-10">
                    <Text className="text-gray-400 text-lg">No tasks found</Text>
                    <Text className="text-gray-400 text-sm mt-2">Create your first task to get started</Text>
                </View>
            }
        />
    </View>
  </View>
</View>
    )
}

export default Dashboard;