import Vibe from "../models/Vibe.js";
import User from '../models/User.js'

export default class VibesController {
    static async showVibes(req, res){
        res.render('vibes/home')
    }

    static async dashboard(req, res){
        res.render('vibes/dashboard')
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
}