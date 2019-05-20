require= (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
    exports.__esModule = true;
    exports.BASE = 36;
    // Placeholder
    var PTrie = /** @class */ (function () {
        function PTrie() {
        }
        return PTrie;
    }());
    exports.PTrie = PTrie;
    // 0, 1, 2, ..., A, B, C, ..., 00, 01, ... AA, AB, AC, ..., AAA, AAB, ...
    function toAlphaCode(n) {
        var s = '';
        var places = 1;
        for (var range = exports.BASE; n >= range; n -= range, places++, range *= exports.BASE) { /*_*/ }
        while (places--) {
            var d = n % exports.BASE;
            s = String.fromCharCode((d < 10 ? 48 : 55) + d) + s;
            n = (n - d) / exports.BASE;
        }
        return s;
    }
    exports.toAlphaCode = toAlphaCode;
    function fromAlphaCode(s) {
        var n = 0;
        for (var places = 1, range = exports.BASE; places < s.length; n += range, places++, range *= exports.BASE) { /*_*/ }
        for (var i = s.length - 1, pow = 1; i >= 0; i--, pow *= exports.BASE) {
            var d = s.charCodeAt(i) - 48;
            if (d > 10) {
                d -= 7;
            }
            n += d * pow;
        }
        return n;
    }
    exports.fromAlphaCode = fromAlphaCode;
    
    },{}],2:[function(require,module,exports){
    "use strict";
    exports.__esModule = true;
    var util_1 = require("./util");
    var Histogram = /** @class */ (function () {
        function Histogram() {
            this.counts = {};
        }
        Histogram.prototype.init = function (key, n) {
            if (n === void 0) { n = 0; }
            if (typeof key === 'number') {
                key = key.toString();
            }
            if (this.counts[key] === undefined) {
                this.counts[key] = 0;
            }
            this.counts[key] += n;
        };
        Histogram.prototype.add = function (key, n) {
            if (n === void 0) { n = 1; }
            this.init(key, n);
        };
        Histogram.prototype.countOf = function (key) {
            this.init(key);
            return this.counts[key];
        };
        Histogram.prototype.highest = function (top) {
            return util_1.sortByValues(this.counts, 'desc').slice(0, top);
        };
        return Histogram;
    }());
    exports.Histogram = Histogram;
    
    },{"./util":6}],3:[function(require,module,exports){
    "use strict";
    exports.__esModule = true;
    /*
      Node
    
      Each node contains some special properties (begining with '_'), as well as
      arbitrary string properties for string fragments contained in the input word
      dictionary.
    
      String properties can be "terminal" (have a numeric value of 1), or can
      referance another child Node.
    
      Note that a Node containing a terminal '' (empty string) property, is itself
      marked as a terminal Node (the prefix leading to this node is a word in the
      dictionary.
    */
    var Node = /** @class */ (function () {
        function Node() {
            // Number of child properties.
            this._p = 0;
        }
        Node.prototype.child = function (prop) {
            return this[prop];
        };
        Node.prototype.setChild = function (prop, value) {
            var self = this;
            if (prop !== this._g) {
                // delete self._g;
            }
            if (self[prop] !== undefined) {
                this._p += 1;
            }
            if (this._p === 1) {
                // this._g = prop;
            }
            self[prop] = value;
        };
        Node.prototype.deleteChild = function (prop) {
            var self = this;
            if (prop === this._g) {
                // delete this._g;
            }
            this._p -= 1;
            delete self[prop];
            if (this._p === 1) {
                // this._g = this.props()[0];
            }
        };
        // A property is a terminal string
        Node.prototype.isTerminalString = function (prop) {
            return typeof this.child(prop) === 'number';
        };
        // This node is a terminal node (the prefix string is a word in the
        // dictionary).
        Node.prototype.isTerminal = function () {
            return this.isTerminalString('');
        };
        // Well ordered list of properties in a node (string or object properties)
        // Use nodesOnly === true to return only properties of child nodes (not
        // terminal strings).
        Node.prototype.props = function (nodesOnly) {
            var me = this;
            var props = [];
            for (var prop in me) {
                if (!me.hasOwnProperty(prop)) {
                    continue;
                }
                if (prop !== '' && prop[0] !== '_') {
                    if (!nodesOnly || Node.isNode(this.child(prop))) {
                        props.push(prop);
                    }
                }
            }
            props.sort();
            return props;
        };
        // Compute in-degree of all nodes and mark the
        // singleton nodes.
        Node.countDegree = function (root) {
            var walker = new Walker(root);
            walker.dfs(function (order, node) {
                if (order === 'post') {
                    return;
                }
                if (node._d === undefined) {
                    node._d = 0;
                }
                node._d++;
            });
        };
        // Node has just a single (non-special) property.
        Node.prototype.isSingleton = function () {
            return this._p === 1 && !this.isTerminal();
        };
        // This function can be used as a Type Guard (TypeScript)
        Node.isNode = function (n) {
            return n instanceof Node;
        };
        return Node;
    }());
    exports.Node = Node;
    var Walker = /** @class */ (function () {
        function Walker(root) {
            this.root = root;
            this.visitMap = new Map();
        }
        Walker.prototype.reset = function () {
            this.visitMap = new Map();
            return this;
        };
        Walker.prototype.visit = function (node) {
            this.visitMap.set(node, true);
        };
        Walker.prototype.visited = function (node) {
            return this.visitMap.get(node) || false;
        };
        Walker.prototype.dfs = function (handler) {
            this.reset();
            this._dfs(this.root, null, '', handler);
        };
        // Depth-first search via callback handler.
        Walker.prototype._dfs = function (node, parent, propParent, handler) {
            // The handler can be called multiple times from different parents
            // since Nodes can form a multi-graph.
            handler('pre', node, parent, propParent);
            if (this.visited(node)) {
                return;
            }
            this.visit(node);
            var props = node.props(true);
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var prop = props_1[_i];
                this._dfs(node.child(prop), node, prop, handler);
            }
            handler('post', node, parent, propParent);
        };
        return Walker;
    }());
    exports.Walker = Walker;
    
    },{}],"PTrie":[function(require,module,exports){
    "use strict";
    exports.__esModule = true;
    var alphacode_1 = require("./alphacode");
    exports.NODE_SEP = ';';
    exports.STRING_SEP = ',';
    exports.TERMINAL_PREFIX = '!';
    exports.MIN_LETTER = 'a';
    exports.MAX_LETTER = 'z';
    exports.MAX_WORD = new Array(10).join(exports.MAX_LETTER);
    var reNodePart = new RegExp('([' + exports.MIN_LETTER + '-' + exports.MAX_LETTER +
        '.-]+)(' + exports.STRING_SEP + '|[0-9a-z.-]+|$)', 'g');
    
    //var reNodePart = new RegExp("([0-9a-z][0-9a-z.-]*[0-9a-z])",'g');    
    var reSymbol = new RegExp("([0-9A-Z]+):([0-9A-Z]+)");
    /*
     * Packed Trie structure.
     *
     * This class can read in a packed Trie (actually DAWG) in the form
     * of a string encoding of a set of nodes.  It will then spilt it
     * into an array of strings, and use the resulting array to
     * resolve dictionary membership.
     *
     * Usage:
     *
     *   // Unpack a packed dictionary string for use.
     *   var ptrie = new PTrie(packedString);
     *
     *   // Test a word for membership in the dictionary.
     *   if (ptrie.isWord(myWord)) {
     *     ...
     *   }
     *
     *   // For command completion - find first 20 words that begin with a prefix.
     *   var words = ptrie.completions(prefix, 20);
     */
    var PTrie = /** @class */ (function () {
        function PTrie(packed) {
            this.syms = [];
            this.nodes = packed.split(exports.NODE_SEP);
            this.syms = [];
            this.symCount = 0;
            while (true) {
                var m = reSymbol.exec(this.nodes[this.symCount]);
                if (!m) {
                    break;
                }
                if (alphacode_1.fromAlphaCode(m[1]) !== this.symCount) {
                    throw new Error("Invalid Symbol name - found " + m[1] +
                        " when expecting " + alphacode_1.toAlphaCode(this.symCount));
                }
                this.syms[this.symCount] = alphacode_1.fromAlphaCode(m[2]);
                this.symCount++;
            }
            this.nodes.splice(0, this.symCount);
        }
        // Is word in the dictionary (exact match).
        PTrie.prototype.isWord = function (word) {
            if (word === '') {
                return false;
            }
            return this.match(word) === word;
        };
        // Returns the longest match that is prefix of word.
        PTrie.prototype.match = function (word) {
            var matches = this.matches(word);
            if (matches.length === 0) {
                return '';
            }
            return matches[matches.length - 1];
        };
        // Return all entries that match a prefix of word (in order of increasing
        // length.
        PTrie.prototype.matches = function (word) {
            return this.words(word, word + exports.MIN_LETTER);
        };
        // Return all entries that begin with a prefix.
        PTrie.prototype.completions = function (prefix, limit) {
            return this.words(prefix, beyond(prefix), limit);
        };
        PTrie.prototype.words = function (from, beyond, limit) {
            var words = [];
            function catchWords(word, ctx) {
                if (limit !== undefined && words.length >= limit) {
                    ctx.abort = true;
                    return;
                }
                words.push(word);
            }
            this.enumerate(0, '', { from: from,
                beyond: beyond,
                fn: catchWords,
                prefixes: (from + exports.MIN_LETTER) === beyond
            });
            return words;
        };
        PTrie.prototype.enumerate = function (inode, prefix, ctx) {
            var _this = this;
            var node = this.nodes[inode];
            var cont = true;
            function emit(word) {
                if (ctx.prefixes) {
                    if (word === ctx.from.slice(0, word.length)) {
                        ctx.fn(word, ctx);
                    }
                    return;
                }
                if (ctx.from <= word && word < ctx.beyond) {
                    ctx.fn(word, ctx);
                }
            }
            if (node[0] === exports.TERMINAL_PREFIX) {
                emit(prefix);
                if (ctx.abort) {
                    return;
                }
                node = node.slice(1);
            }
            node.replace(reNodePart, function (w, str, ref) {
                var match = prefix + str;
                // Done or no possible future match from str
                if (ctx.abort ||
                    match >= ctx.beyond ||
                    match < ctx.from.slice(0, match.length)) {
                    return '';
                }
                var isTerminal = ref === exports.STRING_SEP || ref === '';
                if (isTerminal) {
                    emit(match);
                    return '';
                }
                _this.enumerate(_this.inodeFromRef(ref, inode), match, ctx);
                return '';
            });
        };
        // References are either absolute (symbol) or relative (1 based).
        PTrie.prototype.inodeFromRef = function (ref, inodeFrom) {
            var dnode = alphacode_1.fromAlphaCode(ref);
            if (dnode < this.symCount) {
                return this.syms[dnode];
            }
            dnode -= this.symCount;
            return inodeFrom + dnode + 1;
        };
        return PTrie;
    }());
    exports.PTrie = PTrie;
    // Return a string that is the smallest string greater than
    // any string which is prefixed with s.
    function beyond(s) {
        if (s.length === 0) {
            return exports.MAX_WORD;
        }
        var code = s.charCodeAt(s.length - 1);
        return s.slice(0, -1) + String.fromCharCode(code + 1);
    }
    
    },{"./alphacode":1}],"Trie":[function(require,module,exports){
    "use strict";
    exports.__esModule = true;
    /*
      A JavaScript implementation of a Trie search datastructure.
    
      Usage:
    
      trie = new Trie(dictionary-string);
      bool = trie.isWord(word);
    
      To use a packed (compressed) version of the trie stored as a string:
    
      compressed = trie.pack();
      ptrie = new PackedTrie(compressed);
      bool = ptrie.isWord(word)
    
    */
    var ptrie = require("./ptrie");
    var alphacode_1 = require("./alphacode");
    var histogram_1 = require("./histogram");
    var util_1 = require("./util");
    var node_1 = require("./node");
    var DEBUG = false;
    // Create a Trie data structure for searching for membership of strings
    // in a dictionary in a very space efficient way.
    var Trie = /** @class */ (function () {
        function Trie(words) {
            this.root = new node_1.Node();
            this.lastWord = '';
            this.suffixes = {};
            this.cNext = 1;
            this.wordCount = 0;
            this.vCur = 0;
            this.insertWords(words);
        }
        // Insert words from one big string, or from an array.
        Trie.prototype.insertWords = function (words) {
            var i;
            if (words === undefined) {
                return;
            }
            if (typeof words === 'string') {
                words = words.split(/[^a-zA-Z]+/);
            }
            for (i = 0; i < words.length; i++) {
                words[i] = words[i].toLowerCase();
            }
            util_1.unique(words);
            for (i = 0; i < words.length; i++) {
                this.insert(words[i]);
            }
        };
        Trie.prototype.insert = function (word) {
            this._insert(word, this.root);
            var lastWord = this.lastWord;
            this.lastWord = word;
            var prefix = commonPrefix(word, lastWord);
            if (prefix === lastWord) {
                return;
            }
            var freeze = this.uniqueNode(lastWord, word, this.root);
            if (freeze) {
                this.combineSuffixNode(freeze);
            }
        };
        Trie.prototype._insert = function (word, node) {
            var i;
            var prefix;
            var next;
            var prop;
            // Duplicate word entry - ignore
            if (word.length === 0) {
                return;
            }
            // Do any existing props share a common prefix?
            for (prop in node) {
                if (!node.hasOwnProperty(prop)) {
                    continue;
                }
                prefix = commonPrefix(word, prop);
                if (prefix.length === 0) {
                    continue;
                }
                // Prop is a proper prefix - recurse to child node
                if (prop === prefix && node_1.Node.isNode(node.child(prop))) {
                    this._insert(word.slice(prefix.length), node.child(prop));
                    return;
                }
                // Duplicate terminal string - ignore
                if (prop === word && node.isTerminalString(prop)) {
                    return;
                }
                next = new node_1.Node();
                next.setChild(prop.slice(prefix.length), node.child(prop));
                this.addTerminal(next, word = word.slice(prefix.length));
                node.deleteChild(prop);
                node.setChild(prefix, next);
                this.wordCount++;
                return;
            }
            // No shared prefix.  Enter the word here as a terminal string.
            this.addTerminal(node, word);
            this.wordCount++;
        };
        // Add a terminal string to node.
        // If 2 characters or less, just add with value === 1.
        // If more than 2 characters, point to shared node
        // Note - don't prematurely share suffixes - these
        // terminals may become split and joined with other
        // nodes in this part of the tree.
        Trie.prototype.addTerminal = function (node, prop) {
            if (prop.length <= 1) {
                node.setChild(prop, 1);
                return;
            }
            var next = new node_1.Node();
            node.setChild(prop[0], next);
            this.addTerminal(next, prop.slice(1));
        };
        Trie.prototype.optimize = function () {
            var scores = [];
            this.combineSuffixNode(this.root);
            this.prepDFS();
            this.countDegree(this.root);
            this.prepDFS();
            this.collapseChains(this.root);
        };
        // Convert Trie to a DAWG by sharing identical nodes
        Trie.prototype.combineSuffixNode = function (node) {
            // Frozen node - can't change.
            if (node._c) {
                return node;
            }
            // Make sure all children are combined and generate unique node
            // signature for this node.
            var sig = [];
            if (node.isTerminal()) {
                sig.push('!');
            }
            var props = node.props();
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (node_1.Node.isNode(node.child(prop))) {
                    node.setChild(prop, this.combineSuffixNode(node.child(prop)));
                    sig.push(prop);
                    sig.push(node.child(prop)._c);
                }
                else {
                    sig.push(prop);
                }
            }
            var sigString = sig.join('-');
            var shared = this.suffixes[sigString];
            if (shared) {
                return shared;
            }
            this.suffixes[sigString] = node;
            node._c = this.cNext++;
            return node;
        };
        Trie.prototype.prepDFS = function () {
            this.vCur++;
        };
        Trie.prototype.visited = function (node) {
            if (node._v === this.vCur) {
                return true;
            }
            node._v = this.vCur;
        };
        Trie.prototype.countDegree = function (node) {
            if (node._d === undefined) {
                node._d = 0;
            }
            node._d++;
            if (this.visited(node)) {
                return;
            }
            var props = node.props(true);
            for (var i = 0; i < props.length; i++) {
                this.countDegree(node.child(props[i]));
            }
        };
        // Remove intermediate singleton nodes by hoisting into their parent
        Trie.prototype.collapseChains = function (node) {
            var prop = '-invalid-';
            var props;
            var i;
            if (this.visited(node)) {
                return;
            }
            props = node.props();
            for (i = 0; i < props.length; i++) {
                prop = props[i];
                var child = node.child(prop);
                if (!node_1.Node.isNode(child)) {
                    continue;
                }
                this.collapseChains(child);
                // Hoist the singleton child's single property to the parent
                if (child._g !== undefined && (child._d === 1 || child._g.length === 1)) {
                    node.deleteChild(prop);
                    prop += child._g;
                    node.setChild(prop, child.child(child._g));
                }
            }
            // Identify singleton nodes
            if (props.length === 1 && !node.isTerminal()) {
                node._g = prop;
            }
        };
        Trie.prototype.isWord = function (word) {
            return this.isFragment(word, this.root);
        };
        Trie.prototype.isFragment = function (word, node) {
            if (word.length === 0) {
                return node.isTerminal();
            }
            if (node.child(word) === 1) {
                return true;
            }
            // Find a prefix of word reference to a child
            var props = node.props(true);
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (prop === word.slice(0, prop.length)) {
                    return this.isFragment(word.slice(prop.length), node.child(prop));
                }
            }
            return false;
        };
        // Find highest node in Trie that is on the path to word
        // and that is NOT on the path to other.
        Trie.prototype.uniqueNode = function (word, other, node) {
            var props = node.props(true);
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (prop === word.slice(0, prop.length)) {
                    if (prop !== other.slice(0, prop.length)) {
                        return node.child(prop);
                    }
                    return this.uniqueNode(word.slice(prop.length), other.slice(prop.length), node.child(prop));
                }
            }
            return undefined;
        };
        // Return packed representation of Trie as a string.
        //
        // Each node of the Trie is output on a single line.
        //
        // For example Trie("the them there thesis this"):
        // {
        //    "th": {
        //      "is": 1,
        //      "e": {
        //        "": 1,
        //        "m": 1,
        //        "re": 1,
        //        "sis": 1
        //      }
        //    }
        //  }
        //
        // Would be reperesented as:
        //
        // th0
        // e0is
        // !m,re,sis
        //
        // The line begins with a '!' iff it is a terminal node of the Trie.
        // For each string property in a node, the string is listed, along
        // with a (relative!) line number of the node that string references.
        // Terminal strings (those without child node references) are
        // separated by ',' characters.
        Trie.prototype.pack = function () {
        }
        Trie.prototype.pack = function () {
            var self = this;
            var nodes = [];
            var nodeCount;
            var syms = {};
            var pos = 0;
            // Make sure we've combined all the common suffixes
            this.optimize();
            function nodeLine(node) {
                var line = '';
                var sep = '';
                if (node.isTerminal()) {
                    line += ptrie.TERMINAL_PREFIX;
                }
                var props = node.props();
                for (var i = 0; i < props.length; i++) {
                    var prop = props[i];
                    if (node.isTerminalString(prop)) {
                        line += sep + prop;
                        sep = ptrie.STRING_SEP;
                        continue;
                    }
                    var child = node.child(prop);
                    if (syms[child._n]) {
                        line += sep + prop + syms[child._n];
                        sep = '';
                        continue;
                    }
                    var ref = alphacode_1.toAlphaCode(node._n - child._n - 1 + symCount);
                    // Large reference to smaller string suffix -> duplicate suffix
                    if (child._g && ref.length >= child._g.length &&
                        node.isTerminalString(child._g)) {
                        ref = child._g;
                        line += sep + prop + ref;
                        sep = ptrie.STRING_SEP;
                        continue;
                    }
                    line += sep + prop + ref;
                    sep = '';
                }
                return line;
            }
            // Topological sort into nodes array
            function numberNodes(node) {
                if (node._n !== undefined) {
                    return;
                }
                var props = node.props(true);
                for (var i = 0; i < props.length; i++) {
                    numberNodes(node.child(props[i]));
                }
                node._n = pos++;
                nodes.unshift(node);
            }
            var histAbs = new histogram_1.Histogram();
            var histRel = new histogram_1.Histogram();
            function analyzeRefs(node) {
                if (self.visited(node)) {
                    return;
                }
                var props = node.props(true);
                for (var i = 0; i < props.length; i++) {
                    var prop = props[i];
                    var child = node.child(prop);
                    var ref = node._n - child._n - 1;
                    // Count the number of single-character relative refs
                    if (ref < alphacode_1.BASE) {
                        histRel.add(ref);
                    }
                    // Count the number of characters saved by converting an absolute
                    // reference to a one-character symbol.
                    histAbs.add(child._n, alphacode_1.toAlphaCode(ref).length - 1);
                    analyzeRefs(child);
                }
            }
            function symbolCount() {
                var topNodes = histAbs.highest(alphacode_1.BASE);
                var savings = [];
                savings[-1] = 0;
                var best = 0;
                var count = 0;
                var defSize = 3 + alphacode_1.toAlphaCode(nodeCount).length;
                for (var sym = 0; sym < alphacode_1.BASE; sym++) {
                    if (topNodes[sym] === undefined) {
                        break;
                    }
                    // Cumulative savings of:
                    //   saved characters in refs
                    //   minus definition size
                    //   minus relative size wrapping to 2 digits
                    savings[sym] = topNodes[sym][1] - defSize -
                        histRel.countOf(alphacode_1.BASE - sym - 1) +
                        savings[sym - 1];
                    log("savings[" + sym + "] " + savings[sym] + ' = ' +
                        savings[sym - 1] + ' +' +
                        topNodes[sym][1] + ' - ' + defSize + ' - ' +
                        histRel.countOf(alphacode_1.BASE - sym - 1) + ')');
                    if (savings[sym] >= best) {
                        best = savings[sym];
                        count = sym + 1;
                    }
                }
                return [count, topNodes];
            }
            numberNodes(this.root);
            nodeCount = nodes.length;
            this.prepDFS();
            analyzeRefs(this.root);
            var _a = symbolCount(), symCount = _a[0], topNodes = _a[1];
            var symDefs = [];
            for (var sym = 0; sym < symCount; sym++) {
                syms[topNodes[sym][0]] = alphacode_1.toAlphaCode(sym);
            }
            var nodeLines = [];
            for (var i = 0; i < nodeCount; i++) {
                nodeLines[i] = nodeLine(nodes[i]);
            }
            // Prepend symbols
            for (var sym = symCount - 1; sym >= 0; sym--) {
                nodeLines.unshift(alphacode_1.toAlphaCode(sym) + ':' +
                    alphacode_1.toAlphaCode(nodeCount -
                        parseInt(topNodes[sym][0], 10) - 1));
            }
            return nodeLines.join(ptrie.NODE_SEP);
        };
        return Trie;
    }());
    exports.Trie = Trie;
    function commonPrefix(w1, w2) {
        var i;
        var maxlen = Math.min(w1.length, w2.length);
        for (i = 0; i < maxlen && w1[i] === w2[i]; i++) { /*_*/ }
        return w1.slice(0, i);
    }
    function log(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (DEBUG) {
            console.log.apply(console, [message].concat(args));
        }
    }
    
    },{"./alphacode":1,"./histogram":2,"./node":3,"./ptrie":"PTrie","./util":6}],6:[function(require,module,exports){
    "use strict";
    exports.__esModule = true;
    function sortByValues(o, dir) {
        if (dir === void 0) { dir = 'asc'; }
        var result = [];
        for (var key in o) {
            result.push([key, o[key]]);
        }
        result.sort(function (a, b) {
            return cmpDefault(a[1], b[1], dir);
        });
        return result;
    }
    exports.sortByValues = sortByValues;
    function cmpDefault(a, b, dir) {
        if (dir === void 0) { dir = 'asc'; }
        var result = 0;
        if (a < b) {
            result = -1;
        }
        else if (a > b) {
            result = 1;
        }
        return dir === 'asc' ? result : -result;
    }
    // Sort elements and remove duplicates from array (modified in place).
    function unique(a, cmp) {
        if (cmp === void 0) { cmp = cmpDefault; }
        a.sort(cmp);
        for (var i = 1; i < a.length; i++) {
            if (cmp(a[i - 1], a[i]) === 0) {
                a.splice(i, 1);
            }
        }
    }
    exports.unique = unique;
    
    },{}]},{},["Trie","PTrie"]);
    