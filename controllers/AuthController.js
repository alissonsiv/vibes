import User from '../models/User.js'

import bcrypt, { hash } from 'bcrypt'

export default class AuthController {
    // Renderiza a página de login
    static login(req, res){
        res.render('auth/login')
    }

    // Renderiza a página de registro de usuário
    static register(req, res){
        res.render('auth/register')
    }

    // Envio do formulário de registro
    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body;

        // Validação: verifica se as senhas coincidem
        if (password != confirmpassword){
           req.flash('message', 'As senhas não conferem, tente novamente!')
           res.render('auth/register')
            
            return
        }

        // Verifica se já existe um usuário com o mesmo e-mail
        const checkIfUserExists = await User.findOne({where: {email: email}})

        if (checkIfUserExists){
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')

            return
        }

        // Cria o hash da senha 
        const salt = bcrypt.genSaltSync(10)// Gera um salt para aumentar a segurança do hash
        const hashedPassword = bcrypt.hashSync(password, salt) 
        
        // Monta o objeto do usuário a ser criado
        const user = {
            name, 
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)
            
            // Inicializa a sessão do usuário recém-criado
            req.session.userid = createdUser.id


            req.flash('message', 'Cadastro realizado com sucesso!')

             // Salva a sessão e redireciona para a página inicial
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (err){
            console.log(err)
        }
    }
}
