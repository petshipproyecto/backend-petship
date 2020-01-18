import Sequelize from 'sequelize';

module.exports = (models) => {
  
    const Op = Sequelize.Op;
    const NotificacionController = require('./notificacionController') (models);
    var MatchController = {};
 
    // LIKE
    MatchController.like = function (req, res) {
        models.Match.findAndCountAll({
            where: {
                Id_perfil_origen: req.body.Id_perfil_destino,
                Id_perfil_destino: req.body.Id_perfil_origen,
                Id_tipo_match: req.body.Id_tipo_match
            }
        })
        .then(match => {
            if (match.count == 1) {
                const Id_match = match.rows[0].Id_match
                // Confirmar match
                models.Match.update({Id_estado: 1}, {where: {Id_match: Id_match}})
                .then(match => {
                    NotificacionController.match(Id_match)
                    res.sendStatus(204)
                })
                .catch(error => {
                res.status(412).json({msg: error.message});
                });
            } else {
                models.Match.create({
                    Id_perfil_origen: req.body.Id_perfil_origen,
                    Id_perfil_destino: req.body.Id_perfil_destino,
                    Id_estado: 3,
                    Id_tipo_match: req.body.Id_tipo_match
                }).then(result => {res.json(result)});
            }
        });
    }

    // DISLIKE
    MatchController.dislike = function (req, res) {
        models.Match.findAndCountAll({
            where: {
                Id_perfil_origen: req.body.Id_perfil_destino,
                Id_perfil_destino: req.body.Id_perfil_origen,
                Id_tipo_match: req.body.Id_tipo_match
            }
        })
        .then(match => {
            if (match.count == 1) {
                // Confirmar match
                models.Match.update({Id_estado: 2}, {where: {Id_match: match.rows[0].Id_match}})
                .then(res.sendStatus(204))
                .catch(error => {
                res.status(412).json({msg: error.message});
                });
            } else {
                models.Match.create({
                    Id_perfil_origen: req.body.Id_perfil_origen,
                    Id_perfil_destino: req.body.Id_perfil_destino,
                    Id_estado: 2,
                    Id_tipo_match: req.body.Id_tipo_match
                }).then(result => {res.json(result)});
            }
        });
    }
     // GET
    MatchController.getLikes = function (req, res) {
        models.Match.findAll({
            where: {
                [Op.or]:[
                    {Id_perfil_origen: req.params.Id_perfil},
                    {
                        Id_perfil_destino: req.params.Id_perfil,
                        Id_estado: 1
                    }
                ]
            },
            include: [
                {
                    model: models.Perfil,
                    as: 'Perfil_origen',
                    include: [
                        {
                            model: models.Raza,
                            include: [{model: models.Animal}]
                        }
                    ]
                },
                {
                model: models.Perfil,
                as: 'Perfil_destino',
                include: [
                    {
                        model: models.Raza,
                        include: [{model: models.Animal}]
                    }
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
    
    return MatchController;
  };