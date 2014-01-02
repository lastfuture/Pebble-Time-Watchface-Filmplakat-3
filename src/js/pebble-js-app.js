var config = {};

Pebble.addEventListener("ready",
	function( e ) {
		var data = window.localStorage.getItem( "filmplakat2" );
		if( typeof( data ) === 'string' ) {
			config = JSON.parse( data );
			console.log( "Configuration data: ", data );
		}
	}
);

Pebble.addEventListener( "appmessage",
	function( e ) {
		console.log( "Got config data from Pebble" );
		config = e.payload;
	}
);

Pebble.addEventListener( "webviewclosed",
	function( e ) {
		if( typeof e.response === 'string' && ( e.response.length > 0 ) ) {
			config = JSON.parse( e.response );
			console.log( "Update config data: ", e.response );

			window.localStorage.setItem( "filmplakat2", e.response );
			Pebble.sendAppMessage( config );
		}
	}
);

Pebble.addEventListener( "showConfiguration",
	function( e ){
		var uri = 'http://pebble.bitspin.at/config/Filmplakat2/#' + encodeURIComponent( JSON.stringify( config ) );
		var res;

		console.log( "Going to openURL: '" + uri + "'" );
		res = Pebble.openURL( uri );
		console.log( "openURL returned: " + res );
	}
);