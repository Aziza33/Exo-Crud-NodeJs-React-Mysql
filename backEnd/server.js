const express = require("express"); // création de const express qui permet d'accéder à express (qui est ds node modules)
const app = express(); // permet d'utiliser les méthodes de l'objet express ds la variable app
const cors = require("cors"); // permet aux différents serveurs d'échanger des données entre eux
const mysql = require("mysql2");

const corsOptions = {
    origin: [ // Liste des origines autorisées, seules ces adresses pourront communiquer avec le backend.
        'http://localhost:3000',
        'http://localhost:8081',
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various smartTVs), choke on 204 //  Code de réponse renvoyé pour une requête pré-vol (preflight request), c'est mis en 200, et pas en 204 car certains browser ne supportent pas le 204, c pour la compatibilité
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE', // Méthodes HTTP autorisées pour les requêtes cross-origin
    allowedHeaders: 'Content-Type,Authorization', // En-têtes HTTP que le client est autorisé à utiliser dans ses requêtes
    credentials: true, // allow cookies to be sent with requests = autorisation d'envoi de cookies, token d'auth (headers Authorization) et tte info d'identification avec requ cross-origin
};

app.use(cors(corsOptions));
app.use(express.json()); // si besoin de parser le Json ds les requêtes POST

// Création cnx bdd MySQL
const database = mysql.createConnection({
    host: 'localhost', // adresse IP ou nom de domaine du MySQL
    user: 'root', // Nom utilisateur cnx bdd
    password: '', 
    database: 'crudnode' // nom bdd
});

database.connect(err => {
    if(err) { // mess erreur
        console.error('Erreur de connexion à la base', err);
        return;
    }
    console.log('Connecté à la bdd MySQL')
})



// app.get("/", (req, res) => { // créé un endpoint à l'adresse "/" et ensuite il attend une requête et une réponse 
//     res.json("Salut à toi depuis le backend");
// })

// const database = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'crudenode'
// })

// Route (Endpoint principal) pour récupérer les étudiants
app.get("/", (req, res) => { // créé un endpoint à l'adresse "/" et ensuite il attend une requête et une réponse //res.json 
// ("Salut à toi depuis le backend"); en rép on renvoie le mess
    const sql = "SELECT * FROM student"; // requ Sql pr récup ts les étudiants
    database.query(sql, (err, data) => { // execution de la requête
        if(err) return res.json("Error"); // si err, renvoi de mess d'err
        return res.json(data); // sinon, renvoie les données récupérées
    });
});


// Route pour créer un nouvel étudiant

app.post('/create', (req, res) => {
  const sql = "INSERT INTO student (`name`, `email`) VALUES (?, ?)";
  const values = [req.body.name, req.body.email];
  database.query(sql, values, (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur insertion" });
    res.json({ message: 'Etudiant ajouté', data });
  });
});

// Route pour update un étudiant
app.put('/update/:id', (req, res) => {
  const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?"; // requête modif ça recherche obligatoirement un champs name etc, requête préparée sécurité contre injection xss et faille sql (à vérifier)
  const values = [ // valeurs à insérer
    req.body.name, 
    req.body.email
]
  const id = req.params.id; // useParams sert à récupérer les paramètres dynamiques équiv wildcard en symfony

  database.query(sql, [...values, id], (err, data) => { // Execution de la requête SQL ds le respect des marqueurs de position ds l'ordre (name, mail et id)
    if (err) {
        return res.status(500).json({ error: "Erreur modification" });
    }
    // if (data.affectedRows === 0) return res.status(404).json({ error: "Introuvable" });
    return res.json(data);
  })
})

// ROUTE DELETE 
app.post('/delete/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id= ?";
    const id = req.params.id;

    database.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur modification" });
    res.json({ message: 'Etudiant supprimé', data });
  })
})




app.listen(8081, () => { // attribue le port 8081 au serveur et exécute une fonction anonyme listen; app.listen doit tjrs être le dernier
    console.log('Server is running on port 8081');
})


