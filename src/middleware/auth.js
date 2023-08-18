import jwt from "jsonwebtoken"

const authenticated = async(req, res, next) => {
    if(!req.cookies.auth) {
        return res.status(400).json({
            ok:false,
            response:"Unauthorized"
        })
    }
    if(req.cookies.auth) {
        const verification = await jwt.verify(req.cookies.auth, 'test');
        if(!verification) {
            return res.status(400).json({
                ok:false,
                response:'Invalid Token'
            })
        };
        if(verification) {
            try {
                const decoded = await jwt.decode(req.cookies.auth, 'test');
                if(!decoded) {
                    return res.status(400).json({
                        ok:false,
                        response:'Something went wrong'
                    })
                }
                console.log(decoded);
                next();
            } catch (error) {
                console.error();
            }
        }
    }
}

export { authenticated }