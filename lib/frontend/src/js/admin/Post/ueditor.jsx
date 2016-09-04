import React from  'react';


const Ueditor = React.createClass({

    getDefaultProps:function () {
        return{
            id:'ueditorcontainer',
            name:'uecontent',
            height:600,    // 注意这里只能是数字，不可有单位
            width:600,     // 注意这里只能是数字，不可有单位
        };
    },

    componentDidMount() {
        function waitUntil(props){
            try{
                let ue = UE.getEditor(props.id, {
                    initialFrameWidth: props.width,
                    initialFrameHeight: props.height,
                });
            }catch(err){
                console.log('暂时无UE对象可用，等待500',err);
                setTimeout( waitUntil, 500);
            }
        }
        waitUntil(this.props);
    },

    componentWillUnmount(){
        UE.delEditor(this.props.id);
    },
    
    render: function () {
        return (
            <div>
            <script id={this.props.id} name={this.props.content}
                type="text/plain">
            </script>
            </div>
        );
    }

});

Ueditor.propTypes={
    height:React.PropTypes.number,
    width:React.PropTypes.number,
};

export default Ueditor;
