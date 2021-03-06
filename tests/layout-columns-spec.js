
var Columns = require('../src/columns'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  $ = require('jquery');

require("http://g.tbcdn.cn/fi/bui/css/layout-min.css");

$('<div id="J_Layout"></div>').appendTo('body');

	var layout = new Columns({
		columns : 4
	}),
		control = new BUI.Component.Controller({
		width:800,
		height:500,
		render : '#J_Layout',
		elCls : 'layout-test',
		defaultChildClass : 'controller',
		children : [
			{
				
				content : '1'
			},{
				id : '2',
				content : '2'
			},{
				
				content : '3'
			},{
				
				content : '4'
			},

			{
				content : '5'
			},{
				
				content : '6'
			},

			{
				id:'7',
				
				content : '7'
			},{
				layout : {
					col : 2 //从0开始
				},
				id : '8',
				content : '8 列 3'
			},
			{
				content : '9'
			}

		],
		plugins : [layout]
	});

	control.render();
	var el = control.get('el');

	describe('测试初始化',function(){
		var children = el.find('.x-layout-column');
		it('测试生成布局项',function(){
			expect(children.length).to.be(4);
			expect(el.find('.x-layout-item-column').length).to.be(control.get('children').length);
		});
	});

	describe('操作',function(){
		it('删除',function(){
			var count = layout.getItems().length,
				child = control.getChild('8');
			child.remove();
			expect(layout.getItems().length).to.be(count -1);
		});
		it('移动',function(){
			var child = control.getChild('2'),
				preContainer,
				item = layout.getItem(child);
			layout.moveItem(item,3); //移动到第4列
			expect(item.get('container')).not.to.be(preContainer);
			expect(item.get('el').parent()[0]).to.be(item.get('container')[0]);
		});
		it('改变容器宽度',function(){
			var item = layout.getItems()[0],
				preWidth = item.get('el').width();
			control.set('width',600);
			expect(preWidth).not.to.be(item.get('el').width());
		});
	});

