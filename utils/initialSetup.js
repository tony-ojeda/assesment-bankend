const User = require('../api/user/user.model');

async function createUser(){
    try{
        const count = await User.estimatedDocumentCount();

        if(count > 0) return;

        const values = await Promise.all([
            new User({
                username: "admin", 
                password: "Admin123",
                email: "admin@gmail.com",
            }).save(),
        ]);

    } catch(error){
        console.error('Error: ',error)
    }
}

module.exports = createUser
