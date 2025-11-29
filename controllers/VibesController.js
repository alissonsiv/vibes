import Vibe from "../models/Vibe.js";
import User from '../models/User.js'

export default class VibesController {
    static async showVibes(req, res){
        res.render('Vibes/home')
    }
}