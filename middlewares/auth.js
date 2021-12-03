const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var db = require('../services/db.js');

async function getLoginInfo(username) {
  try {
    const [rows] = await db.conn.query(
      'SELECT id,permission,username,passhash FROM Users WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return undefined;
    }
    return rows[0];
  } catch (error) {
    return error.message;
  }
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

async function checkLogin(username, password) {
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

function signJwt(object) {
  var privateKey = fs.readFileSync('/home/ubuntu/.ssh/jwtRS256.key');
  var token = jwt.sign(object, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1h',
  });
  return token;
}

function decodeJwt(token) {
  var cert = fs.readFileSync('/home/ubuntu/.ssh/jwtRS256.key.pub');
  jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, decoded) {
    if (decoded === undefined) {
      return err;
    }
    return decoded;
  });
}

async function userExists(username, email) {
  try {
    const [rows] = await db.conn.query(
      'SELECT id FROM Users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (rows.length === 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
}

async function signup(username, password, firstname, lastname, email) {
  try {
    const doesUserExist = await userExists(username, password);
    if (doesUserExist === true) {
      return false;
    }

    const permission = 0;
    let passHash = await bcrypt.hash(password, 10);

    const [result] = await db.conn.query(
      'INSERT INTO Users (username,passhash,firstname,lastname,email,permission) VALUES (?,?,?,?,?,?)',
      [username, passHash, firstname, lastname, email, permission]
    );

    return result.insertId;

    /*
        const message = {
          from: process.env.EMAIL_USER,
          to: email_addr,
          subject: 'Signup for dt.aimesgt.com',
          text:
            'Hello ' +
            firstname +
            ', Thank you for signing up to dt.aimes.info! Your username is: ' +
            username,
        };
        email.sendMail(message, function (error, info) {
          if (error) {
            console.log(err);
            return { result: false, message: 'Email error:' + error };
          } else {
            console.log(info);
            return { result: true, message: results.insertId };
          }
        });
  */
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

module.exports = { checkLogin, signJwt, decodeJwt, signup };
