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

				if (p_stPopupOptions.type) {

					switch(p_stPopupOptions.type) {

						case 'danger':
							p_stPopupOptions.backgroundColor = '#f2dede';
							p_stPopupOptions.borderColor = '#ebccd1';
							p_stPopupOptions.textColor = '#a94442';
						break;

						case 'warning':
							p_stPopupOptions.backgroundColor = '#fcf8e3';
							p_stPopupOptions.borderColor = '#faebcc';
							p_stPopupOptions.textColor = '#8a6d3b';
						break;

						case 'info':
							p_stPopupOptions.backgroundColor = '#d9edf7';
							p_stPopupOptions.borderColor = '#bce8f1';
							p_stPopupOptions.textColor = '#31708f';
						break;

						case 'success':
							p_stPopupOptions.backgroundColor = '#dff0d8';
							p_stPopupOptions.borderColor = '#d6e9c6';
							p_stPopupOptions.textColor = '#3c763d';
						break;

					}

				}

				clModal = jQuery('<div class="modal angular-bootstrap-popup fade text-left"></div>');

					clDialog = jQuery('<div class="modal-dialog modal-' + ((p_stPopupOptions.size && 'large' === p_stPopupOptions.size) ? 'lg' : 'sm') + ' modal-vertical-centered"></div>');

						clContent = jQuery('<form action="#" class="modal-content"></form>');

						if (p_stPopupOptions.borderColor) {
							clContent.css('border-color', p_stPopupOptions.borderColor);
						}

							clContent.on('submit', function() {

								if ('function' === typeof p_stPopupOptions.onsubmit) {
									p_stPopupOptions.onsubmit();
								}

								return false;

							});

							clHeader = jQuery('<div class="modal-header"><h4 class="modal-title"></h4></div>');

								if (p_stPopupOptions.backgroundColor) {
									clHeader.css('background-color', p_stPopupOptions.backgroundColor);
								}
								if (p_stPopupOptions.borderColor) {
									clHeader.css('border-color', p_stPopupOptions.borderColor);
								}
								if (p_stPopupOptions.textColor) {
									clHeader.css('color', p_stPopupOptions.textColor);
								}

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

									if (p_stPopupOptions.borderColor) {
										clFooter.css('border-color', p_stPopupOptions.borderColor);
									}

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

			this.alert = function (data) {

				data = ('string' === typeof data) ? { message : data } : data;

				return that.create({
					contentHTML: ('string' === typeof data.message) ? data.message : '',
					title: ('string' === typeof data.title) ? data.title : that.lng.titles.alert,
					buttons: [ {
						submit : true,
						text : that.lng.buttons.ok,
						click : 'close'
					} ],
					type: ('string' === typeof data.type) ? data.type : null,
					onsubmit: ('function' === typeof data.onclose) ? data.onclose : null
				}, {
					backdrop : 'static',
					keyboard : true
				});

			};

			this.confirm = function (data) {

				return that.create({
					contentHTML: ('string' === typeof data.message) ? data.message : '',
					title: ('string' === typeof data.title) ? data.title : that.lng.titles.confirm,
					buttons: [
						{
							cls : 'btn-primary',
							text : that.lng.buttons.yes,
							click : ('function' === typeof data.onyes) ? [ 'close', data.onyes ] : 'close'
						},
						{
							submit : true,
							text : that.lng.buttons.no,
							click : 'close'
						}
					],
					type: ('string' === typeof data.type) ? data.type : null,
					onsubmit: ('function' === typeof data.onno) ? data.onno : null
				}, {
					backdrop : 'static',
					keyboard : false
				});

			};

			this.prompt = function (data) {

				++m_nCountPrompt;

				var sId = 'idPopupFormPrompt' + m_nCountPrompt;

				return that.create({
					contentHTML: '<div class="form-group">' +
									(('string' === typeof data.label) ? '<label for="' + sId + '">' + data.label + '</label>' : '') +
									'<input id="' + sId + '" type="text" class="form-control"' + (('string' === typeof data.val) ? ' value="' + data.val + '"' : '') + (('string' === typeof data.placeholder) ? ' placeholder="' + data.placeholder + '"' : '') + ' />' +
								'</div>',
					title: ('string' === typeof data.title) ? data.title : that.lng.titles.prompt,
					buttons: [
						{
							submit : true,
							cls : 'btn-primary',
							text : that.lng.buttons.ok,
							click : 'close'
						},
						{
							text : that.lng.buttons.close,
							click : ('function' === typeof data.onabort) ? [ data.onabort, 'close' ] : 'close'
						}
					],
					onsubmit: ('function' === typeof data.onconfirm) ? function() { data.onconfirm(jQuery('#' + sId).val()); } : null,
					shown: function () { jQuery('#' + sId).focus().val(jQuery('#' + sId).val()); }
				},
				{
					backdrop : 'static',
					keyboard : false
				});

			};

			this.iframe = function (data) {

				data = ('string' === typeof data) ? { url : data } : data;

				if (!data.url) {
					return that.alert(that.lng.errors.url);
				}
				else {

					var documentTitle = document.title;

					function _close() {
						document.title = documentTitle;
					}

					document.title = ('string' === typeof data.title) ? data.title : that.lng.titles.preview;

					return that.create({
						contentHTML: '<div class="embed-responsive embed-responsive-16by9">' +
										'<iframe class="embed-responsive-item" src="' + data.url + '" frameborder="0" allowfullscreen></iframe>' +
									'</div>',
						title: document.title,
						size: ('string' === typeof data.size) ? data.size : 'large',
						buttons : [ {
							submit : true,
							text : that.lng.buttons.close,
							click : 'close'
						} ],
						onsubmit: ('function' === typeof data.onclose) ? function() { _close(); data.onclose(); } : _close
					},
					{
						backdrop : 'static',
						keyboard : true
					});

				}

			};

			this.sound = function (data) {

				data = ('string' === typeof data) ? { sources : [ data ] } : data;

				if (!data.sources) {
					return that.alert(that.lng.errors.sources);
				}
				else {

					var documentTitle = document.title, contentHTML, popup;

					function _close() {
						document.title = documentTitle;
					}

					document.title = ('string' === typeof data.title) ? data.title : that.lng.titles.sound;

					contentHTML = '<div class="row"><audio class="col-xs-12" controls>' + that.lng.errors.audio;

						angular.forEach((data.sources) ? ('string' === typeof data.sources) ? [ data.sources ] : data.sources : [], function(source) {

							if ('string' === typeof source) {
								source = { url : source, type : '' };
							}

							if ('' === source.type) {
								var t = source.url.split('.');
								source.type = (t.length) ? t[t.length-1] : '';
							}

							if ('' === source.type) {
								contentHTML += '<source src="' + source.url + '"/>';
							}
							else {
								contentHTML += '<source src="' + source.url + '" type="audio/' + source.type + '" />';
							}

						});

					contentHTML += '</audio></div>';

					popup = that.create({
						contentHTML: contentHTML,
						title: document.title,
						size: 'small',
						buttons: [ {
							submit : true,
							text : that.lng.buttons.close,
							click : 'close'
						} ],
						onsubmit: ('function' === typeof data.onclose) ? function() { _close(); data.onclose(); } : _close
					},
					{
						backdrop : 'static',
						keyboard : true
					});

					popup.find('audio')[0].onended = _close;
					popup.find('audio')[0].play();

					return popup;

				}

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