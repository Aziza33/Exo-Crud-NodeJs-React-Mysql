import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Student() {
    const [student, setStudent] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            console.log('Données reçues', res.data);
            setStudent(res.data);
        }) // log the response
        .catch(error => {
            console.error("Erreur API: ", error)
        })
    }, []);

  return (
    <div className='d-flex vh-10 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <button className='btn btn-success'>Ajouter</button>
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
                                    <button className='btn btn-primary'>Modifier</button>
                                    <button className='btn btn-primary'>Supprimer</button>
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
