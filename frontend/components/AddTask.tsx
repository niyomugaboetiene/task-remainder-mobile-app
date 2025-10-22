import axios from "axios"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"; 

export default  function AddTask() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [due_date, setDue_date] = useState("");
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function AddTask() {
      if (!title || !description || !status || !due_date) {
         return;
      }
       try {
           setLoading(true)
           setError("")
           await axios.post('http://localhost:5000/task/add', {
              title, description, due_date, status
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
             console.log("ERROR", error)
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
               placeholder="YYYY-MM-DD"
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
            <View>
               <Text>Add Task</Text>
            </View>

          </TouchableOpacity>
         )}


          {error && (
            <Text>{error}</Text>
          )}
         </View>
    )
}