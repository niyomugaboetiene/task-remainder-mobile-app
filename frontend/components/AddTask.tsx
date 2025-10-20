import axios from "axios"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"; 

export default  function AddTask() {
    const [titile, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [due_date, setDue_date] = useState("");
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function AddTask() {
       try {
           setLoading(true)
           setError("")
           await axios.post('http://localhost:5000/task/add', {
              titile, description, due_date, status
           }, {
            headers: {
               'Content-Type': 'application/json'
            }
           });
           setTitle("");
           setDescription("")
           setDue_date("")
           setStatus("pending")
        } catch (error) {
             setError("Unable to create task. try again later")
        } finally {
           setLoading(false);
       }
    }
 
    return (
         <View>
            <Text>Add Task</Text>
            <Text>Title</Text>
            <TextInput 
                
               placeholder="Enter title"
               onChangeText={setTitle}
            />
            <Text>Description</Text>
            <TextInput 
               placeholder="Enter Deskription"
               onChangeText={setDescription}
            />
           <Text>Finishing Date</Text>
            <TextInput 
               placeholder="YYY-MM-DD"
               onChangeText={setDue_date}
            />

         {loading ? (
            <ActivityIndicator 
              size="large" color="blue" 
            />
         ) : (
          <TouchableOpacity
              onPress={AddTask}
          >
                   <Text>Add</Text>
          </TouchableOpacity>
         )}


          {error && (
            <Text>{error}</Text>
          )}
         </View>
    )
}