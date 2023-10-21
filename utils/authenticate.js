const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    try {
        const auth = req.headers.authorization
        console.log(auth)
        const token = auth && auth.split(' ')[1]
        console.log(token)
        if (!token) return res.status(401).json({
            message: 'not token'
        })
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err) return res.status(403).json({
                message: 'invalid token'
            })
            req.userId = data.id
            next()
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = authenticate