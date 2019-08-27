module.exports = (models) => {
  
    var PerfilController = {};
    
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
        models.Usuario.findOne({
            where: {Usr_cod : req.body.Usr_cod}
        })
            .then(usuario => {
                return {
                    "Nombre": req.body.Nombre,
                    "Edad": req.body.Edad,
                    "Imagen": req.body.Imagen,
                    "Id_genero": req.body.Id_genero,
                    "Id_raza": req.body.Id_raza,
                    "Id_usuario": usuario.Id_usuario
                };
            })
            .then(data => {
                console.log(data)
                models.Perfil.create(data)
                    .then(result => res.json(result))
                    .catch(error => {
                    res.status(412).json({msg: error.message});
                    });
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
            .then(result => res.sendStatus(204))
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