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
const placeholder = "/img/avatar.png";

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Étudiants</h1>
        <Link to="/create" className="btn btn-success">Ajouter</Link>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {Array.isArray(student) && student.map((data) => (
          <div className="col" key={data.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={data.photoUrl || placeholder}
                alt={data.name || "Étudiant"}
                className="card-img-top"
                // style={{ objectFit: "", height: 180 }}
                onError={(e) => { e.currentTarget.src = placeholder; }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{data.name}</h5>
                <p className="card-text text-muted">{data.email}</p>
                {/* ===== Boutons centrés ===== */}
                <div className="mt-auto d-flex justify-content-center gap-2">
                  <Link to={`/update/${data.id}`} className="btn btn-primary btn-sm">Modifier</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(data.id)}>Supprimer</button>
                </div>
                {/* ========================== */}
              </div>
            </div>
          </div>
        ))}
        {Array.isArray(student) && student.length === 0 && (
          <div className="col">
            <div className="text-muted text-center py-5">
              Aucun étudiant pour le moment. <Link to="/create">Ajouter le premier</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Student

// Explication fonction asynchrone

