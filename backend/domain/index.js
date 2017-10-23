const config=require("../config").getConfig();
const Sequelize=require('sequelize');



const database=config.database;
const sequelize=new Sequelize(
    database.dbname,
    database.username,
    database.password,
    {
        host:database.host,
        dialect:database.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);


/////////////////////////////////////////////////////////////////////
// user , role , resource  and so on .
/////////////////////////////////////////////////////////////////////
const User=sequelize.import('./entity/system/user.js');
const ActiveCode=sequelize.import('./entity/system/active-code.js');

User.hasOne(ActiveCode);


const Role=sequelize.import('./entity/system/role.js');
const Resource= sequelize.import('./entity/system/resource.js');
const UserRole=sequelize.define(
    'userRole',
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id',
            // allowNull: false,
            references:{
                model:User,
                key:'id',
            },
            comment: 'user id',
        },
        roleId: {
            type: Sequelize.INTEGER,
            field: 'role_id',
            // allowNull: false,
            comment: '角色id',
            references:{
                model:Role,
                key:'id',
            },
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: '描述',
        }
    },
    {
        tableName: 'user_role',
        timestamps:false,
    }
);
const RoleResource=sequelize.define(
    'roleResource',
    {
        roleId:{
            type:Sequelize.INTEGER,
            field:'role_id',
            // allowNull:false,
            references:{
                model:Role,
                key:'id',
            },
            comment:'角色id',
        },
        resourceId:{
            type:Sequelize.INTEGER,
            field:'resource_id',
            // allowNull:false,
            references:{
                model:Resource,
                key:'id',
            },
            comment:'资源id',
        },
        description:{
            type:Sequelize.STRING,   
            allowNull:true,
            comment:'描述',
        }
    },
    {
        tableName:'role_resource',
        timestamps:false,
    }
);


// difine n:m association of user : role 
User.belongsToMany(Role,{
    through:UserRole,
    foreignKey:'user_id',
    otherKey:'role_id',
});
Role.belongsToMany(User,{
    through: UserRole,
    foreignKey:'role_id',
    otherKey:'user_id',
});

// difine n:m association of resource : role
Resource.belongsToMany(Role,{
    through:RoleResource,
    foreignKey:'resource_id',
    otherKey:'role_id',
});
Role.belongsToMany(Resource,{
    through:RoleResource,
    foreignKey:'role_id',
    otherKey:'resource_id',
});



/////////////////// common

const Language=sequelize.import('./entity/common/language.js');
const Country=sequelize.import('./entity/common/country.js');
const Category=sequelize.import('./entity/common/category.js');
const TopicUserOpinion=sequelize.import('./entity/common/topic-user-opinion.js');
TopicUserOpinion.belongsTo(User,{foreignKey:'user_id'});

const TopicKeyword=sequelize.import('./entity/common/topic-keyword.js');



////////////////// cms
const Post=sequelize.import('./entity/cms/post.js');
const Ebook =sequelize.import('./entity/cms/ebook.js');
const Movie=sequelize.import('./entity/cms/movie.js');
const Screenshot=sequelize.import('./entity/cms/screenshot.js');
const Director=sequelize.import('./entity/cms/director.js');

Post.belongsTo(Category);
Post.belongsTo(User,{foreignKey:'author_id',as:'author'});

Director.belongsTo(Country);
Movie.belongsTo(Language);
Movie.belongsTo(Country);
Movie.belongsTo(Category);
Movie.hasMany(Screenshot);

// 因为 keyword 可能是post、ebook、movie或者其他之类的id，所以要注释掉这句外键关联
// post.hasMany(keyword,{foreignKey:'post_id'});



/////////////////// comment
const Comment=sequelize.define(
    'comment',
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'content'
        },
        upvotes: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            field: 'upvotes',
            comment: '赞同数',
        },
        downvotes: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            field: 'downvotes',
            comment: '反对数',
        },
        authorId: {
            type: Sequelize.BIGINT,
            allowNull: null,
            field: 'author_id',
            comment: '作者ID',
        },
        scope: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'post',
            field: 'scope',
            comment: '本分类信息所属的领域，比如post、movie、book',
        },
        topicId: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'topic_id',
            comment: '主题ID，如文章、电影等',
        },
        replyTo: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            field: 'reply_to',
            comment: '回复的某评论ID',
        },
        replyUnder: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            field: 'reply_under',
            comment: '回复的某评论ID，NULL表示是顶级评论，回复于顶级评论或者回复于其他评论的回复必须指定此字段',
        }
    },
    {
        tableName: 'comment'
    }
);



Comment.belongsTo(User,{foreignKey:'author_id',as:'author'});
// comment.belongsTo(comment,{foreignKey:'reply_to'});
//comment.hasMany(topicUserOpinion,{foreignKey:'comment_id'});





module.exports={
    sequelize,
    user:User,
    activeCode:ActiveCode,
    director:Director,
    country:Country,
    language:Language,
    movie:Movie,
    screenshot:Screenshot,
    role:Role,
    resource:Resource,
    userRole:UserRole,
    roleResource:RoleResource,
    post:Post,
    category:Category,
    keyword:TopicKeyword,
    comment:Comment,
    ebook:Ebook,
    topicUserOpinion:TopicUserOpinion,
};