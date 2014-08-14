/**
 * Created by tzhhige1 on 14/08/14.
 */


sap.ui.localResources( "view" );
sap.ui.localResources( "util" );

// Launch application
jQuery.sap.declare( 'Application' );
jQuery.sap.require( 'sap.ui.app.Application' );

sap.ui.app.Application.extend( 'Application', {
    init: function(){

    },
    main: function(){

    }
} );


var oApp = new Application( {root: "content"} );