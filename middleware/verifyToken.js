const jwt = require('jsonwebtoken');
const User = require('../models/User');

// xác thực token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader && authHeader.startsWith('Bearer')) {
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(400).json('You are not authenticated!');
      }
      const decoded = jwt.verify(token, process.env.JWT_SEC);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json('You are not authenticated!');
      }
      req.user = user;
      next();
    } else {
      return res.status(402).json('You are not authenticated!');
    }
  } catch {
    return res.status(403).json('You are not authenticated!');
  }
};

// xác thực user
const verifyTokenAndAuthorization = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roles) {
        var check = false;
        req.user.roles.forEach(function (value) {
          if (value === process.env.ROLE_USER) {
            check = true;
          }
        });
        if (check) {
          next();
        } else {
          res.status(403).json('You are not alowed to do that!');
        }
      } else {
        res.status(403).json('You are not alowed to do that!');
      }
    });
  } catch {
    return res.status(401).json('You are not alowed to do that!');
  }
};

// xác thực admin
const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roles) {
        var check = false;
        req.user.roles.forEach(function (value) {
          if (value === process.env.ROLE_ADMIN) {
            check = true;
          }
        });
        if (check) {
          next();
        } else {
          res.status(403).json('You are not alowed to do that!');
        }
      } else {
        res.status(403).json('You are not alowed to do that!');
      }
    });
  } catch {
    return res.status(401).json('You are not alowed to do that!');
  }
};

// xác thực userJE
const verifyTokenJe = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roles) {
        var check = false;
        req.user.roles.forEach(function (value) {
          if (value === process.env.ROLE_JE) {
            check = true;
          }
        });
        if (check) {
          next();
        } else {
          res.status(403).json('You are not alowed to do that!');
        }
      } else {
        res.status(403).json('You are not alowed to do that!');
      }
    });
  } catch {
    return res.status(401).json('You are not alowed to do that!');
  }
};

// xác thực userAnonymous
const verifyTokenAnonymous = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roles) {
        var check = false;
        req.user.roles.forEach(function (value) {
          if (value === process.env.ROLE_ANONYMOUS) {
            check = true;
          }
        });
        if (check) {
          next();
        } else {
          res.status(403).json('You are not alowed to do that!');
        }
      } else {
        res.status(403).json('You are not alowed to do that!');
      }
    });
  } catch {
    return res.status(401).json('You are not alowed to do that!');
  }
};

// xác thực userSuperAdmin
const verifyTokeSuperAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roles) {
        var check = false;
        req.user.roles.forEach(function (value) {
          if (value === process.env.ROLE_SUPER_ADMIN) {
            check = true;
          }
        });
        if (check) {
          next();
        } else {
          res.status(403).json('You are not alowed to do that!');
        }
      } else {
        res.status(403).json('You are not alowed to do that!');
      }
    });
  } catch {
    return res.status(401).json('You are not alowed to do that!');
  }
};

// xác thực userManager
const verifyTokeManager = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roles) {
        var check = false;
        req.user.roles.forEach(function (value) {
          if (value === process.env.ROLE_MANAGER) {
            check = true;
          }
        });
        if (check) {
          next();
        } else {
          res.status(403).json('You are not alowed to do that!');
        }
      } else {
        res.status(403).json('You are not alowed to do that!');
      }
    });
  } catch {
    return res.status(401).json('You are not alowed to do that!');
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenJe,
  verifyTokenAnonymous,
  verifyTokeSuperAdmin,
};
