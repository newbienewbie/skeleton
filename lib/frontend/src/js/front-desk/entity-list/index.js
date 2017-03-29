import React from 'react';
import Pagination from 'simple-react-ui/dist/pagination';
import './style.less';
import 'whatwg-fetch';


function _fetch(categoryId=null,page=1,size=8){
    return fetch('/post/recent',{
            method:'post',
            credentials:'same-origin',
            headers:{ "Content-Type":"application/json", },
            body:JSON.stringify({ page, size, categoryId, }),
        }).then(resp=>resp.json())
        .then(result=>{
            const list=result.rows.map(i=>{
                // 客户端路由
                const detailUrl=`/#/post/detail/${i.id}`;
                return {
                    id:i.id,
                    title:i.title,
                    author:i.author.username,
                    authorUrl:i.author.username,
                    imageUrl:i.posterUrl,
                    detailUrl,
                    excerpt:i.description,
                    publishedAt:new Date(),
                };
            });
            return {entities:list,count:result.count};
        });
}

function _entityToItem(e,i){
    return <Item key={i} {...p} />;
}
            
export const List=React.createClass({

    getDefaultProps:function(){
        return {
            categoryId:null,
            /**
             * 远程加载器
             */
            fetch:_fetch,
            /**
             * convert entity object to list item
             */
            entityToItem:_entityToItem,
        };
    },

    getInitialState:function(){
        return {
            entities:[ ], // 实体数组
            count:0,      // 记录总数量
            current:1,    // 当前页码
            size:8,       // 每页记录数量
        };
    },

    fetchRecent(categoryId=null,page=1,size=8){
        return this.props._fetch(categoryId,page,size);
    },

    componentDidMount:function(){
        this.fetchRecent(this.props.categoryId,1,this.state.size).then(result=>{
            const {entities,count}=result;
            this.setState({entities,count});
        });
    },

    componentWillUpdate:function(nextProps){
        if(nextProps.categoryId!=this.props.categoryId){
            this.fetchRecent(nextProps.categoryId,1,this.state.size)
                .then(result=>{
                    const {entities,count}=result;
                    this.setState({entities,count});
                });
        }
    },

    render:function () {
        return (<div id="article-container">
            <article>
                {this.state.entities.map((e,i)=>{
                    return this.props.entityToItem(e,i);
                })} 
            </article>
            <Pagination size={this.state.size} current={this.state.current} total={this.state.count}
                onChange={page=>{
                    this.fetchRecent(this.props.categoryId,page,this.state.size)
                        .then(result=>{
                            const {entities,count}=result;
                            this.setState({
                                current:page,count,entities,
                            });
                        });
                }}
            />
        </div>);
    }
});


export default List;