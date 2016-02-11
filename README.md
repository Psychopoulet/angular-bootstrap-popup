angular-bootstrap-popup
=========

Created to easily use bootstrap's modal's functions instead of native javascript's functions like alert or prompt.

Usage :
==========

	<script type="text/javascript" src="/libs/angular.js"></script>
	<script type="text/javascript" src="/libs/angular-bootstrap-popup.min.js"></script>
	
	<script type="text/javascript">
	
		"use strict";

		angular.module('myApp', ['ngBootstrapPopup'])
		.controller('ControllerTest', ['$popup', function($popup) {
		
			$popup.prompt({
				title : 'Title', // optional, default if not setted
				label : 'A label', // optional, not created if not setted
				val : 'A value', // optional
				placeholder : 'A placeholder', // optional
				onconfirm : function(val) { // optional
					$popup.alert(val);
				},
				onabort : function() {} // optional
			});

			$popup.confirm({
				title : 'Title', // optional, default if not setted
				message : 'Confirm ?',
				onyes : function() { // optional
					$popup.alert('yes');
				},
				onno : function() { // optional
					$popup.alert('no');
				}
			});

			$popup.iframe('https://www.youtube.com/embed/zIA0kaGFIhQ');

			$popup.iframe({
				title : 'Title', // optional, default if not setted
				url : 'https://www.youtube.com/embed/zIA0kaGFIhQ',
				onclose : function() { } // optional
			});

			$popup.sound('https://test.fr/test.mp3');

			$popup.sound({
				title : 'Title', // default if not setted
				sources : [ 'https://test.fr/test.mp3', 'https://test.fr/test.mpeg' ],
				onclose : function() { } // optional
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


Translation :
==========

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