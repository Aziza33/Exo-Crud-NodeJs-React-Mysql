import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

function Student() {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => setStudent(res.data)) // log the response
        .catch(error => console.error("Erreur API: ", error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/student/`+id)
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    };

  return (
    <div className='d-flex vh-10 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <Link to="/create" className='btn btn-success'>Ajouter</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nom </th>
                            <th>Email </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(student)  && student.map((data, i) => (
                                <tr key={data.id}>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <Link to={`/update/${data.id}`} className='btn btn-primary'>Modifier</Link>
                                        <button className='btn btn-danger' onClick={() => handleDelete(data.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>    
    </div>
  )
}

export default Student
