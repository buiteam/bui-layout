
var Accordion = require('../src/accordion'),
	expect = require('expect.js'),
	sinon = require('sinon'),
	$ = require('jquery');

require("http://g.tbcdn.cn/fi/bui/css/layout-min.css");

$('<div id="J_Layout"></div>').appendTo('body');

	var layout = new Accordion(),
		control = new BUI.Component.Controller({
		width:600,
		height:500,
		render : '#J_Layout',
		elCls : 'layout-test',
		children : [{
			layout : {
				title : '标签一',
				fit : 'both'
			},
			xclass : 'controller',
			content : "一"
		},{
			xclass : 'controller',
			layout : {
				title : '标签二'
			},
			content : '二'
		},{
			xclass : 'controller',
			layout : {
				title : '标签三'
			},
			content : "三"
		},{
			xclass : 'controller',
			layout : {
				title : '标签四'
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
		it('测试默认展开',function(){
			var items = layout.getItems();
			BUI.each(items,function(item,index){
				if(index == 0){
					expect(item.get('collapsed')).to.be(false);
				}else{
					expect(item.get('collapsed')).to.be(true);
					expect(item.get('el').hasClass('x-collapsed')).to.be(true);
				}
			});
		});

		it('测试自适应',function(){
			var item = layout.getItems()[0],
				el = item.get('el'),
				innerControl = item.get('control');
			expect(innerControl.get('width')).to.be(el.width());
			expect(innerControl.get('height')).to.be(el.find('.x-accordion-body').height());

		});
		
	});

	describe('操作',function(){

		it('更改展开',function(done){
			setTimeout(function(){
				var item = layout.getActivedItem(),
					nextItem = layout.getNextItem(item);
				layout.expandItem(nextItem);
				setTimeout(function(){
					expect(item.get('collapsed')).to.be(true);
					expect(nextItem.get('collapsed')).to.be(false);
					done();
				},600);
			},400);
			

		});

		it('添加',function(){
			var item = layout.getActivedItem(),
				height = item.get('el').height();
			control.addChild({
				content : '新增项',
				id : 'new',
				xclass : 'controller',
				layout : {
					title : '新增项'
				}
			});
			expect(item.get('el').height()).not.to.be(height);
		});

		it('删除',function(){
			var delItem = control.getChild('new');

			var item = layout.getActivedItem(),
				height = item.get('el').height();

			delItem.remove();
			expect(item.get('el').height()).not.to.be(height);

		});

		it('高度变化',function(){
			var item = layout.getActivedItem(),
				height = item.get('el').height();

			control.set('height',400);
			expect(item.get('el').height()).not.to.be(height);
		});

	});

