'use strict';

function initialize(crop) {
  // console.log('crop', crop);

  var defaultSelector = [];
  var nodes = $('body');

  var selector = getLargestSelector(nodes, crop, defaultSelector);
  console.log('selector', selector.join(' > '));

  // Communicate selector back to pop up window
  return selector.join(' > ');
}

// Recursive function captures the largest selector with ID
// that contains the crop area
function getLargestSelector(nodes, crop, selector) {
  // Multiple nodes to drill down through
  if (nodes.length > 1) {
    // Get nodes wich contain the crop area
    var containedNodes = getNodesInBoundingBox(nodes, crop);
    // console.log('contained', containedNodes);
    if (containedNodes.length == 1) {
      // Set selector if there is one
      selector.push(getBestSelector(containedNodes[0]));
      // Keep drilling from this node
      selector = getLargestSelector(containedNodes[0].children, crop, selector);
    } else if (nodes.length == containedNodes.length) {
      // Experimental: Strip away nodes that don't have any content (pesky overlays)
      var nonEmptyNodes = containedNodes.filter(function (node) {
        return node.textContent.trim() !== '';
      });
      // Keep drilling less nodes that are in bounds but have no content
      selector = getLargestSelector(nonEmptyNodes, crop, selector);
    } else {
      // Keep drilling less nodes that don't contain
      selector = getLargestSelector(containedNodes, crop, selector);
    }
  } else if (nodes.length == 1) {
    var currentSelector = getBestSelector(nodes[0]);
    if (!currentSelector.match(/^\#?body/)) {
      selector.push(currentSelector);
    }
    selector = getLargestSelector(nodes[0].children, crop, selector);
  } else {}
  // Nothing to do

  // return the top selector for the cycle
  return selector;
}

function getBestSelector(node) {
  var id = $(node).prop('id');
  var tagname = $(node)[0].tagName.toLowerCase();
  var classname = $(node)[0].className;
  classname = classname.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '.');

  var selector = classname ? tagname + '.' + classname : tagname;

  if ($(node).siblings(selector).length > 0) {
    selector += ':nth-child(' + ($(node).index() + 1) + ')';
  }

  if (id !== '') {
    return '#' + id;
  } else {
    return selector;
  }
}

function getNodesInBoundingBox(nodes, crop) {
  return $.map(nodes, function (node, i) {
    if (inBoundingBox(node, crop)) {
      return node;
    }
  });
}

function inBoundingBox(node, crop) {
  var rect = node.getBoundingClientRect();
  rect.scroll_top = document.body.scrollTop;

  if (rect.scroll_top + rect.top <= crop.scroll_top + crop.y && rect.scroll_top + rect.bottom >= crop.scroll_top + crop.y + crop.height && rect.left <= crop.x && rect.right >= crop.x + crop.width) {
    return true;
  } else {
    return false;
  }
}