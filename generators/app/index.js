'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const camelCase = require('camelcase');
const kebabCase = require('kebab-case');

function transformProps(props) {
    props.componentName = camelCase(props.componentName);

    var capName = props.componentName;
    capName = capName.charAt(0).toUpperCase() + capName.substr(1);
    props.capName = capName;

    props.styleName = kebabCase(props.componentName) + '-container';
}

module.exports = Generator.extend({
    constructor: function() {
        Generator.apply(this, arguments);

        this.argument('componentName', {
            type: String, 
            required: false
        });

        this.option('withModule');
    },
    prompting: function () {
        if(this.options.componentName) {
            this.props = {
                componentName: this.options.componentName,
                withModule: this.options.withModule || false
            };
            transformProps(this.props);
            return;
        }

        this.log(yosay(
            'Welcome to the best ' + chalk.red('generator-es6-component') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'componentName',
            message: 'Enter component name:'
        }, {
            type: 'confirm',
            name: 'withModule',
            message: 'Do you want also to create module file?'
        }];

        return this.prompt(prompts).then(function (props) {
            this.props = props;
            transformProps(this.props);
        }.bind(this));
    },
    writing: function () {
        let componentName = this.props.componentName;
        let basePath = componentName + '/' + componentName;

        this.fs.copyTpl(
            this.templatePath('component.js'),
            this.destinationPath(basePath + '.component.js'),
            this.props
        );

        this.fs.copyTpl(
            this.templatePath('controller.js'),
            this.destinationPath(basePath + '.controller.js'),
            this.props
        );

        if(this.props.withModule) {
            this.fs.copyTpl(
                this.templatePath('module.js'),
                this.destinationPath(basePath + '.module.js'),
                this.props
            );
        }

        this.fs.copyTpl(
            this.templatePath('styles.scss'),
            this.destinationPath(basePath + '.scss'),
            this.props
        );

        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath(basePath + '.template.html'),
            this.props
        );
    }
});
