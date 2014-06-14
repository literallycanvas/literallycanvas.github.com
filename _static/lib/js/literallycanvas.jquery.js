(function() {
    var CPGlobal, Color, Colorpicker, positionForEvent, size;
    size = 200;
    positionForEvent = function(e) {
        if (typeof e.pageX === "undefined") {
            if (typeof e.originalEvent === "undefined") {
                return null;
            }
            return e.originalEvent.changedTouches[0];
        } else {
            return e;
        }
    };
    Color = function() {
        function Color(val) {
            this.value = {
                h: 1,
                s: 1,
                b: 1,
                a: 1
            };
            this.setColor(val);
        }
        Color.prototype.setColor = function(val) {
            var that;
            val = val.toLowerCase();
            that = this;
            return $.each(CPGlobal.stringParsers, function(i, parser) {
                var match, space, values;
                match = parser.re.exec(val);
                values = match && parser.parse(match);
                space = parser.space || "rgba";
                if (values) {
                    if (space === "hsla") {
                        that.value = CPGlobal.RGBtoHSB.apply(null, CPGlobal.HSLtoRGB.apply(null, values));
                    } else {
                        that.value = CPGlobal.RGBtoHSB.apply(null, values);
                    }
                    return false;
                }
            });
        };
        Color.prototype.setHue = function(h) {
            return this.value.h = 1 - h;
        };
        Color.prototype.setSaturation = function(s) {
            return this.value.s = s;
        };
        Color.prototype.setLightness = function(b) {
            return this.value.b = 1 - b;
        };
        Color.prototype.setAlpha = function(a) {
            return this.value.a = parseInt((1 - a) * 100, 10) / 100;
        };
        Color.prototype.toRGB = function(h, s, b, a) {
            var B, C, G, R, X;
            if (!h) {
                h = this.value.h;
                s = this.value.s;
                b = this.value.b;
            }
            h *= 360;
            R = void 0;
            G = void 0;
            B = void 0;
            X = void 0;
            C = void 0;
            h = h % 360 / 60;
            C = b * s;
            X = C * (1 - Math.abs(h % 2 - 1));
            R = G = B = b - C;
            h = ~~h;
            R += [ C, X, 0, 0, X, C ][h];
            G += [ X, C, C, X, 0, 0 ][h];
            B += [ 0, 0, X, C, C, X ][h];
            return {
                r: Math.round(R * 255),
                g: Math.round(G * 255),
                b: Math.round(B * 255),
                a: a || this.value.a
            };
        };
        Color.prototype.toHex = function(h, s, b, a) {
            var g, r, rgb;
            rgb = this.toRGB(h, s, b, a);
            r = parseInt(rgb.r, 10) << 16;
            g = parseInt(rgb.g, 10) << 8;
            b = parseInt(rgb.b, 10);
            return "#" + (1 << 24 | r | g | b).toString(16).substr(1);
        };
        Color.prototype.toHSL = function(h, s, b, a) {
            var H, L, S;
            if (!h) {
                h = this.value.h;
                s = this.value.s;
                b = this.value.b;
            }
            H = h;
            L = (2 - s) * b;
            S = s * b;
            if (L > 0 && L <= 1) {
                S /= L;
            } else {
                S /= 2 - L;
            }
            L /= 2;
            if (S > 1) {
                S = 1;
            }
            return {
                h: H,
                s: S,
                l: L,
                a: a || this.value.a
            };
        };
        return Color;
    }();
    Colorpicker = function() {
        function Colorpicker(element, options) {
            var format;
            this.element = $(element);
            format = options.format || this.element.data("color-format") || "hex";
            this.format = CPGlobal.translateFormats[format];
            this.isInput = this.element.is("input");
            this.component = this.element.is(".color") ? this.element.find(".add-on") : false;
            this.picker = $(CPGlobal.template).appendTo("body");
            this.picker.on("mousedown", $.proxy(this.mousedown, this));
            this.picker.on("touchstart", $.proxy(this.mousedown, this));
            if (this.isInput) {
                this.element.on({
                    focus: $.proxy(this.show, this),
                    keyup: $.proxy(this.update, this)
                });
            }
            if (format === "rgba" || format === "hsla") {
                this.picker.addClass("alpha");
                this.alpha = this.picker.find(".colorpicker-alpha")[0].style;
            }
            if (this.component) {
                this.picker.find(".colorpicker-color").hide();
                this.preview = this.element.find("i")[0].style;
            } else {
                this.preview = this.picker.find("div:last")[0].style;
            }
            this.base = this.picker.find("div:first")[0].style;
            this.update();
        }
        Colorpicker.prototype.show = function(e) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            $(window).on("resize", $.proxy(this.place, this));
            if (!this.isInput) {
                if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
            return this.element.trigger({
                type: "show",
                color: this.color
            });
        };
        Colorpicker.prototype.update = function() {
            this.color = new Color(this.isInput ? this.element.prop("value") : this.element.data("color"));
            this.picker.find("i").eq(0).css({
                left: this.color.value.s * size,
                top: size - this.color.value.b * size
            }).end().eq(1).css("top", size * (1 - this.color.value.h)).end().eq(2).css("top", size * (1 - this.color.value.a));
            return this.previewColor();
        };
        Colorpicker.prototype.setValue = function(newColor) {
            this.color = new Color(newColor);
            this.picker.find("i").eq(0).css({
                left: this.color.value.s * size,
                top: size - this.color.value.b * size
            }).end().eq(1).css("top", size * (1 - this.color.value.h)).end().eq(2).css("top", size * (1 - this.color.value.a));
            this.previewColor();
            return this.element.trigger({
                type: "changeColor",
                color: this.color
            });
        };
        Colorpicker.prototype.hide = function() {
            this.picker.hide();
            $(window).off("resize", this.place);
            if (!this.isInput) {
                if (this.component) {
                    this.element.find("input").prop("value", this.format.call(this));
                }
                this.element.data("color", this.format.call(this));
            } else {
                this.element.prop("value", this.format.call(this));
            }
            return this.element.trigger({
                type: "hide",
                color: this.color
            });
        };
        Colorpicker.prototype.place = function() {
            var offset, thing;
            thing = this.component ? this.component : this.element;
            offset = thing.offset();
            return this.picker.css({
                top: offset.top - (thing.height() + this.picker.height()),
                left: offset.left
            });
        };
        Colorpicker.prototype.previewColor = function() {
            var e;
            try {
                this.preview.backgroundColor = this.format.call(this);
            } catch (_error) {
                e = _error;
                this.preview.backgroundColor = this.color.toHex();
            }
            this.base.backgroundColor = this.color.toHex(this.color.value.h, 1, 1, 1);
            if (this.alpha) {
                return this.alpha.backgroundColor = this.color.toHex();
            }
        };
        Colorpicker.prototype.pointer = null;
        Colorpicker.prototype.slider = null;
        Colorpicker.prototype.mousedown = function(e) {
            var offset, p, target, zone;
            e.stopPropagation();
            e.preventDefault();
            target = $(e.target);
            zone = target.closest("div");
            if (!zone.is(".colorpicker")) {
                if (zone.is(".colorpicker-saturation")) {
                    this.slider = $.extend({}, CPGlobal.sliders.saturation);
                } else if (zone.is(".colorpicker-hue")) {
                    this.slider = $.extend({}, CPGlobal.sliders.hue);
                } else if (zone.is(".colorpicker-alpha")) {
                    this.slider = $.extend({}, CPGlobal.sliders.alpha);
                } else {
                    return false;
                }
                offset = zone.offset();
                p = positionForEvent(e);
                this.slider.knob = zone.find("i")[0].style;
                this.slider.left = p.pageX - offset.left;
                this.slider.top = p.pageY - offset.top;
                this.pointer = {
                    left: p.pageX,
                    top: p.pageY
                };
                $(this.picker).on({
                    mousemove: $.proxy(this.mousemove, this),
                    mouseup: $.proxy(this.mouseup, this),
                    touchmove: $.proxy(this.mousemove, this),
                    touchend: $.proxy(this.mouseup, this),
                    touchcancel: $.proxy(this.mouseup, this)
                }).trigger("mousemove");
            }
            return false;
        };
        Colorpicker.prototype.mousemove = function(e) {
            var left, p, top, x, y;
            e.stopPropagation();
            e.preventDefault();
            p = positionForEvent(e);
            x = p ? p.pageX : this.pointer.left;
            y = p ? p.pageY : this.pointer.top;
            left = Math.max(0, Math.min(this.slider.maxLeft, this.slider.left + (x - this.pointer.left)));
            top = Math.max(0, Math.min(this.slider.maxTop, this.slider.top + (y - this.pointer.top)));
            this.slider.knob.left = left + "px";
            this.slider.knob.top = top + "px";
            if (this.slider.callLeft) {
                this.color[this.slider.callLeft].call(this.color, left / size);
            }
            if (this.slider.callTop) {
                this.color[this.slider.callTop].call(this.color, top / size);
            }
            this.previewColor();
            this.element.trigger({
                type: "changeColor",
                color: this.color
            });
            return false;
        };
        Colorpicker.prototype.mouseup = function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this.picker).off({
                mousemove: this.mousemove,
                mouseup: this.mouseup
            });
            return false;
        };
        return Colorpicker;
    }();
    $.fn.colorpicker = function(option) {
        return this.each(function() {
            var $this, data, options;
            $this = $(this);
            data = $this.data("colorpicker");
            options = typeof option === "object" && option;
            if (!data) {
                $this.data("colorpicker", data = new Colorpicker(this, $.extend({}, $.fn.colorpicker.defaults, options)));
            }
            if (typeof option === "string") {
                return data[option]();
            }
        });
    };
    $.fn.colorpicker.defaults = {};
    $.fn.colorpicker.Constructor = Colorpicker;
    CPGlobal = {
        translateFormats: {
            rgb: function() {
                var rgb;
                rgb = this.color.toRGB();
                return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            },
            rgba: function() {
                var rgb;
                rgb = this.color.toRGB();
                return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + rgb.a + ")";
            },
            hsl: function() {
                var hsl;
                hsl = this.color.toHSL();
                return "hsl(" + Math.round(hsl.h * 360) + "," + Math.round(hsl.s * 100) + "%," + Math.round(hsl.l * 100) + "%)";
            },
            hsla: function() {
                var hsl;
                hsl = this.color.toHSL();
                return "hsla(" + Math.round(hsl.h * 360) + "," + Math.round(hsl.s * 100) + "%," + Math.round(hsl.l * 100) + "%," + hsl.a + ")";
            },
            hex: function() {
                return this.color.toHex();
            }
        },
        sliders: {
            saturation: {
                maxLeft: size,
                maxTop: size,
                callLeft: "setSaturation",
                callTop: "setLightness"
            },
            hue: {
                maxLeft: 0,
                maxTop: size,
                callLeft: false,
                callTop: "setHue"
            },
            alpha: {
                maxLeft: 0,
                maxTop: size,
                callLeft: false,
                callTop: "setAlpha"
            }
        },
        RGBtoHSB: function(r, g, b, a) {
            var C, H, S, V;
            r /= 255;
            g /= 255;
            b /= 255;
            H = void 0;
            S = void 0;
            V = void 0;
            C = void 0;
            V = Math.max(r, g, b);
            C = V - Math.min(r, g, b);
            H = C === 0 ? null : V === r ? (g - b) / C : V === g ? (b - r) / C + 2 : (r - g) / C + 4;
            H = (H + 360) % 6 * 60 / 360;
            S = C === 0 ? 0 : C / V;
            return {
                h: H || 1,
                s: S,
                b: V,
                a: a || 1
            };
        },
        HueToRGB: function(p, q, h) {
            if (h < 0) {
                h += 1;
            } else {
                if (h > 1) {
                    h -= 1;
                }
            }
            if (h * 6 < 1) {
                return p + (q - p) * h * 6;
            } else if (h * 2 < 1) {
                return q;
            } else if (h * 3 < 2) {
                return p + (q - p) * (2 / 3 - h) * 6;
            } else {
                return p;
            }
        },
        HSLtoRGB: function(h, s, l, a) {
            var b, g, p, q, r, tb, tg, tr;
            if (s < 0) {
                s = 0;
            }
            q = void 0;
            if (l <= .5) {
                q = l * (1 + s);
            } else {
                q = l + s - l * s;
            }
            p = 2 * l - q;
            tr = h + 1 / 3;
            tg = h;
            tb = h - 1 / 3;
            r = Math.round(CPGlobal.HueToRGB(p, q, tr) * 255);
            g = Math.round(CPGlobal.HueToRGB(p, q, tg) * 255);
            b = Math.round(CPGlobal.HueToRGB(p, q, tb) * 255);
            return [ r, g, b, a || 1 ];
        },
        stringParsers: [ {
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [ execResult[1], execResult[2], execResult[3], execResult[4] ];
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [ 2.55 * execResult[1], 2.55 * execResult[2], 2.55 * execResult[3], execResult[4] ];
            }
        }, {
            re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            parse: function(execResult) {
                return [ parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16) ];
            }
        }, {
            re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
            parse: function(execResult) {
                return [ parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16) ];
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(execResult) {
                return [ execResult[1] / 360, execResult[2] / 100, execResult[3] / 100, execResult[4] ];
            }
        } ],
        template: '<div class="colorpicker">\n  <div class="colorpicker-saturation">\n    <i>\n      <b></b>\n    </i>\n  </div>\n  <div class="colorpicker-hue">\n    <i></i>\n  </div>\n  <div class="colorpicker-alpha">\n    <i></i>\n  </div>\n  <div class="colorpicker-color">\n    <div></div>\n  </div>\n</div>"'
    };
}).call(this);

(function() {
    var _ref, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    window.LC = (_ref = window.LC) != null ? _ref : {};
    LC.LiterallyCanvas = function() {
        function LiterallyCanvas(canvas, opts) {
            var backgroundImage;
            this.canvas = canvas;
            this.opts = opts;
            this.updateSize = __bind(this.updateSize, this);
            LC.bindEvents(this, this.canvas, this.opts.keyboardShortcuts);
            this.colors = {
                primary: this.opts.primaryColor || "#000",
                secondary: this.opts.secondaryColor || "#fff",
                background: this.opts.backgroundColor || "transparent"
            };
            this.canvas.style.backgroundColor = this.colors.background;
            this.watermarkImage = this.opts.watermarkImage;
            if (this.watermarkImage && !this.watermarkImage.complete) {
                this.watermarkImage.onload = function(_this) {
                    return function() {
                        return _this.repaint(true, false);
                    };
                }(this);
            }
            this.buffer = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.bufferCtx = this.buffer.getContext("2d");
            this.backgroundShapes = [];
            this.shapes = [];
            this.undoStack = [];
            this.redoStack = [];
            this.isDragging = false;
            this.position = {
                x: 0,
                y: 0
            };
            this.scale = 1;
            this.tool = new LC.Pencil();
            if (this.opts.preserveCanvasContents) {
                backgroundImage = new Image();
                backgroundImage.src = this.canvas.toDataURL();
                backgroundImage.onload = function(_this) {
                    return function() {
                        return _this.repaint();
                    };
                }(this);
                this.backgroundShapes.push(new LC.ImageShape(0, 0, backgroundImage));
            }
            this.backgroundShapes = this.backgroundShapes.concat(this.opts.backgroundShapes || []);
            if (this.opts.sizeToContainer) {
                LC.util.sizeToContainer(this.canvas, function(_this) {
                    return function() {
                        return _this.repaint();
                    };
                }(this));
            }
            this.repaint();
        }
        LiterallyCanvas.prototype.updateSize = function() {
            this.canvas.setAttribute("width", this.canvas.clientWidth);
            this.canvas.setAttribute("height", this.canvas.clientHeight);
            return this.repaint();
        };
        LiterallyCanvas.prototype.trigger = function(name, data) {
            return this.canvas.dispatchEvent(new CustomEvent(name, {
                detail: data
            }));
        };
        LiterallyCanvas.prototype.on = function(name, fn) {
            return this.canvas.addEventListener(name, function(e) {
                return fn(e.detail);
            });
        };
        LiterallyCanvas.prototype.removeEventListener = function(name, fn) {
            return this.canvas.removeEventListener(name, fn);
        };
        LiterallyCanvas.prototype.clientCoordsToDrawingCoords = function(x, y) {
            return {
                x: (x - this.position.x) / this.scale,
                y: (y - this.position.y) / this.scale
            };
        };
        LiterallyCanvas.prototype.drawingCoordsToClientCoords = function(x, y) {
            return {
                x: x * this.scale + this.position.x,
                y: y * this.scale + this.position.y
            };
        };
        LiterallyCanvas.prototype.setTool = function(tool) {
            this.tool = tool;
            return this.trigger("toolChange", {
                tool: tool
            });
        };
        LiterallyCanvas.prototype.begin = function(x, y) {
            var newPos;
            newPos = this.clientCoordsToDrawingCoords(x, y);
            this.tool.begin(newPos.x, newPos.y, this);
            this.isDragging = true;
            return this.trigger("drawStart", {
                tool: this.tool
            });
        };
        LiterallyCanvas.prototype["continue"] = function(x, y) {
            var newPos;
            newPos = this.clientCoordsToDrawingCoords(x, y);
            if (this.isDragging) {
                this.tool["continue"](newPos.x, newPos.y, this);
                return this.trigger("drawContinue", {
                    tool: this.tool
                });
            }
        };
        LiterallyCanvas.prototype.end = function(x, y) {
            var newPos;
            newPos = this.clientCoordsToDrawingCoords(x, y);
            if (this.isDragging) {
                this.tool.end(newPos.x, newPos.y, this);
                this.isDragging = false;
                return this.trigger("drawEnd", {
                    tool: this.tool
                });
            }
        };
        LiterallyCanvas.prototype.setColor = function(name, color) {
            this.colors[name] = color;
            this.canvas.style.backgroundColor = this.colors.background;
            this.trigger("" + name + "ColorChange", this.colors[name]);
            return this.repaint();
        };
        LiterallyCanvas.prototype.getColor = function(name) {
            return this.colors[name];
        };
        LiterallyCanvas.prototype.saveShape = function(shape) {
            this.execute(new LC.AddShapeAction(this, shape));
            this.trigger("shapeSave", {
                shape: shape
            });
            return this.trigger("drawingChange", {
                shape: shape
            });
        };
        LiterallyCanvas.prototype.numShapes = function() {
            return this.shapes.length;
        };
        LiterallyCanvas.prototype.pan = function(x, y) {
            this.position.x = this.position.x - x;
            this.position.y = this.position.y - y;
            return this.trigger("pan", {
                x: this.position.x,
                y: this.position.y
            });
        };
        LiterallyCanvas.prototype.zoom = function(factor) {
            var oldScale;
            oldScale = this.scale;
            this.scale = this.scale + factor;
            this.scale = Math.max(this.scale, .6);
            this.scale = Math.min(this.scale, 4);
            this.scale = Math.round(this.scale * 100) / 100;
            this.position.x = LC.scalePositionScalar(this.position.x, this.canvas.width, oldScale, this.scale);
            this.position.y = LC.scalePositionScalar(this.position.y, this.canvas.height, oldScale, this.scale);
            this.repaint();
            return this.trigger("zoom", {
                oldScale: oldScale,
                newScale: this.scale
            });
        };
        LiterallyCanvas.prototype.repaint = function(dirty, drawBackground) {
            var retryCallback;
            if (dirty == null) {
                dirty = true;
            }
            if (drawBackground == null) {
                drawBackground = false;
            }
            retryCallback = function(_this) {
                return function() {
                    return _this.repaint(true);
                };
            }(this);
            if (dirty) {
                this.buffer.width = this.canvas.width;
                this.buffer.height = this.canvas.height;
                this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
                if (drawBackground) {
                    this.bufferCtx.fillStyle = this.colors.background;
                    this.bufferCtx.fillRect(0, 0, this.buffer.width, this.buffer.height);
                }
                if (this.watermarkImage) {
                    this.bufferCtx.drawImage(this.watermarkImage, this.canvas.width / 2 - this.watermarkImage.width / 2, this.canvas.height / 2 - this.watermarkImage.height / 2);
                }
                this.draw(this.backgroundShapes, this.bufferCtx, retryCallback);
                this.draw(this.shapes, this.bufferCtx, retryCallback);
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.canvas.width > 0 && this.canvas.height > 0) {
                this.ctx.drawImage(this.buffer, 0, 0);
            }
            return this.trigger("repaint", null);
        };
        LiterallyCanvas.prototype.update = function(shape) {
            this.repaint(false);
            return this.transformed(function(_this) {
                return function() {
                    return shape.update(_this.ctx);
                };
            }(this), this.ctx);
        };
        LiterallyCanvas.prototype.draw = function(shapes, ctx, retryCallback) {
            var drawShapes;
            if (!shapes.length) {
                return;
            }
            drawShapes = function(_this) {
                return function() {
                    var shape, _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = shapes.length; _i < _len; _i++) {
                        shape = shapes[_i];
                        _results.push(shape.draw(ctx, retryCallback));
                    }
                    return _results;
                };
            }(this);
            return this.transformed(drawShapes, ctx);
        };
        LiterallyCanvas.prototype.transformed = function(fn, ctx) {
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.scale(this.scale, this.scale);
            fn();
            return ctx.restore();
        };
        LiterallyCanvas.prototype.clear = function() {
            var newShapes, oldShapes;
            oldShapes = this.shapes;
            newShapes = [];
            this.execute(new LC.ClearAction(this, oldShapes, newShapes));
            this.repaint();
            this.trigger("clear", null);
            return this.trigger("drawingChange", {});
        };
        LiterallyCanvas.prototype.execute = function(action) {
            this.undoStack.push(action);
            action["do"]();
            return this.redoStack = [];
        };
        LiterallyCanvas.prototype.undo = function() {
            var action;
            if (!this.undoStack.length) {
                return;
            }
            action = this.undoStack.pop();
            action.undo();
            this.redoStack.push(action);
            this.trigger("undo", {
                action: action
            });
            return this.trigger("drawingChange", {});
        };
        LiterallyCanvas.prototype.redo = function() {
            var action;
            if (!this.redoStack.length) {
                return;
            }
            action = this.redoStack.pop();
            this.undoStack.push(action);
            action["do"]();
            this.trigger("redo", {
                action: action
            });
            return this.trigger("drawingChange", {});
        };
        LiterallyCanvas.prototype.canUndo = function() {
            return !!this.undoStack.length;
        };
        LiterallyCanvas.prototype.canRedo = function() {
            return !!this.redoStack.length;
        };
        LiterallyCanvas.prototype.getPixel = function(x, y) {
            var p, pixel;
            p = this.drawingCoordsToClientCoords(x, y);
            pixel = this.ctx.getImageData(p.x, p.y, 1, 1).data;
            if (pixel[3]) {
                return "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
            } else {
                return null;
            }
        };
        LiterallyCanvas.prototype.canvasForExport = function() {
            this.repaint(true, true);
            return this.canvas;
        };
        LiterallyCanvas.prototype.canvasWithBackground = function(backgroundImageOrCanvas) {
            this.repaint(true, true);
            return LC.util.combineCanvases(backgroundImageOrCanvas, this.canvasForExport());
        };
        LiterallyCanvas.prototype.getSnapshot = function() {
            var shape;
            return {
                shapes: function() {
                    var _i, _len, _ref1, _results;
                    _ref1 = this.shapes;
                    _results = [];
                    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                        shape = _ref1[_i];
                        _results.push(shape.toJSON());
                    }
                    return _results;
                }.call(this),
                colors: this.colors
            };
        };
        LiterallyCanvas.prototype.getSnapshotJSON = function() {
            return JSON.stringify(this.getSnapshot());
        };
        LiterallyCanvas.prototype.loadSnapshot = function(snapshot) {
            var k, shape, shapeRepr, _i, _j, _len, _len1, _ref1, _ref2;
            if (!snapshot) {
                return;
            }
            _ref1 = [ "primary", "secondary", "background" ];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                k = _ref1[_i];
                this.setColor(k, snapshot.colors[k]);
            }
            this.shapes = [];
            _ref2 = snapshot.shapes;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                shapeRepr = _ref2[_j];
                if (shapeRepr.className in LC) {
                    shape = LC[shapeRepr.className].fromJSON(this, shapeRepr.data);
                    if (shape) {
                        this.execute(new LC.AddShapeAction(this, shape));
                    }
                }
            }
            this.repaint(true);
            return this.trigger("drawingChange", {});
        };
        LiterallyCanvas.prototype.loadSnapshotJSON = function(str) {
            return this.loadSnapshot(JSON.parse(str));
        };
        return LiterallyCanvas;
    }();
    LC.ClearAction = function() {
        function ClearAction(lc, oldShapes, newShapes) {
            this.lc = lc;
            this.oldShapes = oldShapes;
            this.newShapes = newShapes;
        }
        ClearAction.prototype["do"] = function() {
            this.lc.shapes = this.newShapes;
            return this.lc.repaint();
        };
        ClearAction.prototype.undo = function() {
            this.lc.shapes = this.oldShapes;
            return this.lc.repaint();
        };
        return ClearAction;
    }();
    LC.AddShapeAction = function() {
        function AddShapeAction(lc, shape) {
            this.lc = lc;
            this.shape = shape;
        }
        AddShapeAction.prototype["do"] = function() {
            this.ix = this.lc.shapes.length;
            this.lc.shapes.push(this.shape);
            return this.lc.repaint();
        };
        AddShapeAction.prototype.undo = function() {
            this.lc.shapes.pop(this.ix);
            return this.lc.repaint();
        };
        return AddShapeAction;
    }();
}).call(this);

(function() {
    var buttonIsDown, coordsForTouchEvent, position;
    coordsForTouchEvent = function($el, e) {
        var p, tx, ty;
        tx = e.originalEvent.changedTouches[0].pageX;
        ty = e.originalEvent.changedTouches[0].pageY;
        p = $el.offset();
        return [ tx - p.left, ty - p.top ];
    };
    position = function(e) {
        var p;
        if (e.offsetX != null) {
            return {
                left: e.offsetX,
                top: e.offsetY
            };
        } else {
            p = $(e.target).offset();
            return {
                left: e.pageX - p.left,
                top: e.pageY - p.top
            };
        }
    };
    buttonIsDown = function(e) {
        if (e.buttons != null) {
            return e.buttons === 1;
        } else {
            return e.which > 0;
        }
    };
    LC.bindEvents = function(lc, canvas, panWithKeyboard) {
        var $c;
        if (panWithKeyboard == null) {
            panWithKeyboard = false;
        }
        $c = $(canvas);
        $c.mousedown(function(_this) {
            return function(e) {
                var down, p;
                down = true;
                e.originalEvent.preventDefault();
                document.onselectstart = function() {
                    return false;
                };
                p = position(e);
                return lc.begin(p.left, p.top);
            };
        }(this));
        $c.mousemove(function(_this) {
            return function(e) {
                var p;
                e.originalEvent.preventDefault();
                p = position(e);
                return lc["continue"](p.left, p.top);
            };
        }(this));
        $c.mouseup(function(_this) {
            return function(e) {
                var p;
                e.originalEvent.preventDefault();
                document.onselectstart = function() {
                    return true;
                };
                p = position(e);
                return lc.end(p.left, p.top);
            };
        }(this));
        $c.mouseenter(function(_this) {
            return function(e) {
                var p;
                p = position(e);
                if (buttonIsDown(e)) {
                    return lc.begin(p.left, p.top);
                }
            };
        }(this));
        $c.mouseout(function(_this) {
            return function(e) {
                var p;
                p = position(e);
                return lc.end(p.left, p.top);
            };
        }(this));
        $c.bind("touchstart", function(e) {
            e.preventDefault();
            if (e.originalEvent.touches.length === 1) {
                return lc.begin.apply(lc, coordsForTouchEvent($c, e));
            } else {
                return lc["continue"].apply(lc, coordsForTouchEvent($c, e));
            }
        });
        $c.bind("touchmove", function(e) {
            e.preventDefault();
            return lc["continue"].apply(lc, coordsForTouchEvent($c, e));
        });
        $c.bind("touchend", function(e) {
            e.preventDefault();
            if (e.originalEvent.touches.length !== 0) {
                return;
            }
            return lc.end.apply(lc, coordsForTouchEvent($c, e));
        });
        $c.bind("touchcancel", function(e) {
            e.preventDefault();
            if (e.originalEvent.touches.length !== 0) {
                return;
            }
            return lc.end.apply(lc, coordsForTouchEvent($c, e));
        });
        if (panWithKeyboard) {
            return $(document).keydown(function(e) {
                switch (e.which) {
                  case 37:
                    lc.pan(-10, 0);
                    break;

                  case 38:
                    lc.pan(0, -10);
                    break;

                  case 39:
                    lc.pan(10, 0);
                    break;

                  case 40:
                    lc.pan(0, 10);
                }
                return lc.repaint();
            });
        }
    };
}).call(this);

(function() {
    var dual, mid, normals, refine, slope, unit, _ref;
    window.LC = (_ref = window.LC) != null ? _ref : {};
    LC.bspline = function(points, order) {
        if (!order) {
            return points;
        }
        return LC.bspline(dual(dual(refine(points))), order - 1);
    };
    refine = function(points) {
        var index, point, refined, _i, _len;
        points = [ points[0] ].concat(points).concat(LC.util.last(points));
        refined = [];
        index = 0;
        for (_i = 0, _len = points.length; _i < _len; _i++) {
            point = points[_i];
            refined[index * 2] = point;
            if (points[index + 1]) {
                refined[index * 2 + 1] = mid(point, points[index + 1]);
            }
            index += 1;
        }
        return refined;
    };
    dual = function(points) {
        var dualed, index, point, _i, _len;
        dualed = [];
        index = 0;
        for (_i = 0, _len = points.length; _i < _len; _i++) {
            point = points[_i];
            if (points[index + 1]) {
                dualed[index] = mid(point, points[index + 1]);
            }
            index += 1;
        }
        return dualed;
    };
    mid = function(a, b) {
        return new LC.Point(a.x + (b.x - a.x) / 2, a.y + (b.y - a.y) / 2, a.size + (b.size - a.size) / 2, a.color);
    };
    LC.toPoly = function(line) {
        var index, n, point, polyLeft, polyRight, _i, _len;
        polyLeft = [];
        polyRight = [];
        index = 0;
        for (_i = 0, _len = line.length; _i < _len; _i++) {
            point = line[_i];
            n = normals(point, slope(line, index));
            polyLeft = polyLeft.concat([ n[0] ]);
            polyRight = [ n[1] ].concat(polyRight);
            index += 1;
        }
        return polyLeft.concat(polyRight);
    };
    slope = function(line, index) {
        var point;
        if (line.length < 3) {
            point = {
                x: 0,
                y: 0
            };
        }
        if (index === 0) {
            point = slope(line, index + 1);
        } else if (index === line.length - 1) {
            point = slope(line, index - 1);
        } else {
            point = LC.diff(line[index - 1], line[index + 1]);
        }
        return point;
    };
    LC.diff = function(a, b) {
        return {
            x: b.x - a.x,
            y: b.y - a.y
        };
    };
    unit = function(vector) {
        var length;
        length = LC.len(vector);
        return {
            x: vector.x / length,
            y: vector.y / length
        };
    };
    normals = function(p, slope) {
        slope = unit(slope);
        slope.x = slope.x * p.size / 2;
        slope.y = slope.y * p.size / 2;
        return [ {
            x: p.x - slope.y,
            y: p.y + slope.x,
            color: p.color
        }, {
            x: p.x + slope.y,
            y: p.y - slope.x,
            color: p.color
        } ];
    };
    LC.len = function(vector) {
        return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    };
    LC.scalePositionScalar = function(val, viewportSize, oldScale, newScale) {
        var newSize, oldSize;
        oldSize = viewportSize * oldScale;
        newSize = viewportSize * newScale;
        return val + (oldSize - newSize) / 2;
    };
}).call(this);

(function() {
    var _ref, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };
    window.LC = (_ref = window.LC) != null ? _ref : {};
    LC.Shape = function() {
        function Shape() {}
        Shape.prototype.className = null;
        Shape.prototype.draw = function(ctx) {};
        Shape.prototype.update = function(ctx) {
            return this.draw(ctx);
        };
        Shape.prototype.toJSON = function() {
            return {
                className: this.className,
                data: this.jsonContent()
            };
        };
        Shape.prototype.jsonContent = function() {
            return raise("not implemented");
        };
        Shape.fromJSON = function(lc, data) {
            return raise("not implemented");
        };
        return Shape;
    }();
    LC.ImageShape = function(_super) {
        __extends(ImageShape, _super);
        ImageShape.prototype.className = "ImageShape";
        function ImageShape(x, y, image) {
            this.x = x;
            this.y = y;
            this.image = image;
        }
        ImageShape.prototype.draw = function(ctx, retryCallback) {
            if (this.image.width) {
                return ctx.drawImage(this.image, this.x, this.y);
            } else {
                return this.image.onload = retryCallback;
            }
        };
        ImageShape.prototype.jsonContent = function() {
            return {
                x: this.x,
                y: this.y,
                imageSrc: this.image.src
            };
        };
        ImageShape.fromJSON = function(lc, data) {
            var i, img;
            img = new Image();
            img.src = data.imageSrc;
            i = new LC.ImageShape(data.x, data.y, img);
            return i;
        };
        return ImageShape;
    }(LC.Shape);
    LC.Rectangle = function(_super) {
        __extends(Rectangle, _super);
        Rectangle.prototype.className = "Rectangle";
        function Rectangle(x, y, strokeWidth, strokeColor, fillColor) {
            this.x = x;
            this.y = y;
            this.strokeWidth = strokeWidth;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
            this.width = 0;
            this.height = 0;
        }
        Rectangle.prototype.draw = function(ctx) {
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.strokeColor;
            return ctx.strokeRect(this.x, this.y, this.width, this.height);
        };
        Rectangle.prototype.jsonContent = function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                strokeWidth: this.strokeWidth,
                strokeColor: this.strokeColor,
                fillColor: this.fillColor
            };
        };
        Rectangle.fromJSON = function(lc, data) {
            var shape;
            shape = new LC.Rectangle(data.x, data.y, data.strokeWidth, data.strokeColor, data.fillColor);
            shape.width = data.width;
            shape.height = data.height;
            return shape;
        };
        return Rectangle;
    }(LC.Shape);
    LC.Circle = function(_super) {
        __extends(Circle, _super);
        Circle.prototype.className = "Circle";
        function Circle(x, y, strokeWidth, strokeColor, fillColor, width, height) {
            this.x = x;
            this.y = y;
            this.strokeWidth = strokeWidth;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
            this.width = width != null ? width : 0;
            this.height = height != null ? height : 0;
        }
        Circle.prototype.draw = function(ctx) {
            var centerX, centerY, halfHeight, halfWidth;
            ctx.save();
            halfWidth = Math.floor(this.width / 2);
            halfHeight = Math.floor(this.height / 2);
            centerX = this.x + halfWidth;
            centerY = this.y + halfHeight;
            ctx.translate(centerX, centerY);
            ctx.scale(1, Math.abs(this.height / this.width));
            ctx.beginPath();
            ctx.arc(0, 0, Math.abs(halfWidth), 0, Math.PI * 2);
            ctx.closePath();
            ctx.restore();
            ctx.fillStyle = this.fillColor;
            ctx.fill();
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.strokeColor;
            return ctx.stroke();
        };
        Circle.prototype.jsonContent = function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                strokeWidth: this.strokeWidth,
                strokeColor: this.strokeColor,
                fillColor: this.fillColor
            };
        };
        Circle.fromJSON = function(lc, data) {
            return new LC.Circle(data.x, data.y, data.strokeWidth, data.strokeColor, data.fillColor, data.width, data.height);
        };
        return Circle;
    }(LC.Shape);
    LC.Line = function(_super) {
        __extends(Line, _super);
        Line.prototype.className = "Line";
        function Line(x1, y1, x2, y2, strokeWidth, color) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.strokeWidth = strokeWidth;
            this.color = color;
        }
        Line.prototype.draw = function(ctx) {
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.color;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            return ctx.stroke();
        };
        Line.prototype.jsonContent = function() {
            return {
                x1: this.x1,
                y1: this.y1,
                x2: this.x2,
                y2: this.y2,
                strokeWidth: this.strokeWidth,
                color: this.color
            };
        };
        Line.fromJSON = function(lc, data) {
            var shape;
            shape = new LC.Line(data.x1, data.y1, data.x2, data.y2, data.strokeWidth, data.color);
            return shape;
        };
        return Line;
    }(LC.Shape);
    LC.LinePathShape = function(_super) {
        __extends(LinePathShape, _super);
        LinePathShape.prototype.className = "LinePathShape";
        function LinePathShape(_points, order, tailSize) {
            var point, _i, _len;
            if (_points == null) {
                _points = [];
            }
            this.order = order != null ? order : 3;
            this.tailSize = tailSize != null ? tailSize : 3;
            this.segmentSize = Math.pow(2, this.order);
            this.sampleSize = this.tailSize + 1;
            this.points = [];
            for (_i = 0, _len = _points.length; _i < _len; _i++) {
                point = _points[_i];
                this.addPoint(point);
            }
        }
        LinePathShape.prototype.jsonContent = function() {
            return {
                order: this.order,
                tailSize: this.tailSize,
                points: this.points
            };
        };
        LinePathShape.fromJSON = function(lc, data) {
            var pointData, points;
            points = function() {
                var _i, _len, _ref1, _results;
                _ref1 = data.points;
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    pointData = _ref1[_i];
                    _results.push(new LC.Point.fromJSON(lc, pointData));
                }
                return _results;
            }();
            return new LC.LinePathShape(points, data.order, data.tailSize);
        };
        LinePathShape.prototype.addPoint = function(point) {
            this.points.push(point);
            if (!this.smoothedPoints || this.points.length < this.sampleSize) {
                return this.smoothedPoints = LC.bspline(this.points, this.order);
            } else {
                this.tail = LC.util.last(LC.bspline(LC.util.last(this.points, this.sampleSize), this.order), this.segmentSize * this.tailSize);
                return this.smoothedPoints = this.smoothedPoints.slice(0, this.smoothedPoints.length - this.segmentSize * (this.tailSize - 1)).concat(this.tail);
            }
        };
        LinePathShape.prototype.draw = function(ctx) {
            var point, points, _i, _len, _ref1;
            points = this.smoothedPoints;
            if (!points.length) {
                return;
            }
            ctx.strokeStyle = points[0].color;
            ctx.lineWidth = points[0].size;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            _ref1 = points.slice(1);
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                point = _ref1[_i];
                ctx.lineTo(point.x, point.y);
            }
            return ctx.stroke();
        };
        return LinePathShape;
    }(LC.Shape);
    LC.EraseLinePathShape = function(_super) {
        __extends(EraseLinePathShape, _super);
        function EraseLinePathShape() {
            return EraseLinePathShape.__super__.constructor.apply(this, arguments);
        }
        EraseLinePathShape.prototype.className = "EraseLinePathShape";
        EraseLinePathShape.prototype.draw = function(ctx) {
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            EraseLinePathShape.__super__.draw.call(this, ctx);
            return ctx.restore();
        };
        EraseLinePathShape.prototype.update = function(ctx) {
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            EraseLinePathShape.__super__.update.call(this, ctx);
            return ctx.restore();
        };
        EraseLinePathShape.fromJSON = function(lc, data) {
            var pointData, points;
            points = function() {
                var _i, _len, _ref1, _results;
                _ref1 = data.points;
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    pointData = _ref1[_i];
                    _results.push(new LC.Point.fromJSON(lc, pointData));
                }
                return _results;
            }();
            return new LC.EraseLinePathShape(points, data.order, data.tailSize);
        };
        return EraseLinePathShape;
    }(LC.LinePathShape);
    LC.Point = function() {
        Point.prototype.className = "Point";
        function Point(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
        }
        Point.prototype.lastPoint = function() {
            return this;
        };
        Point.prototype.draw = function(ctx) {
            return console.log("draw point", this.x, this.y, this.size, this.color);
        };
        Point.prototype.jsonContent = function() {
            return {
                x: this.x,
                y: this.y,
                size: this.size,
                color: this.color
            };
        };
        Point.fromJSON = function(lc, data) {
            return new LC.Point(data.x, data.y, data.size, data.color);
        };
        return Point;
    }();
    LC.TextShape = function(_super) {
        __extends(TextShape, _super);
        TextShape.prototype.className = "TextShape";
        function TextShape(x, y, text, color, font) {
            this.x = x;
            this.y = y;
            this.text = text;
            this.color = color;
            this.font = font != null ? font : "18px sans-serif;";
        }
        TextShape.prototype.draw = function(ctx) {
            ctx.font = this.font;
            ctx.fillStyle = this.color;
            return ctx.fillText(this.text, this.x, this.y);
        };
        TextShape.prototype.jsonContent = function() {
            return {
                x: this.x,
                y: this.y,
                text: this.text,
                color: this.color,
                font: this.font
            };
        };
        TextShape.fromJSON = function(lc, data) {
            return new LC.TextShape(data.x, data.y, data.text, data.color, data.font);
        };
        return TextShape;
    }(LC.Shape);
}).call(this);

(function() {
    var _ref;
    window.LC = (_ref = window.LC) != null ? _ref : {};
    LC.toolbarHTML = '<div class="toolbar-row"> <div class="toolbar-row-left"> <div class="tools button-group"></div> &nbsp;&nbsp;&nbsp;&nbsp;Background: <div class="color-square background-picker">&nbsp;</div> </div> <div class="toolbar-row-right"> <div class="action-buttons"> <div class="button clear-button danger">Clear</div> <div class="button-group"> <div class="button btn-warning undo-button">&larr;</div><div class="button btn-warning redo-button">&rarr;</div> </div> <div class="button-group"> <div class="button btn-inverse zoom-out-button">&ndash;</div><div class="button btn-inverse zoom-in-button">+</div> </div> <div class="zoom-display">1</div> </div> </div> <div class="clearfix"></div> </div> <div class="toolbar-row"> <div class="toolbar-row-left"> <div class="color-square primary-picker"></div> <div class="color-square secondary-picker"></div> <div class="tool-options-container"></div> </div> <div class="clearfix"></div> </div>';
    LC.makeColorPicker = function($el, title, callback) {
        var cp;
        $el.data("color", "rgb(0, 0, 0)");
        cp = $el.colorpicker({
            format: "rgba"
        }).data("colorpicker");
        cp.hide();
        $el.on("changeColor", function(e) {
            callback(e.color.toRGB());
            return $(document).one("click", function() {
                return cp.hide();
            });
        });
        $el.click(function(e) {
            if (cp.picker.is(":visible")) {
                return cp.hide();
            } else {
                $(document).one("click", function() {
                    return $(document).one("click", function() {
                        return cp.hide();
                    });
                });
                cp.show();
                return cp.place();
            }
        });
        return cp;
    };
    LC.Toolbar = function() {
        function Toolbar(lc, $el, opts) {
            this.lc = lc;
            this.$el = $el;
            this.opts = opts;
            this.$el.append(LC.toolbarHTML);
            this.initColors();
            this.initButtons();
            this.initTools();
            this.initZoom();
        }
        Toolbar.prototype._bindColorPicker = function(name, title) {
            var $el;
            $el = this.$el.find("." + name + "-picker");
            $el.css("background-color", this.lc.getColor(name));
            $el.css("background-position", "0% 0%");
            this.lc.on("" + name + "ColorChange", function(_this) {
                return function(color) {
                    return $el.css("background-color", color);
                };
            }(this));
            return LC.makeColorPicker($el, "" + title + " color", function(_this) {
                return function(c) {
                    _this.lc.setColor(name, "rgba(" + c.r + ", " + c.g + ", " + c.b + ", " + c.a + ")");
                    return $el.css("background-position", "0% " + (1 - c.a) * 100 + "%");
                };
            }(this));
        };
        Toolbar.prototype.initColors = function() {
            var pickers;
            this.$el.find(".primary-picker, .secondary-picker, .background-picker").css("background-image", "url(" + this.opts.imageURLPrefix + "/alpha.png)");
            this.$el.find(".secondary-picker").css("background-position", "0% 100%");
            pickers = [ this._bindColorPicker("primary", "Primary (stroke)"), this._bindColorPicker("secondary", "Secondary (fill)"), this._bindColorPicker("background", "Background") ];
            return this.lc.on("drawStart", function() {
                var picker, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = pickers.length; _i < _len; _i++) {
                    picker = pickers[_i];
                    _results.push(picker.hide());
                }
                return _results;
            });
        };
        Toolbar.prototype.initButtons = function() {
            this.$el.find(".clear-button").click(function(_this) {
                return function(e) {
                    return _this.lc.clear();
                };
            }(this));
            this.$el.find(".undo-button").click(function(_this) {
                return function(e) {
                    return _this.lc.undo();
                };
            }(this));
            return this.$el.find(".redo-button").click(function(_this) {
                return function(e) {
                    return _this.lc.redo();
                };
            }(this));
        };
        Toolbar.prototype.initTools = function() {
            var ToolClass, t, _i, _len, _ref1, _results;
            this.tools = [];
            _ref1 = this.opts.toolClasses;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                ToolClass = _ref1[_i];
                t = new ToolClass(this.opts);
                this.tools.push(t);
                _results.push(this.addTool(t));
            }
            return _results;
        };
        Toolbar.prototype.addTool = function(t) {
            var buttonEl, optsEl;
            optsEl = $("<div class='tool-options tool-options-" + t.cssSuffix + "'></div>");
            optsEl.html(t.options());
            optsEl.hide();
            t.$el = optsEl;
            this.$el.find(".tool-options-container").append(optsEl);
            buttonEl = $("<div class='button tool-" + t.cssSuffix + "'> <div class='tool-image-wrapper'></div></div>").appendTo(this.$el.find(".tools")).find(".tool-image-wrapper").html(t.button());
            buttonEl.click(function(_this) {
                return function(e) {
                    return _this.selectTool(t);
                };
            }(this));
            return null;
        };
        Toolbar.prototype.initZoom = function() {
            this.$el.find(".zoom-in-button").click(function(_this) {
                return function(e) {
                    _this.lc.zoom(.2);
                    return _this.$el.find(".zoom-display").html(_this.lc.scale);
                };
            }(this));
            return this.$el.find(".zoom-out-button").click(function(_this) {
                return function(e) {
                    _this.lc.zoom(-.2);
                    return _this.$el.find(".zoom-display").html(_this.lc.scale);
                };
            }(this));
        };
        Toolbar.prototype.selectTool = function(t) {
            this.$el.find(".tools .active").removeClass("active");
            this.$el.find(".tools .tool-" + t.cssSuffix).addClass("active");
            t.select(this.lc);
            this.$el.find(".tool-options").hide();
            if (t.$el) {
                return t.$el.show();
            }
        };
        return Toolbar;
    }();
}).call(this);

(function() {
    var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };
    LC.Tool = function() {
        function Tool() {}
        Tool.prototype.begin = function(x, y, lc) {};
        Tool.prototype["continue"] = function(x, y, lc) {};
        Tool.prototype.end = function(x, y, lc) {};
        Tool.prototype.optionsStyle = null;
        return Tool;
    }();
    LC.StrokeTool = function(_super) {
        __extends(StrokeTool, _super);
        function StrokeTool() {
            this.strokeWidth = 5;
        }
        StrokeTool.prototype.optionsStyle = "stroke-width";
        return StrokeTool;
    }(LC.Tool);
    LC.RectangleTool = function(_super) {
        __extends(RectangleTool, _super);
        function RectangleTool() {
            return RectangleTool.__super__.constructor.apply(this, arguments);
        }
        RectangleTool.prototype.begin = function(x, y, lc) {
            return this.currentShape = new LC.Rectangle(x, y, this.strokeWidth, lc.getColor("primary"), lc.getColor("secondary"));
        };
        RectangleTool.prototype["continue"] = function(x, y, lc) {
            this.currentShape.width = x - this.currentShape.x;
            this.currentShape.height = y - this.currentShape.y;
            return lc.update(this.currentShape);
        };
        RectangleTool.prototype.end = function(x, y, lc) {
            return lc.saveShape(this.currentShape);
        };
        return RectangleTool;
    }(LC.StrokeTool);
    LC.CircleTool = function(_super) {
        __extends(CircleTool, _super);
        function CircleTool() {
            return CircleTool.__super__.constructor.apply(this, arguments);
        }
        CircleTool.prototype.begin = function(x, y, lc) {
            return this.currentShape = new LC.Circle(x, y, this.strokeWidth, lc.getColor("primary"), lc.getColor("secondary"));
        };
        CircleTool.prototype["continue"] = function(x, y, lc) {
            this.currentShape.width = x - this.currentShape.x;
            this.currentShape.height = y - this.currentShape.y;
            return lc.update(this.currentShape);
        };
        CircleTool.prototype.end = function(x, y, lc) {
            return lc.saveShape(this.currentShape);
        };
        return CircleTool;
    }(LC.StrokeTool);
    LC.LineTool = function(_super) {
        __extends(LineTool, _super);
        function LineTool() {
            return LineTool.__super__.constructor.apply(this, arguments);
        }
        LineTool.prototype.begin = function(x, y, lc) {
            return this.currentShape = new LC.Line(x, y, x, y, this.strokeWidth, lc.getColor("primary"));
        };
        LineTool.prototype["continue"] = function(x, y, lc) {
            this.currentShape.x2 = x;
            this.currentShape.y2 = y;
            return lc.update(this.currentShape);
        };
        LineTool.prototype.end = function(x, y, lc) {
            return lc.saveShape(this.currentShape);
        };
        return LineTool;
    }(LC.StrokeTool);
    LC.Pencil = function(_super) {
        __extends(Pencil, _super);
        function Pencil() {
            return Pencil.__super__.constructor.apply(this, arguments);
        }
        Pencil.prototype.begin = function(x, y, lc) {
            this.color = lc.getColor("primary");
            this.currentShape = this.makeShape();
            return this.currentShape.addPoint(this.makePoint(x, y, lc));
        };
        Pencil.prototype["continue"] = function(x, y, lc) {
            this.currentShape.addPoint(this.makePoint(x, y, lc));
            return lc.update(this.currentShape);
        };
        Pencil.prototype.end = function(x, y, lc) {
            lc.saveShape(this.currentShape);
            return this.currentShape = void 0;
        };
        Pencil.prototype.makePoint = function(x, y, lc) {
            return new LC.Point(x, y, this.strokeWidth, this.color);
        };
        Pencil.prototype.makeShape = function() {
            return new LC.LinePathShape(this);
        };
        return Pencil;
    }(LC.StrokeTool);
    LC.Eraser = function(_super) {
        __extends(Eraser, _super);
        function Eraser() {
            this.strokeWidth = 10;
        }
        Eraser.prototype.makePoint = function(x, y, lc) {
            return new LC.Point(x, y, this.strokeWidth, "#000");
        };
        Eraser.prototype.makeShape = function() {
            return new LC.EraseLinePathShape(this);
        };
        return Eraser;
    }(LC.Pencil);
    LC.Pan = function(_super) {
        __extends(Pan, _super);
        function Pan() {
            return Pan.__super__.constructor.apply(this, arguments);
        }
        Pan.prototype.begin = function(x, y, lc) {
            return this.start = {
                x: x,
                y: y
            };
        };
        Pan.prototype["continue"] = function(x, y, lc) {
            lc.pan(this.start.x - x, this.start.y - y);
            return lc.repaint();
        };
        Pan.prototype.end = function(x, y, lc) {
            return lc.repaint();
        };
        return Pan;
    }(LC.Tool);
    LC.EyeDropper = function(_super) {
        __extends(EyeDropper, _super);
        function EyeDropper() {
            return EyeDropper.__super__.constructor.apply(this, arguments);
        }
        EyeDropper.prototype.readColor = function(x, y, lc) {
            var newColor;
            newColor = lc.getPixel(x, y);
            return lc.setColor("primary", newColor || lc.getColor("background"));
        };
        EyeDropper.prototype.begin = function(x, y, lc) {
            return this.readColor(x, y, lc);
        };
        EyeDropper.prototype["continue"] = function(x, y, lc) {
            return this.readColor(x, y, lc);
        };
        return EyeDropper;
    }(LC.Tool);
    LC.TextTool = function(_super) {
        __extends(TextTool, _super);
        function TextTool(text, font) {
            this.text = text != null ? text : "";
            this.font = font != null ? font : "bold 18px sans-serif";
        }
        TextTool.prototype.setText = function(text) {
            return this.text = text;
        };
        TextTool.prototype.begin = function(x, y, lc) {
            this.color = lc.getColor("primary");
            return this.currentShape = new LC.TextShape(x, y, this.text, this.color, this.font);
        };
        TextTool.prototype["continue"] = function(x, y, lc) {
            this.currentShape.x = x;
            this.currentShape.y = y;
            return lc.update(this.currentShape);
        };
        TextTool.prototype.end = function(x, y, lc) {
            return lc.saveShape(this.currentShape);
        };
        TextTool.prototype.optionsStyle = "font";
        return TextTool;
    }(LC.Tool);
}).call(this);

(function() {
    var slice, _ref;
    window.LC = (_ref = window.LC) != null ? _ref : {};
    slice = Array.prototype.slice;
    LC.util = {
        last: function(array, n) {
            if (n == null) {
                n = null;
            }
            if (n) {
                return slice.call(array, Math.max(array.length - n, 0));
            } else {
                return array[array.length - 1];
            }
        },
        sizeToContainer: function(canvas, callback) {
            var $canvas, $container, resize;
            if (callback == null) {
                callback = function() {};
            }
            $canvas = $(canvas);
            $container = $canvas.parent();
            resize = function(_this) {
                return function() {
                    canvas.style.width = "" + $container.width() + "px";
                    canvas.style.height = "" + $container.height() + "px";
                    canvas.setAttribute("width", $canvas.width());
                    canvas.setAttribute("height", $canvas.height());
                    return callback();
                };
            }(this);
            $container.resize(resize);
            $(window).bind("orientationchange resize", resize);
            return resize();
        },
        combineCanvases: function(a, b) {
            var c, ctx;
            c = $("<canvas>").get(0);
            c.width = Math.max(a.width, b.width);
            c.height = Math.max(a.height, b.height);
            ctx = c.getContext("2d");
            ctx.drawImage(a, 0, 0);
            ctx.drawImage(b, 0, 0);
            return c;
        }
    };
}).call(this);

(function() {
    var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, __slice = [].slice;
    LC.Widget = function() {
        function Widget(opts) {
            this.opts = opts;
        }
        Widget.prototype.title = void 0;
        Widget.prototype.cssSuffix = void 0;
        Widget.prototype.button = function() {
            return void 0;
        };
        Widget.prototype.options = function() {
            return void 0;
        };
        Widget.prototype.select = function(lc) {};
        return Widget;
    }();
    LC.ToolWidget = function(_super) {
        __extends(ToolWidget, _super);
        function ToolWidget(opts) {
            this.opts = opts;
            this.tool = this.makeTool();
        }
        ToolWidget.prototype.select = function(lc) {
            return lc.setTool(this.tool);
        };
        ToolWidget.prototype.makeTool = function() {
            return void 0;
        };
        return ToolWidget;
    }(LC.Widget);
    LC.StrokeWidget = function(_super) {
        __extends(StrokeWidget, _super);
        function StrokeWidget() {
            return StrokeWidget.__super__.constructor.apply(this, arguments);
        }
        StrokeWidget.prototype.options = function() {
            var $brushWidthVal, $el, $input;
            $el = $("<span class='brush-width-min'>1 px</span><input type='range' min='1' max='50' step='1' value='" + this.tool.strokeWidth + "'><span class='brush-width-max'>50 px</span><span class='brush-width-val'>(5 px)</span>");
            $input = $el.filter("input");
            if ($input.size() === 0) {
                $input = $el.find("input");
            }
            $brushWidthVal = $el.filter(".brush-width-val");
            if ($brushWidthVal.size() === 0) {
                $brushWidthVal = $el.find(".brush-width-val");
            }
            $input.change(function(_this) {
                return function(e) {
                    _this.tool.strokeWidth = parseInt($(e.currentTarget).val(), 10);
                    return $brushWidthVal.html("(" + _this.tool.strokeWidth + " px)");
                };
            }(this));
            return $el;
        };
        return StrokeWidget;
    }(LC.ToolWidget);
    LC.RectangleWidget = function(_super) {
        __extends(RectangleWidget, _super);
        function RectangleWidget() {
            return RectangleWidget.__super__.constructor.apply(this, arguments);
        }
        RectangleWidget.prototype.title = "Rectangle";
        RectangleWidget.prototype.cssSuffix = "rectangle";
        RectangleWidget.prototype.button = function() {
            return "<img src='" + this.opts.imageURLPrefix + "/rectangle.png'>";
        };
        RectangleWidget.prototype.makeTool = function() {
            return new LC.RectangleTool();
        };
        return RectangleWidget;
    }(LC.StrokeWidget);
    LC.LineWidget = function(_super) {
        __extends(LineWidget, _super);
        function LineWidget() {
            return LineWidget.__super__.constructor.apply(this, arguments);
        }
        LineWidget.prototype.title = "Line";
        LineWidget.prototype.cssSuffix = "line";
        LineWidget.prototype.button = function() {
            return "<img src='" + this.opts.imageURLPrefix + "/line.png'>";
        };
        LineWidget.prototype.makeTool = function() {
            return new LC.LineTool();
        };
        return LineWidget;
    }(LC.StrokeWidget);
    LC.PencilWidget = function(_super) {
        __extends(PencilWidget, _super);
        function PencilWidget() {
            return PencilWidget.__super__.constructor.apply(this, arguments);
        }
        PencilWidget.prototype.title = "Pencil";
        PencilWidget.prototype.cssSuffix = "pencil";
        PencilWidget.prototype.button = function() {
            return "<img src='" + this.opts.imageURLPrefix + "/pencil.png'>";
        };
        PencilWidget.prototype.makeTool = function() {
            return new LC.Pencil();
        };
        return PencilWidget;
    }(LC.StrokeWidget);
    LC.EraserWidget = function(_super) {
        __extends(EraserWidget, _super);
        function EraserWidget() {
            return EraserWidget.__super__.constructor.apply(this, arguments);
        }
        EraserWidget.prototype.title = "Eraser";
        EraserWidget.prototype.cssSuffix = "eraser";
        EraserWidget.prototype.button = function() {
            return "<img src='" + this.opts.imageURLPrefix + "/eraser.png'>";
        };
        EraserWidget.prototype.makeTool = function() {
            return new LC.Eraser();
        };
        return EraserWidget;
    }(LC.PencilWidget);
    LC.PanWidget = function(_super) {
        __extends(PanWidget, _super);
        function PanWidget() {
            return PanWidget.__super__.constructor.apply(this, arguments);
        }
        PanWidget.prototype.title = "Pan";
        PanWidget.prototype.cssSuffix = "pan";
        PanWidget.prototype.button = function() {
            return "<img src='" + this.opts.imageURLPrefix + "/pan.png'>";
        };
        PanWidget.prototype.makeTool = function() {
            return new LC.Pan();
        };
        return PanWidget;
    }(LC.ToolWidget);
    LC.EyeDropperWidget = function(_super) {
        __extends(EyeDropperWidget, _super);
        function EyeDropperWidget() {
            return EyeDropperWidget.__super__.constructor.apply(this, arguments);
        }
        EyeDropperWidget.prototype.title = "Eyedropper";
        EyeDropperWidget.prototype.cssSuffix = "eye-dropper";
        EyeDropperWidget.prototype.button = function() {
            return "<img src='" + this.opts.imageURLPrefix + "/eyedropper.png'>";
        };
        EyeDropperWidget.prototype.makeTool = function() {
            return new LC.EyeDropper();
        };
        return EyeDropperWidget;
    }(LC.ToolWidget);
    LC.TextWidget = function(_super) {
        __extends(TextWidget, _super);
        TextWidget.prototype.getFamilies = function() {
            return [ {
                name: "Sans-serif",
                value: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            }, {
                name: "Serif",
                value: ('Garamond,Baskerville,"Baskerville Old Face",', '"Hoefler Text","Times New Roman",serif')
            }, {
                name: "Typewriter",
                value: ('"Courier New",Courier,"Lucida Sans Typewriter",', '"Lucida Typewriter",monospace')
            } ];
        };
        TextWidget.prototype.title = "Text";
        TextWidget.prototype.cssSuffix = "text";
        function TextWidget() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            TextWidget.__super__.constructor.apply(this, args);
        }
        TextWidget.prototype.button = function() {
            return "<img src='" + this.opts.imageURLPrefix + "/text.png'>";
        };
        TextWidget.prototype.select = function(lc) {
            this.updateTool();
            lc.setTool(this.tool);
            return setTimeout(function(_this) {
                return function() {
                    _this.$input.focus();
                    return _this.$input.select();
                };
            }(this), 0);
        };
        TextWidget.prototype.makeTool = function() {
            return new LC.TextTool();
        };
        TextWidget.prototype.options = function() {
            var $fontSize, family, familyOptions, i, updateAndFocus, _i, _len, _ref;
            if (this.$el) {
                return this.$el;
            }
            familyOptions = [];
            i = 0;
            _ref = this.getFamilies();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                family = _ref[_i];
                familyOptions.push("<option value=" + i + ">" + family.name + "</option>");
                i += 1;
            }
            this.$el = $("<div> <input type='text' id='text' placeholder='Enter text here' value='" + this.tool.text + "'> <input type='text' id='font-size' value='18'> <select id='family'>" + familyOptions.join("") + "</select> <label for='italic'><input type='checkbox' id='italic'>italic</label> <label for='bold'><input type='checkbox' id='bold'>bold</label> <span class='instructions'>Click and hold to place text.</span> </div>");
            this.$input = this.$el.find("input#text");
            $fontSize = this.$el.find("input#font-size");
            updateAndFocus = function(_this) {
                return function() {
                    _this.updateTool();
                    return _this.$input.focus();
                };
            }(this);
            this.$input.keyup(function(_this) {
                return function() {
                    return _this.updateTool();
                };
            }(this));
            $fontSize.keyup(function(_this) {
                return function() {
                    return _this.updateTool();
                };
            }(this));
            this.$input.change(updateAndFocus);
            $fontSize.change(updateAndFocus);
            this.$el.find("input#italic").change(updateAndFocus);
            this.$el.find("input#bold").change(updateAndFocus);
            this.$el.find("#family").change(updateAndFocus);
            return this.$el;
        };
        TextWidget.prototype.updateTool = function() {
            var familyIndex, items;
            items = [];
            if (this.$el.find("input#italic").is(":checked")) {
                items.push("italic");
            }
            if (this.$el.find("input#bold").is(":checked")) {
                items.push("bold");
            }
            items.push("" + parseInt(this.$el.find("input#font-size").val(), 10) + "px");
            familyIndex = parseInt(this.$el.find("select#family").val(), 10);
            items.push(this.getFamilies()[familyIndex].value);
            this.tool.font = items.join(" ");
            return this.tool.text = this.$el.find("input#text").val();
        };
        return TextWidget;
    }(LC.ToolWidget);
}).call(this);

(function() {
    var RedoButton, UndoButton, ZoomInButton, ZoomOutButton, createToolComponent, createUndoRedoButtonComponent, createZoomButtonComponent;
    window.LC = LC || {};
    LC.React = LC.React || {};
    createToolComponent = function(_arg) {
        var displayName, getTool, imageName, tool;
        displayName = _arg.displayName, getTool = _arg.getTool, imageName = _arg.imageName;
        tool = getTool();
        return React.createClass({
            displayName: displayName,
            getDefaultProps: function() {
                return {
                    isSelected: false,
                    lc: null
                };
            },
            componentWillMount: function() {
                if (this.props.isSelected) {
                    return this.props.lc.setTool(tool);
                }
            },
            render: function() {
                var className, div, imageURLPrefix, img, isSelected, onSelect, _ref, _ref1;
                _ref = React.DOM, div = _ref.div, img = _ref.img;
                _ref1 = this.props, imageURLPrefix = _ref1.imageURLPrefix, isSelected = _ref1.isSelected, 
                onSelect = _ref1.onSelect;
                className = React.addons.classSet({
                    "lc-pick-tool": true,
                    "toolbar-button": true,
                    "thin-button": true,
                    selected: isSelected
                });
                return div({
                    className: className,
                    onClick: function() {
                        return onSelect(tool);
                    }
                }, img({
                    className: "lc-tool-icon",
                    src: "" + imageURLPrefix + "/" + imageName + ".png"
                }));
            }
        });
    };
    LC.React.ToolButtons = {
        Pencil: createToolComponent({
            displayName: "Pencil",
            imageName: "pencil",
            getTool: function() {
                return new LC.Pencil();
            }
        }),
        Eraser: createToolComponent({
            displayName: "Eraser",
            imageName: "eraser",
            getTool: function() {
                return new LC.Eraser();
            }
        }),
        Line: createToolComponent({
            displayName: "Line",
            imageName: "line",
            getTool: function() {
                return new LC.LineTool();
            }
        }),
        Rectangle: createToolComponent({
            displayName: "Rectangle",
            imageName: "rectangle",
            getTool: function() {
                return new LC.RectangleTool();
            }
        }),
        Circle: createToolComponent({
            displayName: "Circle",
            imageName: "circle",
            getTool: function() {
                return new LC.CircleTool();
            }
        }),
        Text: createToolComponent({
            displayName: "Text",
            imageName: "text",
            getTool: function() {
                return new LC.TextTool();
            }
        }),
        Pan: createToolComponent({
            displayName: "Pan",
            imageName: "pan",
            getTool: function() {
                return new LC.Pan();
            }
        }),
        Eyedropper: createToolComponent({
            displayName: "Eyedropper",
            imageName: "eyedropper",
            getTool: function() {
                return new LC.EyeDropper();
            }
        })
    };
    LC.React.Mixins = {
        UpdateOnDrawingChangeMixin: {
            componentDidMount: function() {
                this.subscriber = function(_this) {
                    return function() {
                        return _this.setState(_this.getState());
                    };
                }(this);
                return this.props.lc.on("drawingChange", this.subscriber);
            },
            componentWillUnmount: function() {
                return this.props.lc.removeEventListener("drawingChange", this.subscriber);
            }
        },
        UpdateOnToolChangeMixin: {
            componentDidMount: function() {
                this.subscriber = function(_this) {
                    return function() {
                        return _this.setState(_this.getState());
                    };
                }(this);
                return this.props.lc.on("toolChange", this.subscriber);
            },
            componentWillUnmount: function() {
                return this.props.lc.removeEventListener("toolChange", this.subscriber);
            }
        }
    };
    LC.React.Picker = React.createClass({
        displayName: "Picker",
        getInitialState: function() {
            return {
                selectedToolIndex: 0
            };
        },
        render: function() {
            var div, imageURLPrefix, lc, toolNames, _ref;
            div = React.DOM.div;
            _ref = this.props, toolNames = _ref.toolNames, lc = _ref.lc, imageURLPrefix = _ref.imageURLPrefix;
            return div({
                className: "lc-picker-contents"
            }, toolNames.map(function(_this) {
                return function(name, ix) {
                    return LC.React.ToolButtons[name]({
                        lc: lc,
                        imageURLPrefix: imageURLPrefix,
                        key: ix,
                        isSelected: ix === _this.state.selectedToolIndex,
                        onSelect: function(tool) {
                            lc.setTool(tool);
                            return _this.setState({
                                selectedToolIndex: ix
                            });
                        }
                    });
                };
            }(this)), toolNames.length % 2 !== 0 ? div({
                className: "toolbar-button thin-button disabled"
            }) : void 0, LC.React.UndoRedo({
                lc: lc,
                imageURLPrefix: imageURLPrefix
            }), LC.React.ZoomButtons({
                lc: lc
            }), LC.React.ClearButton({
                lc: lc
            }), LC.React.ColorPickers({
                lc: lc
            }));
        }
    });
    createUndoRedoButtonComponent = function(undoOrRedo) {
        return React.createClass({
            displayName: undoOrRedo === "undo" ? "UndoButton" : "RedoButton",
            getState: function() {
                return {
                    isEnabled: function() {
                        switch (false) {
                          case undoOrRedo !== "undo":
                            return this.props.lc.canUndo();

                          case undoOrRedo !== "redo":
                            return this.props.lc.canRedo();
                        }
                    }.call(this)
                };
            },
            getInitialState: function() {
                return this.getState();
            },
            mixins: [ LC.React.Mixins.UpdateOnDrawingChangeMixin ],
            render: function() {
                var className, div, lc, onClick;
                div = React.DOM.div;
                lc = this.props.lc;
                className = "lc-" + undoOrRedo + " " + React.addons.classSet({
                    "toolbar-button": true,
                    "thin-button": true,
                    disabled: !this.state.isEnabled
                });
                onClick = function() {
                    switch (false) {
                      case !!this.state.isEnabled:
                        return function() {};

                      case undoOrRedo !== "undo":
                        return function() {
                            return lc.undo();
                        };

                      case undoOrRedo !== "redo":
                        return function() {
                            return lc.redo();
                        };
                    }
                }.call(this);
                return div({
                    className: className,
                    onClick: onClick,
                    dangerouslySetInnerHTML: {
                        __html: undoOrRedo === "undo" ? "&larr;" : "&rarr;"
                    }
                });
            }
        });
    };
    UndoButton = createUndoRedoButtonComponent("undo");
    RedoButton = createUndoRedoButtonComponent("redo");
    LC.React.UndoRedo = React.createClass({
        displayName: "UndoRedo",
        render: function() {
            var div, lc;
            div = React.DOM.div;
            lc = this.props.lc;
            return div({
                className: "lc-undo-redo"
            }, UndoButton({
                lc: lc
            }), RedoButton({
                lc: lc
            }));
        }
    });
    createZoomButtonComponent = function(inOrOut) {
        return React.createClass({
            displayName: inOrOut === "in" ? "ZoomInButton" : "ZoomOutButton",
            getState: function() {
                return {
                    isEnabled: function() {
                        switch (false) {
                          case inOrOut !== "in":
                            return this.props.lc.scale < 4;

                          case inOrOut !== "out":
                            return this.props.lc.scale > .6;
                        }
                    }.call(this)
                };
            },
            getInitialState: function() {
                return this.getState();
            },
            componentDidMount: function() {
                this.subscriber = function(_this) {
                    return function() {
                        return _this.setState(_this.getState());
                    };
                }(this);
                return this.props.lc.on("zoom", this.subscriber);
            },
            componentWillUnmount: function() {
                return this.props.lc.removeEventListener("zoom", this.subscriber);
            },
            render: function() {
                var className, div, lc, onClick;
                div = React.DOM.div;
                lc = this.props.lc;
                className = "lc-zoom-" + inOrOut + " " + React.addons.classSet({
                    "toolbar-button": true,
                    "thin-button": true,
                    disabled: !this.state.isEnabled
                });
                onClick = function() {
                    switch (false) {
                      case !!this.state.isEnabled:
                        return function() {};

                      case inOrOut !== "in":
                        return function() {
                            return lc.zoom(.2);
                        };

                      case inOrOut !== "out":
                        return function() {
                            return lc.zoom(-.2);
                        };
                    }
                }.call(this);
                return div({
                    className: className,
                    onClick: onClick
                }, function() {
                    switch (false) {
                      case inOrOut !== "in":
                        return "+";

                      case inOrOut !== "out":
                        return "-";
                    }
                }());
            }
        });
    };
    ZoomOutButton = createZoomButtonComponent("out");
    ZoomInButton = createZoomButtonComponent("in");
    LC.React.ZoomButtons = React.createClass({
        displayName: "ZoomButtons",
        render: function() {
            var div, lc;
            div = React.DOM.div;
            lc = this.props.lc;
            return div({
                className: "lc-zoom"
            }, ZoomOutButton({
                lc: lc
            }), ZoomInButton({
                lc: lc
            }));
        }
    });
    LC.React.ClearButton = React.createClass({
        displayName: "ClearButton",
        getState: function() {
            return {
                isEnabled: this.props.lc.canUndo()
            };
        },
        getInitialState: function() {
            return this.getState();
        },
        mixins: [ LC.React.Mixins.UpdateOnDrawingChangeMixin ],
        render: function() {
            var className, div, lc, onClick;
            div = React.DOM.div;
            lc = this.props.lc;
            className = React.addons.classSet({
                "lc-clear": true,
                "toolbar-button": true,
                "fat-button": true,
                disabled: !this.state.isEnabled
            });
            onClick = lc.canUndo() ? function(_this) {
                return function() {
                    return lc.clear();
                };
            }(this) : function() {};
            return div({
                className: className,
                onClick: onClick
            }, "Clear");
        }
    });
    LC.React.ColorPickers = React.createClass({
        displayName: "ColorPickers",
        render: function() {
            var div, lc;
            lc = this.props.lc;
            div = React.DOM.div;
            return div({
                className: "lc-color-pickers"
            }, LC.React.ColorWell({
                lc: lc,
                colorName: "background",
                label: "background"
            }), LC.React.ColorWell({
                lc: lc,
                colorName: "primary",
                label: "stroke"
            }), LC.React.ColorWell({
                lc: lc,
                colorName: "secondary",
                label: "fill"
            }));
        }
    });
    LC.React.ColorWell = React.createClass({
        displayName: "ColorWell",
        getState: function() {
            return {
                color: this.props.lc.colors[this.props.colorName],
                isPickerVisible: false
            };
        },
        getInitialState: function() {
            return this.getState();
        },
        togglePicker: function() {
            return this.setState({
                isPickerVisible: !this.state.isPickerVisible
            });
        },
        closePicker: function() {
            return this.setState({
                isPickerVisible: false
            });
        },
        setColor: function(c) {
            this.props.lc.setColor(this.props.colorName, c);
            return this.setState(this.getState());
        },
        render: function() {
            var div, label, _ref;
            _ref = React.DOM, div = _ref.div, label = _ref.label;
            return div({
                className: "toolbar-button color-well-label",
                onMouseLeave: this.closePicker
            }, label({
                style: {
                    display: "block",
                    clear: "both"
                }
            }, this.props.label), div({
                className: React.addons.classSet({
                    "color-well-container": true,
                    selected: this.state.isPickerVisible
                }),
                onClick: this.togglePicker,
                style: {
                    backgroundColor: "white",
                    position: "relative"
                }
            }, div({
                className: "color-well-checker"
            }), div({
                className: "color-well-checker",
                style: {
                    left: "50%",
                    top: "50%"
                }
            }), div({
                className: "color-well-color",
                style: {
                    backgroundColor: this.state.color
                }
            }, " "), this.renderPicker()));
        },
        renderPicker: function() {
            var div, hue, i, rows, _i, _len, _ref;
            div = React.DOM.div;
            if (!this.state.isPickerVisible) {
                return null;
            }
            rows = [ function() {
                var _i, _results;
                _results = [];
                for (i = _i = 0; _i <= 100; i = _i += 10) {
                    _results.push("hsl(0, 0%, " + i + "%)");
                }
                return _results;
            }() ];
            _ref = [ 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330 ];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                hue = _ref[_i];
                rows.push(function() {
                    var _j, _results;
                    _results = [];
                    for (i = _j = 10; _j <= 90; i = _j += 8) {
                        _results.push("hsl(" + hue + ", 100%, " + i + "%)");
                    }
                    return _results;
                }());
            }
            return div({
                className: "color-picker-popup"
            }, rows.map(function(_this) {
                return function(row, ix) {
                    return div({
                        className: "color-row",
                        key: ix,
                        style: {
                            width: 20 * row.length
                        }
                    }, row.map(function(cellColor, ix2) {
                        var className;
                        className = React.addons.classSet({
                            "color-cell": true,
                            selected: _this.state.color === cellColor
                        });
                        return div({
                            className: className,
                            onClick: function() {
                                return _this.setColor(cellColor);
                            },
                            style: {
                                backgroundColor: cellColor
                            },
                            key: ix2
                        });
                    }));
                };
            }(this)));
        }
    });
}).call(this);

(function() {
    window.LC = LC || {};
    LC.React = LC.React || {};
    LC.React.Options = React.createClass({
        displayName: "Options",
        getState: function() {
            var _ref;
            return {
                style: (_ref = this.props.lc.tool) != null ? _ref.optionsStyle : void 0,
                tool: this.props.lc.tool
            };
        },
        getInitialState: function() {
            return this.getState();
        },
        mixins: [ LC.React.Mixins.UpdateOnToolChangeMixin ],
        render: function() {
            var style;
            style = "" + this.state.style;
            return LC.React.OptionsStyles[style]({
                lc: this.props.lc,
                tool: this.state.tool
            });
        }
    });
    LC.React.OptionsStyles = {
        font: React.createClass({
            displayName: "FontOptions",
            getText: function() {
                var _ref;
                return (_ref = this.props.lc.tool) != null ? _ref.text : void 0;
            },
            getInitialState: function() {
                return {
                    text: this.getText(),
                    isItalic: false,
                    isBold: false,
                    fontFamilyIndex: 0,
                    fontSizeIndex: 4
                };
            },
            getFontSizes: function() {
                return [ 9, 10, 12, 14, 18, 24, 36, 48, 64, 72, 96, 144, 288 ];
            },
            getFamilies: function() {
                return [ {
                    name: "Sans-serif",
                    value: '"Helvetica Neue",Helvetica,Arial,sans-serif'
                }, {
                    name: "Serif",
                    value: ('Garamond,Baskerville,"Baskerville Old Face",', '"Hoefler Text","Times New Roman",serif')
                }, {
                    name: "Typewriter",
                    value: ('"Courier New",Courier,"Lucida Sans Typewriter",', '"Lucida Typewriter",monospace')
                } ];
            },
            updateTool: function(newState) {
                var fontSize, items, k;
                if (newState == null) {
                    newState = {};
                }
                for (k in this.state) {
                    if (!(k in newState)) {
                        newState[k] = this.state[k];
                    }
                }
                fontSize = this.getFontSizes()[newState.fontSizeIndex];
                items = [];
                if (newState.isItalic) {
                    items.push("italic");
                }
                if (newState.isBold) {
                    items.push("bold");
                }
                items.push("" + fontSize + "px");
                items.push(this.getFamilies()[newState.fontFamilyIndex].value);
                return this.props.lc.tool.font = items.join(" ");
            },
            handleText: function(event) {
                this.props.lc.tool.text = event.target.value;
                return this.setState({
                    text: this.getText()
                });
            },
            handleFontSize: function(event) {
                var newState;
                newState = {
                    fontSizeIndex: event.target.value
                };
                this.setState(newState);
                return this.updateTool(newState);
            },
            handleFontFamily: function(event) {
                var newState;
                newState = {
                    fontFamilyIndex: event.target.value
                };
                this.setState(newState);
                return this.updateTool(newState);
            },
            handleItalic: function(event) {
                var newState;
                newState = {
                    isItalic: !this.state.isItalic
                };
                this.setState(newState);
                return this.updateTool(newState);
            },
            handleBold: function(event) {
                var newState;
                newState = {
                    isBold: !this.state.isBold
                };
                this.setState(newState);
                return this.updateTool(newState);
            },
            componentDidMount: function() {
                return this.updateTool();
            },
            render: function() {
                var br, div, input, label, option, select, span, _ref;
                _ref = React.DOM, div = _ref.div, input = _ref.input, select = _ref.select, option = _ref.option, 
                br = _ref.br, label = _ref.label, span = _ref.span;
                return div({
                    className: "lc-font-settings"
                }, input({
                    type: "text",
                    placeholder: "Enter text here",
                    value: this.state.text,
                    onChange: this.handleText
                }), span({
                    className: "instructions"
                }, "Click and hold to place text."), br(), "Size: ", select({
                    value: this.state.fontSizeIndex,
                    onChange: this.handleFontSize
                }, this.getFontSizes().map(function(_this) {
                    return function(size, ix) {
                        return option({
                            value: ix,
                            key: ix
                        }, size);
                    };
                }(this))), select({
                    value: this.state.fontFamilyIndex,
                    onChange: this.handleFontFamily
                }, this.getFamilies().map(function(_this) {
                    return function(family, ix) {
                        return option({
                            value: ix,
                            key: ix
                        }, family.name);
                    };
                }(this))), label({
                    htmlFor: "italic"
                }, input({
                    type: "checkbox",
                    id: "italic",
                    checked: this.state.isItalic,
                    onChange: this.handleItalic
                }, "italic")), label({
                    htmlFor: "bold"
                }, input({
                    type: "checkbox",
                    id: "bold",
                    checked: this.state.isBold,
                    onChange: this.handleBold
                }, "bold")));
            }
        }),
        "stroke-width": React.createClass({
            displayName: "StrokeWidths",
            getState: function() {
                var _ref;
                return {
                    strokeWidth: (_ref = this.props.lc.tool) != null ? _ref.strokeWidth : void 0
                };
            },
            getInitialState: function() {
                return this.getState();
            },
            mixins: [ LC.React.Mixins.UpdateOnToolChangeMixin ],
            render: function() {
                var buttonSize, circle, getItem, li, strokeWidths, svg, ul, _ref;
                _ref = React.DOM, ul = _ref.ul, li = _ref.li, svg = _ref.svg, circle = _ref.circle;
                strokeWidths = [ 1, 2, 5, 10, 20, 40 ];
                buttonSize = Math.max.apply(Math, strokeWidths);
                getItem = function(_this) {
                    return function(strokeWidth) {};
                }(this);
                return ul({
                    className: "lc-stroke-widths"
                }, strokeWidths.map(function(_this) {
                    return function(strokeWidth, ix) {
                        var className;
                        className = React.addons.classSet({
                            "lc-stroke-width": true,
                            selected: strokeWidth === _this.state.strokeWidth
                        });
                        return li({
                            className: className,
                            key: strokeWidth,
                            onClick: function() {
                                _this.props.tool.strokeWidth = strokeWidth;
                                return _this.setState(_this.getState());
                            }
                        }, svg({
                            width: buttonSize,
                            height: buttonSize,
                            viewPort: "0 0 " + buttonSize + " " + buttonSize,
                            version: "1.1",
                            xmlns: "http://www.w3.org/2000/svg"
                        }, circle({
                            cx: buttonSize / 2,
                            cy: buttonSize / 2,
                            r: strokeWidth / 2
                        })));
                    };
                }(this)));
            }
        }),
        "null": React.createClass({
            displayName: "NoOptions",
            render: function() {
                return React.DOM.div();
            }
        })
    };
}).call(this);

(function() {
    window.LC = LC || {};
    LC.React = LC.React || {};
    LC.React.init = function(root, lc, toolNames, imageURLPrefix) {
        var canvasElement, child, optionsElement, pickerElement, _i, _len, _ref;
        canvasElement = null;
        _ref = root.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            if (child.tagName.toLocaleLowerCase() === "canvas") {
                canvasElement = child;
            }
        }
        if (!canvasElement) {
            canvasElement = document.createElement("canvas");
            root.appendChild(canvasElement);
        }
        pickerElement = document.createElement("div");
        pickerElement.className = "lc-picker";
        root.insertBefore(pickerElement, canvasElement);
        optionsElement = document.createElement("div");
        optionsElement.className = "lc-options";
        root.appendChild(optionsElement);
        React.renderComponent(LC.React.Picker({
            lc: lc,
            toolNames: toolNames,
            imageURLPrefix: imageURLPrefix
        }), pickerElement);
        return React.renderComponent(LC.React.Options({
            lc: lc
        }), optionsElement);
    };
}).call(this);

(function() {
    var _ref;
    window.LC = (_ref = window.LC) != null ? _ref : {};
    LC.init = function(el, opts) {
        var $el, lc;
        if (opts == null) {
            opts = {};
        }
        if (opts.primaryColor == null) {
            opts.primaryColor = "#000";
        }
        if (opts.secondaryColor == null) {
            opts.secondaryColor = "#fff";
        }
        if (opts.backgroundColor == null) {
            opts.backgroundColor = "transparent";
        }
        if (opts.imageURLPrefix == null) {
            opts.imageURLPrefix = "lib/img";
        }
        if (opts.keyboardShortcuts == null) {
            opts.keyboardShortcuts = true;
        }
        if (opts.preserveCanvasContents == null) {
            opts.preserveCanvasContents = false;
        }
        if (opts.sizeToContainer == null) {
            opts.sizeToContainer = true;
        }
        if (opts.backgroundShapes == null) {
            opts.backgroundShapes = [];
        }
        if (opts.watermarkImage == null) {
            opts.watermarkImage = null;
        }
        if (!("tools" in opts)) {
            opts.tools = [ "Pencil", "Eraser", "Line", "Rectangle", "Circle", "Text", "Pan", "Eyedropper" ];
        }
        $el = $(el);
        $el.addClass("literally");
        if (!$el.find("canvas").length) {
            $el.append("<canvas>");
        }
        lc = new LC.LiterallyCanvas($el.find("canvas").get(0), opts);
        LC.React.init(el, lc, opts.tools, opts.imageURLPrefix);
        if ("onInit" in opts) {
            opts.onInit(lc);
        }
        return lc;
    };
    $.fn.literallycanvas = function(opts) {
        if (opts == null) {
            opts = {};
        }
        this.each(function(_this) {
            return function(ix, el) {
                return el.literallycanvas = LC.init(el, opts);
            };
        }(this));
        return this;
    };
}).call(this);