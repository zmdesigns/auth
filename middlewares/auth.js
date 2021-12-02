const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function getLoginInfo(username) {
  //lookup username in db
  //return row if found
}

async function passHashMatch(password, hash) {
  bcrypt
    .compare(req.body.password, hash)
    .then(function (match) {
      if (match === true) {
        return true;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}

export async function checkLogin(username, password) {
  const userRow = await getLoginInfo(username);
  if (userRow === undefined) {
    return false;
  }
  const correctPass = await passHashMatch(password, userRow.passHash);
  if (correctPass === true) {
    return true;
  }
  return false;
}

export function signJwt(object) {
  var privateKey = fs.readFileSync('/home/ubuntu/.ssh/jwtRS256.key');
  var token = jwt.sign(object, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1h',
  });
  return token;
}

export function decodeJwt(token) {
  var cert = fs.readFileSync('/home/ubuntu/.ssh/jwtRS256.key.pub');
  jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, decoded) {
    if (decoded === undefined) {
      return err;
    }
    return decoded;
  });
}
