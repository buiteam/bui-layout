
var Flow = require('../src/flow'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  $ = require('jquery');

require("http://g.tbcdn.cn/fi/bui/css/layout-min.css");

$('<div id="J_Layout"></div>').appendTo('body');

	var layout = new Flow(),
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
	var el = control.get('el');

	describe('测试初始化',function(){
		var children = el.children();
		it('测试生成布局项',function(){
			expect(el.children().length).to.be(control.get('children').length);
		});
		
	});

	describe('操作',function(){
		var children = el.children();
		

		it('添加',function(){
			var count = layout.getItems().length;
			control.addChild({
				xclass : 'controller',
				id : 'new',
				layout : {
					width : 200,
					height: 50
				},
				content : '附加内容'
			});

			expect(layout.getItems().length).to.be(count + 1);
			expect(el.find('.x-layout-item-flow').length).to.be(count + 1);

		});
		it('修改',function(){
			var child = control.getChild('new'),
				
				item = layout.getItem(child);
			//child.set('layout',layout);
			expect(item).not.to.be(undefined);
			item.set('height',150);
			item.syncItem();
			
			expect(item.get('el').css('height')).to.be('150px');

		});
		it('删除',function(){
			var count = layout.getItems().length,
				child = control.getChild('new');

			child.remove();

			expect(layout.getItems().length).to.be(count - 1);
			expect(el.find('.x-layout-item-flow').length).to.be(count - 1);
		});

	});

