angular.module('ngBootstrapPopup', [])

.service('$popup', function() {

	"use strict";

	// attributes

		// private

			var that = this, m_nCountPrompt = 0;

		// public

			this.lng = {
				titles : {
					alert : 'Alert',
					confirm : 'Confirm',
					prompt : 'Prompt',
					preview : 'Preview',
					sound : 'Sound'
				},
				errors : {
					audio : 'Your browser does not support the <code>audio</code> element.',
					url : 'Missing url.'
				},
				buttons : {
					ok : 'Ok',
					close : 'Close',
					no : 'No',
					yes : 'Yes'
				}
			};

	// methodes

		// public

			this.create = function (p_stPopupOptions, p_stModaleOptions) {

				var clModal, clDialog, clContent, clHeader, clBody, clFooter;

				p_stPopupOptions = (p_stPopupOptions) ? p_stPopupOptions : {};
				p_stModaleOptions = (p_stModaleOptions) ? p_stModaleOptions : {};

				clModal = jQuery('<div class="modal angular-bootstrap-popup fade text-left"></div>');

					clDialog = jQuery('<div class="modal-dialog modal-' + ((p_stPopupOptions.size && 'large' === p_stPopupOptions.size) ? 'lg' : 'sm') + ' modal-vertical-centered"></div>');

						clContent = jQuery('<form action="#" class="modal-content"></form>');

							clContent.on('submit', function() {

								if ('function' === typeof p_stPopupOptions.onsubmit) {
									p_stPopupOptions.onsubmit();
								}

								return false;

							});

							clHeader = jQuery('<div class="modal-header"><h4 class="modal-title"></h4></div>');

								if (p_stPopupOptions.title && p_stPopupOptions.title.length) {

									if (1 === p_stPopupOptions.title.length) {
										clHeader.text(p_stPopupOptions.title.toUpperCase());
									}
									else {
										clHeader.text(p_stPopupOptions.title.charAt(0).toUpperCase() + p_stPopupOptions.title.slice(1));
									}

								}
								else if (p_stPopupOptions.title_html) {
									clHeader.html(p_stPopupOptions.title_html);
								}
								else {
									clHeader.text(that.lng.titles.alert);
								}

								// document.title = clHeader.text().replace(/<([^ >]+)[^>]*>.*?<\/\1>|<[^\/]+\/>/ig, '');

							clContent.append(clHeader);

							clBody = jQuery('<div class="modal-body"></div>');

								if (p_stPopupOptions.content && 0 < p_stPopupOptions.content.length) {

									if (1 === p_stPopupOptions.content.length) {
										clBody.text(p_stPopupOptions.content.toUpperCase());
									}
									else {
										clBody.text(p_stPopupOptions.content.charAt(0).toUpperCase() + p_stPopupOptions.content.slice(1));
									}

								}
								else if (p_stPopupOptions.contentHTML) {
									clBody.html(p_stPopupOptions.contentHTML);
								}
								else {
									clBody.text(that.lng.titles.alert);
								}

							clContent.append(clBody);

								if (p_stPopupOptions.buttons && 0 < p_stPopupOptions.buttons.length) {

									clFooter = jQuery('<div class="modal-footer"></div>');

									angular.forEach(p_stPopupOptions.buttons, function(stButton) {

										var clButton = jQuery('<button type="' + ((stButton.submit) ? 'submit' : 'button') + '" class="btn btn-default"></button>');

											if (stButton.cls) {
												clButton.addClass(stButton.cls);
											}

											if (stButton.text) {
												clButton.append(stButton.text);
											}

											if (stButton.click) {

												if (!angular.isArray(stButton.click)) {
													stButton.click = [ stButton.click ];
												}

												clButton.click(function() {

													angular.forEach(stButton.click, function(fClick) {
														
														if ('function' === typeof fClick) {
															fClick();
														}
														else if ('close' === fClick) {
															clModal.modal('hide');
														}

													});

												});

											}

										clFooter.append(clButton);

									});

								}

							clContent.append(clFooter);

						clDialog.append(clContent);

					clModal.append(clDialog);

					p_stModaleOptions.show = true;

				clModal.modal(p_stModaleOptions);

				clModal.on('shown.bs.modal', function () {

					if ('function' === typeof p_stPopupOptions.shown) {
						p_stPopupOptions.shown();
					}
					else {
						clContent.find('button[type=submit]').focus();
					}

				})
				.on('hidden.bs.modal', function () {
					clModal.remove(); clModal = null;
				});

				return clModal;

			};

			this.alert = function (p_sMessage, p_sTitle, p_fOnClose) {

				var params = {};

				if ('object' === typeof p_sMessage) {

					params.contentHTML = ('string' === typeof p_sMessage.message) ? p_sMessage.message : '';
					params.title = ('string' === typeof p_sMessage.title) ? p_sMessage.title : that.lng.titles.alert;
					params.buttons = [
						{
							submit : true,
							text : that.lng.buttons.ok,
							click : 'close'
						}
					];

					params.onsubmit = ('function' === typeof p_sMessage.onclose) ? p_sMessage.onclose : null;

				}
				else {

					params.contentHTML = ('string' === typeof p_sMessage) ? p_sMessage : '';
					params.title = ('string' === typeof p_sTitle) ? p_sTitle : that.lng.titles.alert;
					params.buttons = [
						{
							submit : true,
							text : that.lng.buttons.ok,
							click : 'close'
						}
					];

					params.onsubmit = ('function' === typeof p_fOnClose) ? p_fOnClose : null;

				}

				return that.create(params, { backdrop : 'static', keyboard : true });

			};

			this.confirm = function (p_sMessage, p_sTitle, p_fOnYes, p_fOnNo) {

				var params = {};

				if ('object' === typeof p_sMessage) {

					params.contentHTML = ('string' === typeof p_sMessage.message) ? p_sMessage.message : '';
					params.title = ('string' === typeof p_sMessage.title) ? p_sMessage.title : that.lng.titles.confirm;
					params.buttons = [
						{
							cls : 'btn-primary',
							text : that.lng.buttons.yes,
							click : ('function' === typeof p_sMessage.onyes) ? [ 'close', p_sMessage.onyes ] : 'close'
						},
						{
							submit : true,
							text : that.lng.buttons.no,
							click : 'close'
						}
					];

					params.onsubmit = ('function' === typeof p_sMessage.onno) ? p_sMessage.onno : null;

				}
				else {

					params.contentHTML = ('string' === typeof p_sMessage) ? p_sMessage : '';
					params.title = ('string' === typeof p_sTitle) ? p_sTitle : that.lng.titles.confirm;
					params.buttons = [
						{
							cls : 'btn-primary',
							text : that.lng.buttons.yes,
							click : ('function' === typeof p_fOnYes) ? [ p_fOnYes, 'close' ] : 'close'
						},
						{
							submit : true,
							text : that.lng.buttons.no,
							click : 'close'
						}
					];

					params.onsubmit = ('function' === typeof p_fOnNo) ? p_fOnNo : null;

				}

				return that.create(params, { backdrop : 'static', keyboard : true });

			};

			this.prompt = function (p_sTitle, p_sValue, p_fOnConfirm, p_fOnAbort) {

				++m_nCountPrompt;

				var params = {},
					sId = 'idPopupFormPrompt' + m_nCountPrompt;

				if ('object' === typeof p_sTitle) {

					params.val = ('string' === typeof p_sTitle.val) ? p_sTitle.val : '';
					params.placeholder = ('string' === typeof p_sTitle.placeholder) ? p_sTitle.placeholder : '';

					params.contentHTML = '<input id="' + sId + '" type="text" class="form-control" value="' + p_sTitle.val + '" placeholder="' + params.placeholder + '" />';
					params.title = ('string' === typeof p_sTitle.title) ? p_sTitle.title : that.lng.titles.prompt;
					params.label = ('string' === typeof p_sTitle.label) ? '<label for="' + sId + '">' + p_sTitle.label + '</label>' : '';
					params.buttons = [
						{
							submit : true,
							cls : 'btn-primary',
							text : that.lng.buttons.ok,
							click : 'close'
						},
						{
							text : that.lng.buttons.close,
							click : ('function' === typeof p_sTitle.onabort) ? [ p_sTitle.onabort, 'close' ] : 'close'
						}
					];

					params.onsubmit = ('function' === typeof p_sTitle.onconfirm) ? function() { p_sTitle.onconfirm(jQuery('#' + sId).val()); } : null;

				}
				else {

					params.contentHTML = '<input id="' + sId + '" type="text" class="form-control" value="' + (('string' === typeof p_sValue) ? p_sValue : '') + '" />';
					params.title = ('string' === typeof p_sTitle) ? p_sTitle : that.lng.titles.prompt;
					params.label = '';
					params.buttons = [
						{
							submit : true,
							cls : 'btn-primary',
							text : that.lng.buttons.ok,
							click : 'close'
						},
						{
							text : that.lng.buttons.close,
							click : ('function' === typeof p_fOnAbort) ? [ p_fOnAbort, 'close' ] : 'close'
						}
					];

					params.onsubmit = ('function' === typeof p_fOnConfirm) ? function() { p_fOnConfirm(jQuery('#' + sId).val()); } : null;

				}

				params.contentHTML = '<div class="form-group">' + params.label + params.contentHTML + '</div>';
				params.shown = function () { jQuery('#' + sId).focus().val(jQuery('#' + sId).val()); };

				return that.create(params, { backdrop : 'static', keyboard : true });

			};

			this.iframe = function (p_sUrl, p_sTitle, p_fOnClose) {

				var params = {}, documentTitle = document.title;

					function _close() {
						document.title = documentTitle;
					}

					if ('object' === typeof p_sUrl) {

						params.url = ('string' === typeof p_sUrl.url) ? p_sUrl.url : '';
						params.title = ('string' === typeof p_sUrl.title) ? p_sUrl.title : that.lng.titles.preview;
						params.size = ('string' === typeof p_sUrl.size) ? p_sUrl.size : 'large';
						params.buttons = [
							{
								submit : true,
								text : that.lng.buttons.close,
								click : [ _close, 'close' ]
							}
						];

						params.onsubmit = ('function' === typeof p_sUrl.onclose) ? p_sUrl.onclose : null;

					}
					else {

						params.url = ('string' === typeof p_sUrl) ? p_sUrl : '';
						params.title = ('string' === typeof p_sTitle) ? p_sTitle : that.lng.titles.preview;
						params.size = 'large';
						params.buttons = [
							{
								submit : true,
								text : that.lng.buttons.close,
								click : [ _close, 'close' ]
							}
						];

						params.onsubmit = ('function' === typeof p_fOnClose) ? p_fOnClose : null;

					}

				if ('' === params.url) {
					return that.alert(that.lng.errors.url);
				}
				else {

					document.title = params.title;

					params.contentHTML  = '<div class="embed-responsive embed-responsive-16by9">';
						params.contentHTML += '<iframe class="embed-responsive-item" src="' + params.url + '" frameborder="0" allowfullscreen></iframe>';
					params.contentHTML += '</div>';
	 
					return that.create(params, { backdrop : 'static', keyboard : true });

				}

			};

			this.sound = function (p_sUrl, p_sTitle, p_fOnClose) {

				var params = {}, popup, documentTitle = document.title;

					function _close() {
						document.title = documentTitle;
					}

					if ('object' === typeof p_sUrl) {

						params.sources = (p_sUrl.sources) ? ('string' === typeof p_sUrl.sources) ? [ p_sUrl.sources ] : p_sUrl.sources : [];
						params.title = ('string' === typeof p_sUrl.title) ? p_sUrl.title : that.lng.titles.sound;
						params.size = ('string' === typeof p_sUrl.size) ? p_sUrl.size : 'small';
						params.buttons = [
							{
								submit : true,
								text : that.lng.buttons.close,
								click : [ _close, 'close' ]
							}
						];

						params.onsubmit = ('function' === typeof p_sUrl.onclose) ? p_sUrl.onclose : null;

					}
					else {

						params.sources = ('string' === typeof p_sUrl) ? [ p_sUrl ] : [];
						params.title = ('string' === typeof p_sTitle) ? p_sTitle : that.lng.titles.sound;
						params.size = 'small';
						params.buttons = [
							{
								submit : true,
								text : that.lng.buttons.close,
								click : [ _close, 'close' ]
							}
						];

						params.onsubmit = ('function' === typeof p_fOnClose) ? p_fOnClose : null;

					}

					if ('' === params.url) {
						popup = that.alert(that.lng.errors.url);
					}
					else {

						document.title = params.title;

						params.contentHTML  = '<div class="row">';
							params.contentHTML += '<audio class="col-xs-12" controls>';

								params.contentHTML += that.lng.errors.audio;

								angular.forEach(params.sources, function(source) {

									if ('string' === typeof source) {
										source = { url : source, type : '' };
									}

									if ('' === source.type) {
										var t = source.url.split('.');
										source.type = (t.length) ? t[t.length-1] : '';
									}

									if ('' === source.type) {
										params.contentHTML += '<source src="' + source.url + '"/>';
									}
									else {
										params.contentHTML += '<source src="' + source.url + '" type="audio/' + source.type + '" />';
									}

								});

							params.contentHTML += '</audio>';
						params.contentHTML += '</div>';
	 
						popup = that.create(params, { backdrop : 'static', keyboard : true });

						popup.find('audio')[0].onended = _close;
						popup.find('audio')[0].play();

					}

				return popup;

			};

			this.closeAll = function () {
				jQuery('.modal').modal('hide');
				jQuery('.modal-backdrop').remove();
			};

			this.closeAllPopups = function () {
				jQuery('.angular-bootstrap-popup').modal('hide');
			};

})

.directive('popupTranslate', ['$popup', function($popup) {

	"use strict";

	return {

		scope: {
			titleAlert: '@', titleConfirm: '@', titlePrompt: '@', titlePreview: '@', titleSound: '@',
			buttonOk: '@', buttonClose: '@', buttonNo: '@', buttonYes: '@',
			errorAudio: '@', errorUrl: '@'
		},

		link: function ($scope) {

			if ($scope.titleAlert) {
				$popup.lng.titles.alert = $scope.titleAlert;
			}
			if ($scope.titleConfirm) {
				$popup.lng.titles.confirm = $scope.titleConfirm;
			}
			if ($scope.titlePrompt) {
				$popup.lng.titles.prompt = $scope.titlePrompt;
			}
			if ($scope.titlePreview) {
				$popup.lng.titles.preview = $scope.titlePreview;
			}
			if ($scope.titleSound) {
				$popup.lng.titles.sound = $scope.titleSound;
			}

			if ($scope.buttonOk) {
				$popup.lng.buttons.ok = $scope.buttonOk;
			}
			if ($scope.buttonClose) {
				$popup.lng.buttons.close = $scope.buttonClose;
			}
			if ($scope.buttonNo) {
				$popup.lng.buttons.no = $scope.buttonNo;
			}
			if ($scope.buttonYes) {
				$popup.lng.buttons.yes = $scope.buttonYes;
			}

			if ($scope.errorAudio) {
				$popup.lng.errors.audio = $scope.errorAudio;
			}
			if ($scope.errorUrl) {
				$popup.lng.errors.url = $scope.errorUrl;
			}
			
		}

	};

}]);