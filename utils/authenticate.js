const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    try {
        const auth = req.headers.authorization
        const token = auth && auth.split(' ')[1]
        if (!token) return res.status(401).json({
            message: 'no token'
        })
        console.log(token)
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                console.log(err.message)
                console.log(err)
                return res.status(403).json({
                    message: 'invalid token'
                })
            }
            req.userId = data.id
            next()
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = authenticate