module.exports = app => {

    const NotificacionController = require('../controllers/notificacionController') (app.db.models);
  
    app.route('/notificaciones/:Id_perfil')
      .get((req, res) => {
        // GET ALL
        NotificacionController.get(req, res);
      });
    
    app.route('/notificaciones/:Id_notificacion')
      .put((req, res) => {
        // GUARDAR VISTO    
        NotificacionController.visto(req, res);
      });
  };