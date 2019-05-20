// send data to background
'use strict';

chrome.runtime.sendMessage({ type: 'data', data: { a: 1 } });
chrome.runtime.sendMessage({ type: 'contextMenus' });