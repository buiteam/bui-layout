/**
 * @fileOverview 浮动布局，所有的元素float:left
 * @ignore
 */

var BUI = require('bui-common'),
	Abstract = require('./abstract'),
	Item = require('./item/base');

/**
 * @class BUI.Layout.Flow
 * 流布局控件
 * @extends BUI.Layout.Abstract
 * <pre>
 * 	<code>
 * 		var layout = new Flow(),
				control = new BUI.Component.Controller({
				width:600,
				height:500,
				render : '#J_Layout',
				elCls : 'layout-test',
				children : [{
					layout : {
						width : 100,
						height:100
					},
					xclass : 'controller',
					content : "一"
				},{
					xclass : 'controller',
					layout : {
						width:200,
						height:50
					},
					content : '二'
				},{
					xclass : 'controller',
					layout : {
						width:50,
						height:100
					},
					content : "三"
				},{
					xclass : 'controller',
					layout : {
						width:200,
						height : 200
					},
					content : "四"
				}],
				plugins : [layout]
			});

			control.render();
 * 	</code>
 * </pre>
 */
var Flow = function(config){
	Flow.superclass.constructor.call(this,config)
};

Flow.ATTRS = {
	itemConstructor : {
		value : Item
	},
	itemTpl : {
		value : '<div class="x-layout-item-flow pull-left"></div>'
	}
};

BUI.extend(Flow,Abstract);

module.exports = Flow;
