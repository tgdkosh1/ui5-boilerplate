/**
 * View - Home
 * --------------------
 * This is the home view
 *
 */
sap.ui.jsview( 'view.home', {

    getControllerName: function(){
        return 'view.home';
    },

    /**
     * Defines the content of the view
     * @param oController
     */
    createContent: function( oController ){
        // Create simple text view
        var oTextView = new sap.ui.commons.TextView();

        oTextView.setText( 'Hello world' );

        return oTextView;
    }
} );