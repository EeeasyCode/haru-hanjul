const jwt = require('jsonwebtoken');

require('dotenv').config();


verifyToken = async (req, res, token) => {
    const key = process.env.SECRET_KEY;
    
    try {    
        console.log("hgere")
        console.log(req.cookies)
        const decoded = jwt.verify(token, key);
        console.log("de: " + decoded)
        if (decoded) {
            res.locals.userId = decoded.username;
            
        }
     } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.redirect("/?error=TokenExpiredError");
        }
    
      if (error.name === "JsonWebTokenError") {
        return res.redirect("/?error=JsonWebTokenError");
      }
    }
}

exports.verifyToken = verifyToken;
