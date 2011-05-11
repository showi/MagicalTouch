var MtCore = Class.create(GeCore, {
	
	initialize: function($super, parent) {
		$super(parent);
	},
	
	init: function($super, width, height) 
	{
		$super(width, height);
		this.add_screen("GameScreen", width, height);
		this.set_mouse('GameScreen');
		var k = GeKeys;
		this.set_keyboard('GameScreen').set_keyfilter(
			new Array(k.LEFT, k.UP, k.RIGHT, k.DOWN, k.ESC, k.ENTER, k.SPACE)
		);
		/* Create our image pool */
		//this.Images = new GeMediaPool();
		
		this.add_screen("GameScreen", width, height);
	
		/* Create our renderers */
		//this.Renderers = new Hash();
		this.add_renderer('GameScreen', this.Screens.get('GameScreen'), null, width, height);
		this.get_renderer("GameScreen").set_mouse(this.get_mouse());
		
		//this.Level = new GeLevel(this, 'darks');
		//this.Level.load(0);
		
		this.Grid = new GeTreeNode_Grid(this, 4, 3, 160, 16, "levels/0/maps/0-0-shadow.png");
		this.SG.add_child(this.Grid);
		
		//this.Grid.load(0,0, );
		this.load_ressources();
		
		this.ImageReady = new GeWaitLoading(parent, this.Screens.get('GameScreen'), this.Images);

		this.SG.preload_ressources();
		
		this.start();
	},
	
	init_global_variables: function() 
	{
		ShoGE.Log = new GeLog("GameLog");
		ShoGE.w = function(msg) { ShoGE.Log.w(msg) };
	},

	load_ressources: function() 
	{
	
	},
	
	/* HTML update: Running in separate thread.*/
	html_update: function()
	{
		$('GameFPS').innerHTML = Math.round(this.Renderers.get('GameScreen').get_fps());
		$('GameElapsedTime').innerHTML = Math.round(this.DiscreteTime.t/10)/100 + "&nbsp;s";
		$('GameAlpha').innerHTML = this.DiscreteTime.alpha;
		$('clickatX').innerHTML = this.Mouse.pos.x;
		$('clickatY').innerHTML = this.Mouse.pos.y;
		$('MouseStatus').innerHTML = this.Mouse.status;
		//$('GameMsg').innerHTML = this.Msg;
		if (this.Mouse.status) {
			if (this.Mouse.status == 'down') {
				$('clickDownX').innerHTML = this.Mouse.down.x;
				$('clickDownY').innerHTML = this.Mouse.down.y;
			}
		} else {
			$('clickDownX').innerHTML = 0;
			$('clickDownY').innerHTML = 0;
		}
	},
		
	loop: function($super) 
	{	
		$super();
	},
});	
