import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';




function CreateStudent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', {name, email})
        .then(res => {
            console.log("Created Student", res);
            setName('');
            setEmail('');
            navigate('/');
        })
}

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Ajouter Etudiant</h2>
          <div className='mb-2'>
            <label htmlFor="">Nom</label>
            <input 
                type="text" 
                laceholder='Entrez votre nom' 
                className='form-control' 
                onChange = {e => setName(e.target.value)}
                value={name}
                />
            
          </div>
          <div className='mb-2'>
            <label htmlFor="">Email</label>
                <input 
                    type="email" 
                    placeholder='Entrez votre email' 
                    className='form-control' 
                    onChange={e => setEmail(e.target.value)}
                    value={email} 
                />
          </div>
          <button className='btn btn-success'>Soumettre</button>
        </form>
      </div>
    </div>
  )
}


export default CreateStudent
