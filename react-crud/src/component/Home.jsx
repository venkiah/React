import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/users")
            .then((res) => {
                console.log(res.data);
                setState(res.data);
            })
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    // Delete function
    const deleteUser = (id) => {
        axios.delete(`http://localhost:8081/users/${id}`)
            .then(() => {
                setState(state.filter(user => user.id !== id));
            })
            .catch((err) => console.error("Error deleting user:", err));
    };

    return (
        <div>
            <button> <Link to="/create">ADD</Link> </button>
            <table border="2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((res) => (
                        <tr key={res.id}>
                            <td>{res.name}</td>
                            <td>{res.id}</td>
                            <td>{res.role}</td>
                            <td>
                                <button onClick={() => deleteUser(res.id)}>Delete</button>
                                <button>
                                    <Link to={`/edit/${res.id}`}>Edit</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;