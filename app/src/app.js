/**
 * Created by tzhhige1 on 14/08/14.
 */


sap.ui.localResources( "view" );
sap.ui.localResources( "util" );

// Launch application
jQuery.sap.require( "Application" );
var oApp = new Application( {root: "content"} );

jQuery.sap.declare( 'Application' );
jQuery.sap.require( 'sap.ui.app.Application' );

sap.ui.app.Application.extend( 'Application', {
    init: function(){

        // Get home view
        var oView = new sap.ui.jsview( 'view.home', 'view.home' );

        // Place home view
        var root = this.getRoot();
        oView.placeAt( root );

    },
    main: function(){

    }
} );