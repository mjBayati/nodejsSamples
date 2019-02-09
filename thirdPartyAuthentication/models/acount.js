var uuidv1 = require('uuid/v1');
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var accounts = sequelize.define("accounts", {
        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [2, 30]}
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [2, 30]}
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1, 30]}
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'idle',
            validate: {len: [1,2]}
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [7, 300]},
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {len: [10, 15]},
        },
        account_key: {
            type: DataTypes.STRING,
            required: true,
            validate: {len: [8]}
        }
    });

    accounts.generateHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    accounts.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.account_key);
    };

    accounts.associate = function(models){
        accounts.hasMany(models.items, {
            foreignKey: 'owner_id',
            onDelete: 'cascade'
        });
    };
    
    accounts.associate = function(models){
        accounts.hasMany(models.Transactions, {
            foreignKey: 'renter_id'
        });
    };

    return accounts;
}