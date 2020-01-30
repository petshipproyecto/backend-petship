import Sequelize from 'sequelize';

module.exports = (models) => {
  
    var NotificacionController = {};

    function crear_notificaciones(notificacion_origen, notificacion_destino) {
        return new Promise(function(resolve, reject) {
            models.Notificacion.create(notificacion_origen)
            .then(
                models.Notificacion.create(notificacion_destino)
                .then(res => {resolve(res)})
                .catch(error => {reject(error)})
            )
            .catch(error => {reject(error)})
        })  
    }
 
    // MATCH
    NotificacionController.match = function (Id_match) {
        models.Match.findOne({where: {Id_match: Id_match}})
        .then(match => {
            const notificacion_origen = {
                Visto: false,
                Id_perfil: match.Id_perfil_origen,
                Id_match: Id_match
            }
            const notificacion_destino = {
                Visto: false,
                Id_perfil: match.Id_perfil_destino,
                Id_match: Id_match
            }
            crear_notificaciones(notificacion_origen, notificacion_destino)
        })
    }

    // NOTIFICACIONES
    NotificacionController.get = function (req, res) {
        models.Notificacion.findAll({
            where: req.params,
            include: [
                {
                    model: models.Match,
                    include: [
                        {
                            model: models.Tipo_Match
                        },
                        {
                            model: models.Estado
                        },
                        {
                            model: models.Perfil,
                            as: 'Perfil_origen',
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
                        },
                        {
                            model: models.Perfil,
                            as: 'Perfil_destino',
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
                        }
                    ]
                }
            ]
        })
            .then(result => {res.json(result)})
            .catch(error => {
            res.status(412).json({msg: error.message});
            });
    }

    // VISTO
    NotificacionController.visto = function (req, res) {
        models.Notificacion.update({Visto: true}, {where: req.params})
            .then(res.sendStatus(204))
            .catch(error => {
            res.status(412).json({msg: error.message});
            });
    }
    
    return NotificacionController;
  };