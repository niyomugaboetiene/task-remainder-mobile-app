import axios from "axios"
import { useState } from "react"

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
        
    }
}