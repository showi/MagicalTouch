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
		
		this.add_screen("GameScreen", width, height);
	
		/* Create our renderers */
		this.add_renderer('GameScreen', this.Screens.get('GameScreen'), null, width, height);
		this.get_renderer("GameScreen").set_mouse(this.get_mouse());
		
		
		this.Grid = new GeTreeNode_Grid(this, 4, 3, 10, 16, "levels/0/maps/0-0-shadow.png");
		this.SG.add_child(this.Grid);
		
		this.load_ressources();
		
		this.ImageReady = new GeWaitLoading(parent, this.Screens.get('GameScreen'), this.Images);

		this.SG.preload_ressources();
		
		this.start();
	},
	
	load_ressources: function() {
			/* Testing sprite */
		var sprite_set = new GeSpriteSet("sprites/charsets_12.png", 16, 16);
		sprite_set.preload_ressources(this.Images);
		var s = sprite_set.set_sprite("warrior", 16, 180);
		s.set_animation("walk_up"    , 0, 3);
		s.set_animation("walk_right" , 1, 3);
		s.set_animation("walk_down", 2, 3);
		s.set_animation("walk_left"   , 3, 3);
		
		for (var i = 0; i < 0; i++) {
			var b = new MtBlob();
			this.SG.add_child(b);
		
		}
		
		this.Player = new MtPlayer();
		this.Player.position.set(16,16);
		this.SG.add_child(this.Player);
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
	
	loop: function($super) {
		this.Msg = "Keyscan<br>-----&nbsp;---&nbsp;-----<br>";
		var that = this;
		this.get_keyboard().scan(function(key) {
				if (key.is_complete()) {
					ShoGE.w(key.get_string());
					key.reset();
				}
		});
		/*this.Mouse.clicks.each(function(c) {
				var m = new GeTreeNode_Monster(null);
				m.phys.pos = c;
				that.Grid.add(m);	
				that.numMonster++;
		});*/
		this.Mouse.reset_click();

		$super();
	}

});	
