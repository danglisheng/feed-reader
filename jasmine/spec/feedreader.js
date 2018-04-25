/* feedreader.js
 * 这是Jasmine将读取的spec文件，它
 * 包含将运行在你的应用上的所有测试。
 */

/* 因为有些测试可能需要DOM元素，所以我们把
 * 所有测试都放在$()函数里。我们要确保
 * 直到DOM就绪以后，才开始运行测试。
 */
$(function(){
	/* 把超时时间设为30s */
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
	/* 这是我们的首个测试套件————一个测试套件只包含
	 * 一个相关的测试集。这个测试套件是关于RSS消息定义，
	 * 即我们应用中的allFeeds变量。
	 */
	describe('RSS Feeds',function() {
	/* 这是我们的首个测试————它的目的是确保变量allFeeds已被定义，
	 * 且它的值非空。
	 */
		it('are defined',function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/* TODO:
		 * 编写一个测试遍历allFeeds对象里面的所有的源来保证有链接字段而且链接不是空的。
		 */
		it('contains url field',function(){
			allFeeds.forEach(function(feed){
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toEqual(null);
				expect(feed.url).not.toEqual('');
			});
		});
		/* TODO:
    * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
    */
		it('contains name field',function(){
			allFeeds.forEach(function(feed){
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toEqual(null);
				expect(feed.name).not.toEqual('');
			});
		});

	}); 

	/* TODO: 写一个叫做 "The menu" 的测试套件 */
	describe('The menu',function() {
		/* TODO:
    * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
    * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
    */
		var $body=$('body');
		var $menuIcon=$('.menu-icon-link');
		it('hides the menu by default',function() {
			expect($body.hasClass('menu-hidden')).toBe(true);
		});
		/* TODO:
    * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
    * 测试应该包含两个 expectation ： 当点击图标的时候菜单是否显示，
    * 再次点击的时候是否隐藏。
    */
		it('toggles while being clicked',function(){
			$menuIcon.trigger('click');
			expect($body.hasClass('menu-hidden')).toBe(false);
			$menuIcon.trigger('click');
			expect($body.hasClass('menu-hidden')).toBe(true);
		});

	});
	/* TODO: 写一个新的测试套件，命名为“Initial Entries” */
	describe('Initial Entries',function() {
		/* TODO: 写一个测试用例，保证当loadFeed被调用，
		* 且执行完毕，在.feed容器中至少有一个.entry元素。
		* 记住，loadFeed()是异步的，所以这一测试将用到
		* Jasmine的beforeEach和异步的done()函数。
		*/
		beforeEach(function(done) {
			loadFeed(2,function(){
				done();
			});
		});
		it('should has a single .entry at least',function(done){
			expect($('.entry').length).not.toBe(0);
			done();
		});
	});
	/* TODO:写一个新的测试套件，将其命名为“New Feed Selection” */
	describe('New Feed Selection',function() {
		/* TODO:
    * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
    * 记住，loadFeed() 函数是异步的。
    */
		var originalEntry,updatedEntry;
		//该函数用来获取除零以外的随机函数索引
		function getRdmSrcIdx() {
			return  (1+Math.floor(Math.random()*(allFeeds.length-1)));
		}
		beforeEach(function(done){
			loadFeed(0,function() {
				originalEntry=$('.entry')[0].innerHTML;
				loadFeed(getRdmSrcIdx(),function() {
					updatedEntry=$('.entry')[0].innerHTML;
					done();
				});

			});
		});
		
		it('will show new feed while use loadFeed to load a new source',function(done) {
			expect(updatedEntry).not.toEqual(originalEntry);
			done();
		});
	});
	
	
}());