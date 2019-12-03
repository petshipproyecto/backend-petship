import Sequelize from 'sequelize';
import dottie from 'dottie';

module.exports = app => {

    const Op = Sequelize.Op;
    const Match = app.db.models.Match;
    const Perfil = app.db.models.Perfil;
    const sequelize = app.db.sequelize;
    const query_amistad = `
    SELECT "pc"."Id_perfil" AS "Id_perfil",
        "pc"."Nombre" AS "Nombre",
        "pc"."Edad" AS "Edad",
        "pc"."Imagen" AS "Imagen",
        "pc"."Id_genero" AS "Id_genero",
        "rc"."Id_raza" AS "Raza.Id_raza",
        "rc"."Descripcion" AS "Raza.Descripcion",
        "ac"."Id_animal" AS "Raza.Animal.Id_animal",
        "ac"."Descripcion" AS "Raza.Animal.Descripcion",
        (CASE WHEN ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) > 1
        THEN (12436.2/PI()) * 1 * 1.609344
        ELSE (12436.2/PI()) * ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) * 1.609344
        END) AS "Distancia",
        "pc"."Id_usuario" AS "Id_usuario",
        "pa"."Id_preferencia"
    FROM public."Perfils" AS "p"
        INNER JOIN public."Usuarios" AS "u" ON "p"."Id_usuario" = "u"."Id_usuario"
        INNER JOIN public."Razas" AS "r" ON "p"."Id_raza" = "r"."Id_raza"
        INNER JOIN public."Animals" AS "a" ON "r"."Id_animal" = "a"."Id_animal"
        INNER JOIN public."Preferencia" AS "pa" ON "p"."Id_preferencia_amistad" = "pa"."Id_preferencia"
        
        INNER JOIN public."Perfils" AS "pc" ON "pc"."Id_perfil" != "p"."Id_perfil"
        INNER JOIN public."Usuarios" AS "uc" ON "pc"."Id_usuario" = "uc"."Id_usuario"
        INNER JOIN public."Razas" AS "rc" ON "pc"."Id_raza" = "rc"."Id_raza"
        INNER JOIN public."Animals" AS "ac" ON "rc"."Id_animal" = "ac"."Id_animal"
        INNER JOIN public."Preferencia" AS "pac" ON "pc"."Id_preferencia_amistad" = "pac"."Id_preferencia"
    WHERE "p"."Id_perfil" = :Id_perfil
        AND "p"."Interes_amistad" = "pc"."Interes_amistad" AND "p"."Interes_amistad" = TRUE
        AND "ac"."Id_animal" = "a"."Id_animal"
        AND ("uc"."Id_usuario" != "u"."Id_usuario")
        AND (("pa"."Interes_macho" AND "pc"."Id_genero" = 1) OR ("pa"."Interes_hembra" AND "pc"."Id_genero" = 2))
        AND (("pac"."Interes_macho" AND "p"."Id_genero" = 1) OR ("pac"."Interes_hembra" AND "p"."Id_genero" = 2))
        AND (("pa"."Edad_min" <= "pc"."Edad") AND ("pa"."Edad_max" >= "pc"."Edad"))
        AND (("pac"."Edad_min" <= "p"."Edad") AND ("pac"."Edad_max" >= "p"."Edad"))
        AND ("pc"."Id_perfil" NOT IN (
            SELECT "m"."Id_perfil_destino"
            FROM public."Matches" AS "m"
            WHERE "m"."Id_perfil_origen" = "p"."Id_perfil"
        ))
        AND ("pc"."Id_perfil" NOT IN (
            SELECT "m"."Id_perfil_origen"
            FROM public."Matches" AS "m"
            WHERE "m"."Id_perfil_destino" = "p"."Id_perfil" AND "m"."Id_estado" = 3
        ))
        AND ("rc"."Id_raza" IN (
            SELECT "pr"."Id_raza"
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pa"."Id_preferencia" = "pr"."Id_preferencia"
        ) OR (0 >= (
            SELECT COUNT(*)
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pa"."Id_preferencia" = "pr"."Id_preferencia"
        )))
        AND ("r"."Id_raza" IN (
            SELECT "pr"."Id_raza"
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pr"."Id_preferencia" = "pac"."Id_preferencia"
        ) OR (0 >= (
            SELECT COUNT(*)
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pac"."Id_preferencia" = "pr"."Id_preferencia"
        )))
        AND (
            "pa"."Distancia_max">= (
            CASE WHEN ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) > 1
            THEN (12436.2/PI()) * 1 * 1.609344
            ELSE (12436.2/PI()) * ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) * 1.609344
            END)
        )
    `
    const query_pareja = `
    SELECT "pc"."Id_perfil" AS "Id_perfil",
        "pc"."Nombre" AS "Nombre",
        "pc"."Edad" AS "Edad",
        "pc"."Imagen" AS "Imagen",
        "pc"."Id_genero" AS "Id_genero",
        "rc"."Id_raza" AS "Raza.Id_raza",
        "rc"."Descripcion" AS "Raza.Descripcion",
        "ac"."Id_animal" AS "Raza.Animal.Id_animal",
        "ac"."Descripcion" AS "Raza.Animal.Descripcion",
        (CASE WHEN ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) > 1
        THEN (12436.2/PI()) * 1 * 1.609344
        ELSE (12436.2/PI()) * ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) * 1.609344
        END) AS "Distancia",
        "pc"."Id_usuario" AS "Id_usuario",
        "pa"."Id_preferencia"
    FROM public."Perfils" AS "p"
        INNER JOIN public."Usuarios" AS "u" ON "p"."Id_usuario" = "u"."Id_usuario"
        INNER JOIN public."Razas" AS "r" ON "p"."Id_raza" = "r"."Id_raza"
        INNER JOIN public."Animals" AS "a" ON "r"."Id_animal" = "a"."Id_animal"
        INNER JOIN public."Preferencia" AS "pa" ON "p"."Id_preferencia_pareja" = "pa"."Id_preferencia"
        
        INNER JOIN public."Perfils" AS "pc" ON "pc"."Id_perfil" != "p"."Id_perfil"
        INNER JOIN public."Usuarios" AS "uc" ON "pc"."Id_usuario" = "uc"."Id_usuario"
        INNER JOIN public."Razas" AS "rc" ON "pc"."Id_raza" = "rc"."Id_raza"
        INNER JOIN public."Animals" AS "ac" ON "rc"."Id_animal" = "ac"."Id_animal"
        INNER JOIN public."Preferencia" AS "pac" ON "pc"."Id_preferencia_pareja" = "pac"."Id_preferencia"
    WHERE "p"."Id_perfil" = :Id_perfil
        AND "p"."Interes_pareja" = "pc"."Interes_pareja" AND "p"."Interes_pareja" = TRUE
        AND "ac"."Id_animal" = "a"."Id_animal"
        AND ("uc"."Id_usuario" != "u"."Id_usuario")
        AND (("pa"."Interes_macho" AND "pc"."Id_genero" = 1) OR ("pa"."Interes_hembra" AND "pc"."Id_genero" = 2))
        AND (("pac"."Interes_macho" AND "p"."Id_genero" = 1) OR ("pac"."Interes_hembra" AND "p"."Id_genero" = 2))
        AND (("pa"."Edad_min" <= "pc"."Edad") AND ("pa"."Edad_max" >= "pc"."Edad"))
        AND (("pac"."Edad_min" <= "p"."Edad") AND ("pac"."Edad_max" >= "p"."Edad"))
        AND ("pc"."Id_perfil" NOT IN (
            SELECT "m"."Id_perfil_destino"
            FROM public."Matches" AS "m"
            WHERE "m"."Id_perfil_origen" = "p"."Id_perfil"
        ))
        AND ("pc"."Id_perfil" NOT IN (
            SELECT "m"."Id_perfil_origen"
            FROM public."Matches" AS "m"
            WHERE "m"."Id_perfil_destino" = "p"."Id_perfil" AND "m"."Id_estado" = 3
        ))
        AND ("rc"."Id_raza" IN (
            SELECT "pr"."Id_raza"
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pa"."Id_preferencia" = "pr"."Id_preferencia"
        ) OR (0 >= (
            SELECT COUNT(*)
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pa"."Id_preferencia" = "pr"."Id_preferencia"
        )))
        AND ("r"."Id_raza" IN (
            SELECT "pr"."Id_raza"
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pr"."Id_preferencia" = "pac"."Id_preferencia"
        ) OR (0 >= (
            SELECT COUNT(*)
            FROM public."Preferencia_Raza" AS "pr"
            WHERE "pac"."Id_preferencia" = "pr"."Id_preferencia"
        )))
        AND (
            "pa"."Distancia_max">= (
            CASE WHEN ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) > 1
            THEN (12436.2/PI()) * 1 * 1.609344
            ELSE (12436.2/PI()) * ACOS( SIN(PI()*CAST("u"."Latitud" AS FLOAT)/180) * SIN(PI()*CAST("uc"."Latitud" AS FLOAT)/180) + COS(PI()*CAST("u"."Latitud" AS FLOAT)/180) * COS(PI()*CAST("uc"."Latitud" AS FLOAT)/180) * COS((CAST("u"."Longitud" AS FLOAT) - CAST("uc"."Longitud" AS FLOAT))*PI()/180)) * 1.609344
            END)
        )
    `
    
    function candidatos (Id_perfil) {
        return new Promise(function (resolve, reject){
            app.db.models.Perfil.findOne({
                where: {Id_perfil: Id_perfil}
            }).then(perfil => {
                var query = ''
                if (perfil.Interes_amistad) {
                    query = query_amistad
                } else {
                    query = query_pareja
                }
                sequelize.query(query, {raw: true, replacements: {Id_perfil: Id_perfil}}).then(rows => {
                    resolve(dottie.transform(rows[0]));
                })
            });
        })
    }
    
    app.route('/candidatos/:Id_perfil')
        .get((req, res) => {
            candidatos (req.params.Id_perfil)
            .then(candidatos => {
                res.json(candidatos)})
        })
  };