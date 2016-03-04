# angular-bootstrap-popup

Created to easily use bootstrap's modal's functions instead of native javascript's functions like alert or prompt.

## Usage

    <script type="text/javascript" src="/libs/angular.js"></script>
    <script type="text/javascript" src="/libs/angular-bootstrap-popup.min.js"></script>

    <script type="text/javascript">

        "use strict";

        angular.module('myApp', ['ngBootstrapPopup'])
        .controller('ControllerTest', ['$popup', function($popup) {

            // notes for each function :
            //   - you can add 'size' property ('large', 'small') ('small' by default, exept for iframe)
            //   - you can add 'backdrop' bootstrap property ('static' by default)
            //   - you can add 'keyboard' bootstrap property (false by default)
            //   - you can add 'type' property to define a bootstrap style ('info', 'success', 'warning', or 'danger')
            //   - if 'interactjs' library is loaded, you can add :
            //      * 'draggable' property (false by default)
            //      * 'resizable' property (false by default)

            $popup.alert('test'); // use this way to a basic usage

            $popup.alert({
                title : 'Title', // optional, default if not setted
                message : 'test',
                onclose : function() { } // optional
            });

            $popup.prompt({
                title : 'Title', // optional, default if not setted
                label : 'A label', // optional, not created if not setted
                val : 'A value', // optional
                placeholder : 'A placeholder', // optional
                onconfirm : $popup.alert, // optional
                onabort : function() {} // optional
            });

            $popup.confirm({
                title : 'Title', // optional, default if not setted
                message : 'Confirm ?',
                onyes : function() { // optional
                    
                    $popup.alert({
                        title : 'Title',
                        type : 'success',
                        message : 'Success',
                        onclose : function() { } // optional
                    });

                },
                onno : function() { // optional
                    
                    $popup.alert({
                        title : 'Title',
                        type : 'danger',
                        message : 'Fail',
                        onclose : function() { } // optional
                    });

                }
            });

            $popup.iframe('https://www.youtube.com/embed/zIA0kaGFIhQ'); // use this way to a basic usage

            $popup.iframe({
                title : 'Title', // optional, default if not setted
                url : 'https://www.youtube.com/embed/zIA0kaGFIhQ',
                onclose : function() { } // optional
            });

            $popup.sound('https://test.fr/test.mp3'); // use this way to a basic usage

            $popup.sound({
                sources : [ 'https://test.fr/test.mp3', 'https://test.fr/test.mpeg' ]
            });

            $popup.sound({
                sources : [
                    { url : 'https://test.fr/test.mp3', 'type' : 'mp3' },
                    { url : 'https://test.fr/test.mpeg', 'type' : 'mpeg' }
                ]
            });

            $popup.closeAll();

    }]);

    </script>

## Translation

    <div class="hidden" data-popup-translate

        data-title-alert="Informations"
        data-title-confirm="Confirmation"
        data-title-prompt="Saisie"
        data-title-preview="Prévisualisation"
        data-title-sound="Son"

        data-button-ok="Ok"
        data-button-close="Fermer"
        data-button-no="Non"
        data-button-yes="Oui"

    ></div>