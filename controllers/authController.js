const usersDB ={
    users: require('../Data/users.json'),
    setUsers: function(data){ this.users = data}
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path')

const handleLogin = async (req, res) =>{
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(400).json({'message' : 'username and pass required'});
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser)
    if(match){
        const roles = Object.values(foundUser, roles)
        //JWT's
        const accessToken = jwt.sign(
            {
                "username" : foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '360s'}
        );

        //saving refresh tokens of current users
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken}
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, "..", 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )

        //httpOny cookie is secured because it is not accessible by js 
        res.cookie('jwt', refreshToken, { httpOnly:true, maxAge: 24 * 60 * 60  * 1000})
        res.json({accessToken})
    }else{
        res.sendStatus(401);
    }

}

module.exports = { handleLogin}