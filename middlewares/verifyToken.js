const jwt = require('jsonwebtoken');

require('dotenv').config();


verifyToken = async (req, res, next) => {
    const key = process.env.SECRET_KEY;
    
    try {    
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, key);
        if (decoded) {
            res.locals.userId = decoded.username;
            next();
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
