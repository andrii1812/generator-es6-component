import <%= capName%> from './<%= componentName %>.component.js';

require('./<%= componentName %>.scss');

export default angular.module('<%= componentName %>', [])
    .component('<%= componentName %>', <%= capName%>);