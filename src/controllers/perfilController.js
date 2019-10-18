module.exports = (models) => {
  
    const PreferenciaController = require('./preferenciaController') (models);
    var PerfilController = {};
    
    function setear_perfil_activo_usuario (perfil) {
        return new Promise(function (resolve, reject){
            models.Usuario.update({Id_perfil_activo: perfil.Id_perfil}, {where: {Id_usuario: perfil.Id_usuario}})
            .then(res => {resolve(res)})
            .catch(error => {reject(error)});
        })
    }
    
    // LIST
    PerfilController.list = function (req, res) {
        models.Perfil.findAll({
            include: [
              {
                model: models.Raza,
                include: [
                  {model: models.Animal}
                ]
              },
              {
                model: models.Preferencia,
                as: 'PreferenciaPareja',
                include: [
                  {model: models.Raza}
                ]
              },
              {
                model: models.Preferencia,
                as: 'PreferenciaAmistad',
                include: [
                  {model: models.Raza}
                ]
              },
              {model: models.Genero},
              {model: models.Usuario}
            ]
          })
            .then(result => res.json(result))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      }
    
    // CREATE
    PerfilController.create = function (req, res) {
        var interes_macho = true;
        var interes_hembra = false;
        var default_amistad = {};
        var default_pareja = {};
        if (req.body.Id_genero == 1) {
          interes_macho = false;
          interes_hembra = true;
          };
        // Crea las preferencias por defecto
        default_amistad = {
          "Interes_macho": true,
          "Interes_hembra": true,
          "Edad_min": 0,
          "Edad_max": 14,
          "Distancia_max": 240,
          "Razas": []
        }
        default_pareja = {
          "Interes_macho": interes_macho,
          "Interes_hembra": interes_hembra,
          "Edad_min": 0,
          "Edad_max": 14,
          "Distancia_max": 240,
          "Razas": []
        }
        //Create Preferencias
        models.Preferencia.create(default_amistad)
          .then(preferencia_amistad => {
            models.Preferencia.create(default_pareja)
              .then(preferencia_pareja => {
                models.Usuario.findOne({ where: {Usr_cod : req.body.Usr_cod} })
                  .then(usuario => {
                      return {
                          "Nombre": req.body.Nombre,
                          "Edad": req.body.Edad,
                          "Imagen": req.body.Imagen,
                          "Id_genero": req.body.Id_genero,
                          "Id_raza": req.body.Id_raza,
                          "Id_usuario": usuario.Id_usuario,
                          "Id_preferencia_pareja": preferencia_pareja.dataValues.Id_preferencia,
                          "Id_preferencia_amistad": preferencia_amistad.dataValues.Id_preferencia
                      };
                  })
                  .then(data => {
                      console.log(data.Id_usuario);
                      models.Perfil.create(data)
                          .then(result => {
                            setear_perfil_activo_usuario(result)
                            .then(res.json(result))
                            .catch(error => {
                              res.status(412).json({msg: error.message});
                            });
                            })
                          .catch(error => {
                            res.status(412).json({msg: error.message});
                          });
                  });
              })
          });
    }
  
    // GET
    PerfilController.get = function (req, res) {
        models.Perfil.findOne({
            where: req.params,
            include: [
              {
                model: models.Raza,
                include: [
                  {model: models.Animal}
                ]
              },
              {
                model: models.Preferencia,
                as: 'Preferencia_pareja',
                include: [
                  {model: models.Raza}
                ]
              },
              {
                model: models.Preferencia,
                as: 'Preferencia_amistad',
                include: [
                  {model: models.Raza}
                ]
              },
              {model: models.Genero},
              {model: models.Usuario}
            ]
          })
            .then(result => {
              if (result) {
                res.json(result);
              } else {
                res.sendStatus(404);
              }
            })
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
    }
  
    //UPDATE
    PerfilController.update = function (req, res) {
        models.Perfil.update(req.body, {where: req.params})
            .then(res.sendStatus(204))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
    }
  
    // DESTROY
    PerfilController.destroy = function (req, res) {
      models.Perfil.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(204).json({msg: error.message});
        });
    }
  
    return PerfilController;
  };