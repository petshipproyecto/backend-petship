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
                Id_match: match.Id_match
            }
            const notificacion_destino = {
                Visto: false,
                Id_perfil: match.Id_perfil_destino,
                Id_match: match.Id_match
            }
            crear_notificaciones(notificacion_origen, notificacion_destino)
        })
    }
    
    return NotificacionController;
  };