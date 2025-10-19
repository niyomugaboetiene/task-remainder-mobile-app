import axios from "axios"
import { useState } from "react"
import { View, Text, TextInput } from "react-native"; 

export default async function AddTask() {
    const [titile, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [due_date, setDue_date] = useState("");
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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


    return (
         <View>
            <Text>Add Task</Text>
            <Text>Title</Text>
            <TextInput 
               
               />
         </View>
    )
}