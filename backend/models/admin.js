module.exports = (sequelize, DataTypes) => {
    return sequelize.define('admin', {
        // attributes
        id: {
            type: DataTypes.STRING,
            allowNUll: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true
        // options
    });
}