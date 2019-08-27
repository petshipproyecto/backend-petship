module.exports = app => {

    const UsuarioController = require('../controllers/usuarioController') (app.db.models);
  
    app.route('/usuario')
      // Obtener todos los usuarios
      .get((req, res) => {
        UsuarioController.list(req, res);
      })
      // Alta Usuario
      .post((req, res) => {
        UsuarioController.create(req, res);
      });

    app.route('/usuario/:Usr_cod')
      .get((req, res) => {
        // Obtener Usuario
        UsuarioController.get(req, res);
      })
      .put((req, res) => {
        // Actualizar Usuario
        UsuarioController.get(req,res);
      })
      .delete((req, res) => {
        // Eliminar Usuario
        UsuarioController.destroy(req, res);
      });
      
  };
