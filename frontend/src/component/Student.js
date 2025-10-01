import React from 'react'

function Student() {
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
                    
                </tbody>
            </table>
        </div>    
    </div>
  )
}

export default Student
