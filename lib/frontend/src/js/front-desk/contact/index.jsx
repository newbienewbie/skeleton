import React from 'react';
import { BMapComponent } from './bmap.jsx';
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
                <BMapComponent
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
                    <h2>FEEDBACK</h2>
                    <form>
                        <label>NAME</label>
                        <input value="" id="name" type="text" />
                        <label>E-MAIL</label>
                        <input value="" type="text" />
                        <label>SUBJECT</label>
                        <textarea ></textarea>
                        <button type="submit">提交</button>
                    </form>
                </div>
                <div className="feedback-info">
                    <h2>CONTACT-INFO</h2>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation by
                        H. Rackham.</p>
                    <address>
                        <strong>The Company Name Inc.
                        9870 St Vincent Place,<br/>
                        Glasgow, DC 45 Fr 45.</strong><br/> 
                        Telephone: +1 800 603 6035<br/> 
                        FAX: +1 800 889 9898<br/> 
                        E-mail: <a href="mailto:info@example.com">mail@example.com </a><br/>
                    </address>
                </div>
            </div>
        </div>);
    }
});


export default Contact;