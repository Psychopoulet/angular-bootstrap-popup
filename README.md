angular-bootstrap-popup
=========

Created to easily use bootstrap's modal's functions instead of native javascript's functions like alert or prompt.

Usage :
==========

	<script type="text/javascript" src="/libs/angular.js"></script>
	<script type="text/javascript" src="/libs/angular-bootstrap-popup.js"></script>
	
	<script type="text/javascript">
	
		var app = angular.module('myApp', ['ngBootstrapPopup']);
		
		app.controller('ControllerTest', ['$popup', function($popup) {
		
			"use strict";

			$popup.prompt('', $popup.alert);

			$popup.confirm('Confirm ?', '', function() {
				$popup.alert('yes');
			}, function() {
				$popup.alert('no');
			});

			$popup.iframe('https://www.youtube.com/embed/zIA0kaGFIhQ');
			$popup.sound('https://test.fr/test.mp3');

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