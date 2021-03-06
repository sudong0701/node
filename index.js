!
    function (t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.htmlRouter = e() : t.htmlRouter = e()
    }(window,
        function () {
            return function (t) {
                var e = {};

                function r(n) {
                    if (e[n]) return e[n].exports;
                    var o = e[n] = {
                        i: n,
                        l: !1,
                        exports: {}
                    };
                    return t[n].call(o.exports, o, o.exports, r),
                        o.l = !0,
                        o.exports
                }

                return r.m = t,
                    r.c = e,
                    r.d = function (t, e, n) {
                        r.o(t, e) || Object.defineProperty(t, e, {
                            enumerable: !0,
                            get: n
                        })
                    },
                    r.r = function (t) {
                        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                            value: "Module"
                        }),
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            })
                    },
                    r.t = function (t, e) {
                        if (1 & e && (t = r(t)), 8 & e) return t;
                        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                        var n = Object.create(null);
                        if (r.r(n), Object.defineProperty(n, "default", {
                                enumerable: !0,
                                value: t
                            }), 2 & e && "string" != typeof t) for (var o in t) r.d(n, o,
                            function (e) {
                                return t[e]
                            }.bind(null, o));
                        return n
                    },
                    r.n = function (t) {
                        var e = t && t.__esModule ?
                            function () {
                                return t.default
                            } :
                            function () {
                                return t
                            };
                        return r.d(e, "a", e),
                            e
                    },
                    r.o = function (t, e) {
                        return Object.prototype.hasOwnProperty.call(t, e)
                    },
                    r.p = "",
                    r(r.s = 0)
            }([function (t, e, r) {
                "use strict";
                r.r(e);
                var n = function t(e) {
                    !
                        function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t),
                        this._routes = e.routes,
                        this.routeHistory = [],
                        this.currentUrl = "",
                        this.currentIndex = -1,
                        this.frontOrBack = !1,
                        this.replaceRouter = !1
                };

                function o(t) {
                    return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
                        function (t) {
                            return typeof t
                        } : function (t) {
                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                        })(t)
                }

                function i(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value" in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n)
                    }
                }

                function u(t, e) {
                    return !e || "object" !== o(e) && "function" != typeof e ?
                        function (t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t) : e
                }

                function a(t) {
                    return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                        return t.__proto__ || Object.getPrototypeOf(t)
                    })(t)
                }

                function c(t, e) {
                    return (c = Object.setPrototypeOf ||
                        function (t, e) {
                            return t.__proto__ = e,
                                t
                        })(t, e)
                }

                var s = function (t) {
                    function e(t) {
                        return function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                            u(this, a(e).call(this, t))
                    }

                    var r, o, s;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        e && c(t, e)
                    }(e, n),
                        r = e,
                    (o = [{
                        key: "init",
                        value: function () {
                            window.addEventListener("hashchange", this.refresh.bind(this), !1),
                                window.addEventListener("load", this.refresh.bind(this), !1)
                        }
                    },
                        {
                            key: "refresh",
                            value: function () {
                                this.frontOrBack ? this.frontOrBack = !1 : (this.currentUrl = location.hash.slice(1) || "/", this.replaceRouter ? (this.routeHistory[this.currentIndex] = this.currentUrl, this.replaceRouter = !1) : (this.routeHistory.push(this.currentUrl), this.currentIndex++), this.routeHistory = this.routeHistory.slice(0, this.currentIndex + 1));
                                for (var t = function () {
                                    var t = window.location.href,
                                        e = t.indexOf("#");
                                    if (e < 0) return "";
                                    var r = (t = t.slice(e + 1)).indexOf("?");
                                    return r < 0 ? t : t.slice(0, r)
                                }(), e = "", r = document.querySelectorAll("[data-component-name]"), n = 0; n < this._routes.length; n++) if (this._routes[n].path === t) {
                                    e = this._routes[n].name;
                                    break
                                }
                                r.forEach(function (t) {
                                    t.dataset.componentName === e ? t.style.display = "block" : t.style.display = "none"
                                })
                            }
                        },
                        {
                            key: "back",
                            value: function () {
                                this.currentIndex > 0 && (this.frontOrBack = !0, this.currentIndex--, this.currentUrl = this.routeHistory[this.currentIndex], window.location.hash = this.currentUrl)
                            }
                        },
                        {
                            key: "front",
                            value: function () {
                                var t = this.routeHistory.length;
                                this.currentIndex < t - 1 && (this.frontOrBack = !0, this.currentIndex++, this.currentUrl = this.routeHistory[this.currentIndex], window.location.hash = this.currentUrl)
                            }
                        },
                        {
                            key: "push",
                            value: function (t) {
                                if (t.path) f(t.path, t.query);
                                else if (t.name) {
                                    for (var e = "",
                                             r = 0; r < this._routes.length; r++) if (this._routes[r].name === t.name) {
                                        e = this._routes[r].path;
                                        break
                                    }
                                    e ? f(e, t.query) : (n = "组件名称不存在", "undefined" != typeof console && console.error("[html-router] ".concat(n)))
                                }
                                var n
                            }
                        }, {
                            key: "replace",
                            value: function (t) {
                                this.replaceRouter = !0,
                                    this.push(t)
                            }
                        }]) && i(r.prototype, o),
                    s && i(r, s),
                        e
                }();

                function f(t, e) {
                    if (e) {
                        var r = "";
                        for (var n in e) r += "&" + n + "=" + e[n];
                        r && (window.location.hash = t + "?" + r.slice(1)) || (window.location.hash = t)
                    } else window.location.hash = t
                }

                function l(t) {
                    return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
                        function (t) {
                            return typeof t
                        } : function (t) {
                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                        })(t)
                }

                function h(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value" in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n)
                    }
                }

                function p(t, e) {
                    return !e || "object" !== l(e) && "function" != typeof e ?
                        function (t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t) : e
                }

                function y(t) {
                    return (y = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                        return t.__proto__ || Object.getPrototypeOf(t)
                    })(t)
                }

                function d(t, e) {
                    return (d = Object.setPrototypeOf ||
                        function (t, e) {
                            return t.__proto__ = e,
                                t
                        })(t, e)
                }

                var b = function (t) {
                    function e(t) {
                        return function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                            p(this, y(e).call(this, t))
                    }

                    var r, o, i;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        e && d(t, e)
                    }(e, n),
                        r = e,
                    (o = [{
                        key: "init",
                        value: function () {
                            window.addEventListener("popstate", this.refresh.bind(this), !1),
                                window.addEventListener("load", this.refresh.bind(this), !1)
                        }
                    },
                        {
                            key: "refresh",
                            value: function () {
                                for (var t = window.location.pathname,
                                         e = "",
                                         r = document.querySelectorAll("[data-component-name]"), n = 0; n < this._routes.length; n++) if (this._routes[n].path === t) {
                                    e = this._routes[n].name;
                                    break
                                }
                                r.forEach(function (t) {
                                    t.dataset.componentName === e ? t.style.display = "block" : t.style.display = "none"
                                })
                            }
                        },
                        {
                            key: "push",
                            value: function (t) {
                                if (t.path) v.call(this, t.path, t.query, this.replaceRouter);
                                else if (t.name) {
                                    for (var e = "",
                                             r = 0; r < this._routes.length; r++) if (this._routes[r].name === t.name) {
                                        e = this._routes[r].path;
                                        break
                                    }
                                    e ? v.call(this, e, t.query, this.replaceRouter) : (n = "组件名称不存在", "undefined" != typeof console && console.error("[html-router] ".concat(n)))
                                }
                                var n
                            }
                        }, {
                            key: "replace",
                            value: function (t) {
                                this.replaceRouter = !0,
                                    this.push(t)
                            }
                        },
                        {
                            key: "back",
                            value: function () {
                                window.history.back()
                            }
                        },
                        {
                            key: "front",
                            value: function () {
                                window.history.forward()
                            }
                        }]) && h(r.prototype, o),
                    i && h(r, i),
                        e
                }();

                function v(t, e, r) {
                    var n = function (t, e) {
                        if (!e) return t;
                        var r = "";
                        for (var n in e) r += "&" + n + "=" + e[n];
                        return t + "?" + r.slice(1)
                    }(t, e);
                    n !== window.location.pathname && (r ? (window.history.replaceState(n, "", n), this.replaceRouter = !1) : window.history.pushState(n, "", n), this.refresh())
                }

                function w(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value" in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n)
                    }
                }

                var m = function () {
                    function t(e) {
                        !
                            function (t, e) {
                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            this._mode = e.mode || "hash",
                            this._routes = e.routes,
                            "hash" === e.mode ? this._router = new s(e) : this._router = new b(e),
                            this._router.init()
                    }

                    var e, r, n;
                    return e = t,
                    (r = [{
                        key: "back",
                        value: function () {
                            this._router.back()
                        }
                    },
                        {
                            key: "front",
                            value: function () {
                                this._router.front()
                            }
                        },
                        {
                            key: "go",
                            value: function (t) {
                                window.history.go(t)
                            }
                        },
                        {
                            key: "push",
                            value: function (t) {
                                this._router.push(t)
                            }
                        },
                        {
                            key: "replace",
                            value: function (t) {
                                this._router.replace(t)
                            }
                        }]) && w(e.prototype, r),
                    n && w(e, n),
                        t
                }();
                e.default = m
            }]).default
        });