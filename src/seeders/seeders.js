module.exports = app => {

    'use strict';

    const fs = require('fs');
    const Animal = app.db.models.Animal;
    const Raza = app.db.models.Raza;
    const Provincia = app.db.models.Provincia;
    const Localidad = app.db.models.Localidad;
    const Genero = app.db.models.Genero;
    const Estado = app.db.models.Estado;
    const Tipo_Match = app.db.models.Tipo_Match;
    const Usuario = app.db.models.Usuario;
    const animals = JSON.parse(fs.readFileSync('src/seeders/animals.json'));
    const razas = JSON.parse(fs.readFileSync('src/seeders/razas.json'));
    const provincias = JSON.parse(fs.readFileSync('src/seeders/provincias.json'));
    const localidades = JSON.parse(fs.readFileSync('src/seeders/localidades.json'));
    const generos = JSON.parse(fs.readFileSync('src/seeders/generos.json'));
    const estados = JSON.parse(fs.readFileSync('src/seeders/estados.json'));
    const tipos_matches = JSON.parse(fs.readFileSync('src/seeders/tipos_matches.json'));
    const usuarios = JSON.parse(fs.readFileSync('src/seeders/usuarios.json'));


    app.db.sequelize.transaction(async function (t1) {
        var promises = []
        generos.forEach(genero => {
            var newPromise = Genero.create(genero,{ transaction: t1 });
            promises.push(newPromise);
        });
        estados.forEach(estado => {
            var newPromise = Estado.create(estado,{ transaction: t1 });
            promises.push(newPromise);
        });
        tipos_matches.forEach(tipo_match => {
            var newPromise = Tipo_Match.create(tipo_match,{ transaction: t1 });
            promises.push(newPromise);
        });
        usuarios.forEach(usuario => {
            var newPromise = Usuario.create(usuario,{ transaction: t1 });
            promises.push(newPromise);
        });
        animals.forEach(animal => {
            var newPromise = Animal.create(animal,{ transaction: t1 });
            promises.push(newPromise);
        });
        provincias.forEach(provincia => {
            var newPromise = Provincia.create(provincia,{ transaction: t1 });
            promises.push(newPromise);
        });
        return Promise.all(promises).then( function() {
            razas.forEach(raza => {
                Raza.create(raza);
            }),
            localidades.forEach(localidad => {
                Localidad.create(localidad);
            })
        });
    });
        
};
