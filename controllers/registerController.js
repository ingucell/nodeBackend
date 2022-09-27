const usersDB ={
    users: require('../Data/users.json'),
    setUsers: function(data){ this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt') 

const handleNewUser = async (req, res) =>{
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(400).json({'message' : 'username and pass requiredd'});

    ///dup
    const duplicate = usersDB.users.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409);
    try{
            //encryption
            const hashedpwd = await bcrypt.hash(pwd, 10);
            //store
            const newUser = {'username' : user , 'password' : hashedpwd};
            usersDB.setUsers([...usersDB.users, newUser]);
            await fsPromises.writeFile(
                path.join(__dirname, '..', 'Data', 'users.json'),
                JSON.stringify(usersDB.users)
            );
            console.log(usersDB.users);
            res.status(201).json({'success' : `NEw user ${user} created`})
    }catch(err){
        res.status(500).json({'message' : err.message})
    }
}

module.exports = {handleNewUser}