var creator = require('./view.coffee');

module.exports = function(React){
  return {
    name: 'pipeline-react-views',
    factories: {
      view: creator(React)
    }
  };
};
