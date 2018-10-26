/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../unique-id","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var b=a(this).attr("title")||"";return a("<a>").text(b).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(b,c){var d=(b.attr("aria-describedby")||"").split(/\s+/);d.push(c),b.data("ui-tooltip-id",c).attr("aria-describedby",a.trim(d.join(" ")))},_removeDescribedBy:function(b){var c=b.data("ui-tooltip-id"),d=(b.attr("aria-describedby")||"").split(/\s+/),e=a.inArray(c,d);e!==-1&&d.splice(e,1),b.removeData("ui-tooltip-id"),d=a.trim(d.join(" ")),d?b.attr("aria-describedby",d):b.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=a("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=a([])},_setOption:function(b,c){var d=this;this._super(b,c),"content"===b&&a.each(this.tooltips,function(a,b){d._updateContent(b.element)})},_setOptionDisabled:function(a){this[a?"_disable":"_enable"]()},_disable:function(){var b=this;a.each(this.tooltips,function(c,d){var e=a.Event("blur");e.target=e.currentTarget=d.element[0],b.close(e,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var b=a(this);if(b.is("[title]"))return b.data("ui-tooltip-title",b.attr("title")).removeAttr("title")}))},_enable:function(){this.disabledTitles.each(function(){var b=a(this);b.data("ui-tooltip-title")&&b.attr("title",b.data("ui-tooltip-title"))}),this.disabledTitles=a([])},open:function(b){var c=this,d=a(b?b.target:this.element).closest(this.options.items);d.length&&!d.data("ui-tooltip-id")&&(d.attr("title")&&d.data("ui-tooltip-title",d.attr("title")),d.data("ui-tooltip-open",!0),b&&"mouseover"===b.type&&d.parents().each(function(){var b,d=a(this);d.data("ui-tooltip-open")&&(b=a.Event("blur"),b.target=b.currentTarget=this,c.close(b,!0)),d.attr("title")&&(d.uniqueId(),c.parents[this.id]={element:this,title:d.attr("title")},d.attr("title",""))}),this._registerCloseHandlers(b,d),this._updateContent(d,b))},_updateContent:function(a,b){var c,d=this.options.content,e=this,f=b?b.type:null;return"string"==typeof d||d.nodeType||d.jquery?this._open(b,a,d):(c=d.call(a[0],function(c){e._delay(function(){a.data("ui-tooltip-open")&&(b&&(b.type=f),this._open(b,a,c))})}),void(c&&this._open(b,a,c)))},_open:function(b,c,d){function e(a){j.of=a,g.is(":hidden")||g.position(j)}var f,g,h,i,j=a.extend({},this.options.position);if(d){if(f=this._find(c))return void f.tooltip.find(".ui-tooltip-content").html(d);c.is("[title]")&&(b&&"mouseover"===b.type?c.attr("title",""):c.removeAttr("title")),f=this._tooltip(c),g=f.tooltip,this._addDescribedBy(c,g.attr("id")),g.find(".ui-tooltip-content").html(d),this.liveRegion.children().hide(),i=a("<div>").html(g.find(".ui-tooltip-content").html()),i.removeAttr("name").find("[name]").removeAttr("name"),i.removeAttr("id").find("[id]").removeAttr("id"),i.appendTo(this.liveRegion),this.options.track&&b&&/^mouse/.test(b.type)?(this._on(this.document,{mousemove:e}),e(b)):g.position(a.extend({of:c},this.options.position)),g.hide(),this._show(g,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){g.is(":visible")&&(e(j.of),clearInterval(h))},a.fx.interval)),this._trigger("open",b,{tooltip:g})}},_registerCloseHandlers:function(b,c){var d={keyup:function(b){if(b.keyCode===a.ui.keyCode.ESCAPE){var d=a.Event(b);d.currentTarget=c[0],this.close(d,!0)}}};c[0]!==this.element[0]&&(d.remove=function(){this._removeTooltip(this._find(c).tooltip)}),b&&"mouseover"!==b.type||(d.mouseleave="close"),b&&"focusin"!==b.type||(d.focusout="close"),this._on(!0,c,d)},close:function(b){var c,d=this,e=a(b?b.currentTarget:this.element),f=this._find(e);return f?(c=f.tooltip,void(f.closing||(clearInterval(this.delayedShow),e.data("ui-tooltip-title")&&!e.attr("title")&&e.attr("title",e.data("ui-tooltip-title")),this._removeDescribedBy(e),f.hiding=!0,c.stop(!0),this._hide(c,this.options.hide,function(){d._removeTooltip(a(this))}),e.removeData("ui-tooltip-open"),this._off(e,"mouseleave focusout keyup"),e[0]!==this.element[0]&&this._off(e,"remove"),this._off(this.document,"mousemove"),b&&"mouseleave"===b.type&&a.each(this.parents,function(b,c){a(c.element).attr("title",c.title),delete d.parents[b]}),f.closing=!0,this._trigger("close",b,{tooltip:c}),f.hiding||(f.closing=!1)))):void e.removeData("ui-tooltip-open")},_tooltip:function(b){var c=a("<div>").attr("role","tooltip"),d=a("<div>").appendTo(c),e=c.uniqueId().attr("id");return this._addClass(d,"ui-tooltip-content"),this._addClass(c,"ui-tooltip","ui-widget ui-widget-content"),c.appendTo(this._appendTo(b)),this.tooltips[e]={element:b,tooltip:c}},_find:function(a){var b=a.data("ui-tooltip-id");return b?this.tooltips[b]:null},_removeTooltip:function(a){a.remove(),delete this.tooltips[a.attr("id")]},_appendTo:function(a){var b=a.closest(".ui-front, dialog");return b.length||(b=this.document[0].body),b},_destroy:function(){var b=this;a.each(this.tooltips,function(c,d){var e=a.Event("blur"),f=d.element;e.target=e.currentTarget=f[0],b.close(e,!0),a("#"+c).remove(),f.data("ui-tooltip-title")&&(f.attr("title")||f.attr("title",f.data("ui-tooltip-title")),f.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),a.uiBackCompat!==!1&&a.widget("ui.tooltip",a.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var a=this._superApply(arguments);return this.options.tooltipClass&&a.tooltip.addClass(this.options.tooltipClass),a}}),a.ui.tooltip});;
/**
 * @file
 * JavaScript behaviors for element help text (tooltip).
 */

(function ($, Drupal) {

  'use strict';

  // @see http://api.jqueryui.com/tooltip/
  Drupal.webform = Drupal.webform || {};
  Drupal.webform.elementHelpIcon = Drupal.webform.elementHelpIcon || {};
  Drupal.webform.elementHelpIcon.options = Drupal.webform.elementHelpIcon.options || {
    position: { my: "left+5 top+5", at: "left bottom", collision: "flipfit" },
    tooltipClass: 'webform-element-help--tooltip',
    // @see https://stackoverflow.com/questions/18231315/jquery-ui-tooltip-html-with-links
    show: {delay: 100},
    close: function (event, ui) {
      ui.tooltip.hover(
        function () {
          $(this).stop(true).fadeTo(400, 1);
        },
        function () {
          $(this).fadeOut("400", function () {
            $(this).remove();
          })
        });
    }
  };

  /**
   * Element help icon.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformElementHelpIcon = {
    attach: function (context) {
      $(context).find('.webform-element-help').once('webform-element-help').each(function () {
        var $link = $(this);

        var options = $.extend({}, Drupal.webform.elementHelpIcon.options);
        // Use 'data-webform-help' attribute which can include HTML markup.
        options.content = $(this).attr('data-webform-help');
        $link.tooltip(options).on('click', function (event) {
          event.preventDefault();
        });
      });
    }
  };

})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.fileValidateAutoAttach = {
    attach: function attach(context, settings) {
      var $context = $(context);
      var elements = void 0;

      function initFileValidation(selector) {
        $context.find(selector).once('fileValidate').on('change.fileValidate', { extensions: elements[selector] }, Drupal.file.validateExtension);
      }

      if (settings.file && settings.file.elements) {
        elements = settings.file.elements;
        Object.keys(elements).forEach(initFileValidation);
      }
    },
    detach: function detach(context, settings, trigger) {
      var $context = $(context);
      var elements = void 0;

      function removeFileValidation(selector) {
        $context.find(selector).removeOnce('fileValidate').off('change.fileValidate', Drupal.file.validateExtension);
      }

      if (trigger === 'unload' && settings.file && settings.file.elements) {
        elements = settings.file.elements;
        Object.keys(elements).forEach(removeFileValidation);
      }
    }
  };

  Drupal.behaviors.fileAutoUpload = {
    attach: function attach(context) {
      $(context).find('input[type="file"]').once('auto-file-upload').on('change.autoFileUpload', Drupal.file.triggerUploadButton);
    },
    detach: function detach(context, setting, trigger) {
      if (trigger === 'unload') {
        $(context).find('input[type="file"]').removeOnce('auto-file-upload').off('.autoFileUpload');
      }
    }
  };

  Drupal.behaviors.fileButtons = {
    attach: function attach(context) {
      var $context = $(context);
      $context.find('.js-form-submit').on('mousedown', Drupal.file.disableFields);
      $context.find('.js-form-managed-file .js-form-submit').on('mousedown', Drupal.file.progressBar);
    },
    detach: function detach(context) {
      var $context = $(context);
      $context.find('.js-form-submit').off('mousedown', Drupal.file.disableFields);
      $context.find('.js-form-managed-file .js-form-submit').off('mousedown', Drupal.file.progressBar);
    }
  };

  Drupal.behaviors.filePreviewLinks = {
    attach: function attach(context) {
      $(context).find('div.js-form-managed-file .file a').on('click', Drupal.file.openInNewWindow);
    },
    detach: function detach(context) {
      $(context).find('div.js-form-managed-file .file a').off('click', Drupal.file.openInNewWindow);
    }
  };

  Drupal.file = Drupal.file || {
    validateExtension: function validateExtension(event) {
      event.preventDefault();

      $('.file-upload-js-error').remove();

      var extensionPattern = event.data.extensions.replace(/,\s*/g, '|');
      if (extensionPattern.length > 1 && this.value.length > 0) {
        var acceptableMatch = new RegExp('\\.(' + extensionPattern + ')$', 'gi');
        if (!acceptableMatch.test(this.value)) {
          var error = Drupal.t('The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.', {
            '%filename': this.value.replace('C:\\fakepath\\', ''),
            '%extensions': extensionPattern.replace(/\|/g, ', ')
          });
          $(this).closest('div.js-form-managed-file').prepend('<div class="messages messages--error file-upload-js-error" aria-live="polite">' + error + '</div>');
          this.value = '';

          event.stopImmediatePropagation();
        }
      }
    },
    triggerUploadButton: function triggerUploadButton(event) {
      $(event.target).closest('.js-form-managed-file').find('.js-form-submit').trigger('mousedown');
    },
    disableFields: function disableFields(event) {
      var $clickedButton = $(this).findOnce('ajax');

      if (!$clickedButton.length) {
        return;
      }

      var $enabledFields = [];
      if ($clickedButton.closest('div.js-form-managed-file').length > 0) {
        $enabledFields = $clickedButton.closest('div.js-form-managed-file').find('input.js-form-file');
      }

      var $fieldsToTemporarilyDisable = $('div.js-form-managed-file input.js-form-file').not($enabledFields).not(':disabled');
      $fieldsToTemporarilyDisable.prop('disabled', true);
      setTimeout(function () {
        $fieldsToTemporarilyDisable.prop('disabled', false);
      }, 1000);
    },
    progressBar: function progressBar(event) {
      var $clickedButton = $(this);
      var $progressId = $clickedButton.closest('div.js-form-managed-file').find('input.file-progress');
      if ($progressId.length) {
        var originalName = $progressId.attr('name');

        $progressId.attr('name', originalName.match(/APC_UPLOAD_PROGRESS|UPLOAD_IDENTIFIER/)[0]);

        setTimeout(function () {
          $progressId.attr('name', originalName);
        }, 1000);
      }

      setTimeout(function () {
        $clickedButton.closest('div.js-form-managed-file').find('div.ajax-progress-bar').slideDown();
      }, 500);
    },
    openInNewWindow: function openInNewWindow(event) {
      event.preventDefault();
      $(this).attr('target', '_blank');
      window.open(this.href, 'filePreview', 'toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=500,height=550');
    }
  };
})(jQuery, Drupal);;

(function ($, Drupal) {

  Drupal.behaviors.google_map_field_widget_renderer = {
    attach: function (context) {

      // code here to read fields and set maps accordingly on page load.
      googleMapFieldPreviews();

      $('.google-map-field-clear').bind('click', function(event) {
        event.preventDefault();
        var data_delta = $(this).attr('data-delta');
        $('input[data-name-delta="'+data_delta+'"]').prop('value', '').attr('value', '');
        $('input[data-lat-delta="'+data_delta+'"]').prop('value', '').attr('value', '');
        $('input[data-lon-delta="'+data_delta+'"]').prop('value', '').attr('value', '');
        $('input[data-zoom-delta="'+data_delta+'"]').prop('value', '').attr('value', 9);
        $('input[data-type-delta="'+data_delta+'"]').prop('value', '').attr('value', 'roadmap');
        googleMapFieldPreviews(data_delta);
      });

      $('.google-map-field-watch-change').change(function(event) {
        var data_delta = $(this).attr('data-lat-delta') || $(this).attr('data-lon-delta') || $(this).attr('data-zoom-delta') || $(this).attr('data-type-delta');
        googleMapFieldPreviews(data_delta);
      });

    }
  }

})(jQuery, Drupal);
;
(function ($, Drupal) {

  googleMapFieldPreviews = function(delta) {

    delta = typeof delta === 'undefined' ? -1 : delta;

    $('.google-map-field-preview').each(function() {
      var data_delta = $(this).attr('data-delta');

      if (data_delta == delta || delta == -1) {

        var data_lat   = $('input[data-lat-delta="' + data_delta + '"]').val();
        var data_lon   = $('input[data-lon-delta="' + data_delta + '"]').val();
        var data_zoom  = $('input[data-zoom-delta="' + data_delta + '"]').attr('value');
        var data_type  = $('input[data-type-delta="' + data_delta + '"]').attr('value');
        var data_marker  = $('input[data-marker-delta="' + data_delta + '"]').val() === "1";;

        data_lat = googleMapFieldValidateLat(data_lat);
        data_lon = googleMapFieldValidateLon(data_lon);
        data_zoom = googleMapFieldValidateZoom(data_zoom);

        var latlng = new google.maps.LatLng(data_lat, data_lon);

        // Create the map preview.
        var mapOptions = {
          zoom: parseInt(data_zoom),
          center: latlng,
          mapTypeId: data_type,
          draggable: false,
          zoomControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true,
        };
        google_map_field_map = new google.maps.Map(this, mapOptions);

        // drop a marker at the specified lat/lng coords
        marker = new google.maps.Marker({
          position: latlng,
          optimized: false,
          visible: data_marker,
          map: google_map_field_map
        });

        $('#map_setter_' + data_delta).unbind();
        $('#map_setter_' + data_delta).bind('click', function(event) {
          event.preventDefault();
          googleMapFieldSetter($(this).attr('data-delta'));
        });

      }

    });  // end .each

  }

  googleMapFieldValidateLat = function(lat) {
    lat = parseFloat(lat);
    if (lat >= -90 && lat <= 90) {
      return lat;
    }
    else {
      return '51.524295';
    }
  }

  googleMapFieldValidateLon = function(lon) {
    lon = parseFloat(lon);
    if (lon >= -180 && lon <= 180) {
      return lon;
    }
    else {
      return '-0.127990';
    }
  }

  googleMapFieldValidateZoom = function(zoom) {
    zoom = parseInt(zoom);
    if (zoom === null || zoom === '' || isNaN(zoom)) {
      return '9';
    }
    else {
      return zoom;
    }
  }

})(jQuery);
;

(function ($) {

  var dialog;
  var google_map_field_map;

  googleMapFieldSetter = function(delta) {

    btns = {};

    btns[Drupal.t('Insert map')] = function () {
      var latlng = marker.position;
      var zoom = $('#edit-zoom').val();;
      var type = $('#edit-type').val();
      var width = $('#edit-width').val();
      var height = $('#edit-height').val();
      var show_marker = $('#edit-marker').prop('checked') ? "1" : "0";
      var show_controls = $('#edit-controls').prop('checked') ? "1" : "0";
      var infowindow_text = $('#edit-infowindow').val();

      $('input[data-lat-delta="' + delta + '"]').prop('value', latlng.lat()).attr('value', latlng.lat());
      $('input[data-lon-delta="' + delta + '"]').prop('value', latlng.lng()).attr('value', latlng.lng());
      $('input[data-zoom-delta="' + delta + '"]').prop('value', zoom).attr('value', zoom);
      $('input[data-type-delta="' + delta + '"]').prop('value', type).attr('value', type);
      $('input[data-width-delta="' + delta + '"]').prop('value', width).attr('value', width);
      $('input[data-height-delta="' + delta + '"]').prop('value', height).attr('value', height);
      $('input[data-marker-delta="' + delta + '"]').prop('value', show_marker).attr('value', show_marker);
      $('input[data-controls-delta="' + delta + '"]').prop('value', show_controls).attr('value', show_controls);
      $('input[data-infowindow-delta="' + delta + '"]').prop('value', infowindow_text).attr('value', infowindow_text);

      googleMapFieldPreviews(delta);

      $(this).dialog("close");
    };

    btns[Drupal.t('Cancel')] = function () {
      $(this).dialog("close");
    };

    var dialogHTML = '';
    dialogHTML += '<div id="google_map_field_dialog">';
    dialogHTML += '  <div>' + Drupal.t('Use the map below to drop a marker at the required location.') + '</div>';
    dialogHTML += '  <div id="google_map_field_container">';
    dialogHTML += '    <div id="google_map_map_container">';
    dialogHTML += '      <div id="gmf_container"></div>';
    dialogHTML += '      <div id="centre_on">';
    dialogHTML += '        <label>' + Drupal.t('Enter an address/town/postcode, etc., to center the map on:') + '</label><input size="50" type="text" name="centre_map_on" id="centre_map_on" value=""/>';
    dialogHTML += '        <button onclick="return doCentre();" type="button" role="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only button">' + Drupal.t('Find') + '</button>';
    dialogHTML += '        <div id="map_error"></div>';
    dialogHTML += '        <div id="centre_map_results"></div>';
    dialogHTML += '      </div>';
    dialogHTML += '      <div id="infowindow_container">';
    dialogHTML += '        <label for="edit-infowindow">' + Drupal.t('InfoWindow Popup text: (optional)') + '</label>';
    dialogHTML += '        <textarea class="form-textarea" id="edit-infowindow" name="infowindow" rows="5" cols="70"></textarea>';
    dialogHTML += '      </div>';
    dialogHTML += '    </div>';
    dialogHTML += '    <div id="google_map_field_options">';
    dialogHTML += '      <label for="edit-zoom">' + Drupal.t('Map Zoom') + '</label>';
    dialogHTML += '      <select class="form-select" id="edit-zoom" name="field_zoom"><option value="1">' + Drupal.t('1 (Min)') + '</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">' + Drupal.t('9 (Default)') + '</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>option value="21">' + Drupal.t('21 (Max)') + '</option></select>';
    dialogHTML += '      <label for="edit-type">' + Drupal.t('Map Type') + '</label>';
    dialogHTML += '      <select class="form-select" id="edit-type" name="field_type"><option value="roadmap">' + Drupal.t('Map') + '</option><option value="satellite">' + Drupal.t('Satellite') + '</option><option value="hybrid">' + Drupal.t('Hybrid') + '</option><option value="terrain">' + Drupal.t('Terrain') + '</option></select>';
    dialogHTML += '      <label for="edit-width">' + Drupal.t('Map Width') + '</label>';
    dialogHTML += '      <input type="text" id="edit-width" size="5" maxlength="6" name="field-width" value="" />';
    dialogHTML += '      <label for="edit-height">' + Drupal.t('Map Height') + '</label>';
    dialogHTML += '      <input type="text" id="edit-height" size="5" maxlength="6" name="field-height" value="" />';
    dialogHTML += '      <label for="edit-controls">' + Drupal.t('Enable controls') + '</label>';
    dialogHTML += '      <input type="checkbox" class="form-checkbox" id="edit-controls" name="field_controls" />';
    dialogHTML += '      <label for="edit-marker">' + Drupal.t('Enable marker') + '</label>';
    dialogHTML += '      <input type="checkbox" class="form-checkbox" id="edit-marker" name="field_marker" />';
    dialogHTML += '    </div>';
    dialogHTML += '  </div>';
    dialogHTML += '</div>';

    $('body').append(dialogHTML);

    dialog = $('#google_map_field_dialog').dialog({
      modal: true,
      autoOpen: false,
      width: 750,
      height: 640,
      closeOnEscape: true,
      resizable: false,
      draggable: false,
      title: Drupal.t('Set Map Marker'),
      dialogClass: 'jquery_ui_dialog-dialog',
      buttons: btns,
      close: function(event, ui) {
        $(this).dialog('destroy').remove();
      }
    });

    dialog.dialog('open');

    // Handle map options inside dialog.
    $('#edit-zoom').change(function() {
      google_map_field_map.setZoom(googleMapFieldValidateZoom($(this).val()));
    })
    $('#edit-type').change(function() {
      google_map_field_map.setMapTypeId($(this).val());
    })
    $('#edit-controls').change(function() {
      google_map_field_map.setOptions({disableDefaultUI : !$(this).prop('checked')});
    })
    $('#edit-marker').change(function() {
      marker.setVisible($(this).prop('checked'));
    })

    // Create the map setter map.
    // get the lat/lon from form elements
    var lat = $('input[data-lat-delta="' + delta + '"]').attr('value');
    var lon = $('input[data-lon-delta="' + delta + '"]').attr('value');
    var zoom = $('input[data-zoom-delta="' + delta + '"]').attr('value');
    var type = $('input[data-type-delta="' + delta + '"]').attr('value');
    var width = $('input[data-width-delta="' + delta + '"]').attr('value');
    var height = $('input[data-height-delta="' + delta + '"]').attr('value');
    var show_marker = $('input[data-marker-delta="' + delta + '"]').val() === "1";
    var show_controls = $('input[data-controls-delta="' + delta + '"]').val() === "1";
    var infowindow_text = $('input[data-infowindow-delta="' + delta + '"]').attr('value');

    lat = googleMapFieldValidateLat(lat);
    lon = googleMapFieldValidateLon(lon);
    zoom = googleMapFieldValidateZoom(zoom);

    $('#edit-zoom').val(zoom);
    $('#edit-type').val(type);
    $('#edit-width').prop('value', width).attr('value', width);
    $('#edit-height').prop('value', height).attr('value', height);
    $('#edit-marker').prop('checked', show_marker);
    $('#edit-controls').prop('checked', show_controls);
    $('#edit-infowindow').val(infowindow_text);

    // $('#edit-controls').prop('checked', controls);

    var latlng = new google.maps.LatLng(lat, lon);
    var mapOptions = {
      zoom: parseInt(zoom),
      center: latlng,
      streetViewControl: false,
      mapTypeId: type,
      disableDefaultUI: show_controls ? false : true,
    };
    google_map_field_map = new google.maps.Map(document.getElementById("gmf_container"), mapOptions);

    // Add map listener
    google.maps.event.addListener(google_map_field_map, 'zoom_changed', function() {
      $('#edit-zoom').val(google_map_field_map.getZoom());
    });

    // drop a marker at the specified lat/lng coords
    marker = new google.maps.Marker({
      position: latlng,
      optimized: false,
      draggable: true,
      visible: show_marker,
      map: google_map_field_map
    });

    // add a click listener for marker placement
    google.maps.event.addListener(google_map_field_map, "click", function(event) {
      latlng = event.latLng;
      google_map_field_map.panTo(latlng);
      marker.setMap(null);
      marker = new google.maps.Marker({
        position: latlng,
        optimized: false,
        draggable: true,
        visible: $('#edit-marker').prop('checked'),
        map: google_map_field_map
      });
    });
    google.maps.event.addListener(marker, 'dragend', function(event) {
      google_map_field_map.panTo(event.latLng);
    });
    return false;
  }

  doCentreLatLng = function(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    google_map_field_map.panTo(latlng);
    marker.setMap(null);
    marker = new google.maps.Marker({
      position: latlng,
      draggable: true,
      visible: $('#edit-marker').prop('checked'),
      map: google_map_field_map
    });
    google.maps.event.addListener(marker, 'dragend', function(event) {
      google_map_field_map.panTo(event.latLng);
    });
  }

  doCentre = function() {
    var centreOnVal = $('#centre_map_on').val();

    if (centreOnVal == '' || centreOnVal == null) {
      $('#centre_map_on').css("border", "1px solid red");
      $('#map_error').html(Drupal.t('Enter a value in the field provided.'));
      return false;
    }
    else {
      $('#centre_map_on').css("border", "1px solid lightgrey");
      $('#map_error').html('');
    }

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': centreOnVal}, function (result, status) {
      $('#centre_map_results').html('');
      if (status == 'OK') {
        doCentreLatLng(result[0].geometry.location.lat(), result[0].geometry.location.lng());
        $('#centre_map_results').html(Drupal.formatPlural(result.length, 'One result found.', '@count results found: '));

        if (result.length > 1) {
          for (var i = 0; i < result.length; i++) {
            var lat = result[i].geometry.location.lat();
            var lng = result[i].geometry.location.lng();
            var link = $('<a onclick="return doCentreLatLng(' + lat + ',' + lng + ');">' + (i + 1) + '</a>');
            $('#centre_map_results').append(link);
          }
        }

      } else {
        $('#map_error').html(Drupal.t('Could not find location.'));
      }
    });

    return false;

  }

})(jQuery);
;
