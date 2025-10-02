import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom';





function UpdateStudent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const {id} = useParams(); // useParams sert à récupérer les paramètres dynamiques
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const updatedStudent = {name, email};
        axios.put(`http://localhost:8081/update/${id}`, updatedStudent)
        .then(res => {
            console.log("Modified Student", res);
            navigate('/');
        }).catch(err => console.log(err));
};

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form action ="" onSubmit={handleSubmit}>
          <h2>Modifier Etudiant</h2>
          <div className='mb-2'>
            <label htmlFor="">Nom</label>
            <input 
                type="text" 
                placeholder='Entrez votre nom' 
                className='form-control' 
                onChange = {e => setName(e.target.value)}
                // value={name}
                />
            
          </div>
          <div className='mb-2'>
            <label htmlFor="">Email</label>
                <input 
                    type="email" 
                    placeholder='Entrez votre email' 
                    className='form-control' 
                    onChange={e => setEmail(e.target.value)}
                    // value={email} 
                />
          </div>
          <button className='btn btn-success'>Modifier</button>
        </form>
      </div>
    </div>
  )
}


export default UpdateStudent
