/**
 * 表示客户端界面上的一个操作动作，比如一个菜单项、一个按钮
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports=function(sequelize,DataTypes){
    return sequelize.define('action', 
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name',
                comment:'菜单项名、按钮名等',
            },
            resourceName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'resource_name',
                comment:'与该执行动作相对应的服务端资源名，该字段可以用于权限筛选',
            },
            showName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'show_name',
                comment:'显示的菜单项名、按钮名等',
            },
            to: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'to',
                comment:'link to , 不一定要是URL，很可能是个前端#后的url',
            },
            scope:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'scope',
                defaultValue:'admin',
                comment:'本动作所属的领域，比如admin/menu等',
            },
            klass:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'klass',
                defaultValue:'admin',
                comment:'本动作所属的类型，比如menu、button等',
            },
            listorder:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'listorder',
                defaultValue:'0',
                comment:'排序',
            },
            pid:{
                type: DataTypes.BIGINT,
                allowNull: true,
                defaultValue:null,
                field: 'pid',
                comment:'parent id ，可以为null',
            },
            displayable: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:1,
                field: 'display',
                comment:'是否显示? 1=显示，0=隐藏',
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'note',
                comment:'备注',
            }
        }, 
        {
            tableName: 'action'
        }
    );
}