module.exports=(sequelize,DataTypes)=>{
    const Project=sequelize.define("Project",{
        type:{
            type:DataTypes.STRING
        },
        title:{
            type:DataTypes.STRING
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        userid:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return Project
}