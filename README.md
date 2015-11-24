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
		  
		  $popup.preview('https://www.youtube.com/embed/zIA0kaGFIhQ');
		  
		  $popup.closeAll();
		  
	  }]);

	</script>
