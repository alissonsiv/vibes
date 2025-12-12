export default function checkAuth(req, res, next) {
    const userId = req.session.userid;

    if (!userId) {
        return res.redirect('/login'); 
    }

    next(); 
}
