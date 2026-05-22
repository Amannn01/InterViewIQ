import jwt from "jsonwebtoken"
const isAuth = async (req, res, next) => {
    try {
        // check Authorization header first, then cookie fallback
        let token = req.cookies?.token

        const authHeader = req.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.split(" ")[1]
        }

        if(!token){
            return res.status(401).json({message:"Not authenticated"})
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(401).json({message:"Invalid token"})
        }

        req.userId = verifyToken.userId
        next()

    } catch (error) {
        return res.status(500).json({message:`isAuth error ${error}`})
    }
}

export default isAuth