const jwt = require('jsonwebtoken');

require('dotenv').config();


verifyToken = async (req, res, token) => {
    const key = process.env.SECRET_KEY;
    
    try {    
        const decoded = jwt.verify(token, key);
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
