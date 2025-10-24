import axios from "axios"
import { useState } from "react"
import { useNavigation } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"; 

export default  function AddTask() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [due_date, setDue_date] = useState("");
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigation();


    async function AddTask() {
      if (!title || !description || !status || !due_date) {
         setError("All fields are required");
         return;
      }
       try {
           setLoading(true)
           setError("")
           await axios.post('http://localhost:5000/add', {
              title,
              description, 
              due_date, 
              status,
           }, {
            headers: {
               'Content-Type': 'application/json'
            },
            withCredentials: true
           });
           setTitle("");
           setDescription("")
           setDue_date("")
           setStatus("pending")
           setSuccess("Task added successfully");
           navigate.navigate("home" as never);
        } catch (error) {
             setError("Unable to create task. try again later")
             console.log("ERROR", error)
        } finally {
           setLoading(false);
           setSuccess("");
       }
    }
 
    return (
         <View className="min-h-screen bg-gradient-to-bl from-blue-300 to-gray-300 via-green-300 p-5">
               <Text className="text-xl text-center text-black font-bold">Add Task</Text>
               <View className="mt-4">
                <Text className="text-lg text-gray-700">Title</Text>
                <TextInput 
                  className="bg-gray-700 p-3 rounded-xl placeholder:text-white text-white" 
                  placeholder="Enter title"
                  onChangeText={setTitle}
                 />
             </View>
            <View>

            </View>
            <View className="mt-4">
              <Text className="text-lg text-gray-700">Description</Text>
              <TextInput
                className="bg-gray-700 p-3 rounded-xl placeholder:text-white text-white" 
                placeholder="Enter Description"
                onChangeText={setDescription}
              />
            </View>

            <View className="mt-4">
               <Text className="text-lg text-gray-700">Finishing Date</Text>
               <TextInput 
                 className="bg-gray-700 rounded-xl p-3 placeholder:text-white text-white"
                 placeholder="YYYY-MM-DD"
                 onChangeText={setDue_date}
               />
            </View>

         <View className="mt-4">
          {loading ? (
              <ActivityIndicator 
                size="large" color="blue" 
              />
           ) : (
          <TouchableOpacity
             className="bg-green-200 p-4 rounded-lg active:bg-green-400"
              onPress={AddTask}
          >
            <View>
               <Text className="text-center text-black font-bold">Add Task</Text>
            </View>

          </TouchableOpacity>
         )}
         </View>

         <View className="mt-4">
          {error && (
            <Text className="text-red-500 text-lg">{error}</Text>
          )}
        </View>
        <View className="mt-4">
          {success && (
            <Text className="text-green-500 text-lg">{success}</Text>
          )}
        </View>

         </View>
    )
}