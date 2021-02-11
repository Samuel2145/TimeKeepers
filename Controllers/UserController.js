import bcrypt from 'bcrypt'


export const createUser = (req, res) => {

    bcrypt.genSalt(10, function(err,salt) {

        bcrypt.hash(req.body.user.password, salt, function(err, hash) {

            console.log("Data to store")
            console.log(req.body.user.userName)
            console.log(hash)

        });
    });
}


export const userLogin = (req, res) => {



}
