const jwt = require('jsonwebtoken');

require('dotenv').config();


verifyToken = async (req, res, next) => {
    const key = process.env.SECRET_KEY;
    
    try {    
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, key);
        if (decoded) {
            res.locals.userId = decoded.username;
            return next("Ok");
        }
     } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(419).json({
            code: 419,
            message: "토큰이 만료되었습니다.",
          });
        }
    
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          code: 401,
          message: "유효하지 않은 토큰입니다.",
        });
      }
    }
}

exports.verifyToken = verifyToken;
