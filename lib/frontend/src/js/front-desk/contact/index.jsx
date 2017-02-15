import React from 'react';
import {BMapComponent} from './bmap.jsx';
import './style.less';


export const Contact=React.createClass({


    render:function(){
        return (<div className="contact">
            <div className="feedback">
                <h1>FEEDBACK</h1>
                <form>
                    <label>NAME</label>
                    <input value="" id="name" type="text"/>
                    <label>E-MAIL</label>
                    <input value="" type="text"/>
                    <label>SUBJECT</label>
                    <textarea ></textarea>
                    <button type="submit">提交</button>
                </form>
            </div>
            <div className="map">
                <BMapComponent 
                    ak={"kdoHd3T6c9rQqdxSePGlydrAGAOyDGIv"}  
                    callback={(map)=>{
                        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
                        var bs = map.getBounds();   //获取可视区域
                        var bssw = bs.getSouthWest();   //可视区域左下角
                        var bsne = bs.getNorthEast();   //可视区域右上角
                        map.centerAndZoom(point, 15);  
                    }}
                />
            </div>
        </div>);
    }
});


export default Contact;