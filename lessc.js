const fs=require('fs');
const path=require('path');
var less = require('less');


const src='./frontend/less/index.less';
const out='./frontend/static/css/index.css';
const lessInput=fs.readFileSync(src);
less.render(
  lessInput.toString(),
  { 
    filename:path.resolve(src),
  }
).then(
  output=> {
    fs.writeFileSync(out,output.css);
  },
  err=> console.error(err)
);
    