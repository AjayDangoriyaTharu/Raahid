const jwt =  require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  
    const auth = req.headers["authorization"];
    
    if (!auth) {
    return res.status(401).json("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json("Access denied. Token provided is Wrong or Expired .");
  }
};


module.exports = {
    ensureAuthenticated
};