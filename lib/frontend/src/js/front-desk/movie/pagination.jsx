import React from 'react';


/**
 * 用于计算页码信息的帮助函数
 */
const _calculatePages=function(totalRecords,pageSize=10,currentPage=1,semiBandWidth=5){
    let totalPages=totalRecords/pageSize;
    let firstPage=1;
    let lastPage=totalPages;
    let previousPage=currentPage-1;
    let nextPage=currentPage+1;
    previousPage=previousPage>0?previousPage:1;
    nextPage=nextPage>totalPages?totalPages:nextPage;
    let firstDigit=currentPage-semiBandWidth>0;
    firstDigit=firstDigit>0?firstDigit:1;
    let lastDigit=currentPage+semiBandWidth; 
    lastDigit=lastDigit>lastPage?lastPage:lastDigit;
    return {
        totalPages:totalPages,
        current:currentPage,
        pageSize:pageSize,
        semiBandWidth:semiBandWidth,
        firstPage:1,
        lastPage:lastPage,
        previous:previousPage,
        next:nextPage,
        firstDigit:firstDigit,
        lastDigit:lastDigit,
    };
};

const Pagination=React.createClass({

    getInitialState:function(){
        return _calculatePages(this.props.totalRecords,this.props.pageSize,1,this.props.semiBandWidth)
    },

    getDefaultProps:function(){
        return {
            /**
             * 总的记录数目
             */
            totalRecords:50,
            /**
             * 每页显示的记录数目
             */
            pageSize:10,
            /**
             * 指的是从当前页码到显示的最大页码或最小页面的距离
             * 比如，当前页码是3，如果semiBandWidth=5,则lastDigit=8
             */
            semiBandWidth:5,
            /**
             * 当页码改变时触发
             */
            onChange:(i)=>{},
        };
    },
    render:function(){
        console.log(this.state);
        let list=Array(this.state.lastDigit-this.state.firstDigit+1).fill()
            .map((d,k)=>{
                return k+this.state.firstDigit;
            });
        /**
         * 生成onClick函数
         */
        let _genOnClick=(e,i)=>{
            e.preventDefault();
            const cb=this.props.onChange;
            this.setState(_calculatePages(
                this.state.totalRecords,this.state.pageSize,1,this.state.semiBandWidth
            ));
            return (e)=>{
                cb(i);
                return false;
            };
        };
        return (<nav aria-label="Page navigation">
            <ul className="pagination">
                <li>
                    <a href="#" onClick={(e)=>_genOnClick(e,this.state.firstDigit)()} > 
                        <span >&laquo; </span> 
                    </a>
                </li>
                { list.map(i=>{
                    return <li key={i} onClick={(e)=>_genOnClick(e,i)()} ><a href={i}>{i}</a></li>;
                })}
                <li>
                    <a href="#" onClick={ (e)=>_genOnClick(e,this.state.lastDigit)() } > 
                        <span >&raquo; </span> 
                    </a>
                </li>
            </ul>
        </nav>);
    }
});

export default Pagination;