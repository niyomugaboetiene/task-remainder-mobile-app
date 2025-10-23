import axios from "axios";
import { View, Text } from "react-native"
import { useEffect } from "react";

export default function AllTask() {
   useEffect(() => {
      const ListOfTask = async () => {
        const result = await axios.get('http://localhost:5000/task/all', { withCredentials: true })
      }
   })
}