  const defaultConfig=require('./config');
  const {createSkeleton}=require('./index.js');
  const skeleton=createSkeleton({config:defaultConfig});
  skeleton.run();