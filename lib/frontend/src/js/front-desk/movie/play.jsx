import React from 'react'; 



const Play=(props)=>{
    const state=props.location.state;
    const url=state.url;
    return (<div>
        <div className="row">
            <h2>{state.title}</h2>
        </div>
        <video width="640" height="360" controls poster={state.imageSrc}>
            <source src={url} type="video/mp4" />
            <source src={url} type="video/ogg" />
            <object width="640" height="360" type="application/x-shockwave-flash" data="__FLASH__.SWF">
                <param name="movie" value="__FLASH__.SWF" />
                <param name="flashvars" value={`controlbar=over&amp;image=__POSTER__.JPG&amp;file=${url}`} />
                <img src="__VIDEO__.JPG" width="640" height="360" alt="__TITLE__"
                    title="No video playback capabilities, please download the video below" />
            </object>
        </video>
        <div className="row">
            <a target="_blank" href={url}>下载到本地</a>
        </div>
        <div className="row">
            <h5>简介</h5>{state.content}
        </div>
    </div>);
};




module.exports=Play;