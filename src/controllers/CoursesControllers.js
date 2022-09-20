const sequelize = require('sequelize');
const { Course } = require('../models');

module.exports = {
    async index(req, res){
        try {
            const courses = await Course.findAll({});
            res.status(200).send({
                message: courses
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "Pri snahe zobrazit kurzy nastala chyba. Skúste to znova neskôr."
            })
        }
    },

    async post(req, res){
        try {
            const newCourse = await Course.create(req.body);
            res.status(201).send({
                message: newCourse
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "Pri snahe vytvorit kurz nastala chyba. Skúste to znova neskôr."
            })
        }
    },

    async put(req, res){
        try {
            const updateCourse = await Course.update({
                name: req.body.name,
                description: req.body.description,
                duration: req.body.duration
            },
                {returning: true, where: {id: req.body.id}}
            );

            if(!updateCourse){
                return res.status(404).send({
                    error: "Kurz so zadaným ID sa nenašiel."
                })
            }

            return res.status(200).send({
                message: "Kurz bol úspešne aktualizovaný."
            })   
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "Pri snahe aktualizovať kurz nastala chyba. Skúste to znova neskôr."
            })
        }
    },

    async delete(req, res){
        try {
            const deleteCourse = await Course.destroy({
                where: {
                    id: req.body.id
                }
            });

            if(!deleteCourse){
                return res.status(404).send({
                    error: "Kurz so zadaným ID sa nenašiel."
                })
            }

            return res.status(200).send({
                message: "Kurz bol úspešne odstránený."
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "Pri snahe odstrániť kurz nastala chyba. Skúste to znova neskôr."
            })
        }
    },
}