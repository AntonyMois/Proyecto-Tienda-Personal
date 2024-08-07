const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tienda"
});

app.post('/create', (req, res) => {
    const { nombre, edad, pais, cargo, anios } = req.body;
    const query = 'INSERT INTO persona (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, edad, pais, cargo, anios];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al registrar el empleado');
        } else {
            res.send(result);
        }
    });
});


app.get('/persona', (req, res) => {

    db.query('SELECT * FROM persona',
     (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const id =req.body.Id_Persona;
    console.log(req.body);
    const {nombre,edad, pais, cargo, anios } = req.body;
    const query = `UPDATE persona SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE Id_Persona=${id}`
    const values = [nombre, edad, pais, cargo, anios,id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al actualizar el empleado');
        } else {
            res.send(result);
        }
    });
});



app.delete("/delete/:Id_Persona", (req, res) => {
    const id =req.params.Id_Persona;
    const query = `DELETE from persona WHERE Id_Persona=${id}`;
    db.query(query,(err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al actualizar el empleado');
        } else {
            res.send(result);
        }
    });
});







app.listen (3001,()=>{

    console.log("Corriendo en el puerto 3001")

})
