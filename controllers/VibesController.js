import Vibe from "../models/Vibe.js";
import User from '../models/User.js'

export default class VibesController {
    static async showVibes(req, res){
        res.render('vibes/home')
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Vibe,
            plain: true
        })

        if (!user){
            res.redirect('/login')
        }

        const vibes = user.Vibes.map((result) => result.dataValues)
        
        res.render('vibes/dashboard', {vibes})
    }

    static createVibe(req, res){
        res.render('vibes/create')
    }

    static async createVibeSave(req, res){
        const vibe = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Vibe.create(vibe)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/vibes/dashboard')
            })
        } catch(err){
            console.log(err)
        }

    }

    static async removeVibe(req, res){
        const id = req.body.id
        const UserId = req.session.userid

        

        try {
            await Vibe.destroy({where: {id: id, Userid: UserId}})

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/vibes/dashboard')
            })
        } catch (err) {
            console.log(err)
        }
    }
}