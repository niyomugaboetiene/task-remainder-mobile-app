import axios from "axios";
import { View, Text } from "react-native"
import { useEffect, useState } from "react";

export default function AllTask() {
    const [tasks, setTasks] = useState({});
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

   useEffect(() => {
      const ListOfTask = async () => {
        try {
            setLoading(true);
           const result = await axios.get('http://localhost:5000/task/all', { withCredentials: true });
           setTasks(result);
           setLoading(false);
        } catch (error) {

        }
        
      }
   })
}