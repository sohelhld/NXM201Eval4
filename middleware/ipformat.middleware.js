


const  validateIP = (req, res, next) =>{
    const ip = req.query.ip;
    const ipRegex = /^\(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\)$/;
  
    if (!ipRegex.test(ip)) {
      return res.status(400).json({ message: 'Invalid IP address' });
    }
  
    next();
  }

  module.exports={
    validateIP
  }