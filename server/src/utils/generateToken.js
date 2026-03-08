const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY missing in .env');
  }

  const token = jwt.sign
    (
      { id: userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' } //  7d token expiry common
    )

  return token;
}


module.exports = generateToken;