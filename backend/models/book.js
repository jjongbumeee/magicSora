module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book', {
        bid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        auth: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        pub: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNULL: false
        },
        image: {
            type: DataTypes.STRING

        },
        isaccept: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNULL: false,
        },
        issell: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNULL: false,
        }
    },
    {
        freezeTableName: true,
        timeStamps: true
        // options
    });
}