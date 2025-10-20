import axios from "axios"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"; 

export default async function AddTask() {
    const [titile, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [due_date, setDue_date] = useState("");
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function AddTask() {
       try {
           setLoading(true)
           axios.post('http://localhost:5000/task/add', {
              titile, description, due_date, status
           });
           setTitle("");
           setDescription("")
           setDue_date("")
           setLoading(false);
        } catch (error) {
             setError("Unable to create task. try again later")
        } finally {
           setLoading(false);
       }
    }

   if (loading) return <View>Loading......,</View>
   if (error) return <View>{error}</View>

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
               placeholder="Enter Finishing Date"
               onChangeText={setDue_date}
            />

          <TouchableOpacity
              onPress={AddTask}
          >
                   <Text>Add</Text>
          </TouchableOpacity>
         </View>
    )
}