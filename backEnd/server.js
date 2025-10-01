const express = require("express"); // création de const express qui permet d'accéder à express
const app = express(); // permet d'utiliser les méthodes de l'objet express ds la variable app
const cors = require("cors"); // permet aux différents serveurs d'échanger des données entre eux
const mysql = require("mysql2");

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8081',
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various smartTVs), choke on 204
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true, // allow cookies to be sent with requests
};

app.use(cors(corsOptions));
app.use(express.json()); // si besoin de parser le Json ds les requêtes POST

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudnode'
});

database.connect(err => {
    if(err) {
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

// Endpoint principal pour récupérer les étudiants
app.get("/", (req, res) => { // créé un endpoint à l'adresse "/" et ensuite il attend une requête et une réponse //res.json ("Salut à toi depuis le backend"); en rép on renvoie le mess
    const sql = "SELECT * FROM student"; // créé la requ Sql
    database.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});



app.listen(8081, () => { // attribue le port 8081 au serveur et exécute une fonction anonyme listen; app.listen doit tjrs être le dernier
    console.log('Server is running on port 8081');
})


