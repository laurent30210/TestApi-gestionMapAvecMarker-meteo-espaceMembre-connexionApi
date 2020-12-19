const User = require('./user');
const City = require('./city');



User.hasMany(City, {
    foreignKey: 'user_id',
    as: 'cities'
});

City.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});


module.exports = {User, City};
