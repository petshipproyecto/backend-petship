module.exports = (models) => {
  
    var PreferenciaController = {};
    
    // LIST
    PreferenciaController.list = function (req, res) {
        models.Preferencia.findAll({
            include: [
              {model: models.Raza}
            ]
          })
            .then(result => res.json(result))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      }
    
    // CREATE
    PreferenciaController.create = function (req, res) {
      var razas = req.body.Razas
      // Crea una nueva preferencia
      models.Preferencia.create(req.body)
          .then(result => {
            // Setea las razas asociadas
            result.setRazas(razas)
              .then(razas => {
                var update = {Id_preferencia_amistad: result.Id_preferencia}
                if(req.body.Pareja == 'True'){
                  update = {Id_preferencia_pareja: result.Id_preferencia}
                }
                return update
              })
              .then(update => {
                // Actualiza referencia en perfil
                models.Perfil.findOne({where: {Id_perfil: req.body.Id_perfil}})
                  .then(perfil => {
                    perfil.update(update);
                  })
              });
            res.json(result);
          })
          .catch(error => {
          res.status(412).json({msg: error.message});
          });
    }
  
    // GET
    PreferenciaController.get = function (req, res) {
        models.Preferencia.findOne({
            where: req.params,
            include: [
              {
                model: models.Raza,
                include: [
                  {model: models.Animal}
                ]
              }
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
      var razas = req.body.Razas 
      // Actualiza los valores de la preferencia
      models.Preferencia.update(req.body, {where: req.params})
          .then(result => {
            models.Preferencia.findOne({where: req.params})
              .then(preferencia => {
                // Actualiza las prefererncias de raza
                preferencia.setRazas(razas);
                res.sendStatus(204);
              })
          })
          .catch(error => {
          res.status(412).json({msg: error.message});
          });
    }
  
    // DESTROY
    PreferenciaController.destroy = function (req, res) {
      models.Preferencia.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(204).json({msg: error.message});
        });
    }
  
    return PreferenciaController;
  };