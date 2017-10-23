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

/////////////////////////////////////////////////////////////////////



const Language=sequelize.import('./entity/common/language.js');
const Country=sequelize.import('./entity/common/country.js');
const Director=sequelize.import('./entity/director.js');
const Movie=sequelize.define(
    'movie', 
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      knownAs: {
        field:"known_as",
        type: Sequelize.STRING,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        field:'category_id'
      },
      languageId: {
        field:'language_id',
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      director: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      runtime: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      aspectRatio: {
        field:'aspect_ratio',
        type: Sequelize.STRING,
        allowNull: true
      },
      releaseDate: {
        field:'release_date',
        type: Sequelize.DATE,
        allowNull: true
      },
      countryId: {
        field:'country_id',
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      posterUrl: {
        field:'poster_url',
        type: Sequelize.STRING,
        allowNull: true
      },
      url:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      uploaderId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:'-1',
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:'draft',
        comment:'状态：draft，censoring，published,banned',
      },
      publishedAt:{
        type:Sequelize.DATE,
        allowNull:true,
        filed:'published_at',
        comment:'即发布者提交的发布日期，有可能需要后续审核，不同于创建的首次保存日期', 
      }
    }, 
    {
      tableName: 'movie'
    }
);

const Screenshot=sequelize.define(
    'screenshot',
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        movieId: {
            field: 'movie_id',
            type: Sequelize.BIGINT,
            allowNull: true,
            references: {
                model: 'movie',
                key: 'id'
            }
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'screenshot'
    }
);

const Post=sequelize.define(
    'post', 
    {
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slug:{
          type: Sequelize.STRING,
          allowNull: true,
          field:'slug',
          comment:'slug',
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        excerpt:{
          type:Sequelize.TEXT,
          allowNull:false,
          comment:'摘要',
        },
        featureImageUrl:{
          type: Sequelize.STRING,
          allowNull: true,
          field:'feature_image_url',
          comment:'特色图片URL',
        },
        authorId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field:'author_id',
        },
        password:{
          type: Sequelize.STRING,
          allowNull: true,
          field:'password',
          comment:'保护密码',
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue:'draft',
          comment:'状态：draft，censoring，published,banned',
        },
        departmentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field:'department_id',
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull:false,
          field:'category_id'
        },
        publishedAt:{
          type:Sequelize.DATE,
          allowNull:true,
          filed:'published_at',
          comment:'即作者提交的发布日期，有可能需要后续审核，不同于创建的首次保存日期',
        },
        commentable:{
          type:Sequelize.BOOLEAN,
          allowNull:false,
          defaultValue:true,
          field:'commentable',
          comment:'是否可以评论',
        }
        
      },
      {
        tableName: 'post'
      }
);;

const Category=sequelize.import('./entity/common/category.js');

const Keyword=sequelize.define(
    'keyword', 
    {
        tag: {
            type: Sequelize.STRING,
            allowNull: false,
            comment:'关键词',
        },
        scope:{
            type: Sequelize.STRING,
                allowNull: false,
                defaultValue:'post',
                field: 'scope',
                comment:'本分类信息所属的领域，比如post、movie、ebook', 
        },
        topicId:{
            type:Sequelize.BIGINT,
            allowNull:false,
            field:'topic_id',
            comment:'topic id ，比如 postId，ebookId',
        }
        },
    {
        tableName: 'keyword'
    }
);


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

const TopicUserOpinion=sequelize.define(
    'topicUserOpinion',
    {
        scope: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'post',
            field: 'scope',
            comment: '用户意见信息所属的领域，比如comment、某些类型的文章',
        },
        topicId: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'topic_id',
            comment: '用户意见主体的ID',
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'user_id',
            comment: '用户ID',
        },
        opinion: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'opinion',
            comment: '意见，字符串：赞同、感谢、反对、无益,etc.'
        },
        note: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'note',
            comment: '备注',
        }
    },
    {
        tableName: 'topic_user_opinion'
    }
);

const Ebook = sequelize.define(
    'ebook', 
    {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '书名',
        },
        author: {
            field: 'author',
            type: Sequelize.STRING,
            allowNull: false,
            comment: '作者，注意不是发布人，必填',
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            comment: '描述，必填',
        },
        isbn: {
            field: "isbn",
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'ISBN，之所以可以留空，是考虑到有些非出版的电子书没有ISBN',
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'category_id'
        },
        posterUrl: {
            field: 'poster_url',
            type: Sequelize.STRING,
            allowNull: true,
            comment: '封皮URL',
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '文件URL',
        },
        note: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: '备注',
        },
        uploaderId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: '上传者ID，发布人',
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'draft',
            comment: '状态：draft，censoring，published，banned',
        },
    }, 
    {
        tableName: 'ebook'
    }
);

Director.belongsTo(Country);
Movie.belongsTo(Language);
Movie.belongsTo(Country);
Movie.belongsTo(Category);
Movie.hasMany(Screenshot);

Post.belongsTo(Category);
Post.belongsTo(User,{foreignKey:'author_id',as:'author'});

// 因为 keyword 可能是post、ebook、movie或者其他之类的id，所以要注释掉这句外键关联
// post.hasMany(keyword,{foreignKey:'post_id'});


Comment.belongsTo(User,{foreignKey:'author_id',as:'author'});
// comment.belongsTo(comment,{foreignKey:'reply_to'});
//comment.hasMany(topicUserOpinion,{foreignKey:'comment_id'});
TopicUserOpinion.belongsTo(User,{foreignKey:'user_id'});




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
    keyword:Keyword,
    comment:Comment,
    ebook:Ebook,
    topicUserOpinion:TopicUserOpinion,
};