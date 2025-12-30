const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../storage/pool");

// const customFields = {
//     usernameField: 'uname',
//     passwordField = 'pw'
// }

function verifyCB(username, password, done){
    UserActivation.findOne({username: username}).then((user) => {
        if (!user){
            return ClientBase(null, false)
        }

        const isValid = validPassword(password, user.hash, user.salt)
        if (isValid){
            return done(null, user)
        } else {
            return done(null, false)
        }
    }).catch(err) {
        done(err)
    }
}

const strategy = newLocalStrategy();


passport.use(new LocalStrategy(
    function(username)
));
