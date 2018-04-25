/*global google Handlebars*/
/* app.js
 * 这是我们的RSS订阅阅读器应用。它使用Google Feed Reader API 将
 * RSS源转换成我们能够利用的JSON对象。它还使用了Handlebars模板库和Jquery.
 *
 */
//所有的名字和链接都是真实可用的
var allFeeds = [
	{
		name:'优达学城 Blog',
		url:'http://blog.udacity.com/feed'
		
	},{
		name:'腾讯CDC',
		url:'http://cdc.tencent.com/feed/'
	},{
		name:'Matrix67(数学爱好者)',
		url:'http://www.matrix67.com/blog/feed'
	},{
		name:'TechCrunch中国',
		url:'http://techcrunch.cn/feed/'
	}
];

/* 这个函数负责启动我们的应用，Google Feed Reader API会被
 * 异步加载，然后调用这个方法。
 */
function init() {
	//加载我们定义的第一个源
	loadFeed(0);
}
/* 这个函数用Google Feed Reader API加载RSS源。然后做一些
 * DOM操作使源的内容被展示在页面上。每个源都可以通过他们在
 * allFeeds数组里面的位置引用。这个函数还支持一个回调函数作为
 * 第二个参数，这个回调函数会在所有事情都成功完成之后被调用。
*/
function loadFeed(id,cb) {
	var feedUrl=allFeeds[id].url,
		feedName=allFeeds[id].name;
	$.ajax({
		type:'POST',
		url:'https://rsstojson.udacity.com/parseFeed',
		data:JSON.stringify({url:feedUrl}),
		contentType:'application/json',
		success:function(result) {
			var container=$('.feed'),
				title=$('.header-title'),
				entries=result.feed.entries,
				entryTemplate=Handlebars.compile($('.tpl-entry').html());
			title.html(feedName); //设置标题文本
			container.empty(); //清空所有之前的条目
			entries.forEach(function(entry) {
				container.append(entryTemplate(entry));
			});
			if(cb) {
				cb();
			}

		},
		error:function() {
			//因为出现错误，不再尝试解析结果，只运行回调函数
			if(cb) {
				cb();
			}
		},
		dataType:'json'
	});
}
google.setOnLoadCallback(init);

/* 所有的这些功能都严重依赖DOM。所以把我们的代码放在$函数里面以保证在
 * DOM构建完毕之前它不会被执行。
 */
$(function(){
	var feedList=$('.feed-list'),
		feedItemTemplate=Handlebars.compile($('.tpl-feed-list-item').html()),
		feedId=0,
		menuIcon=$('.menu-icon-link');
	/* 遍历我们所有的源，给每个源添加一个基于位置索引的ID.然后用
	 * feedItemTemplate(上面用Handlebars创建的)来解析那个源，
	 * 然后添加到菜单里面的现有源列表。
	 */
	allFeeds.forEach(function(feed){
		feed.id=feedId;
		feedList.append(feedItemTemplate(feed));
		feedId++;
	});
	/* 当我们的源列表中的一个链接被点击的时候，隐藏菜单，
	 * 加载该源，阻止链接的默认点击行为发生。
	 */
	feedList.on('click','a',function() {
		var item=$(this);
		$('body').addClass('menu-hidden');
		loadFeed(item.data('id'));
		return false;
	});
	/* 当菜单图标被点击的时候，需要在body元素上切换一个类名
	 * 来实现菜单的显示状态的切换。
	*/
	menuIcon.on('click',function(){
		$('body').toggleClass('menu-hidden');
	});
}());