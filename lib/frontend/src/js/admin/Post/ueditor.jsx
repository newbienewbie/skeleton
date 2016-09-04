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
        document.getElementById(this.props.id).innerHTML="";
        let ue=UE.getEditor(this.props.id,{
            initialFrameWidth: this.props.width,
            initialFrameHeight: this.props.height,
        });
    },

    componentWillUnmount(){
        UE.delEditor(this.props.id);
    },
    
    render: function () {
        return (
            <script id={this.props.id} name={this.props.content}
                type="text/plain">
            </script>
        );
    }

});

Ueditor.propTypes={
    height:React.PropTypes.number,
    width:React.PropTypes.number,
};

export default Ueditor;
