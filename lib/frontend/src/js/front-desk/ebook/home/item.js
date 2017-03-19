import React from 'react';


export const Item =React.createClass({

    getDefaultProps:function(){
        return {
            title:'白雪飞天横舟渡',
            author:'itminus',
            authorUrl:'http://www.itminus.com',
            publishedAt:new Date(),
            imageUrl:'/static/img/react-web.png',
            detailUrl:'http://www.itminus.com',
            excerpt:'床前明月光，疑是地上霜。举头望明月，低头思故乡。',
        };
    },

    getDateString(date=new Date()){
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    },

    render:function(){
        return (<div>
            <h2><a href={this.props.detailUrl}>{this.props.title}</a></h2>
            <div>
                <span>
                    by <a href="#">{this.props.author}</a>  
                </span>
                <span>
                    {this.getDateString(this.props.publishedAt)} 
                </span>
            </div>
            <div>
                <a href={this.props.detailUrl}><img src={this.props.imageUrl} alt="图片"/></a>
            </div>
            <div>
                <p>{this.props.excerpt}</p>
            </div>
            <div>
                <a href={this.props.detailUrl}>Read More</a>
            </div>
        </div>);
    }

});


export default Item;