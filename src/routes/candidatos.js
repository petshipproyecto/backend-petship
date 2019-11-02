import Sequelize from 'sequelize';

module.exports = app => {

    
    const Op = Sequelize.Op;
    const Match = app.db.models.Match;
    const Perfil = app.db.models.Perfil;
    const Raza = app.db.models.Raza;
    const Animal = app.db.models.Animal;
    const Preferencia = app.db.models.Preferencia;
    
    function perfil (Id_perfil) {
        return new Promise(function (resolve, reject){
            Perfil.findOne({
                where: {Id_perfil: Id_perfil},
                include: [
                    { model: Raza},
                    {model: Preferencia, as: 'Preferencia_pareja'},
                    {model: Preferencia, as: 'Preferencia_amistad'}
                ]
            }).then(result => {resolve(result)})
        })
    }

    function descartados (Id_perfil) {
        return new Promise(function (resolve, reject){
            Match.findAll({
                where: {
                    [Op.or]: [
                        {Id_perfil_origen: Id_perfil},
                        {
                            Id_perfil_destino: Id_perfil,
                            [Op.not]: [{Id_estado: 3}]
                        }
                    ]
                },
                attributes: ['Id_perfil_destino'],
                raw: true
            })
                .then(result => {resolve(result.map(result => result.Id_perfil_destino))})
                /* .catch(error => {
                    res.status(412).json({msg: error.message});
                }) */
        })
    }

    function candidatos (descartados, perfil) {
        return new Promise(function (resolve, reject){
            Perfil.findAll({
                    where: {
                            Id_perfil: {[Op.notIn]: descartados},
                            Id_usuario: {[Op.ne]: perfil.Id_usuario},
                            [Op.or]: [
                                {[Op.and]: [
                                    {Interes_pareja: true},
                                    {Interes_pareja: perfil.Interes_pareja},
                                    {Id_genero: {[Op.ne]: perfil.Id_genero}},
                                    {Edad: {[Op.and]: [
                                        {[Op.gte]: perfil.Preferencia_pareja.Edad_min},
                                        {[Op.lte]: perfil.Preferencia_pareja.Edad_max}
                                    ]}}
                                ]},
                                {[Op.and]: [
                                    {Interes_amistad: true},
                                    {Interes_amistad: perfil.Interes_amistad},
                                    {[Op.or]: [
                                        {[Op.and]: [
                                            {Id_genero: 1},
                                            {Interes_amistad: perfil.Preferencia_amistad.Interes_macho}
                                        ]},
                                        {[Op.and]: [
                                            {Id_genero: 2},
                                            {Interes_amistad: perfil.Preferencia_amistad.Interes_hembra}
                                        ]}
                                    ]},
                                    {Edad: {[Op.and]: [
                                        {[Op.gte]: perfil.Preferencia_amistad.Edad_min},
                                        {[Op.lte]: perfil.Preferencia_amistad.Edad_max}
                                    ]}}
                                ]}
                            ]
                        },
                    include: [
                        {
                            model: Raza,
                            where: {Id_animal: perfil.Raza.Id_animal},
                            include: [{model: Animal}]
                        }
                    ]
                })
                .then(result => {
                    resolve(result)
                })
                /* .catch(error => {
                    res.status(412).json({msg: error.message});
                }) */
        })
    }

    app.route('/candidatos/:Id_perfil')
        .get((req, res) => {
            perfil (req.params.Id_perfil)
            .then(perfil => {
                descartados (perfil.Id_perfil)
                .then(descartados => {
                    candidatos (descartados, perfil)
                    .then(candidatos => {res.json(candidatos)})
                })
            })
        })
  };