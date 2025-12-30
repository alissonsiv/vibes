import Vibe from "../models/Vibe.js";
import User from '../models/User.js'

import { Op } from 'sequelize'

export default class VibesController {
    // Exibe todos os vibes cadastrados
    static async showVibes(req, res){
        let search = ''

        if (req.query.search){
            search = req.query.search
        }

        let order = "DESC"
        
        if (req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const vibesData = await Vibe.findAll({
            include: User, // Faz join com o model User
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        // Converte os dados para objetos simples
        const vibes = vibesData.map((result) => result.get({plain: true}))

        let vibesQty =  vibes.length

        if (vibesQty === 0){
            vibesQty = false
        }

        res.render('vibes/home', {vibes, search, vibesQty})
    }

    // Exibe a dashboard do usuário logado
    static async dashboard(req, res){
        const userId = req.session.userid // ID do usuário salvo na sessão

        // Busca o usuário e seus vibes
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Vibe, // Inclui os vibes relacionados ao usuário
            plain: true
        })

        if (!user){
            res.redirect('/login')
        }

        // Converte vibes retornados para um formato mais simples
        const vibes = user.Vibes.map((result) => result.dataValues)
        
        let emptyVibes = false

        // Verifica se o usuário não possui vibes
        if (vibes.length === 0){
            emptyVibes = true
        }

        res.render('vibes/dashboard', {vibes, emptyVibes})
    }

    // Renderiza o formulário de criação de um novo vibe
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

    // Remove um vibe do usuário
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

    // Renderiza a página de edição de um vibe
    static async updateVibe(req, res){
        const id = req.params.id
        console.log(id)

        const vibe = await Vibe.findOne({where: {id: id}, raw: true})
        
        console.log(vibe)

        res.render('vibes/edit', {vibe})
    }

    // Salva as alterações feitas no vibe
    static async updateVibeSave(req, res){
        const id = req.body.id

        const vibe = {
            title: req.body.title
        }

        try {
            await Vibe.update(vibe, {where: {id: id}})

            req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/vibes/dashboard')
            })
        } catch (err) {
            console.log(err)
        }
    }
}