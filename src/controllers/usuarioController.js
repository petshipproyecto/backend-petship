module.exports = (models) => {
  
  var UsuarioController = {};
  
  // LIST
  UsuarioController.list = function (req, res) {
      models.Usuario.findAll({
        include: [
          {model: models.Ubicacion},
          {model: models.Perfil,
            include: [
              {
                model: models.Raza,
                include: [
                  {model: models.Animal}
                ]
              },
              {model: models.Genero}
            ]}
        ]
      })
        .then(result => res.json(result))
        .catch(error => {
        res.status(412).json({msg: error.message});
      });
    }
  
  // CREATE
  UsuarioController.create = function (req, res) {
    var datosUsuario = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Usr_cod: req.body.Usr_cod,
      Imagen: req.body.Imagen,
      Id_localidad: '1780',
      Latitud: '-27.4521194584549',
      Longitud: '-58.9876174408016',
      Id_perfil_activo: req.body.Id_perfil_activo
    }
    models.Usuario.create(datosUsuario)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
  }

  // GET
  UsuarioController.get = function (req, res) {
    models.Usuario.findOne({
      where: req.params,
      include: [
        {
          model: models.Perfil,
          as: 'Perfil_activo',
          include:[
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
        },
        {model: models.Perfil,
          include: [
            {
              model: models.Raza,
              include: [
                {model: models.Animal}
              ]
            },
            {model: models.Genero}
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
  UsuarioController.update = function (req, res) {
    models.Usuario.update(req.body, {where: req.params})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  }

  // DESTROY
  UsuarioController.destroy = function (req, res) {
    models.Usuario.destroy({where: req.params})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(204).json({msg: error.message});
      });
  }

  return UsuarioController;
};