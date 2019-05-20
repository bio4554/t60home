'use strict';

function initializeRecordingMessage() {
  $('body').append('<div id="capture-modal"></div>');
  var modal = $('#capture-modal');
  modal.append('<div id="capturing-screenshot">CAPTURING SCREENSHOT<p>Select "Text only" in Default Compare’s Settings to eliminate visual compare</p></div>');
  var element = $('#capturing-screenshot');

  // modal
  modal.css('overflow', 'hidden').css('height', 'auto').css('position', 'fixed').css('top', 0).css('left', 0).css('right', 0).css('bottom', 0).css('z-index', 2e9).css('background', 'rgba(0,0,0,0.8)');

  // recording dot
  element.prepend('<i/>');
  element.find('i').css('display', 'inline-block').css('width', '18px').css('height', '18px').css('border-radius', '50%').css('background-color', '#B70016').css('position', 'relative').css('top', '3px').css('right', '8px');

  element.find('p').css('display', 'block').css('text-align', 'justify').css('font-family', 'Verdana, Geneva, sans-serif').css('font-size', '11px').css('margin-left', '18px').css('margin-top', '-14px').css('max-width', '200px').css('font-weight', '200').css('line-height', '13px').css('color', '#B70016');

  element.css('position', 'absolute').css('top', '48%').css('left', '50%').css('margin', '0 auto').css('background-color', 'rgba(255,255,255,0.4)').css('border-radius', '8px').css('font-family', 'Verdana, Geneva, sans-serif').css('font-size', '14px').css('font-weight', '600').css('line-height', '48px').css('z-index', '9999').css('color', '#B70016').css('padding', '0px 18px').css('margin-left', '-10%');
  // css('border', '3px solid #B70016').
}

function hideRecordingMessage() {
  var element = $('#capture-modal');
  element.css('display', 'none');
}