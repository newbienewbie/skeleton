import React from 'react';
import BaiduMap from 'simple-react-ui/dist/baidumap';
import './style.less';


export const Contact = React.createClass({


    render: function () {
        return (<div className="contact">
            <p>
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
                    1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                    original form, accompanied by English versions from the 1914 translation by H. Rackham.
            </p>
            <div className="map">
                <BaiduMap
                    ak={"kdoHd3T6c9rQqdxSePGlydrAGAOyDGIv"}
                    callback={(map) => {
                        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
                        var bs = map.getBounds();   //获取可视区域
                        var bssw = bs.getSouthWest();   //可视区域左下角
                        var bsne = bs.getNorthEast();   //可视区域右上角
                        map.centerAndZoom(point, 15);
                    }}
                />
            </div>
            <div className="feedback" >
                <div className="feedback-form">
                    <h2>反馈您的意见</h2>
                    <form>
                        <div>
                            <label>姓名</label>
                            <input value="" id="name" type="text" />
                        </div>
                        <div>
                            <label>邮箱</label>
                            <input value="" type="text" />
                        </div>
                        <div>
                            <label>内容</label>
                            <textarea ></textarea>
                        </div>
                        <div>
                            <button type="submit">提交</button>
                        </div>
                    </form>
                </div>
                <div className="feedback-info">
                    <h2>联系信息</h2>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation by
                        H. Rackham.</p>
                    <address>
                        <strong>The Company Name Inc.<br/>
                        9870 St Vincent Place, Glasgow, DC 45 Fr 45.</strong><br/> 
                        电话: +1 800 603 6035<br/> 
                        传真: +1 800 889 9898<br/> 
                        邮箱: <a href="mailto:info@example.com">mail@example.com </a><br/>
                    </address>
                </div>
            </div>
        </div>);
    }
});


export default Contact;