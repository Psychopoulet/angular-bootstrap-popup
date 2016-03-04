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

			this.create = function (params) {

				var clModal, clDialog, clContent, clHeader, clBody, clFooter;

				params = (params) ? params : {};

				if ('string' === typeof params.type) {

					switch(params.type) {

						case 'danger':
							params.backgroundColor = '#f2dede';
							params.borderColor = '#ebccd1';
							params.textColor = '#a94442';
						break;

						case 'warning':
							params.backgroundColor = '#fcf8e3';
							params.borderColor = '#faebcc';
							params.textColor = '#8a6d3b';
						break;

						case 'info':
							params.backgroundColor = '#d9edf7';
							params.borderColor = '#bce8f1';
							params.textColor = '#31708f';
						break;

						case 'success':
							params.backgroundColor = '#dff0d8';
							params.borderColor = '#d6e9c6';
							params.textColor = '#3c763d';
						break;

					}

				}

				clModal = jQuery('<div class="modal angular-bootstrap-popup fade text-left"></div>');

					clDialog = jQuery('<div class="modal-dialog modal-' + ((params.size && 'large' === params.size) ? 'lg' : 'sm') + '"></div>');

						clContent = jQuery('<form action="#" class="modal-content"></form>');

						if (params.borderColor) {
							clContent.css('border-color', params.borderColor);
						}

							clContent.on('submit', function() {

								if ('function' === typeof params.onsubmit) {
									params.onsubmit();
								}

								return false;

							});

							clHeader = jQuery('<div class="modal-header"><h4 class="modal-title"></h4></div>');

								if (params.backgroundColor) {
									clHeader.css('background-color', params.backgroundColor);
								}
								if (params.borderColor) {
									clHeader.css('border-color', params.borderColor);
								}
								if (params.textColor) {
									clHeader.css('color', params.textColor);
								}

								if (params.title && params.title.length) {

									if (1 === params.title.length) {
										clHeader.text(params.title.toUpperCase());
									}
									else {
										clHeader.text(params.title.charAt(0).toUpperCase() + params.title.slice(1));
									}

								}
								else if (params.title_html) {
									clHeader.html(params.title_html);
								}
								else {
									clHeader.text(that.lng.titles.alert);
								}

							clContent.append(clHeader);

							clBody = jQuery('<div class="modal-body"></div>');

								if (params.content && 0 < params.content.length) {

									if (1 === params.content.length) {
										clBody.text(params.content.toUpperCase());
									}
									else {
										clBody.text(params.content.charAt(0).toUpperCase() + params.content.slice(1));
									}

								}
								else if (params.contentHTML) {
									clBody.html(params.contentHTML);
								}
								else {
									clBody.text(that.lng.titles.alert);
								}

							clContent.append(clBody);

								if (params.buttons && 0 < params.buttons.length) {

									clFooter = jQuery('<div class="modal-footer"></div>');

									if (params.borderColor) {
										clFooter.css('border-color', params.borderColor);
									}

									angular.forEach(params.buttons, function(stButton) {

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

				return clModal.appendTo('body').modal({
					keyboard: ('boolean' === typeof params.keyboard) ? params.keyboard: false,
					backdrop: ('boolean' === typeof params.backdrop || ('string' === typeof params.backdrop && 'static' === params.backdrop)) ? params.backdrop : 'static',
					show: true
				})
				.on('shown.bs.modal', function () {

					if ('function' === typeof interact && ('boolean' === typeof params.draggable && params.draggable)) {

						var transition, opacity, draggable = false;

						clHeader.css('cursor', 'move');

						if ( // WTF IE ??
							0 <= window.navigator.userAgent.indexOf('MSIE ') ||
							0 <= window.navigator.userAgent.indexOf('Trident/') ||
							0 <= window.navigator.userAgent.indexOf('Edge/')
						) {
							clHeader.on('mouseenter', function() { draggable = true; });
						}
						else {
							clHeader.on('mousedown', function() { draggable = true; });
						}

						interact(clDialog[0]).draggable({
							max: 1,
							restrict: {
								restriction: "parent",
								elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
							},
							autoScroll: true,
							onmove: function (e) {

								if (draggable) {
									
									var x = (parseFloat(e.target.dataset.x) || 0) + e.dx,
										y = (parseFloat(e.target.dataset.y) || 0) + e.dy;

									e.target.style.webkitTransform = e.target.style.msTransform = e.target.style.transform = 'translate3D(' + x + 'px, ' + y + 'px, 0)';

									e.target.dataset.x = x;
									e.target.dataset.y = y;

								}
							
							},
							onstart: function (e) {

								transition = e.target.style.transition;
								opacity = e.target.style.opacity;

								if (draggable) {

									e.target.style.transition = '0s';
									e.target.style.opacity = '0.4';

								}
							
							},
							onend: function (e) {

								draggable = false;

								e.target.style.transition = transition;
								e.target.style.opacity = opacity;

                                transition = opacity = null;
                                delete e.target.dataset.x;
                                delete e.target.dataset.y;

							}
						});

					}

					if ('function' === typeof interact && ('boolean' === typeof params.resizable && params.resizable)) {

						interact(clDialog[0]).resizable({
							max: 1,
							restrict: {
								restriction: "parent",
								elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
							},
							preserveAspectRatio: false,
							edges: { left: true, right: true, bottom: false, top: false },
							invert: 'reposition',
							onmove: function (e) {

								e.target.style.width  = e.rect.width + 'px';
								e.target.style.height = e.rect.height + 'px';

							},
							onstart: function (e) {

								transition = e.target.style.transition;
								opacity = e.target.style.opacity;

								e.target.style.transition = '0s';
								e.target.style.opacity = '0.4';

							},
							onend: function (e) {

								e.target.style.transition = transition;
								e.target.style.opacity = opacity;

								transition = opacity = null;

							}
						});

					}

					if ('function' === typeof params.shown) {
						params.shown();
					}
					else {
						clContent.find('button[type=submit]').focus();
					}

				})
				.on('hidden.bs.modal', function () {

					clModal.remove(); clModal = null;

					if ('boolean' === typeof params.draggable && params.draggable) { // WTF interactjs ??
						jQuery('html').css('cursor', '');
					}
					
				});

			};

			this.alert = function (params) {

				params = ('string' === typeof params) ? { message : params } : params;

				return that.create({

					// style & data
					contentHTML: ('undefined' !== typeof params.message) ? params.message : '',
					title: ('string' === typeof params.title) ? params.title : that.lng.titles.alert,
					buttons: [ {
						submit : true,
						text : that.lng.buttons.ok,
						click : 'close'
					} ],
					type: ('undefined' !== typeof params.type) ? params.type : null,
					backdrop: ('undefined' !== typeof params.backdrop) ? params.backdrop : null,

					// close
					onsubmit: ('function' === typeof params.onclose) ? params.onclose : null,
					keyboard: ('undefined' !== typeof params.keyboard) ? params.keyboard : null,

					// events
					draggable: ('undefined' !== typeof params.draggable) ? params.draggable : null,
					resizable: ('undefined' !== typeof params.resizable) ? params.resizable : null

				});

			};

			this.confirm = function (params) {

				return that.create({

					// style & data
					contentHTML: ('undefined' !== typeof params.message) ? params.message : '',
					title: ('string' === typeof params.title) ? params.title : that.lng.titles.confirm,
					buttons: [
						{
							cls : 'btn-primary',
							text : that.lng.buttons.yes,
							click : ('function' === typeof params.onyes) ? [ 'close', params.onyes ] : 'close'
						},
						{
							submit : true,
							text : that.lng.buttons.no,
							click : 'close'
						}
					],
					type: ('undefined' !== typeof params.type) ? params.type : null,
					backdrop: ('undefined' !== typeof params.backdrop) ? params.backdrop : null,

					// close
					onsubmit: ('function' === typeof params.onno) ? params.onno : null,
					keyboard: ('undefined' !== typeof params.keyboard) ? params.keyboard : null,

					// events
					draggable: ('undefined' !== typeof params.draggable) ? params.draggable : null,
					resizable: ('undefined' !== typeof params.resizable) ? params.resizable : null

				});

			};

			this.prompt = function (params) {

				++m_nCountPrompt;

				var sId = 'idPopupFormPrompt' + m_nCountPrompt;

				return that.create({

					// style & data
					contentHTML: '<div class="form-group">' +
									(('string' === typeof params.label) ? '<label for="' + sId + '">' + params.label + '</label>' : '') +
									'<input id="' + sId + '" type="text" class="form-control"' + (('string' === typeof params.val) ? ' value="' + params.val + '"' : '') + (('string' === typeof params.placeholder) ? ' placeholder="' + params.placeholder + '"' : '') + ' />' +
								'</div>',
					title: ('string' === typeof params.title) ? params.title : that.lng.titles.prompt,
					buttons: [
						{
							submit : true,
							cls : 'btn-primary',
							text : that.lng.buttons.ok,
							click : 'close'
						},
						{
							text : that.lng.buttons.close,
							click : ('function' === typeof params.onabort) ? [ params.onabort, 'close' ] : 'close'
						}
					],
					type: ('undefined' !== typeof params.type) ? params.type : null,
					backdrop: ('undefined' !== typeof params.backdrop) ? params.backdrop : null,

					// close
					onsubmit: ('function' === typeof params.onconfirm) ? function() { params.onconfirm(jQuery('#' + sId).val()); } : null,
					keyboard: ('undefined' !== typeof params.keyboard) ? params.keyboard : null,

					// events
					draggable: ('undefined' !== typeof params.draggable) ? params.draggable : null,
					resizable: ('undefined' !== typeof params.resizable) ? params.resizable : null,
					shown: function () { jQuery('#' + sId).focus().val(jQuery('#' + sId).val()); }

				});

			};

			this.iframe = function (params) {

				var documentTitle = document.title;

				function _close() {
					document.title = documentTitle;
				}

				params = ('string' === typeof params) ? { url : params } : params;

				if ('string' !== typeof params.url) {
					return that.alert(that.lng.errors.url);
				}
				else {

					document.title = ('string' === typeof params.title) ? jQuery(params.title).text() : that.lng.titles.preview;

					return that.create({

						// style & data
						contentHTML: '<div class="embed-responsive embed-responsive-16by9">' +
										'<iframe class="embed-responsive-item" src="' + params.url + '" frameborder="0" allowfullscreen></iframe>' +
									'</div>',
						title: ('string' === typeof params.title) ? params.title : that.lng.titles.preview,
						size: ('string' === typeof params.size) ? params.size : 'large',
						buttons : [ {
							submit : true,
							text : that.lng.buttons.close,
							click : 'close'
						} ],
						type: ('undefined' !== typeof params.type) ? params.type : null,
						backdrop: ('undefined' !== typeof params.backdrop) ? params.backdrop : null,

						// close
						onsubmit: ('function' === typeof params.onclose) ? function() { _close(); params.onclose(); } : _close,
						keyboard: ('undefined' !== typeof params.keyboard) ? params.keyboard : null,

						// events
						draggable: ('undefined' !== typeof params.draggable) ? params.draggable : null,
						resizable: ('undefined' !== typeof params.resizable) ? params.resizable : null

					});

				}

			};

			this.sound = function (params) {

				var documentTitle = document.title;

				function _close() {
					document.title = documentTitle;
				}

				params = ('string' === typeof params) ? { sources : [ params ] } : params;

				if (!params.sources) {
					return that.alert(that.lng.errors.sources);
				}
				else {

					var contentHTML, popup;

					document.title = ('string' === typeof params.title) ? jQuery(params.title).text() : that.lng.titles.sound;

					contentHTML = '<div class="row"><audio class="col-xs-12" controls>' + that.lng.errors.audio;

						angular.forEach((params.sources) ? ('string' === typeof params.sources) ? [ params.sources ] : params.sources : [], function(source) {

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

						// style & data
						contentHTML: contentHTML,
						title: document.title,
						size: 'small',
						buttons: [ {
							submit : true,
							text : that.lng.buttons.close,
							click : 'close'
						} ],
						type: ('undefined' !== typeof params.type) ? params.type : null,
						backdrop: ('undefined' !== typeof params.backdrop) ? params.backdrop : null,

						// close
						onsubmit: ('function' === typeof params.onclose) ? function() { _close(); params.onclose(); } : _close,
						keyboard: ('undefined' !== typeof params.keyboard) ? params.keyboard : null,

						// events
						draggable: ('undefined' !== typeof params.draggable) ? params.draggable : null,
						resizable: ('undefined' !== typeof params.resizable) ? params.resizable : null

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
