const user = require('./user');
function route(app){
    app.use("/api/users", user);
}
module.exports = route;