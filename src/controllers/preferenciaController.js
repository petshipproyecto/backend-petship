module.exports = (models) => {
  
    var PreferenciaController = {};
    
    // LIST
    PreferenciaController.list = function (req, res) {
        models.Preferencia.findAll({
            include: [
              {model: models.Raza},
              {model: models.Usuario}
            ]
          })
            .then(result => res.json(result))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      }
    
    // CREATE
    PreferenciaController.create = function (req, res) {
        models.Preferencia.create(data)
            .then(result => res.json(result))
            .catch(error => {
            res.status(412).json({msg: error.message});
            });
    }
  
    // GET
    PreferenciaController.get = function (req, res) {
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
    PreferenciaController.update = function (req, res) {
        models.Perfil.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error => {
            res.status(412).json({msg: error.message});
            });
    }
  
    // DESTROY
    PreferenciaController.destroy = function (req, res) {
      models.Perfil.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(204).json({msg: error.message});
        });
    }
  
    return PreferenciaController;
  };