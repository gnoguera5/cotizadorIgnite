$( document ).ready(function() {
    graficar();
});

function graficar() {
    $('#container').show();
    $('#error_chart').hide();
    var frmGrafica = $('#frmGrafica').serialize();
    $.ajax({
        type:'POST',
        url:'/grafica_create',
        data:frmGrafica,
        dataType: "json",
        headers: {'X-CSRF-TOKEN': $('#_token').val()},
        success:function(data){
            console.log(data);
            if(data.isDatos){

                graficaContrato(data.ticks,data.categories);
            }else{

                $('#container').hide();
                $('#error_chart').show();
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

function graficaContrato(ticks,categories){
    var periodo;
    switch($('#tipo_periodo').val()){
        case '4':
            periodo = 'Anual';
            break;
        case '3':
            periodo='Mes';
            break;
        case '2':
            periodo='Semana';
            break;
    }
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Número de contratos realizado'
        },
        subtitle: {
            text: 'Gráfica '+periodo+' ('+$('#rango_final').val()+')'
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Contratos',
            data: ticks

        }]
    });
}

function get_total_array(valores) {
    var total = 0;
    return $.each(valores, function(x, y) {
        total += Math.round(y)
    }), total
}



function fechaAnterior() {
    console.log('fecha anterior');
    var periodo = parseInt($("#tipo_periodo").val());
    var date2 = $("#datepicker").datepicker("getDate");
    var rango1 = $("#datepicker").val();
    console.log(periodo);
    switch (periodo) {
        case 1:
            date2.setDate(date2.getDate() - 1);
            break;
        case 2:
            date2.setDate(date2.getDate() - 7);
            break;
        case 3:
            date2.setMonth(date2.getMonth() - 1);
            break;
        case 4:
            date2.setFullYear(date2.getFullYear() - 1);
    }
    $("#datepicker").datepicker("setDate", date2);
    rango1 = $("#datepicker").val();
    1 != periodo ? rango2 = $("#datepicker").val() : rango2 = rango1;
    $("#rango_inicial").val(rango1);
    $("#rango_final").val(rango2);
    graficar();

}

function fechaPosterior() {
    var periodo = parseInt($("#tipo_periodo").val()),
        date2 = $("#datepicker").datepicker("getDate"),
        rango1 = $("#datepicker").val();
    switch (periodo) {
        case 1:
            date2.setDate(date2.getDate() + 1);
            break;
        case 2:
            date2.setDate(date2.getDate() + 7);
            break;
        case 3:
            date2.setMonth(date2.getMonth() + 1);
            break;
        case 4:
            date2.setFullYear(date2.getFullYear() + 1)
    }
    $("#datepicker").datepicker("setDate", date2);
    rango1 = $("#datepicker").val();
    periodo > 1 ? rango2 = $("#datepicker").val() : rango2 = rango1;
    $("#rango_inicial").val(rango1);
    $("#rango_final").val(rango2), graficar();
}

function convertirFechaACadena(fecha) {
    if (void 0 != fecha) {
        var fecha = fecha.split("-"),
            tipo_grafica = $("#tipo_periodo").val();
        mes_str = fecha[1];
        var mes = "";
        switch (mes_str) {
            case "01":
                mes = "Enero";
                break;
            case "02":
                mes = "Febrero";
                break;
            case "03":
                mes = "Marzo";
                break;
            case "04":
                mes = "Abril";
                break;
            case "05":
                mes = "Mayo";
                break;
            case "06":
                mes = "Junio";
                break;
            case "07":
                mes = "Julio";
                break;
            case "08":
                mes = "Agosto";
                break;
            case "09":
                mes = "Septiembre";
                break;
            case "10":
                mes = "Octubre";
                break;
            case "11":
                mes = "Noviembre";
                break;
            case "12":
                mes = "Diciembre"
        }
        switch (tipo_grafica = parseInt(tipo_grafica)) {
            case 4:
                return fecha[0];
            case 3:
                return "  " + mes + " del " + fecha[0];
            default:
                return fecha[2] + " de " + mes + " del " + fecha[0]
        }
    }
}



! function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function($) {
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (map = element.parentNode, mapName = map.name, element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap='#" + mapName + "']")[0], !!img && visible(img)) : !1) : (/^(input|select|textarea|button|object)$/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element)
    }

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return "hidden" === $.css(this, "visibility")
        }).length
    }

    function datepicker_getZindex(elem) {
        for (var position, value; elem.length && elem[0] !== document;) {
            if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value)) return value;
            elem = elem.parent()
        }
        return 0
    }

    function Datepicker() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.regional.en = $.extend(!0, {}, this.regional[""]), this.regional["en-US"] = $.extend(!0, {}, this.regional.en), this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function datepicker_bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.delegate(selector, "mouseout", function() {
            $(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
        }).delegate(selector, "mouseover", datepicker_handleMouseover)
    }

    function datepicker_handleMouseover() {
        $.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
    }

    function datepicker_extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) null == props[name] && (target[name] = props[name]);
        return target
    }
    $.ui = $.ui || {}, $.extend($.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), $.fn.extend({
        scrollParent: function(includeHidden) {
            var position = this.css("position"),
                excludeStaticParent = "absolute" === position,
                overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                scrollParent = this.parents().filter(function() {
                    var parent = $(this);
                    return excludeStaticParent && "static" === parent.css("position") ? !1 : overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"))
                }).eq(0);
            return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var uuid = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++uuid)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && $(this).removeAttr("id")
            })
        }
    }), $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName)
            }
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3])
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
    }), $("<a>").outerWidth(1).jquery || $.each(["Width", "Height"], function(i, name) {
        function reduce(elem, size, border, margin) {
            return $.each(side, function() {
                size -= parseFloat($.css(elem, "padding" + this)) || 0, border && (size -= parseFloat($.css(elem, "border" + this + "Width")) || 0), margin && (size -= parseFloat($.css(elem, "margin" + this)) || 0)
            }), size
        }
        var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"],
            type = name.toLowerCase(),
            orig = {
                innerWidth: $.fn.innerWidth,
                innerHeight: $.fn.innerHeight,
                outerWidth: $.fn.outerWidth,
                outerHeight: $.fn.outerHeight
            };
        $.fn["inner" + name] = function(size) {
            return void 0 === size ? orig["inner" + name].call(this) : this.each(function() {
                $(this).css(type, reduce(this, size) + "px")
            })
        }, $.fn["outer" + name] = function(size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                $(this).css(type, reduce(this, size, !0, margin) + "px")
            })
        }
    }), $.fn.addBack || ($.fn.addBack = function(selector) {
        return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
    }), $("<a>").data("a-b", "a").removeData("a-b").data("a-b") && ($.fn.removeData = function(removeData) {
        return function(key) {
            return arguments.length ? removeData.call(this, $.camelCase(key)) : removeData.call(this)
        }
    }($.fn.removeData)), $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), $.fn.extend({
        focus: function(orig) {
            return function(delay, fn) {
                return "number" == typeof delay ? this.each(function() {
                    var elem = this;
                    setTimeout(function() {
                        $(elem).focus(), fn && fn.call(elem)
                    }, delay)
                }) : orig.apply(this, arguments)
            }
        }($.fn.focus),
        disableSelection: function() {
            var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(eventType + ".ui-disableSelection", function(event) {
                    event.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(zIndex) {
            if (void 0 !== zIndex) return this.css("zIndex", zIndex);
            if (this.length)
                for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document;) {
                    if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value)) return value;
                    elem = elem.parent()
                }
            return 0
        }
    }), $.ui.plugin = {
        add: function(module, option, set) {
            var i, proto = $.ui[module].prototype;
            for (i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([option, set[i]])
        },
        call: function(instance, name, args, allowDisconnected) {
            var i, set = instance.plugins[name];
            if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType))
                for (i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args)
        }
    };
    var widget_uuid = 0,
        widget_slice = Array.prototype.slice;
    $.cleanData = function(orig) {
        return function(elems) {
            var events, elem, i;
            for (i = 0; null != (elem = elems[i]); i++) try {
                events = $._data(elem, "events"), events && events.remove && $(elem).triggerHandler("remove")
            } catch (e) {}
            orig(elems)
        }
    }($.cleanData), $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
            namespace = name.split(".")[0];
        return name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, base = $.Widget), $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName)
        }, $[namespace] = $[namespace] || {}, existingConstructor = $[namespace][name], constructor = $[namespace][name] = function(options, element) {
            return this._createWidget ? void(arguments.length && this._createWidget(options, element)) : new constructor(options, element)
        }, $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        }), basePrototype = new base, basePrototype.options = $.widget.extend({}, basePrototype.options), $.each(prototype, function(prop, value) {
            return $.isFunction(value) ? void(proxiedPrototype[prop] = function() {
                var _super = function() {
                        return base.prototype[prop].apply(this, arguments)
                    },
                    _superApply = function(args) {
                        return base.prototype[prop].apply(this, args)
                    };
                return function() {
                    var returnValue, __super = this._super,
                        __superApply = this._superApply;
                    return this._super = _super, this._superApply = _superApply, returnValue = value.apply(this, arguments), this._super = __super, this._superApply = __superApply, returnValue
                }
            }()) : void(proxiedPrototype[prop] = value)
        }), constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        }), existingConstructor ? ($.each(existingConstructor._childConstructors, function(i, child) {
            var childPrototype = child.prototype;
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
        }), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor), $.widget.bridge(name, constructor), constructor
    }, $.widget.extend = function(target) {
        for (var key, value, input = widget_slice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputLength > inputIndex; inputIndex++)
            for (key in input[inputIndex]) value = input[inputIndex][key], input[inputIndex].hasOwnProperty(key) && void 0 !== value && ($.isPlainObject(value) ? target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : target[key] = value);
        return target
    }, $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options,
                args = widget_slice.call(arguments, 1),
                returnValue = this;
            return isMethodCall ? this.each(function() {
                var methodValue, instance = $.data(this, fullName);
                return "instance" === options ? (returnValue = instance, !1) : instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args), methodValue !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue, !1) : void 0) : $.error("no such method '" + options + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'")
            }) : (args.length && (options = $.widget.extend.apply(null, [options].concat(args))), this.each(function() {
                var instance = $.data(this, fullName);
                instance ? (instance.option(options || {}), instance._init && instance._init()) : $.data(this, fullName, new object(options, this))
            })), returnValue
        }
    }, $.Widget = function() {}, $.Widget._childConstructors = [], $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0], this.element = $(element), this.uuid = widget_uuid++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = $(), this.hoverable = $(), this.focusable = $(), element !== this && ($.data(element, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(event) {
                    event.target === element && this.destroy()
                }
            }), this.document = $(element.style ? element.ownerDocument : element.document || element), this.window = $(this.document[0].defaultView || this.document[0].parentWindow)), this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: $.noop,
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var parts, curOption, i, options = key;
            if (0 === arguments.length) return $.widget.extend({}, this.options);
            if ("string" == typeof key)
                if (options = {}, parts = key.split("."), key = parts.shift(), parts.length) {
                    for (curOption = options[key] = $.widget.extend({}, this.options[key]), i = 0; i < parts.length - 1; i++) curOption[parts[i]] = curOption[parts[i]] || {}, curOption = curOption[parts[i]];
                    if (key = parts.pop(), 1 === arguments.length) return void 0 === curOption[key] ? null : curOption[key];
                    curOption[key] = value
                } else {
                    if (1 === arguments.length) return void 0 === this.options[key] ? null : this.options[key];
                    options[key] = value
                }
            return this._setOptions(options), this
        },
        _setOptions: function(options) {
            var key;
            for (key in options) this._setOption(key, options[key]);
            return this
        },
        _setOption: function(key, value) {
            return this.options[key] = value, "disabled" === key && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!value), value && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            "boolean" != typeof suppressDisabledCheck && (handlers = element, element = suppressDisabledCheck, suppressDisabledCheck = !1), handlers ? (element = delegateElement = $(element), this.bindings = this.bindings.add(element)) : (handlers = element, element = this.element, delegateElement = this.widget()), $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    return suppressDisabledCheck || instance.options.disabled !== !0 && !$(this).hasClass("ui-state-disabled") ? ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments) : void 0
                }
                "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
                var match = event.match(/^([\w:-]*)\s*(.*)$/),
                    eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                selector ? delegateElement.delegate(selector, eventName, handlerProxy) : element.bind(eventName, handlerProxy)
            })
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, element.unbind(eventName).undelegate(eventName), this.bindings = $(this.bindings.not(element).get()), this.focusable = $(this.focusable.not(element).get()), this.hoverable = $(this.hoverable.not(element).get())
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0)
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element), this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element), this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), event.target = this.element[0], orig = event.originalEvent)
                for (prop in orig) prop in event || (event[prop] = orig[prop]);
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === !1 || event.isDefaultPrevented())
        }
    }, $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            "string" == typeof options && (options = {
                effect: options
            });
            var hasOptions, effectName = options ? options === !0 || "number" == typeof options ? defaultEffect : options.effect || defaultEffect : method;
            options = options || {}, "number" == typeof options && (options = {
                duration: options
            }), hasOptions = !$.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay), hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
                $(this)[method](), callback && callback.call(element[0]), next()
            })
        }
    });
    $.widget;
    ! function() {
        function getOffsets(offsets, width, height) {
            return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)]
        }

        function parseCss(element, property) {
            return parseInt($.css(element, property), 10) || 0
        }

        function getDimensions(elem) {
            var raw = elem[0];
            return 9 === raw.nodeType ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : $.isWindow(raw) ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: elem.scrollTop(),
                    left: elem.scrollLeft()
                }
            } : raw.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: raw.pageY,
                    left: raw.pageX
                }
            } : {
                width: elem.outerWidth(),
                height: elem.outerHeight(),
                offset: elem.offset()
            }
        }
        $.ui = $.ui || {};
        var cachedScrollbarWidth, supportsOffsetFractions, max = Math.max,
            abs = Math.abs,
            round = Math.round,
            rhorizontal = /left|center|right/,
            rvertical = /top|center|bottom/,
            roffset = /[\+\-]\d+(\.[\d]+)?%?/,
            rposition = /^\w+/,
            rpercent = /%$/,
            _position = $.fn.position;
        $.position = {
            scrollbarWidth: function() {
                if (void 0 !== cachedScrollbarWidth) return cachedScrollbarWidth;
                var w1, w2, div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    innerDiv = div.children()[0];
                return $("body").append(div), w1 = innerDiv.offsetWidth, div.css("overflow", "scroll"), w2 = innerDiv.offsetWidth, w1 === w2 && (w2 = div[0].clientWidth), div.remove(), cachedScrollbarWidth = w1 - w2
            },
            getScrollInfo: function(within) {
                var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"),
                    overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"),
                    hasOverflowX = "scroll" === overflowX || "auto" === overflowX && within.width < within.element[0].scrollWidth,
                    hasOverflowY = "scroll" === overflowY || "auto" === overflowY && within.height < within.element[0].scrollHeight;
                return {
                    width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                    height: hasOverflowX ? $.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(element) {
                var withinElement = $(element || window),
                    isWindow = $.isWindow(withinElement[0]),
                    isDocument = !!withinElement[0] && 9 === withinElement[0].nodeType;
                return {
                    element: withinElement,
                    isWindow: isWindow,
                    isDocument: isDocument,
                    offset: withinElement.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: withinElement.scrollLeft(),
                    scrollTop: withinElement.scrollTop(),
                    width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
                    height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
                }
            }
        }, $.fn.position = function(options) {
            if (!options || !options.of) return _position.apply(this, arguments);
            options = $.extend({}, options);
            var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = $(options.of),
                within = $.position.getWithinInfo(options.within),
                scrollInfo = $.position.getScrollInfo(within),
                collision = (options.collision || "flip").split(" "),
                offsets = {};
            return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"), targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset, basePosition = $.extend({}, targetOffset), $.each(["my", "at"], function() {
                var horizontalOffset, verticalOffset, pos = (options[this] || "").split(" ");
                1 === pos.length && (pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"]), pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center", pos[1] = rvertical.test(pos[1]) ? pos[1] : "center", horizontalOffset = roffset.exec(pos[0]), verticalOffset = roffset.exec(pos[1]), offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0], options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]]
            }), 1 === collision.length && (collision[1] = collision[0]), "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2), "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2), atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0], basePosition.top += atOffset[1], this.each(function() {
                var collisionPosition, using, elem = $(this),
                    elemWidth = elem.outerWidth(),
                    elemHeight = elem.outerHeight(),
                    marginLeft = parseCss(this, "marginLeft"),
                    marginTop = parseCss(this, "marginTop"),
                    collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
                    collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
                    position = $.extend({}, basePosition),
                    myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
                "right" === options.my[0] ? position.left -= elemWidth : "center" === options.my[0] && (position.left -= elemWidth / 2), "bottom" === options.my[1] ? position.top -= elemHeight : "center" === options.my[1] && (position.top -= elemHeight / 2), position.left += myOffset[0], position.top += myOffset[1], supportsOffsetFractions || (position.left = round(position.left), position.top = round(position.top)), collisionPosition = {
                    marginLeft: marginLeft,
                    marginTop: marginTop
                }, $.each(["left", "top"], function(i, dir) {
                    $.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    })
                }), options.using && (using = function(props) {
                    var left = targetOffset.left - position.left,
                        right = left + targetWidth - elemWidth,
                        top = targetOffset.top - position.top,
                        bottom = top + targetHeight - elemHeight,
                        feedback = {
                            target: {
                                element: target,
                                left: targetOffset.left,
                                top: targetOffset.top,
                                width: targetWidth,
                                height: targetHeight
                            },
                            element: {
                                element: elem,
                                left: position.left,
                                top: position.top,
                                width: elemWidth,
                                height: elemHeight
                            },
                            horizontal: 0 > right ? "left" : left > 0 ? "right" : "center",
                            vertical: 0 > bottom ? "top" : top > 0 ? "bottom" : "middle"
                        };
                    elemWidth > targetWidth && abs(left + right) < targetWidth && (feedback.horizontal = "center"), elemHeight > targetHeight && abs(top + bottom) < targetHeight && (feedback.vertical = "middle"), max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? feedback.important = "horizontal" : feedback.important = "vertical", options.using.call(this, props, feedback)
                }), elem.offset($.extend(position, {
                    using: using
                }))
            })
        }, $.ui.position = {
            fit: {
                left: function(position, data) {
                    var newOverRight, within = data.within,
                        withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                        outerWidth = within.width,
                        collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                        overLeft = withinOffset - collisionPosLeft,
                        overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                    data.collisionWidth > outerWidth ? overLeft > 0 && 0 >= overRight ? (newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset, position.left += overLeft - newOverRight) : overRight > 0 && 0 >= overLeft ? position.left = withinOffset : overLeft > overRight ? position.left = withinOffset + outerWidth - data.collisionWidth : position.left = withinOffset : overLeft > 0 ? position.left += overLeft : overRight > 0 ? position.left -= overRight : position.left = max(position.left - collisionPosLeft, position.left)
                },
                top: function(position, data) {
                    var newOverBottom, within = data.within,
                        withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                        outerHeight = data.within.height,
                        collisionPosTop = position.top - data.collisionPosition.marginTop,
                        overTop = withinOffset - collisionPosTop,
                        overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                    data.collisionHeight > outerHeight ? overTop > 0 && 0 >= overBottom ? (newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset, position.top += overTop - newOverBottom) : overBottom > 0 && 0 >= overTop ? position.top = withinOffset : overTop > overBottom ? position.top = withinOffset + outerHeight - data.collisionHeight : position.top = withinOffset : overTop > 0 ? position.top += overTop : overBottom > 0 ? position.top -= overBottom : position.top = max(position.top - collisionPosTop, position.top)
                }
            },
            flip: {
                left: function(position, data) {
                    var newOverRight, newOverLeft, within = data.within,
                        withinOffset = within.offset.left + within.scrollLeft,
                        outerWidth = within.width,
                        offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                        collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                        overLeft = collisionPosLeft - offsetLeft,
                        overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                        myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0,
                        atOffset = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0,
                        offset = -2 * data.offset[0];
                    0 > overLeft ? (newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset, (0 > newOverRight || newOverRight < abs(overLeft)) && (position.left += myOffset + atOffset + offset)) : overRight > 0 && (newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft, (newOverLeft > 0 || abs(newOverLeft) < overRight) && (position.left += myOffset + atOffset + offset))
                },
                top: function(position, data) {
                    var newOverTop, newOverBottom, within = data.within,
                        withinOffset = within.offset.top + within.scrollTop,
                        outerHeight = within.height,
                        offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                        collisionPosTop = position.top - data.collisionPosition.marginTop,
                        overTop = collisionPosTop - offsetTop,
                        overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                        top = "top" === data.my[1],
                        myOffset = top ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0,
                        atOffset = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0,
                        offset = -2 * data.offset[1];
                    0 > overTop ? (newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset, (0 > newOverBottom || newOverBottom < abs(overTop)) && (position.top += myOffset + atOffset + offset)) : overBottom > 0 && (newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop, (newOverTop > 0 || abs(newOverTop) < overBottom) && (position.top += myOffset + atOffset + offset))
                }
            },
            flipfit: {
                left: function() {
                    $.ui.position.flip.left.apply(this, arguments), $.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    $.ui.position.flip.top.apply(this, arguments), $.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
            function() {
                var testElement, testElementParent, testElementStyle, offsetLeft, i, body = document.getElementsByTagName("body")[0],
                    div = document.createElement("div");
                testElement = document.createElement(body ? "div" : "body"), testElementStyle = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, body && $.extend(testElementStyle, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (i in testElementStyle) testElement.style[i] = testElementStyle[i];
                testElement.appendChild(div), testElementParent = body || document.documentElement, testElementParent.insertBefore(testElement, testElementParent.firstChild), div.style.cssText = "position: absolute; left: 10.7432222px;", offsetLeft = $(div).offset().left, supportsOffsetFractions = offsetLeft > 10 && 11 > offsetLeft, testElement.innerHTML = "", testElementParent.removeChild(testElement)
            }()
    }();
    $.ui.position;
    $.extend($.ui, {
        datepicker: {
            version: "1.11.4"
        }
    });
    var datepicker_instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(settings) {
            return datepicker_extendRemove(this._defaults, settings || {}), this
        },
        _attachDatepicker: function(target, settings) {
            var nodeName, inline, inst;
            nodeName = target.nodeName.toLowerCase(), inline = "div" === nodeName || "span" === nodeName, target.id || (this.uuid += 1, target.id = "dp" + this.uuid), inst = this._newInst($(target), inline), inst.settings = $.extend({}, settings || {}), "input" === nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: inline ? datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(inst), $.data(target, "datepicker", inst), inst.settings.disabled && this._disableDatepicker(target))
        },
        _attachments: function(input, inst) {
            var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"),
                isRTL = this._get(inst, "isRTL");
            inst.append && inst.append.remove(), appendText && (inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>"), input[isRTL ? "before" : "after"](inst.append)), input.unbind("focus", this._showDatepicker), inst.trigger && inst.trigger.remove(), showOn = this._get(inst, "showOn"), "focus" !== showOn && "both" !== showOn || input.focus(this._showDatepicker), "button" !== showOn && "both" !== showOn || (buttonText = this._get(inst, "buttonText"), buttonImage = this._get(inst, "buttonImage"), inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : $("<button type='button'></button>").addClass(this._triggerClass).html(buttonImage ? $("<img/>").attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : buttonText)), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.click(function() {
                return $.datepicker._datepickerShowing && $.datepicker._lastInput === input[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(input[0])) : $.datepicker._showDatepicker(input[0]), !1
            }))
        },
        _autoSize: function(inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var findMax, max, maxI, i, date = new Date(2009, 11, 20),
                    dateFormat = this._get(inst, "dateFormat");
                dateFormat.match(/[DM]/) && (findMax = function(names) {
                    for (max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, maxI = i);
                    return maxI
                }, date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))), date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())), inst.input.attr("size", this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv), $.data(target, "datepicker", inst), this._setDate(inst, this._getDefaultDate(inst), !0), this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), inst.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
            return inst || (this.uuid += 1, id = "dp" + this.uuid, this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, $.data(this._dialogInput[0], "datepicker", inst)), datepicker_extendRemove(inst.settings, settings || {}), date = date && date.constructor === Date ? this._formatDate(inst, date) : date, this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null, this._pos || (browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight, scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], "datepicker", inst), this
        },
        _destroyDatepicker: function(target) {
            var nodeName, $target = $(target),
                inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), $.removeData(target, "datepicker"), "input" === nodeName ? (inst.append.remove(), inst.trigger.remove(), $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== nodeName && "span" !== nodeName || $target.removeClass(this.markerClassName).empty(), datepicker_instActive === inst && (datepicker_instActive = null))
        },
        _enableDatepicker: function(target) {
            var nodeName, inline, $target = $(target),
                inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), "input" === nodeName ? (target.disabled = !1, inst.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value
            }))
        },
        _disableDatepicker: function(target) {
            var nodeName, inline, $target = $(target),
                inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), "input" === nodeName ? (target.disabled = !0, inst.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value
            }), this._disabledInputs[this._disabledInputs.length] = target)
        },
        _isDisabledDatepicker: function(target) {
            if (!target) return !1;
            for (var i = 0; i < this._disabledInputs.length; i++)
                if (this._disabledInputs[i] === target) return !0;
            return !1
        },
        _getInst: function(target) {
            try {
                return $.data(target, "datepicker")
            } catch (err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(target, name, value) {
            var settings, date, minDate, maxDate, inst = this._getInst(target);
            return 2 === arguments.length && "string" == typeof name ? "defaults" === name ? $.extend({}, $.datepicker._defaults) : inst ? "all" === name ? $.extend({}, inst.settings) : this._get(inst, name) : null : (settings = name || {}, "string" == typeof name && (settings = {}, settings[name] = value), void(inst && (this._curInst === inst && this._hideDatepicker(), date = this._getDateDatepicker(target, !0), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), datepicker_extendRemove(inst.settings, settings), null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate && (inst.settings.minDate = this._formatDate(inst, minDate)), null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate && (inst.settings.maxDate = this._formatDate(inst, maxDate)), "disabled" in settings && (settings.disabled ? this._disableDatepicker(target) : this._enableDatepicker(target)), this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), this._updateAlternate(inst), this._updateDatepicker(inst))))
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            inst && this._updateDatepicker(inst)
        },
        _setDateDatepicker: function(target, date) {
            var inst = this._getInst(target);
            inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst))
        },
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null
        },
        _doKeyDown: function(event) {
            var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target),
                handled = !0,
                isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker(), handled = !1;
                    break;
                case 13:
                    return sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv), sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]), onSelect = $.datepicker._get(inst, "onSelect"), onSelect ? (dateStr = $.datepicker._formatDate(inst), onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst])) : $.datepicker._hideDatepicker(), !1;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 35:
                    (event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target),
                        handled = event.ctrlKey || event.metaKey;
                    break;
                case 36:
                    (event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
                    break;
                case 37:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 38:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), handled = event.ctrlKey || event.metaKey;
                    break;
                case 39:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 40:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), handled = event.ctrlKey || event.metaKey;
                    break;
                default:
                    handled = !1
            } else 36 === event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
            handled && (event.preventDefault(), event.stopPropagation())
        },
        _doKeyPress: function(event) {
            var chars, chr, inst = $.datepicker._getInst(event.target);
            return $.datepicker._get(inst, "constrainInput") ? (chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")), chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode), event.ctrlKey || event.metaKey || " " > chr || !chars || chars.indexOf(chr) > -1) : void 0
        },
        _doKeyUp: function(event) {
            var date, inst = $.datepicker._getInst(event.target);
            if (inst.input.val() !== inst.lastVal) try {
                date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst)), date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), $.datepicker._updateDatepicker(inst))
            } catch (err) {}
            return !0
        },
        _showDatepicker: function(input) {
            if (input = input.target || input, "input" !== input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), !$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput !== input) {
                var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
                inst = $.datepicker._getInst(input), $.datepicker._curInst && $.datepicker._curInst !== inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])), beforeShow = $.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {}, beforeShowSettings !== !1 && (datepicker_extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null, $.datepicker._lastInput = input, $.datepicker._setDateFromField(inst), $.datepicker._inDialog && (input.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), $.datepicker._pos[1] += input.offsetHeight), isFixed = !1, $(input).parents().each(function() {
                    return isFixed |= "fixed" === $(this).css("position"), !isFixed
                }), offset = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                }, $.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), inst.dpDiv.css({
                    position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                    display: "none",
                    left: offset.left + "px",
                    top: offset.top + "px"
                }), inst.inline || (showAnim = $.datepicker._get(inst, "showAnim"), duration = $.datepicker._get(inst, "duration"), inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects.effect[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null), $.datepicker._shouldFocusInput(inst) && inst.input.focus(), $.datepicker._curInst = inst))
            }
        },
        _updateDatepicker: function(inst) {
            this.maxRows = 4, datepicker_instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), this._attachHandlers(inst);
            var origyearshtml, numMonths = this._getNumberOfMonths(inst),
                cols = numMonths[1],
                width = 17,
                activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");
            activeCell.length > 0 && datepicker_handleMouseover.apply(activeCell.get(0)), inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), inst.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst) && inst.input.focus(), inst.yearshtml && (origyearshtml = inst.yearshtml, setTimeout(function() {
                origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), origyearshtml = inst.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(inst) {
            return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus")
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth(),
                dpHeight = inst.dpDiv.outerHeight(),
                inputWidth = inst.input ? inst.input.outerWidth() : 0,
                inputHeight = inst.input ? inst.input.outerHeight() : 0,
                viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
                viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0, offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0, offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0), offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0), offset
        },
        _findPos: function(obj) {
            for (var position, inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" === obj.type || 1 !== obj.nodeType || $.expr.filters.hidden(obj));) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
            return position = $(obj).offset(), [position.left, position.top]
        },
        _hideDatepicker: function(input) {
            var showAnim, duration, postProcess, onClose, inst = this._curInst;
            !inst || input && inst !== $.data(input, "datepicker") || this._datepickerShowing && (showAnim = this._get(inst, "showAnim"), duration = this._get(inst, "duration"), postProcess = function() {
                $.datepicker._tidyDialog(inst)
            }, $.effects && ($.effects.effect[showAnim] || $.effects[showAnim]) ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess), showAnim || postProcess(), this._datepickerShowing = !1, onClose = this._get(inst, "onClose"), onClose && onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(event) {
            if ($.datepicker._curInst) {
                var $target = $(event.target),
                    inst = $.datepicker._getInst($target[0]);
                ($target[0].id === $.datepicker._mainDivId || 0 !== $target.parents("#" + $.datepicker._mainDivId).length || $target.hasClass($.datepicker.markerClassName) || $target.closest("." + $.datepicker._triggerClass).length || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI) && (!$target.hasClass($.datepicker.markerClassName) || $.datepicker._curInst === inst) || $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id),
                inst = this._getInst(target[0]);
            this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" === period ? this._get(inst, "showCurrentAtPos") : 0), period), this._updateDatepicker(inst))
        },
        _gotoToday: function(id) {
            var date, target = $(id),
                inst = this._getInst(target[0]);
            this._get(inst, "gotoCurrent") && inst.currentDay ? (inst.selectedDay = inst.currentDay, inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear) : (date = new Date, inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear()), this._notifyChange(inst), this._adjustDate(target)
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id),
                inst = this._getInst(target[0]);
            inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10), this._notifyChange(inst), this._adjustDate(target)
        },
        _selectDay: function(id, month, year, td) {
            var inst, target = $(id);
            $(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0]) || (inst = this._getInst(target[0]), inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear)))
        },
        _clearDate: function(id) {
            var target = $(id);
            this._selectDate(target, "")
        },
        _selectDate: function(id, dateStr) {
            var onSelect, target = $(id),
                inst = this._getInst(target[0]);
            dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr), this._updateAlternate(inst), onSelect = this._get(inst, "onSelect"), onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]) : inst.input && inst.input.trigger("change"), inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0], "object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(inst) {
            var altFormat, date, dateStr, altField = this._get(inst, "altField");
            altField && (altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"), date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst)), $(altField).each(function() {
                $(this).val(dateStr)
            }))
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [day > 0 && 6 > day, ""]
        },
        iso8601Week: function(date) {
            var time, checkDate = new Date(date.getTime());
            return checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)), time = checkDate.getTime(), checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
        },
        parseDate: function(format, value, settings) {
            if (null == format || null == value) throw "Invalid arguments";
            if (value = "object" == typeof value ? value.toString() : value + "", "" === value) return null;
            var iFormat, dim, extra, date, iValue = 0,
                shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                shortYearCutoff = "string" != typeof shortYearCutoffTemp ? shortYearCutoffTemp : (new Date).getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10),
                dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
                dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
                monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
                monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
                year = -1,
                month = -1,
                day = -1,
                doy = -1,
                literal = !1,
                lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                    return matches && iFormat++, matches
                },
                getNumber = function(match) {
                    var isDoubled = lookAhead(match),
                        size = "@" === match ? 14 : "!" === match ? 20 : "y" === match && isDoubled ? 4 : "o" === match ? 3 : 2,
                        minSize = "y" === match ? size : 1,
                        digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
                        num = value.substring(iValue).match(digits);
                    if (!num) throw "Missing number at position " + iValue;
                    return iValue += num[0].length, parseInt(num[0], 10)
                },
                getName = function(match, shortNames, longNames) {
                    var index = -1,
                        names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
                            return [
                                [k, v]
                            ]
                        }).sort(function(a, b) {
                            return -(a[1].length - b[1].length)
                        });
                    if ($.each(names, function(i, pair) {
                            var name = pair[1];
                            return value.substr(iValue, name.length).toLowerCase() === name.toLowerCase() ? (index = pair[0], iValue += name.length, !1) : void 0
                        }), -1 !== index) return index + 1;
                    throw "Unknown name at position " + iValue
                },
                checkLiteral = function() {
                    if (value.charAt(iValue) !== format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
                    iValue++
                };
            for (iFormat = 0; iFormat < format.length; iFormat++)
                if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1;
                else switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", dayNamesShort, dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", monthNamesShort, monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@")), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this._ticksTo1970) / 1e4), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                        break;
                    case "'":
                        lookAhead("'") ? checkLiteral() : literal = !0;
                        break;
                    default:
                        checkLiteral()
                }
            if (iValue < value.length && (extra = value.substr(iValue), !/^\s+/.test(extra))) throw "Extra/unparsed characters found in date: " + extra;
            if (-1 === year ? year = (new Date).getFullYear() : 100 > year && (year += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (shortYearCutoff >= year ? 0 : -100)), doy > -1)
                for (month = 1, day = doy;;) {
                    if (dim = this._getDaysInMonth(year, month - 1), dim >= day) break;
                    month++, day -= dim
                }
            if (date = this._daylightSavingAdjust(new Date(year, month - 1, day)), date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) throw "Invalid date";
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(format, date, settings) {
            if (!date) return "";
            var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
                dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
                monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
                monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
                lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                    return matches && iFormat++, matches
                },
                formatNumber = function(match, value, len) {
                    var num = "" + value;
                    if (lookAhead(match))
                        for (; num.length < len;) num = "0" + num;
                    return num
                },
                formatName = function(match, value, shortNames, longNames) {
                    return lookAhead(match) ? longNames[value] : shortNames[value]
                },
                output = "",
                literal = !1;
            if (date)
                for (iFormat = 0; iFormat < format.length; iFormat++)
                    if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1;
                    else switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                            break;
                        case "o":
                            output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case "y":
                            output += lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100;
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            output += 1e4 * date.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            lookAhead("'") ? output += "'" : literal = !0;
                            break;
                        default:
                            output += format.charAt(iFormat)
                    }
            return output
        },
        _possibleChars: function(format) {
            var iFormat, chars = "",
                literal = !1,
                lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                    return matches && iFormat++, matches
                };
            for (iFormat = 0; iFormat < format.length; iFormat++)
                if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1;
                else switch (format.charAt(iFormat)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        chars += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        lookAhead("'") ? chars += "'" : literal = !0;
                        break;
                    default:
                        chars += format.charAt(iFormat)
                }
            return chars
        },
        _get: function(inst, name) {
            return void 0 !== inst.settings[name] ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() !== inst.lastVal) {
                var dateFormat = this._get(inst, "dateFormat"),
                    dates = inst.lastVal = inst.input ? inst.input.val() : null,
                    defaultDate = this._getDefaultDate(inst),
                    date = defaultDate,
                    settings = this._getFormatConfig(inst);
                try {
                    date = this.parseDate(dateFormat, dates, settings) || defaultDate
                } catch (event) {
                    dates = noDefault ? "" : dates
                }
                inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0, inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0, this._adjustInstDate(inst)
            }
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date))
        },
        _determineDate: function(inst, date, defaultDate) {
            var offsetNumeric = function(offset) {
                    var date = new Date;
                    return date.setDate(date.getDate() + offset), date
                },
                offsetString = function(offset) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                    } catch (e) {}
                    for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date, year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches;) {
                        switch (matches[2] || "d") {
                            case "d":
                            case "D":
                                day += parseInt(matches[1], 10);
                                break;
                            case "w":
                            case "W":
                                day += 7 * parseInt(matches[1], 10);
                                break;
                            case "m":
                            case "M":
                                month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                                break;
                            case "y":
                            case "Y":
                                year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month))
                        }
                        matches = pattern.exec(offset)
                    }
                    return new Date(year, month, day)
                },
                newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? offsetString(date) : "number" == typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
            return newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate, newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function(date) {
            return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null
        },
        _setDate: function(inst, date, noChange) {
            var clear = !date,
                origMonth = inst.selectedMonth,
                origYear = inst.selectedYear,
                newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date));
            inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth === inst.selectedMonth && origYear === inst.selectedYear || noChange || this._notifyChange(inst), this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst))
        },
        _getDate: function(inst) {
            var startDate = !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return startDate
        },
        _attachHandlers: function(inst) {
            var stepMonths = this._get(inst, "stepMonths"),
                id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function() {
                var handler = {
                    prev: function() {
                        $.datepicker._adjustDate(id, -stepMonths, "M")
                    },
                    next: function() {
                        $.datepicker._adjustDate(id, +stepMonths, "M")
                    },
                    hide: function() {
                        $.datepicker._hideDatepicker()
                    },
                    today: function() {
                        $.datepicker._gotoToday(id)
                    },
                    selectDay: function() {
                        return $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return $.datepicker._selectMonthYear(id, this, "M"), !1
                    },
                    selectYear: function() {
                        return $.datepicker._selectMonthYear(id, this, "Y"), !1
                    }
                };
                $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(inst) {
            var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date,
                today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
                isRTL = this._get(inst, "isRTL"),
                showButtonPanel = this._get(inst, "showButtonPanel"),
                hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
                navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
                numMonths = this._getNumberOfMonths(inst),
                showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
                stepMonths = this._get(inst, "stepMonths"),
                isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1],
                currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)),
                minDate = this._getMinMaxDate(inst, "min"),
                maxDate = this._getMinMaxDate(inst, "max"),
                drawMonth = inst.drawMonth - showCurrentAtPos,
                drawYear = inst.drawYear;
            if (0 > drawMonth && (drawMonth += 12, drawYear--), maxDate)
                for (maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate())), maxDraw = minDate && minDate > maxDraw ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw;) drawMonth--, 0 > drawMonth && (drawMonth = 11, drawYear--);
            for (inst.drawMonth = drawMonth, inst.drawYear = drawYear, prevText = this._get(inst, "prevText"), prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText, prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>", nextText = this._get(inst, "nextText"), nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText, next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>", currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today, currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText, controls = inst.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>", buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "", firstDay = parseInt(this._get(inst, "firstDay"), 10), firstDay = isNaN(firstDay) ? 0 : firstDay, showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), dayNamesMin = this._get(inst, "dayNamesMin"), monthNames = this._get(inst, "monthNames"), monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), defaultDate = this._getDefaultDate(inst), html = "", row = 0; row < numMonths[0]; row++) {
                for (group = "", this.maxRows = 4, col = 0; col < numMonths[1]; col++) {
                    if (selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)), cornerClass = " ui-corner-all", calender = "", isMultiMonth) {
                        if (calender += "<div class='ui-datepicker-group", numMonths[1] > 1) switch (col) {
                            case 0:
                                calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += " ui-datepicker-group-middle", cornerClass = ""
                        }
                        calender += "'>"
                    }
                    for (calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead><tr>", thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "", dow = 0; 7 > dow; dow++) day = (dow + firstDay) % 7, thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                    for (calender += thead + "</tr></thead><tbody>", daysInMonth = this._getDaysInMonth(drawYear, drawMonth), drawYear === inst.selectedYear && drawMonth === inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)), leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7), numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows, this.maxRows = numRows, printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), dRow = 0; numRows > dRow; dRow++) {
                        for (calender += "<tr>", tbody = showWeek ? "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>" : "", dow = 0; 7 > dow; dow++) daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [!0, ""], otherMonth = printDate.getMonth() !== drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && minDate > printDate || maxDate && printDate > maxDate, tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : " title='" + daySettings[2].replace(/'/g, "&#39;") + "'") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>", printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
                        calender += tbody + "</tr>"
                    }
                    drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), group += calender
                }
                html += group
            }
            return html += buttonPanel, inst._keyEvent = !1, html
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"),
                changeYear = this._get(inst, "changeYear"),
                showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
                html = "<div class='ui-datepicker-title'>",
                monthHtml = "";
            if (secondary || !changeMonth) monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
            else {
                for (inMinYear = minDate && minDate.getFullYear() === drawYear, inMaxYear = maxDate && maxDate.getFullYear() === drawYear, monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", month = 0; 12 > month; month++)(!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>");
                monthHtml += "</select>"
            }
            if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")), !inst.yearshtml)
                if (inst.yearshtml = "", secondary || !changeYear) html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
                else {
                    for (years = this._get(inst, "yearRange").split(":"), thisYear = (new Date).getFullYear(), determineYear = function(value) {
                        var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                        return isNaN(year) ? thisYear : year
                    }, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || "")), year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear, inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; endYear >= year; year++) inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                    inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null
                }
            return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml), html += "</div>"
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + ("Y" === period ? offset : 0),
                month = inst.drawMonth + ("M" === period ? offset : 0),
                day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? offset : 0),
                date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), "M" !== period && "Y" !== period || this._notifyChange(inst)
        },
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"),
                maxDate = this._getMinMaxDate(inst, "max"),
                newDate = minDate && minDate > date ? minDate : date;
            return maxDate && newDate > maxDate ? maxDate : newDate
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            onChange && onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst])
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return null == numMonths ? [1, 1] : "number" == typeof numMonths ? [1, numMonths] : numMonths
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function(year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst),
                date = this._daylightSavingAdjust(new Date(curYear, curMonth + (0 > offset ? offset : numMonths[0] * numMonths[1]), 1));
            return 0 > offset && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), this._isInRange(inst, date)
        },
        _isInRange: function(inst, date) {
            var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"),
                maxDate = this._getMinMaxDate(inst, "max"),
                minYear = null,
                maxYear = null,
                years = this._get(inst, "yearRange");
            return years && (yearSplit = years.split(":"), currentYear = (new Date).getFullYear(), minYear = parseInt(yearSplit[0], 10),
                maxYear = parseInt(yearSplit[1], 10), yearSplit[0].match(/[+\-].*/) && (minYear += currentYear), yearSplit[1].match(/[+\-].*/) && (maxYear += currentYear)), (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear)
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10), {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function(inst, day, month, year) {
            day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, inst.currentYear = inst.selectedYear);
            var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    }), $.fn.datepicker = function(options) {
        if (!this.length) return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick), $.datepicker.initialized = !0), 0 === $("#" + $.datepicker._mainDivId).length && $("body").append($.datepicker.dpDiv);
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof options || "isDisabled" !== options && "getDate" !== options && "widget" !== options ? "option" === options && 2 === arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs)) : this.each(function() {
            "string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        }) : $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.11.4";
    $.datepicker
}),
    function($) {
        function Axis(name) {
            $.jqplot.ElemContainer.call(this), this.name = name, this._series = [], this.show = !1, this.tickRenderer = $.jqplot.AxisTickRenderer, this.tickOptions = {}, this.labelRenderer = $.jqplot.AxisLabelRenderer, this.labelOptions = {}, this.label = null, this.showLabel = !0, this.min = null, this.max = null, this.autoscale = !1, this.pad = 1.2, this.padMax = null, this.padMin = null, this.ticks = [], this.numberTicks, this.tickInterval, this.renderer = $.jqplot.LinearAxisRenderer, this.rendererOptions = {}, this.showTicks = !0, this.showTickMarks = !0, this.showMinorTicks = !0, this.drawMajorGridlines = !0, this.drawMinorGridlines = !1, this.drawMajorTickMarks = !0, this.drawMinorTickMarks = !0, this.useSeriesColor = !1, this.borderWidth = null, this.borderColor = null, this.scaleToHiddenSeries = !1, this._dataBounds = {
                min: null,
                max: null
            }, this._intervalStats = [], this._offsets = {
                min: null,
                max: null
            }, this._ticks = [], this._label = null, this.syncTicks = null, this.tickSpacing = 75, this._min = null, this._max = null, this._tickInterval = null, this._numberTicks = null, this.__ticks = null, this._options = {}
        }

        function Legend(options) {
            $.jqplot.ElemContainer.call(this), this.show = !1, this.location = "ne", this.labels = [], this.showLabels = !0, this.showSwatches = !0, this.placement = "insideGrid", this.xoffset = 0, this.yoffset = 0, this.border, this.background, this.textColor, this.fontFamily, this.fontSize, this.rowSpacing = "0.5em", this.renderer = $.jqplot.TableLegendRenderer, this.rendererOptions = {}, this.preDraw = !1, this.marginTop = null, this.marginRight = null, this.marginBottom = null, this.marginLeft = null, this.escapeHtml = !1, this._series = [], $.extend(!0, this, options)
        }

        function Title(text) {
            $.jqplot.ElemContainer.call(this), this.text = text, this.show = !0, this.fontFamily, this.fontSize, this.textAlign, this.textColor, this.renderer = $.jqplot.DivTitleRenderer, this.rendererOptions = {}, this.escapeHtml = !1
        }

        function Series(options) {
            options = options || {}, $.jqplot.ElemContainer.call(this), this.show = !0, this.xaxis = "xaxis", this._xaxis, this.yaxis = "yaxis", this._yaxis, this.gridBorderWidth = 2, this.renderer = $.jqplot.LineRenderer, this.rendererOptions = {}, this.data = [], this.gridData = [], this.label = "", this.showLabel = !0, this.color, this.negativeColor, this.lineWidth = 2.5, this.lineJoin = "round", this.lineCap = "round", this.linePattern = "solid", this.shadow = !0, this.shadowAngle = 45, this.shadowOffset = 1.25, this.shadowDepth = 3, this.shadowAlpha = "0.1", this.breakOnNull = !1, this.markerRenderer = $.jqplot.MarkerRenderer, this.markerOptions = {}, this.showLine = !0, this.showMarker = !0, this.index, this.fill = !1, this.fillColor, this.fillAlpha, this.fillAndStroke = !1, this.disableStack = !1, this._stack = !1, this.neighborThreshold = 4, this.fillToZero = !1, this.fillToValue = 0, this.fillAxis = "y", this.useNegativeColors = !0, this._stackData = [], this._plotData = [], this._plotValues = {
                x: [],
                y: []
            }, this._intervals = {
                x: {},
                y: {}
            }, this._prevPlotData = [], this._prevGridData = [], this._stackAxis = "y", this._primaryAxis = "_xaxis", this.canvas = new $.jqplot.GenericCanvas, this.shadowCanvas = new $.jqplot.GenericCanvas, this.plugins = {}, this._sumy = 0, this._sumx = 0, this._type = ""
        }

        function Grid() {
            $.jqplot.ElemContainer.call(this), this.drawGridlines = !0, this.gridLineColor = "#cccccc", this.gridLineWidth = 1, this.background = "#fffdf6", this.borderColor = "#999999", this.borderWidth = 2, this.drawBorder = !0, this.shadow = !0, this.shadowAngle = 45, this.shadowOffset = 1.5, this.shadowWidth = 3, this.shadowDepth = 3, this.shadowColor = null, this.shadowAlpha = "0.07", this._left, this._top, this._right, this._bottom, this._width, this._height, this._axes = [], this.renderer = $.jqplot.CanvasGridRenderer, this.rendererOptions = {}, this._offsets = {
                top: null,
                bottom: null,
                left: null,
                right: null
            }
        }

        function jqPlot() {
            function sortData(series) {
                for (var d, i = 0; i < series.length; i++)
                    for (var check, bat = [series[i].data, series[i]._stackData, series[i]._plotData, series[i]._prevPlotData], n = 0; 4 > n; n++)
                        if (check = !0, d = bat[n], "x" == series[i]._stackAxis) {
                            for (var j = 0; j < d.length; j++)
                                if ("number" != typeof d[j][1]) {
                                    check = !1;
                                    break
                                }
                            check && d.sort(function(a, b) {
                                return a[1] - b[1]
                            })
                        } else {
                            for (var j = 0; j < d.length; j++)
                                if ("number" != typeof d[j][0]) {
                                    check = !1;
                                    break
                                }
                            check && d.sort(function(a, b) {
                                return a[0] - b[0]
                            })
                        }
            }

            function getEventPosition(ev) {
                var n, axis, plot = ev.data.plot,
                    go = plot.eventCanvas._elem.offset(),
                    gridPos = {
                        x: ev.pageX - go.left,
                        y: ev.pageY - go.top
                    },
                    dataPos = {
                        xaxis: null,
                        yaxis: null,
                        x2axis: null,
                        y2axis: null,
                        y3axis: null,
                        y4axis: null,
                        y5axis: null,
                        y6axis: null,
                        y7axis: null,
                        y8axis: null,
                        y9axis: null,
                        yMidAxis: null
                    },
                    an = ["xaxis", "yaxis", "x2axis", "y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis", "yMidAxis"],
                    ax = plot.axes;
                for (n = 11; n > 0; n--) axis = an[n - 1], ax[axis].show && (dataPos[axis] = ax[axis].series_p2u(gridPos[axis.charAt(0)]));
                return {
                    offsets: go,
                    gridPos: gridPos,
                    dataPos: dataPos
                }
            }

            function checkIntersection(gridpos, plot) {
                function findedge(l, p1, p2) {
                    var m = (p1[1] - p2[1]) / (p1[0] - p2[0]),
                        b = p1[1] - m * p1[0],
                        y = l + p1[1];
                    return [(y - b) / m, y]
                }
                var i, j, k, s, r, x, y, theta, sm, sa, minang, maxang, d0, d, p, points, hp, threshold, t, series = plot.series;
                for (k = plot.seriesStack.length - 1; k >= 0; k--) switch (i = plot.seriesStack[k], s = series[i], hp = s._highlightThreshold, s.renderer.constructor) {
                    case $.jqplot.BarRenderer:
                        for (x = gridpos.x, y = gridpos.y, j = 0; j < s._barPoints.length; j++)
                            if (points = s._barPoints[j], p = s.gridData[j], x > points[0][0] && x < points[2][0] && y > points[2][1] && y < points[0][1]) return {
                                seriesIndex: s.index,
                                pointIndex: j,
                                gridData: p,
                                data: s.data[j],
                                points: s._barPoints[j]
                            };
                        break;
                    case $.jqplot.PyramidRenderer:
                        for (x = gridpos.x, y = gridpos.y, j = 0; j < s._barPoints.length; j++)
                            if (points = s._barPoints[j], p = s.gridData[j], x > points[0][0] + hp[0][0] && x < points[2][0] + hp[2][0] && y > points[2][1] && y < points[0][1]) return {
                                seriesIndex: s.index,
                                pointIndex: j,
                                gridData: p,
                                data: s.data[j],
                                points: s._barPoints[j]
                            };
                        break;
                    case $.jqplot.DonutRenderer:
                        if (sa = s.startAngle / 180 * Math.PI, x = gridpos.x - s._center[0], y = gridpos.y - s._center[1], r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), x > 0 && -y >= 0 ? theta = 2 * Math.PI - Math.atan(-y / x) : x > 0 && 0 > -y ? theta = -Math.atan(-y / x) : 0 > x ? theta = Math.PI - Math.atan(-y / x) : 0 == x && -y > 0 ? theta = 3 * Math.PI / 2 : 0 == x && 0 > -y ? theta = Math.PI / 2 : 0 == x && 0 == y && (theta = 0), sa && (theta -= sa, 0 > theta ? theta += 2 * Math.PI : theta > 2 * Math.PI && (theta -= 2 * Math.PI)), sm = s.sliceMargin / 180 * Math.PI, r < s._radius && r > s._innerRadius)
                            for (j = 0; j < s.gridData.length; j++)
                                if (minang = j > 0 ? s.gridData[j - 1][1] + sm : sm, maxang = s.gridData[j][1], theta > minang && maxang > theta) return {
                                    seriesIndex: s.index,
                                    pointIndex: j,
                                    gridData: [gridpos.x, gridpos.y],
                                    data: s.data[j]
                                };
                        break;
                    case $.jqplot.PieRenderer:
                        if (sa = s.startAngle / 180 * Math.PI, x = gridpos.x - s._center[0], y = gridpos.y - s._center[1], r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), x > 0 && -y >= 0 ? theta = 2 * Math.PI - Math.atan(-y / x) : x > 0 && 0 > -y ? theta = -Math.atan(-y / x) : 0 > x ? theta = Math.PI - Math.atan(-y / x) : 0 == x && -y > 0 ? theta = 3 * Math.PI / 2 : 0 == x && 0 > -y ? theta = Math.PI / 2 : 0 == x && 0 == y && (theta = 0), sa && (theta -= sa, 0 > theta ? theta += 2 * Math.PI : theta > 2 * Math.PI && (theta -= 2 * Math.PI)), sm = s.sliceMargin / 180 * Math.PI, r < s._radius)
                            for (j = 0; j < s.gridData.length; j++)
                                if (minang = j > 0 ? s.gridData[j - 1][1] + sm : sm, maxang = s.gridData[j][1], theta > minang && maxang > theta) return {
                                    seriesIndex: s.index,
                                    pointIndex: j,
                                    gridData: [gridpos.x, gridpos.y],
                                    data: s.data[j]
                                };
                        break;
                    case $.jqplot.BubbleRenderer:
                        x = gridpos.x, y = gridpos.y;
                        var ret = null;
                        if (s.show) {
                            for (var j = 0; j < s.gridData.length; j++) p = s.gridData[j], d = Math.sqrt((x - p[0]) * (x - p[0]) + (y - p[1]) * (y - p[1])), d <= p[2] && (d0 >= d || null == d0) && (d0 = d, ret = {
                                seriesIndex: i,
                                pointIndex: j,
                                gridData: p,
                                data: s.data[j]
                            });
                            if (null != ret) return ret
                        }
                        break;
                    case $.jqplot.FunnelRenderer:
                        x = gridpos.x, y = gridpos.y;
                        var lex, rex, cv, v = s._vertices,
                            vfirst = v[0],
                            vlast = v[v.length - 1];
                        for (lex = findedge(y, vfirst[0], vlast[3]), rex = findedge(y, vfirst[1], vlast[2]), j = 0; j < v.length; j++)
                            if (cv = v[j], y >= cv[0][1] && y <= cv[3][1] && x >= lex[0] && x <= rex[0]) return {
                                seriesIndex: s.index,
                                pointIndex: j,
                                gridData: null,
                                data: s.data[j]
                            };
                        break;
                    case $.jqplot.LineRenderer:
                        if (x = gridpos.x, y = gridpos.y, r = s.renderer, s.show) {
                            if (!(!(s.fill || s.renderer.bands.show && s.renderer.bands.fill) || plot.plugins.highlighter && plot.plugins.highlighter.show)) {
                                var inside = !1;
                                if (x > s._boundingBox[0][0] && x < s._boundingBox[1][0] && y > s._boundingBox[1][1] && y < s._boundingBox[0][1])
                                    for (var ii, numPoints = s._areaPoints.length, j = numPoints - 1, ii = 0; numPoints > ii; ii++) {
                                        var vertex1 = [s._areaPoints[ii][0], s._areaPoints[ii][1]],
                                            vertex2 = [s._areaPoints[j][0], s._areaPoints[j][1]];
                                        (vertex1[1] < y && vertex2[1] >= y || vertex2[1] < y && vertex1[1] >= y) && vertex1[0] + (y - vertex1[1]) / (vertex2[1] - vertex1[1]) * (vertex2[0] - vertex1[0]) < x && (inside = !inside), j = ii
                                    }
                                if (inside) return {
                                    seriesIndex: i,
                                    pointIndex: null,
                                    gridData: s.gridData,
                                    data: s.data,
                                    points: s._areaPoints
                                };
                                break
                            }
                            t = s.markerRenderer.size / 2 + s.neighborThreshold, threshold = t > 0 ? t : 0;
                            for (var j = 0; j < s.gridData.length; j++)
                                if (p = s.gridData[j], r.constructor == $.jqplot.OHLCRenderer)
                                    if (r.candleStick) {
                                        var yp = s._yaxis.series_u2p;
                                        if (x >= p[0] - r._bodyWidth / 2 && x <= p[0] + r._bodyWidth / 2 && y >= yp(s.data[j][2]) && y <= yp(s.data[j][3])) return {
                                            seriesIndex: i,
                                            pointIndex: j,
                                            gridData: p,
                                            data: s.data[j]
                                        }
                                    } else if (r.hlc) {
                                        var yp = s._yaxis.series_u2p;
                                        if (x >= p[0] - r._tickLength && x <= p[0] + r._tickLength && y >= yp(s.data[j][1]) && y <= yp(s.data[j][2])) return {
                                            seriesIndex: i,
                                            pointIndex: j,
                                            gridData: p,
                                            data: s.data[j]
                                        }
                                    } else {
                                        var yp = s._yaxis.series_u2p;
                                        if (x >= p[0] - r._tickLength && x <= p[0] + r._tickLength && y >= yp(s.data[j][2]) && y <= yp(s.data[j][3])) return {
                                            seriesIndex: i,
                                            pointIndex: j,
                                            gridData: p,
                                            data: s.data[j]
                                        }
                                    } else if (null != p[0] && null != p[1] && (d = Math.sqrt((x - p[0]) * (x - p[0]) + (y - p[1]) * (y - p[1])), threshold >= d && (d0 >= d || null == d0))) return d0 = d, {
                                    seriesIndex: i,
                                    pointIndex: j,
                                    gridData: p,
                                    data: s.data[j]
                                }
                        }
                        break;
                    default:
                        if (x = gridpos.x, y = gridpos.y, r = s.renderer, s.show) {
                            t = s.markerRenderer.size / 2 + s.neighborThreshold, threshold = t > 0 ? t : 0;
                            for (var j = 0; j < s.gridData.length; j++)
                                if (p = s.gridData[j], r.constructor == $.jqplot.OHLCRenderer)
                                    if (r.candleStick) {
                                        var yp = s._yaxis.series_u2p;
                                        if (x >= p[0] - r._bodyWidth / 2 && x <= p[0] + r._bodyWidth / 2 && y >= yp(s.data[j][2]) && y <= yp(s.data[j][3])) return {
                                            seriesIndex: i,
                                            pointIndex: j,
                                            gridData: p,
                                            data: s.data[j]
                                        }
                                    } else if (r.hlc) {
                                        var yp = s._yaxis.series_u2p;
                                        if (x >= p[0] - r._tickLength && x <= p[0] + r._tickLength && y >= yp(s.data[j][1]) && y <= yp(s.data[j][2])) return {
                                            seriesIndex: i,
                                            pointIndex: j,
                                            gridData: p,
                                            data: s.data[j]
                                        }
                                    } else {
                                        var yp = s._yaxis.series_u2p;
                                        if (x >= p[0] - r._tickLength && x <= p[0] + r._tickLength && y >= yp(s.data[j][2]) && y <= yp(s.data[j][3])) return {
                                            seriesIndex: i,
                                            pointIndex: j,
                                            gridData: p,
                                            data: s.data[j]
                                        }
                                    } else if (d = Math.sqrt((x - p[0]) * (x - p[0]) + (y - p[1]) * (y - p[1])), threshold >= d && (d0 >= d || null == d0)) return d0 = d, {
                                    seriesIndex: i,
                                    pointIndex: j,
                                    gridData: p,
                                    data: s.data[j]
                                }
                        }
                }
                return null
            }
            this.animate = !1, this.animateReplot = !1, this.axes = {
                xaxis: new Axis("xaxis"),
                yaxis: new Axis("yaxis"),
                x2axis: new Axis("x2axis"),
                y2axis: new Axis("y2axis"),
                y3axis: new Axis("y3axis"),
                y4axis: new Axis("y4axis"),
                y5axis: new Axis("y5axis"),
                y6axis: new Axis("y6axis"),
                y7axis: new Axis("y7axis"),
                y8axis: new Axis("y8axis"),
                y9axis: new Axis("y9axis"),
                yMidAxis: new Axis("yMidAxis")
            }, this.baseCanvas = new $.jqplot.GenericCanvas, this.captureRightClick = !1, this.data = [], this.dataRenderer, this.dataRendererOptions, this.defaults = {
                axesDefaults: {},
                axes: {
                    xaxis: {},
                    yaxis: {},
                    x2axis: {},
                    y2axis: {},
                    y3axis: {},
                    y4axis: {},
                    y5axis: {},
                    y6axis: {},
                    y7axis: {},
                    y8axis: {},
                    y9axis: {},
                    yMidAxis: {}
                },
                seriesDefaults: {},
                series: []
            }, this.defaultAxisStart = 1, this.drawIfHidden = !1, this.eventCanvas = new $.jqplot.GenericCanvas, this.fillBetween = {
                series1: null,
                series2: null,
                color: null,
                baseSeries: 0,
                fill: !0
            }, this.fontFamily, this.fontSize, this.grid = new Grid, this.legend = new Legend, this.noDataIndicator = {
                show: !1,
                indicator: "Loading Data...",
                axes: {
                    xaxis: {
                        min: 0,
                        max: 10,
                        tickInterval: 2,
                        show: !0
                    },
                    yaxis: {
                        min: 0,
                        max: 12,
                        tickInterval: 3,
                        show: !0
                    }
                }
            }, this.negativeSeriesColors = $.jqplot.config.defaultNegativeColors, this.options = {}, this.previousSeriesStack = [], this.plugins = {}, this.series = [], this.seriesStack = [], this.seriesColors = $.jqplot.config.defaultColors, this.sortData = !0, this.stackSeries = !1, this.syncXTicks = !0, this.syncYTicks = !0, this.target = null, this.targetId = null, this.textColor, this.title = new Title, this._drawCount = 0, this._sumy = 0, this._sumx = 0, this._stackData = [], this._plotData = [], this._width = null, this._height = null, this._plotDimensions = {
                height: null,
                width: null
            }, this._gridPadding = {
                top: null,
                right: null,
                bottom: null,
                left: null
            }, this._defaultGridPadding = {
                top: 10,
                right: 10,
                bottom: 23,
                left: 10
            }, this._addDomReference = $.jqplot.config.addDomReference, this.preInitHooks = new $.jqplot.HooksManager, this.postInitHooks = new $.jqplot.HooksManager, this.preParseOptionsHooks = new $.jqplot.HooksManager, this.postParseOptionsHooks = new $.jqplot.HooksManager, this.preDrawHooks = new $.jqplot.HooksManager, this.postDrawHooks = new $.jqplot.HooksManager, this.preDrawSeriesHooks = new $.jqplot.HooksManager, this.postDrawSeriesHooks = new $.jqplot.HooksManager, this.preDrawLegendHooks = new $.jqplot.HooksManager, this.addLegendRowHooks = new $.jqplot.HooksManager, this.preSeriesInitHooks = new $.jqplot.HooksManager, this.postSeriesInitHooks = new $.jqplot.HooksManager, this.preParseSeriesOptionsHooks = new $.jqplot.HooksManager, this.postParseSeriesOptionsHooks = new $.jqplot.HooksManager, this.eventListenerHooks = new $.jqplot.EventListenerManager, this.preDrawSeriesShadowHooks = new $.jqplot.HooksManager, this.postDrawSeriesShadowHooks = new $.jqplot.HooksManager, this.colorGenerator = new $.jqplot.ColorGenerator, this.negativeColorGenerator = new $.jqplot.ColorGenerator, this.canvasManager = new $.jqplot.CanvasManager, this.themeEngine = new $.jqplot.ThemeEngine;
            this.init = function(target, data, options) {
                options = options || {};
                for (var i = 0; i < $.jqplot.preInitHooks.length; i++) $.jqplot.preInitHooks[i].call(this, target, data, options);
                for (var i = 0; i < this.preInitHooks.hooks.length; i++) this.preInitHooks.hooks[i].call(this, target, data, options);
                if (this.targetId = "#" + target, this.target = $("#" + target), this._addDomReference && this.target.data("jqplot", this), this.target.removeClass("jqplot-error"), !this.target.get(0)) throw new Error("No plot target specified");
                if ("static" == this.target.css("position") && this.target.css("position", "relative"), this.target.hasClass("jqplot-target") || this.target.addClass("jqplot-target"), this.target.height()) this._height = h = this.target.height();
                else {
                    var h;
                    h = options && options.height ? parseInt(options.height, 10) : this.target.attr("data-height") ? parseInt(this.target.attr("data-height"), 10) : parseInt($.jqplot.config.defaultHeight, 10), this._height = h, this.target.css("height", h + "px")
                }
                if (this.target.width()) this._width = w = this.target.width();
                else {
                    var w;
                    w = options && options.width ? parseInt(options.width, 10) : this.target.attr("data-width") ? parseInt(this.target.attr("data-width"), 10) : parseInt($.jqplot.config.defaultWidth, 10), this._width = w, this.target.css("width", w + "px")
                }
                for (var i = 0, l = _axisNames.length; l > i; i++) this.axes[_axisNames[i]] = new Axis(_axisNames[i]);
                if (this._plotDimensions.height = this._height, this._plotDimensions.width = this._width, this.grid._plotDimensions = this._plotDimensions, this.title._plotDimensions = this._plotDimensions, this.baseCanvas._plotDimensions = this._plotDimensions, this.eventCanvas._plotDimensions = this._plotDimensions, this.legend._plotDimensions = this._plotDimensions, this._height <= 0 || this._width <= 0 || !this._height || !this._width) throw new Error("Canvas dimension not set");
                if (options.dataRenderer && $.isFunction(options.dataRenderer) && (options.dataRendererOptions && (this.dataRendererOptions = options.dataRendererOptions), this.dataRenderer = options.dataRenderer, data = this.dataRenderer(data, this, this.dataRendererOptions)), options.noDataIndicator && $.isPlainObject(options.noDataIndicator) && $.extend(!0, this.noDataIndicator, options.noDataIndicator), null == data || 0 == $.isArray(data) || 0 == data.length || 0 == $.isArray(data[0]) || 0 == data[0].length) {
                    if (0 == this.noDataIndicator.show) throw new Error("No data specified");
                    for (var ax in this.noDataIndicator.axes)
                        for (var prop in this.noDataIndicator.axes[ax]) this.axes[ax][prop] = this.noDataIndicator.axes[ax][prop];
                    this.postDrawHooks.add(function() {
                        var eh = this.eventCanvas.getHeight(),
                            ew = this.eventCanvas.getWidth(),
                            temp = $('<div class="jqplot-noData-container" style="position:absolute;"></div>');
                        this.target.append(temp), temp.height(eh), temp.width(ew), temp.css("top", this.eventCanvas._offsets.top), temp.css("left", this.eventCanvas._offsets.left);
                        var temp2 = $('<div class="jqplot-noData-contents" style="text-align:center; position:relative; margin-left:auto; margin-right:auto;"></div>');
                        temp.append(temp2), temp2.html(this.noDataIndicator.indicator);
                        var th = temp2.height(),
                            tw = temp2.width();
                        temp2.height(th), temp2.width(tw), temp2.css("top", (eh - th) / 2 + "px")
                    })
                }
                this.data = $.extend(!0, [], data), this.parseOptions(options), this.textColor && this.target.css("color", this.textColor), this.fontFamily && this.target.css("font-family", this.fontFamily), this.fontSize && this.target.css("font-size", this.fontSize), this.title.init(), this.legend.init(), this._sumy = 0, this._sumx = 0, this.computePlotData();
                for (var i = 0; i < this.series.length; i++) {
                    this.seriesStack.push(i), this.previousSeriesStack.push(i), this.series[i].shadowCanvas._plotDimensions = this._plotDimensions, this.series[i].canvas._plotDimensions = this._plotDimensions;
                    for (var j = 0; j < $.jqplot.preSeriesInitHooks.length; j++) $.jqplot.preSeriesInitHooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    for (var j = 0; j < this.preSeriesInitHooks.hooks.length; j++) this.preSeriesInitHooks.hooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    this.series[i]._plotDimensions = this._plotDimensions, this.series[i].init(i, this.grid.borderWidth, this);
                    for (var j = 0; j < $.jqplot.postSeriesInitHooks.length; j++) $.jqplot.postSeriesInitHooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    for (var j = 0; j < this.postSeriesInitHooks.hooks.length; j++) this.postSeriesInitHooks.hooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    this._sumy += this.series[i]._sumy, this._sumx += this.series[i]._sumx
                }
                for (var name, axis, i = 0, l = _axisNames.length; l > i; i++) name = _axisNames[i], axis = this.axes[name], axis._plotDimensions = this._plotDimensions, axis.init(), null == this.axes[name].borderColor && ("x" !== name.charAt(0) && axis.useSeriesColor === !0 && axis.show ? axis.borderColor = axis._series[0].color : axis.borderColor = this.grid.borderColor);
                this.sortData && sortData(this.series), this.grid.init(), this.grid._axes = this.axes, this.legend._series = this.series;
                for (var i = 0; i < $.jqplot.postInitHooks.length; i++) $.jqplot.postInitHooks[i].call(this, target, this.data, options);
                for (var i = 0; i < this.postInitHooks.hooks.length; i++) this.postInitHooks.hooks[i].call(this, target, this.data, options)
            }, this.resetAxesScale = function(axes, options) {
                var opts = options || {},
                    ax = axes || this.axes;
                if (ax === !0 && (ax = this.axes), $.isArray(ax))
                    for (var i = 0; i < ax.length; i++) this.axes[ax[i]].resetScale(opts[ax[i]]);
                else if ("object" == typeof ax)
                    for (var name in ax) this.axes[name].resetScale(opts[name])
            }, this.reInitialize = function(data, opts) {
                for (var options = $.extend(!0, {}, this.options, opts), target = this.targetId.substr(1), tdata = null == data ? this.data : data, i = 0; i < $.jqplot.preInitHooks.length; i++) $.jqplot.preInitHooks[i].call(this, target, tdata, options);
                for (var i = 0; i < this.preInitHooks.hooks.length; i++) this.preInitHooks.hooks[i].call(this, target, tdata, options);
                if (this._height = this.target.height(), this._width = this.target.width(), this._height <= 0 || this._width <= 0 || !this._height || !this._width) throw new Error("Target dimension not set");
                this._plotDimensions.height = this._height, this._plotDimensions.width = this._width, this.grid._plotDimensions = this._plotDimensions, this.title._plotDimensions = this._plotDimensions, this.baseCanvas._plotDimensions = this._plotDimensions, this.eventCanvas._plotDimensions = this._plotDimensions, this.legend._plotDimensions = this._plotDimensions;
                for (var name, t, j, axis, i = 0, l = _axisNames.length; l > i; i++) {
                    name = _axisNames[i], axis = this.axes[name], t = axis._ticks;
                    for (var j = 0, tlen = t.length; tlen > j; j++) {
                        var el = t[j]._elem;
                        el && ($.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== undefined && window.G_vmlCanvasManager.uninitElement(el.get(0)), el.emptyForce(), el = null, t._elem = null)
                    }
                    t = null, delete axis.ticks, delete axis._ticks, this.axes[name] = new Axis(name), this.axes[name]._plotWidth = this._width, this.axes[name]._plotHeight = this._height
                }
                data && (options.dataRenderer && $.isFunction(options.dataRenderer) && (options.dataRendererOptions && (this.dataRendererOptions = options.dataRendererOptions), this.dataRenderer = options.dataRenderer, data = this.dataRenderer(data, this, this.dataRendererOptions)), this.data = $.extend(!0, [], data)), opts && this.parseOptions(options), this.title._plotWidth = this._width, this.textColor && this.target.css("color", this.textColor), this.fontFamily && this.target.css("font-family", this.fontFamily), this.fontSize && this.target.css("font-size", this.fontSize), this.title.init(), this.legend.init(), this._sumy = 0, this._sumx = 0, this.seriesStack = [], this.previousSeriesStack = [], this.computePlotData();
                for (var i = 0, l = this.series.length; l > i; i++) {
                    this.seriesStack.push(i), this.previousSeriesStack.push(i), this.series[i].shadowCanvas._plotDimensions = this._plotDimensions, this.series[i].canvas._plotDimensions = this._plotDimensions;
                    for (var j = 0; j < $.jqplot.preSeriesInitHooks.length; j++) $.jqplot.preSeriesInitHooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    for (var j = 0; j < this.preSeriesInitHooks.hooks.length; j++) this.preSeriesInitHooks.hooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    this.series[i]._plotDimensions = this._plotDimensions, this.series[i].init(i, this.grid.borderWidth, this);
                    for (var j = 0; j < $.jqplot.postSeriesInitHooks.length; j++) $.jqplot.postSeriesInitHooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    for (var j = 0; j < this.postSeriesInitHooks.hooks.length; j++) this.postSeriesInitHooks.hooks[j].call(this.series[i], target, this.data, this.options.seriesDefaults, this.options.series[i], this);
                    this._sumy += this.series[i]._sumy, this._sumx += this.series[i]._sumx
                }
                for (var i = 0, l = _axisNames.length; l > i; i++) name = _axisNames[i], axis = this.axes[name], axis._plotDimensions = this._plotDimensions, axis.init(), null == axis.borderColor && ("x" !== name.charAt(0) && axis.useSeriesColor === !0 && axis.show ? axis.borderColor = axis._series[0].color : axis.borderColor = this.grid.borderColor);
                this.sortData && sortData(this.series), this.grid.init(), this.grid._axes = this.axes, this.legend._series = this.series;
                for (var i = 0, l = $.jqplot.postInitHooks.length; l > i; i++) $.jqplot.postInitHooks[i].call(this, target, this.data, options);
                for (var i = 0, l = this.postInitHooks.hooks.length; l > i; i++) this.postInitHooks.hooks[i].call(this, target, this.data, options)
            }, this.quickInit = function() {
                if (this._height = this.target.height(), this._width = this.target.width(), this._height <= 0 || this._width <= 0 || !this._height || !this._width) throw new Error("Target dimension not set");
                this._plotDimensions.height = this._height, this._plotDimensions.width = this._width, this.grid._plotDimensions = this._plotDimensions, this.title._plotDimensions = this._plotDimensions, this.baseCanvas._plotDimensions = this._plotDimensions, this.eventCanvas._plotDimensions = this._plotDimensions, this.legend._plotDimensions = this._plotDimensions;
                for (var n in this.axes) this.axes[n]._plotWidth = this._width, this.axes[n]._plotHeight = this._height;
                this.title._plotWidth = this._width, this.textColor && this.target.css("color", this.textColor), this.fontFamily && this.target.css("font-family", this.fontFamily), this.fontSize && this.target.css("font-size", this.fontSize), this._sumy = 0, this._sumx = 0, this.computePlotData();
                for (var i = 0; i < this.series.length; i++) "line" === this.series[i]._type && this.series[i].renderer.bands.show && this.series[i].renderer.initBands.call(this.series[i], this.series[i].renderer.options, this), this.series[i]._plotDimensions = this._plotDimensions, this.series[i].canvas._plotDimensions = this._plotDimensions, this._sumy += this.series[i]._sumy, this._sumx += this.series[i]._sumx;
                for (var name, j = 0; 12 > j; j++) {
                    name = _axisNames[j];
                    for (var t = this.axes[name]._ticks, i = 0; i < t.length; i++) {
                        var el = t[i]._elem;
                        el && ($.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== undefined && window.G_vmlCanvasManager.uninitElement(el.get(0)), el.emptyForce(), el = null, t._elem = null)
                    }
                    t = null, this.axes[name]._plotDimensions = this._plotDimensions, this.axes[name]._ticks = []
                }
                this.sortData && sortData(this.series), this.grid._axes = this.axes, this.legend._series = this.series
            }, this.computePlotData = function() {
                this._plotData = [], this._stackData = [];
                var series, index, l;
                for (index = 0, l = this.series.length; l > index; index++) {
                    series = this.series[index], this._plotData.push([]), this._stackData.push([]);
                    var cd = series.data;
                    this._plotData[index] = $.extend(!0, [], cd), this._stackData[index] = $.extend(!0, [], cd), series._plotData = this._plotData[index], series._stackData = this._stackData[index];
                    var plotValues = {
                        x: [],
                        y: []
                    };
                    if (this.stackSeries && !series.disableStack) {
                        series._stack = !0;
                        for (var sidx = "x" === series._stackAxis ? 0 : 1, k = 0, cdl = cd.length; cdl > k; k++) {
                            var temp = cd[k][sidx];
                            if (null == temp && (temp = 0), this._plotData[index][k][sidx] = temp, this._stackData[index][k][sidx] = temp, index > 0)
                                for (var j = index; j--;) {
                                    var prevval = this._plotData[j][k][sidx];
                                    if (temp * prevval >= 0) {
                                        this._plotData[index][k][sidx] += prevval, this._stackData[index][k][sidx] += prevval;
                                        break
                                    }
                                }
                        }
                    } else {
                        for (var i = 0; i < series.data.length; i++) plotValues.x.push(series.data[i][0]), plotValues.y.push(series.data[i][1]);
                        this._stackData.push(series.data), this.series[index]._stackData = series.data, this._plotData.push(series.data), series._plotData = series.data, series._plotValues = plotValues
                    }
                    for (index > 0 && (series._prevPlotData = this.series[index - 1]._plotData), series._sumy = 0, series._sumx = 0, i = series.data.length - 1; i > -1; i--) series._sumy += series.data[i][1], series._sumx += series.data[i][0]
                }
            }, this.populatePlotData = function(series, index) {
                this._plotData = [], this._stackData = [], series._stackData = [], series._plotData = [];
                var plotValues = {
                    x: [],
                    y: []
                };
                if (this.stackSeries && !series.disableStack) {
                    series._stack = !0;
                    for (var tempx, tempy, dval, stackval, sidx = "x" === series._stackAxis ? 0 : 1, temp = $.extend(!0, [], series.data), plotdata = $.extend(!0, [], series.data), j = 0; index > j; j++)
                        for (var cd = this.series[j].data, k = 0; k < cd.length; k++) dval = cd[k], tempx = null != dval[0] ? dval[0] : 0, tempy = null != dval[1] ? dval[1] : 0, temp[k][0] += tempx, temp[k][1] += tempy, stackval = sidx ? tempy : tempx, series.data[k][sidx] * stackval >= 0 && (plotdata[k][sidx] += stackval);
                    for (var i = 0; i < plotdata.length; i++) plotValues.x.push(plotdata[i][0]), plotValues.y.push(plotdata[i][1]);
                    this._plotData.push(plotdata), this._stackData.push(temp), series._stackData = temp, series._plotData = plotdata, series._plotValues = plotValues
                } else {
                    for (var i = 0; i < series.data.length; i++) plotValues.x.push(series.data[i][0]), plotValues.y.push(series.data[i][1]);
                    this._stackData.push(series.data), this.series[index]._stackData = series.data, this._plotData.push(series.data), series._plotData = series.data, series._plotValues = plotValues
                }
                for (index > 0 && (series._prevPlotData = this.series[index - 1]._plotData), series._sumy = 0, series._sumx = 0, i = series.data.length - 1; i > -1; i--) series._sumy += series.data[i][1], series._sumx += series.data[i][0]
            }, this.getNextSeriesColor = function(t) {
                var idx = 0,
                    sc = t.seriesColors;
                return function() {
                    return idx < sc.length ? sc[idx++] : (idx = 0, sc[idx++])
                }
            }(this), this.parseOptions = function(options) {
                for (var i = 0; i < this.preParseOptionsHooks.hooks.length; i++) this.preParseOptionsHooks.hooks[i].call(this, options);
                for (var i = 0; i < $.jqplot.preParseOptionsHooks.length; i++) $.jqplot.preParseOptionsHooks[i].call(this, options);
                this.options = $.extend(!0, {}, this.defaults, options);
                var opts = this.options;
                if (this.animate = opts.animate, this.animateReplot = opts.animateReplot, this.stackSeries = opts.stackSeries, $.isPlainObject(opts.fillBetween))
                    for (var tempi, temp = ["series1", "series2", "color", "baseSeries", "fill"], i = 0, l = temp.length; l > i; i++) tempi = temp[i], null != opts.fillBetween[tempi] && (this.fillBetween[tempi] = opts.fillBetween[tempi]);
                opts.seriesColors && (this.seriesColors = opts.seriesColors), opts.negativeSeriesColors && (this.negativeSeriesColors = opts.negativeSeriesColors), opts.captureRightClick && (this.captureRightClick = opts.captureRightClick), this.defaultAxisStart = options && null != options.defaultAxisStart ? options.defaultAxisStart : this.defaultAxisStart, this.colorGenerator.setColors(this.seriesColors), this.negativeColorGenerator.setColors(this.negativeSeriesColors), $.extend(!0, this._gridPadding, opts.gridPadding), this.sortData = null != opts.sortData ? opts.sortData : this.sortData;
                for (var i = 0; 12 > i; i++) {
                    var n = _axisNames[i],
                        axis = this.axes[n];
                    axis._options = $.extend(!0, {}, opts.axesDefaults, opts.axes[n]), $.extend(!0, axis, opts.axesDefaults, opts.axes[n]), axis._plotWidth = this._width, axis._plotHeight = this._height
                }
                var normalizeData = function(data, dir, start) {
                    var i, l, temp = [];
                    if (dir = dir || "vertical", $.isArray(data[0])) $.extend(!0, temp, data);
                    else
                        for (i = 0, l = data.length; l > i; i++) "vertical" == dir ? temp.push([start + i, data[i]]) : temp.push([data[i], start + i]);
                    return temp
                };
                this.series = [];
                for (var i = 0; i < this.data.length; i++) {
                    for (var sopts = $.extend(!0, {
                        index: i
                    }, {
                        seriesColors: this.seriesColors,
                        negativeSeriesColors: this.negativeSeriesColors
                    }, this.options.seriesDefaults, this.options.series[i], {
                        rendererOptions: {
                            animation: {
                                show: this.animate
                            }
                        }
                    }), temp = new Series(sopts), j = 0; j < $.jqplot.preParseSeriesOptionsHooks.length; j++) $.jqplot.preParseSeriesOptionsHooks[j].call(temp, this.options.seriesDefaults, this.options.series[i]);
                    for (var j = 0; j < this.preParseSeriesOptionsHooks.hooks.length; j++) this.preParseSeriesOptionsHooks.hooks[j].call(temp, this.options.seriesDefaults, this.options.series[i]);
                    $.extend(!0, temp, sopts);
                    var dir = "vertical";
                    switch (temp.renderer === $.jqplot.BarRenderer && temp.rendererOptions && "horizontal" == temp.rendererOptions.barDirection && (dir = "horizontal", temp._stackAxis = "x", temp._primaryAxis = "_yaxis"), temp.data = normalizeData(this.data[i], dir, this.defaultAxisStart), temp.xaxis) {
                        case "xaxis":
                            temp._xaxis = this.axes.xaxis;
                            break;
                        case "x2axis":
                            temp._xaxis = this.axes.x2axis
                    }
                    temp._yaxis = this.axes[temp.yaxis], temp._xaxis._series.push(temp), temp._yaxis._series.push(temp), temp.show ? (temp._xaxis.show = !0, temp._yaxis.show = !0) : (temp._xaxis.scaleToHiddenSeries && (temp._xaxis.show = !0), temp._yaxis.scaleToHiddenSeries && (temp._yaxis.show = !0)), temp.label || (temp.label = "Series " + (i + 1).toString()), this.series.push(temp);
                    for (var j = 0; j < $.jqplot.postParseSeriesOptionsHooks.length; j++) $.jqplot.postParseSeriesOptionsHooks[j].call(this.series[i], this.options.seriesDefaults, this.options.series[i]);
                    for (var j = 0; j < this.postParseSeriesOptionsHooks.hooks.length; j++) this.postParseSeriesOptionsHooks.hooks[j].call(this.series[i], this.options.seriesDefaults, this.options.series[i])
                }
                $.extend(!0, this.grid, this.options.grid);
                for (var i = 0, l = _axisNames.length; l > i; i++) {
                    var n = _axisNames[i],
                        axis = this.axes[n];
                    null == axis.borderWidth && (axis.borderWidth = this.grid.borderWidth)
                }
                "string" == typeof this.options.title ? this.title.text = this.options.title : "object" == typeof this.options.title && $.extend(!0, this.title, this.options.title), this.title._plotWidth = this._width, this.legend.setOptions(this.options.legend);
                for (var i = 0; i < $.jqplot.postParseOptionsHooks.length; i++) $.jqplot.postParseOptionsHooks[i].call(this, options);
                for (var i = 0; i < this.postParseOptionsHooks.hooks.length; i++) this.postParseOptionsHooks.hooks[i].call(this, options)
            }, this.destroy = function() {
                this.canvasManager.freeAllCanvases(), this.eventCanvas && this.eventCanvas._elem && this.eventCanvas._elem.unbind(), this.target.empty(), this.target[0].innerHTML = ""
            }, this.replot = function(options) {
                var opts = options || {},
                    data = opts.data || null,
                    clear = opts.clear !== !1,
                    resetAxes = opts.resetAxes || !1;
                delete opts.data, delete opts.clear, delete opts.resetAxes, this.target.trigger("jqplotPreReplot"), clear && this.destroy(), data || !$.isEmptyObject(opts) ? this.reInitialize(data, opts) : this.quickInit(), resetAxes && this.resetAxesScale(resetAxes, opts.axes), this.draw(), this.target.trigger("jqplotPostReplot")
            }, this.redraw = function(clear) {
                clear = null != clear ? clear : !0, this.target.trigger("jqplotPreRedraw"), clear && (this.canvasManager.freeAllCanvases(), this.eventCanvas._elem.unbind(), this.target.empty());
                for (var ax in this.axes) this.axes[ax]._ticks = [];
                this.computePlotData(), this._sumy = 0, this._sumx = 0;
                for (var i = 0, tsl = this.series.length; tsl > i; i++) this._sumy += this.series[i]._sumy, this._sumx += this.series[i]._sumx;
                this.draw(), this.target.trigger("jqplotPostRedraw")
            }, this.draw = function() {
                if (this.drawIfHidden || this.target.is(":visible")) {
                    this.target.trigger("jqplotPreDraw");
                    var i, j, l;
                    for (i = 0, l = $.jqplot.preDrawHooks.length; l > i; i++) $.jqplot.preDrawHooks[i].call(this);
                    for (i = 0, l = this.preDrawHooks.hooks.length; l > i; i++) this.preDrawHooks.hooks[i].apply(this, this.preDrawSeriesHooks.args[i]);
                    this.target.append(this.baseCanvas.createElement({
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }, "jqplot-base-canvas", null, this)), this.baseCanvas.setContext(), this.target.append(this.title.draw()), this.title.pack({
                        top: 0,
                        left: 0
                    });
                    var legendElem = this.legend.draw({}, this),
                        gridPadding = {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0
                        };
                    if ("outsideGrid" == this.legend.placement) {
                        switch (this.target.append(legendElem), this.legend.location) {
                            case "n":
                                gridPadding.top += this.legend.getHeight();
                                break;
                            case "s":
                                gridPadding.bottom += this.legend.getHeight();
                                break;
                            case "ne":
                            case "e":
                            case "se":
                                gridPadding.right += this.legend.getWidth();
                                break;
                            case "nw":
                            case "w":
                            case "sw":
                                gridPadding.left += this.legend.getWidth();
                                break;
                            default:
                                gridPadding.right += this.legend.getWidth()
                        }
                        legendElem = legendElem.detach()
                    }
                    var name, ax = this.axes;
                    for (i = 0; 12 > i; i++) name = _axisNames[i], this.target.append(ax[name].draw(this.baseCanvas._ctx, this)), ax[name].set();
                    ax.yaxis.show && (gridPadding.left += ax.yaxis.getWidth());
                    var n, ra = ["y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis"],
                        rapad = [0, 0, 0, 0, 0, 0, 0, 0],
                        gpr = 0;
                    for (n = 0; 8 > n; n++) ax[ra[n]].show && (gpr += ax[ra[n]].getWidth(), rapad[n] = gpr);
                    if (gridPadding.right += gpr, ax.x2axis.show && (gridPadding.top += ax.x2axis.getHeight()), this.title.show && (gridPadding.top += this.title.getHeight()), ax.xaxis.show && (gridPadding.bottom += ax.xaxis.getHeight()), this.options.gridDimensions && $.isPlainObject(this.options.gridDimensions)) {
                        var gdw = parseInt(this.options.gridDimensions.width, 10) || 0,
                            gdh = parseInt(this.options.gridDimensions.height, 10) || 0,
                            widthAdj = (this._width - gridPadding.left - gridPadding.right - gdw) / 2,
                            heightAdj = (this._height - gridPadding.top - gridPadding.bottom - gdh) / 2;
                        heightAdj >= 0 && widthAdj >= 0 && (gridPadding.top += heightAdj, gridPadding.bottom += heightAdj, gridPadding.left += widthAdj, gridPadding.right += widthAdj)
                    }
                    var arr = ["top", "bottom", "left", "right"];
                    for (var n in arr) null == this._gridPadding[arr[n]] && gridPadding[arr[n]] > 0 ? this._gridPadding[arr[n]] = gridPadding[arr[n]] : null == this._gridPadding[arr[n]] && (this._gridPadding[arr[n]] = this._defaultGridPadding[arr[n]]);
                    var legendPadding = this._gridPadding;
                    for ("outsideGrid" === this.legend.placement && (legendPadding = {
                        top: this.title.getHeight(),
                        left: 0,
                        right: 0,
                        bottom: 0
                    }, "s" === this.legend.location && (legendPadding.left = this._gridPadding.left, legendPadding.right = this._gridPadding.right)), ax.xaxis.pack({
                        position: "absolute",
                        bottom: this._gridPadding.bottom - ax.xaxis.getHeight(),
                        left: 0,
                        width: this._width
                    }, {
                        min: this._gridPadding.left,
                        max: this._width - this._gridPadding.right
                    }), ax.yaxis.pack({
                        position: "absolute",
                        top: 0,
                        left: this._gridPadding.left - ax.yaxis.getWidth(),
                        height: this._height
                    }, {
                        min: this._height - this._gridPadding.bottom,
                        max: this._gridPadding.top
                    }), ax.x2axis.pack({
                        position: "absolute",
                        top: this._gridPadding.top - ax.x2axis.getHeight(),
                        left: 0,
                        width: this._width
                    }, {
                        min: this._gridPadding.left,
                        max: this._width - this._gridPadding.right
                    }), i = 8; i > 0; i--) ax[ra[i - 1]].pack({
                        position: "absolute",
                        top: 0,
                        right: this._gridPadding.right - rapad[i - 1]
                    }, {
                        min: this._height - this._gridPadding.bottom,
                        max: this._gridPadding.top
                    });
                    var ltemp = (this._width - this._gridPadding.left - this._gridPadding.right) / 2 + this._gridPadding.left - ax.yMidAxis.getWidth() / 2;
                    ax.yMidAxis.pack({
                        position: "absolute",
                        top: 0,
                        left: ltemp,
                        zIndex: 9,
                        textAlign: "center"
                    }, {
                        min: this._height - this._gridPadding.bottom,
                        max: this._gridPadding.top
                    }), this.target.append(this.grid.createElement(this._gridPadding, this)), this.grid.draw();
                    var series = this.series,
                        seriesLength = series.length;
                    for (i = 0, l = seriesLength; l > i; i++) j = this.seriesStack[i], this.target.append(series[j].shadowCanvas.createElement(this._gridPadding, "jqplot-series-shadowCanvas", null, this)), series[j].shadowCanvas.setContext(), series[j].shadowCanvas._elem.data("seriesIndex", j);
                    for (i = 0, l = seriesLength; l > i; i++) j = this.seriesStack[i], this.target.append(series[j].canvas.createElement(this._gridPadding, "jqplot-series-canvas", null, this)), series[j].canvas.setContext(), series[j].canvas._elem.data("seriesIndex", j);
                    this.target.append(this.eventCanvas.createElement(this._gridPadding, "jqplot-event-canvas", null, this)), this.eventCanvas.setContext(), this.eventCanvas._ctx.fillStyle = "rgba(0,0,0,0)", this.eventCanvas._ctx.fillRect(0, 0, this.eventCanvas._ctx.canvas.width, this.eventCanvas._ctx.canvas.height), this.bindCustomEvents(), this.legend.preDraw ? (this.eventCanvas._elem.before(legendElem), this.legend.pack(legendPadding), this.legend._elem ? this.drawSeries({
                        legendInfo: {
                            location: this.legend.location,
                            placement: this.legend.placement,
                            width: this.legend.getWidth(),
                            height: this.legend.getHeight(),
                            xoffset: this.legend.xoffset,
                            yoffset: this.legend.yoffset
                        }
                    }) : this.drawSeries()) : (this.drawSeries(), seriesLength && $(series[seriesLength - 1].canvas._elem).after(legendElem), this.legend.pack(legendPadding));
                    for (var i = 0, l = $.jqplot.eventListenerHooks.length; l > i; i++) this.eventCanvas._elem.bind($.jqplot.eventListenerHooks[i][0], {
                        plot: this
                    }, $.jqplot.eventListenerHooks[i][1]);
                    for (var i = 0, l = this.eventListenerHooks.hooks.length; l > i; i++) this.eventCanvas._elem.bind(this.eventListenerHooks.hooks[i][0], {
                        plot: this
                    }, this.eventListenerHooks.hooks[i][1]);
                    var fb = this.fillBetween;
                    fb.fill && fb.series1 !== fb.series2 && fb.series1 < seriesLength && fb.series2 < seriesLength && "line" === series[fb.series1]._type && "line" === series[fb.series2]._type && this.doFillBetweenLines();
                    for (var i = 0, l = $.jqplot.postDrawHooks.length; l > i; i++) $.jqplot.postDrawHooks[i].call(this);
                    for (var i = 0, l = this.postDrawHooks.hooks.length; l > i; i++) this.postDrawHooks.hooks[i].apply(this, this.postDrawHooks.args[i]);
                    this.target.is(":visible") && (this._drawCount += 1);
                    var temps, tempr, sel, _els;
                    for (i = 0, l = seriesLength; l > i; i++) temps = series[i], tempr = temps.renderer, sel = ".jqplot-point-label.jqplot-series-" + i, tempr.animation && tempr.animation._supported && tempr.animation.show && (this._drawCount < 2 || this.animateReplot) && (_els = this.target.find(sel), _els.stop(!0, !0).hide(), temps.canvas._elem.stop(!0, !0).hide(), temps.shadowCanvas._elem.stop(!0, !0).hide(), temps.canvas._elem.jqplotEffect("blind", {
                        mode: "show",
                        direction: tempr.animation.direction
                    }, tempr.animation.speed), temps.shadowCanvas._elem.jqplotEffect("blind", {
                        mode: "show",
                        direction: tempr.animation.direction
                    }, tempr.animation.speed), _els.fadeIn(.8 * tempr.animation.speed));
                    _els = null, this.target.trigger("jqplotPostDraw", [this])
                }
            }, jqPlot.prototype.doFillBetweenLines = function() {
                var fb = this.fillBetween,
                    sid1 = fb.series1,
                    sid2 = fb.series2,
                    id1 = sid2 > sid1 ? sid1 : sid2,
                    id2 = sid2 > sid1 ? sid2 : sid1,
                    series1 = this.series[id1],
                    series2 = this.series[id2];
                if (series2.renderer.smooth) var tempgd = series2.renderer._smoothedData.slice(0).reverse();
                else var tempgd = series2.gridData.slice(0).reverse();
                if (series1.renderer.smooth) var gd = series1.renderer._smoothedData.concat(tempgd);
                else var gd = series1.gridData.concat(tempgd);
                var color = null !== fb.color ? fb.color : this.series[sid1].fillColor,
                    baseSeries = null !== fb.baseSeries ? fb.baseSeries : id1,
                    sr = this.series[baseSeries].renderer.shapeRenderer,
                    opts = {
                        fillStyle: color,
                        fill: !0,
                        closePath: !0
                    };
                sr.draw(series1.shadowCanvas._ctx, gd, opts)
            }, this.bindCustomEvents = function() {
                this.eventCanvas._elem.bind("click", {
                    plot: this
                }, this.onClick), this.eventCanvas._elem.bind("dblclick", {
                    plot: this
                }, this.onDblClick), this.eventCanvas._elem.bind("mousedown", {
                    plot: this
                }, this.onMouseDown), this.eventCanvas._elem.bind("mousemove", {
                    plot: this
                }, this.onMouseMove), this.eventCanvas._elem.bind("mouseenter", {
                    plot: this
                }, this.onMouseEnter), this.eventCanvas._elem.bind("mouseleave", {
                    plot: this
                }, this.onMouseLeave), this.captureRightClick ? (this.eventCanvas._elem.bind("mouseup", {
                    plot: this
                }, this.onRightClick), this.eventCanvas._elem.get(0).oncontextmenu = function() {
                    return !1
                }) : this.eventCanvas._elem.bind("mouseup", {
                    plot: this
                }, this.onMouseUp)
            }, this.onClick = function(ev) {
                var positions = getEventPosition(ev),
                    p = ev.data.plot,
                    neighbor = checkIntersection(positions.gridPos, p),
                    evt = $.Event("jqplotClick");
                evt.pageX = ev.pageX, evt.pageY = ev.pageY, $(this).trigger(evt, [positions.gridPos, positions.dataPos, neighbor, p])
            }, this.onDblClick = function(ev) {
                var positions = getEventPosition(ev),
                    p = ev.data.plot,
                    neighbor = checkIntersection(positions.gridPos, p),
                    evt = $.Event("jqplotDblClick");
                evt.pageX = ev.pageX, evt.pageY = ev.pageY, $(this).trigger(evt, [positions.gridPos, positions.dataPos, neighbor, p])
            }, this.onMouseDown = function(ev) {
                var positions = getEventPosition(ev),
                    p = ev.data.plot,
                    neighbor = checkIntersection(positions.gridPos, p),
                    evt = $.Event("jqplotMouseDown");
                evt.pageX = ev.pageX, evt.pageY = ev.pageY, $(this).trigger(evt, [positions.gridPos, positions.dataPos, neighbor, p])
            }, this.onMouseUp = function(ev) {
                var positions = getEventPosition(ev),
                    evt = $.Event("jqplotMouseUp");
                evt.pageX = ev.pageX, evt.pageY = ev.pageY, $(this).trigger(evt, [positions.gridPos, positions.dataPos, null, ev.data.plot])
            }, this.onRightClick = function(ev) {
                var positions = getEventPosition(ev),
                    p = ev.data.plot,
                    neighbor = checkIntersection(positions.gridPos, p);
                if (p.captureRightClick)
                    if (3 == ev.which) {
                        var evt = $.Event("jqplotRightClick");
                        evt.pageX = ev.pageX, evt.pageY = ev.pageY, $(this).trigger(evt, [positions.gridPos, positions.dataPos, neighbor, p])
                    } else {
                        var evt = $.Event("jqplotMouseUp");
                        evt.pageX = ev.pageX, evt.pageY = ev.pageY, $(this).trigger(evt, [positions.gridPos, positions.dataPos, neighbor, p])
                    }
            }, this.onMouseMove = function(ev) {
                var positions = getEventPosition(ev),
                    p = ev.data.plot,
                    neighbor = checkIntersection(positions.gridPos, p),
                    evt = $.Event("jqplotMouseMove");
                evt.pageX = ev.pageX, evt.pageY = ev.pageY, $(this).trigger(evt, [positions.gridPos, positions.dataPos, neighbor, p])
            }, this.onMouseEnter = function(ev) {
                var positions = getEventPosition(ev),
                    p = ev.data.plot,
                    evt = $.Event("jqplotMouseEnter");
                evt.pageX = ev.pageX, evt.pageY = ev.pageY, evt.relatedTarget = ev.relatedTarget, $(this).trigger(evt, [positions.gridPos, positions.dataPos, null, p])
            }, this.onMouseLeave = function(ev) {
                var positions = getEventPosition(ev),
                    p = ev.data.plot,
                    evt = $.Event("jqplotMouseLeave");
                evt.pageX = ev.pageX, evt.pageY = ev.pageY, evt.relatedTarget = ev.relatedTarget, $(this).trigger(evt, [positions.gridPos, positions.dataPos, null, p])
            }, this.drawSeries = function(options, idx) {
                var i, series, ctx;
                if (idx = "number" == typeof options && null == idx ? options : idx, options = "object" == typeof options ? options : {}, idx != undefined) series = this.series[idx], ctx = series.shadowCanvas._ctx, ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height), series.drawShadow(ctx, options, this), ctx = series.canvas._ctx, ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height), series.draw(ctx, options, this), series.renderer.constructor == $.jqplot.BezierCurveRenderer && idx < this.series.length - 1 && this.drawSeries(idx + 1);
                else
                    for (i = 0; i < this.series.length; i++) series = this.series[i], ctx = series.shadowCanvas._ctx, ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height), series.drawShadow(ctx, options, this), ctx = series.canvas._ctx, ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height), series.draw(ctx, options, this);
                options = idx = i = series = ctx = null
            }, this.moveSeriesToFront = function(idx) {
                idx = parseInt(idx, 10);
                var stackIndex = $.inArray(idx, this.seriesStack);
                if (-1 != stackIndex) {
                    if (stackIndex == this.seriesStack.length - 1) return void(this.previousSeriesStack = this.seriesStack.slice(0));
                    var opidx = this.seriesStack[this.seriesStack.length - 1],
                        serelem = this.series[idx].canvas._elem.detach(),
                        shadelem = this.series[idx].shadowCanvas._elem.detach();
                    this.series[opidx].shadowCanvas._elem.after(shadelem), this.series[opidx].canvas._elem.after(serelem), this.previousSeriesStack = this.seriesStack.slice(0), this.seriesStack.splice(stackIndex, 1), this.seriesStack.push(idx)
                }
            }, this.moveSeriesToBack = function(idx) {
                idx = parseInt(idx, 10);
                var stackIndex = $.inArray(idx, this.seriesStack);
                if (0 != stackIndex && -1 != stackIndex) {
                    var opidx = this.seriesStack[0],
                        serelem = this.series[idx].canvas._elem.detach(),
                        shadelem = this.series[idx].shadowCanvas._elem.detach();
                    this.series[opidx].shadowCanvas._elem.before(shadelem), this.series[opidx].canvas._elem.before(serelem), this.previousSeriesStack = this.seriesStack.slice(0), this.seriesStack.splice(stackIndex, 1), this.seriesStack.unshift(idx)
                }
            }, this.restorePreviousSeriesOrder = function() {
                var i, serelem, shadelem, temp, move, keep;
                if (this.seriesStack != this.previousSeriesStack) {
                    for (i = 1; i < this.previousSeriesStack.length; i++) move = this.previousSeriesStack[i], keep = this.previousSeriesStack[i - 1], serelem = this.series[move].canvas._elem.detach(), shadelem = this.series[move].shadowCanvas._elem.detach(), this.series[keep].shadowCanvas._elem.after(shadelem), this.series[keep].canvas._elem.after(serelem);
                    temp = this.seriesStack.slice(0), this.seriesStack = this.previousSeriesStack.slice(0), this.previousSeriesStack = temp
                }
            }, this.restoreOriginalSeriesOrder = function() {
                var i, serelem, shadelem, arr = [];
                for (i = 0; i < this.series.length; i++) arr.push(i);
                if (this.seriesStack != arr)
                    for (this.previousSeriesStack = this.seriesStack.slice(0), this.seriesStack = arr, i = 1; i < this.seriesStack.length; i++) serelem = this.series[i].canvas._elem.detach(), shadelem = this.series[i].shadowCanvas._elem.detach(), this.series[i - 1].shadowCanvas._elem.after(shadelem), this.series[i - 1].canvas._elem.after(serelem)
            }, this.activateTheme = function(name) {
                this.themeEngine.activate(this, name)
            }
        }

        function getSteps(d, f) {
            return (3.4182054 + f) * Math.pow(d, -.3534992)
        }

        function tanh(x) {
            var a = (Math.exp(2 * x) - 1) / (Math.exp(2 * x) + 1);
            return a
        }

        function computeConstrainedSmoothedData(gd) {
            function dxx(x1, x0) {
                return x1 - x0 == 0 ? Math.pow(10, 10) : x1 - x0
            }
            var smooth = this.renderer.smooth,
                dim = this.canvas.getWidth(),
                xp = this._xaxis.series_p2u,
                yp = this._yaxis.series_p2u,
                steps = null,
                dist = gd.length / dim,
                _smoothedData = [],
                _smoothedPlotData = [];
            steps = isNaN(parseFloat(smooth)) ? getSteps(dist, .5) : parseFloat(smooth);
            for (var yy = [], xx = [], i = 0, l = gd.length; l > i; i++) yy.push(gd[i][1]), xx.push(gd[i][0]);
            for (var A, B, C, D, nmax = gd.length - 1, num = 1, gdl = gd.length; gdl > num; num++) {
                for (var gxx = [], ggxx = [], j = 0; 2 > j; j++) {
                    var i = num - 1 + j;
                    0 == i || i == nmax ? gxx[j] = Math.pow(10, 10) : yy[i + 1] - yy[i] == 0 || yy[i] - yy[i - 1] == 0 ? gxx[j] = 0 : (xx[i + 1] - xx[i]) / (yy[i + 1] - yy[i]) + (xx[i] - xx[i - 1]) / (yy[i] - yy[i - 1]) == 0 ? gxx[j] = 0 : (yy[i + 1] - yy[i]) * (yy[i] - yy[i - 1]) < 0 ? gxx[j] = 0 : gxx[j] = 2 / (dxx(xx[i + 1], xx[i]) / (yy[i + 1] - yy[i]) + dxx(xx[i], xx[i - 1]) / (yy[i] - yy[i - 1]))
                }
                1 == num ? gxx[0] = 1.5 * (yy[1] - yy[0]) / dxx(xx[1], xx[0]) - gxx[1] / 2 : num == nmax && (gxx[1] = 1.5 * (yy[nmax] - yy[nmax - 1]) / dxx(xx[nmax], xx[nmax - 1]) - gxx[0] / 2), ggxx[0] = -2 * (gxx[1] + 2 * gxx[0]) / dxx(xx[num], xx[num - 1]) + 6 * (yy[num] - yy[num - 1]) / Math.pow(dxx(xx[num], xx[num - 1]), 2), ggxx[1] = 2 * (2 * gxx[1] + gxx[0]) / dxx(xx[num], xx[num - 1]) - 6 * (yy[num] - yy[num - 1]) / Math.pow(dxx(xx[num], xx[num - 1]), 2), D = 1 / 6 * (ggxx[1] - ggxx[0]) / dxx(xx[num], xx[num - 1]), C = .5 * (xx[num] * ggxx[0] - xx[num - 1] * ggxx[1]) / dxx(xx[num], xx[num - 1]), B = (yy[num] - yy[num - 1] - C * (Math.pow(xx[num], 2) - Math.pow(xx[num - 1], 2)) - D * (Math.pow(xx[num], 3) - Math.pow(xx[num - 1], 3))) / dxx(xx[num], xx[num - 1]), A = yy[num - 1] - B * xx[num - 1] - C * Math.pow(xx[num - 1], 2) - D * Math.pow(xx[num - 1], 3);
                for (var temp, tempx, increment = (xx[num] - xx[num - 1]) / steps, j = 0, l = steps; l > j; j++) temp = [], tempx = xx[num - 1] + j * increment, temp.push(tempx), temp.push(A + B * tempx + C * Math.pow(tempx, 2) + D * Math.pow(tempx, 3)), _smoothedData.push(temp), _smoothedPlotData.push([xp(temp[0]), yp(temp[1])])
            }
            return _smoothedData.push(gd[i]), _smoothedPlotData.push([xp(gd[i][0]), yp(gd[i][1])]), [_smoothedData, _smoothedPlotData]
        }

        function computeHermiteSmoothedData(gd) {
            var t, s, h1, h2, h3, h4, TiX, TiY, Ti1X, Ti1Y, pX, pY, p, min, max, stretch, scale, shift, smooth = this.renderer.smooth,
                tension = this.renderer.tension,
                dim = this.canvas.getWidth(),
                xp = this._xaxis.series_p2u,
                yp = this._yaxis.series_p2u,
                steps = null,
                a = null,
                a1 = null,
                a2 = null,
                slope = null,
                slope2 = null,
                temp = null,
                dist = gd.length / dim,
                _smoothedData = [],
                _smoothedPlotData = [];
            steps = isNaN(parseFloat(smooth)) ? getSteps(dist, .5) : parseFloat(smooth), isNaN(parseFloat(tension)) || (tension = parseFloat(tension));
            for (var i = 0, l = gd.length - 1; l > i; i++)
                for (null === tension ? (slope = Math.abs((gd[i + 1][1] - gd[i][1]) / (gd[i + 1][0] - gd[i][0])), min = .3, max = .6, stretch = (max - min) / 2, scale = 2.5, shift = -1.4, temp = slope / scale + shift, a1 = stretch * tanh(temp) - stretch * tanh(shift) + min, i > 0 && (slope2 = Math.abs((gd[i][1] - gd[i - 1][1]) / (gd[i][0] - gd[i - 1][0]))), temp = slope2 / scale + shift, a2 = stretch * tanh(temp) - stretch * tanh(shift) + min, a = (a1 + a2) / 2) : a = tension, t = 0; steps > t; t++) s = t / steps, h1 = (1 + 2 * s) * Math.pow(1 - s, 2), h2 = s * Math.pow(1 - s, 2), h3 = Math.pow(s, 2) * (3 - 2 * s), h4 = Math.pow(s, 2) * (s - 1), gd[i - 1] ? (TiX = a * (gd[i + 1][0] - gd[i - 1][0]), TiY = a * (gd[i + 1][1] - gd[i - 1][1])) : (TiX = a * (gd[i + 1][0] - gd[i][0]), TiY = a * (gd[i + 1][1] - gd[i][1])), gd[i + 2] ? (Ti1X = a * (gd[i + 2][0] - gd[i][0]), Ti1Y = a * (gd[i + 2][1] - gd[i][1])) : (Ti1X = a * (gd[i + 1][0] - gd[i][0]), Ti1Y = a * (gd[i + 1][1] - gd[i][1])), pX = h1 * gd[i][0] + h3 * gd[i + 1][0] + h2 * TiX + h4 * Ti1X, pY = h1 * gd[i][1] + h3 * gd[i + 1][1] + h2 * TiY + h4 * Ti1Y, p = [pX, pY], _smoothedData.push(p), _smoothedPlotData.push([xp(pX), yp(pY)]);
            return _smoothedData.push(gd[l]), _smoothedPlotData.push([xp(gd[l][0]), yp(gd[l][1])]), [_smoothedData, _smoothedPlotData]
        }

        function postInit(target, data, options) {
            for (var i = 0; i < this.series.length; i++) this.series[i].renderer.constructor == $.jqplot.LineRenderer && this.series[i].highlightMouseOver && (this.series[i].highlightMouseDown = !1)
        }

        function postPlotDraw() {
            this.plugins.lineRenderer && this.plugins.lineRenderer.highlightCanvas && (this.plugins.lineRenderer.highlightCanvas.resetCanvas(), this.plugins.lineRenderer.highlightCanvas = null), this.plugins.lineRenderer.highlightedSeriesIndex = null, this.plugins.lineRenderer.highlightCanvas = new $.jqplot.GenericCanvas, this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-lineRenderer-highlight-canvas", this._plotDimensions, this)), this.plugins.lineRenderer.highlightCanvas.setContext(), this.eventCanvas._elem.bind("mouseleave", {
                plot: this
            }, function(ev) {
                unhighlight(ev.data.plot)
            })
        }

        function highlight(plot, sidx, pidx, points) {
            var s = plot.series[sidx],
                canvas = plot.plugins.lineRenderer.highlightCanvas;
            canvas._ctx.clearRect(0, 0, canvas._ctx.canvas.width, canvas._ctx.canvas.height), s._highlightedPoint = pidx, plot.plugins.lineRenderer.highlightedSeriesIndex = sidx;
            var opts = {
                fillStyle: s.highlightColor
            };
            "line" === s.type && s.renderer.bands.show && (opts.fill = !0, opts.closePath = !0), s.renderer.shapeRenderer.draw(canvas._ctx, points, opts), canvas = null
        }

        function unhighlight(plot) {
            var canvas = plot.plugins.lineRenderer.highlightCanvas;
            canvas._ctx.clearRect(0, 0, canvas._ctx.canvas.width, canvas._ctx.canvas.height);
            for (var i = 0; i < plot.series.length; i++) plot.series[i]._highlightedPoint = null;
            plot.plugins.lineRenderer.highlightedSeriesIndex = null, plot.target.trigger("jqplotDataUnhighlight"), canvas = null
        }

        function handleMove(ev, gridpos, datapos, neighbor, plot) {
            if (neighbor) {
                var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data],
                    evt1 = jQuery.Event("jqplotDataMouseOver");
                if (evt1.pageX = ev.pageX, evt1.pageY = ev.pageY, plot.target.trigger(evt1, ins), plot.series[ins[0]].highlightMouseOver && ins[0] != plot.plugins.lineRenderer.highlightedSeriesIndex) {
                    var evt = jQuery.Event("jqplotDataHighlight");
                    evt.which = ev.which, evt.pageX = ev.pageX, evt.pageY = ev.pageY, plot.target.trigger(evt, ins), highlight(plot, neighbor.seriesIndex, neighbor.pointIndex, neighbor.points)
                }
            } else null == neighbor && unhighlight(plot)
        }

        function handleMouseDown(ev, gridpos, datapos, neighbor, plot) {
            if (neighbor) {
                var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
                if (plot.series[ins[0]].highlightMouseDown && ins[0] != plot.plugins.lineRenderer.highlightedSeriesIndex) {
                    var evt = jQuery.Event("jqplotDataHighlight");
                    evt.which = ev.which, evt.pageX = ev.pageX, evt.pageY = ev.pageY, plot.target.trigger(evt, ins), highlight(plot, neighbor.seriesIndex, neighbor.pointIndex, neighbor.points)
                }
            } else null == neighbor && unhighlight(plot)
        }

        function handleMouseUp(ev, gridpos, datapos, neighbor, plot) {
            var idx = plot.plugins.lineRenderer.highlightedSeriesIndex;
            null != idx && plot.series[idx].highlightMouseDown && unhighlight(plot)
        }

        function handleClick(ev, gridpos, datapos, neighbor, plot) {
            if (neighbor) {
                var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data],
                    evt = jQuery.Event("jqplotDataClick");
                evt.which = ev.which, evt.pageX = ev.pageX, evt.pageY = ev.pageY, plot.target.trigger(evt, ins)
            }
        }

        function handleRightClick(ev, gridpos, datapos, neighbor, plot) {
            if (neighbor) {
                var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data],
                    idx = plot.plugins.lineRenderer.highlightedSeriesIndex;
                null != idx && plot.series[idx].highlightMouseDown && unhighlight(plot);
                var evt = jQuery.Event("jqplotDataRightClick");
                evt.which = ev.which, evt.pageX = ev.pageX, evt.pageY = ev.pageY, plot.target.trigger(evt, ins)
            }
        }

        function bestFormatString(interval) {
            var fstr;
            if (interval = Math.abs(interval), interval >= 10) fstr = "%d";
            else if (interval > 1) fstr = interval === parseInt(interval, 10) ? "%d" : "%.1f";
            else {
                var expv = -Math.floor(Math.log(interval) / Math.LN10);
                fstr = "%." + expv + "f"
            }
            return fstr
        }

        function bestConstrainedInterval(min, max, nttarget) {
            for (var temp, sd, bestNT, fsd, fs, currentNT, bestPrec, low = Math.floor(nttarget / 2), hi = Math.ceil(1.5 * nttarget), badness = Number.MAX_VALUE, r = max - min, gsf = $.jqplot.getSignificantFigures, i = 0, l = hi - low + 1; l > i; i++) currentNT = low + i, temp = r / (currentNT - 1), sd = gsf(temp), temp = Math.abs(nttarget - currentNT) + sd.digitsRight, badness > temp ? (badness = temp, bestNT = currentNT, bestPrec = sd.digitsRight) : temp === badness && sd.digitsRight < bestPrec && (bestNT = currentNT, bestPrec = sd.digitsRight);
            return fsd = Math.max(bestPrec, Math.max(gsf(min).digitsRight, gsf(max).digitsRight)), fs = 0 === fsd ? "%d" : "%." + fsd + "f", temp = r / (bestNT - 1), [min, max, bestNT, fs, temp]
        }

        function bestInterval(range, numberTicks) {
            numberTicks = numberTicks || 7;
            var interval, minimum = range / (numberTicks - 1),
                magnitude = Math.pow(10, Math.floor(Math.log(minimum) / Math.LN10)),
                residual = minimum / magnitude;
            return interval = 1 > magnitude ? residual > 5 ? 10 * magnitude : residual > 2 ? 5 * magnitude : residual > 1 ? 2 * magnitude : magnitude : residual > 5 ? 10 * magnitude : residual > 4 ? 5 * magnitude : residual > 3 ? 4 * magnitude : residual > 2 ? 3 * magnitude : residual > 1 ? 2 * magnitude : magnitude
        }

        function bestLinearInterval(range, scalefact) {
            scalefact = scalefact || 1;
            var fact, expv = Math.floor(Math.log(range) / Math.LN10),
                magnitude = Math.pow(10, expv),
                f = range / magnitude;
            return f /= scalefact, fact = .38 >= f ? .1 : 1.6 >= f ? .2 : 4 >= f ? .5 : 8 >= f ? 1 : 16 >= f ? 2 : 5, fact * magnitude
        }

        function bestLinearComponents(range, scalefact) {
            var interval, fact, expv = Math.floor(Math.log(range) / Math.LN10),
                magnitude = Math.pow(10, expv),
                f = range / magnitude;
            return f /= scalefact, fact = .38 >= f ? .1 : 1.6 >= f ? .2 : 4 >= f ? .5 : 8 >= f ? 1 : 16 >= f ? 2 : 5, interval = fact * magnitude, [interval, fact, magnitude]
        }

        function numericalOrder(a, b) {
            return a - b
        }

        function clone(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var temp = new obj.constructor;
            for (var key in obj) temp[key] = clone(obj[key]);
            return temp
        }

        function merge(obj1, obj2) {
            if (null != obj2 && "object" == typeof obj2)
                for (var key in obj2) "highlightColors" == key && (obj1[key] = clone(obj2[key])), null != obj2[key] && "object" == typeof obj2[key] ? (obj1.hasOwnProperty(key) || (obj1[key] = {}), merge(obj1[key], obj2[key])) : obj1[key] = obj2[key]
        }

        function inArray(elem, array) {
            if (array.indexOf) return array.indexOf(elem);
            for (var i = 0, length = array.length; length > i; i++)
                if (array[i] === elem) return i;
            return -1
        }

        function get_type(thing) {
            return null === thing ? "[object Null]" : Object.prototype.toString.call(thing)
        }

        function _normalizeArguments(effect, options, speed, callback) {
            return $.isPlainObject(effect) ? effect : (effect = {
                effect: effect
            }, options === undefined && (options = {}), $.isFunction(options) && (callback = options, speed = null, options = {}), ("number" === $.type(options) || $.fx.speeds[options]) && (callback = speed, speed = options, options = {}), $.isFunction(speed) && (callback = speed, speed = null), options && $.extend(effect, options), speed = speed || options.duration, effect.duration = $.fx.off ? 0 : "number" == typeof speed ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default, effect.complete = callback || options.complete, effect)
        }
        var undefined;
        $.fn.emptyForce = function() {
            for (var elem, i = 0; null != (elem = $(this)[i]); i++) {
                if (1 === elem.nodeType && $.cleanData(elem.getElementsByTagName("*")), $.jqplot.use_excanvas) elem.outerHTML = "";
                else
                    for (; elem.firstChild;) elem.removeChild(elem.firstChild);
                elem = null
            }
            return $(this)
        }, $.fn.removeChildForce = function(parent) {
            for (; parent.firstChild;) this.removeChildForce(parent.firstChild), parent.removeChild(parent.firstChild)
        }, $.fn.jqplot = function() {
            for (var datas = [], options = [], i = 0, l = arguments.length; l > i; i++) $.isArray(arguments[i]) ? datas.push(arguments[i]) : $.isPlainObject(arguments[i]) && options.push(arguments[i]);
            return this.each(function(index) {
                var tid, plot, data, opts, $this = $(this),
                    dl = datas.length,
                    ol = options.length;
                data = dl > index ? datas[index] : dl ? datas[dl - 1] : null, opts = ol > index ? options[index] : ol ? options[ol - 1] : null, tid = $this.attr("id"), tid === undefined && (tid = "jqplot_target_" + $.jqplot.targetCounter++, $this.attr("id", tid)), plot = $.jqplot(tid, data, opts), $this.data("jqplot", plot)
            })
        }, $.jqplot = function(target, data, options) {
            var _data = null,
                _options = null;
            3 === arguments.length ? (_data = data, _options = options) : 2 === arguments.length && ($.isArray(data) ? _data = data : $.isPlainObject(data) && (_options = data)), null === _data && null !== _options && _options.data && (_data = _options.data);
            var plot = new jqPlot;
            if ($("#" + target).removeClass("jqplot-error"), !$.jqplot.config.catchErrors) return plot.init(target, _data, _options), plot.draw(), plot.themeEngine.init.call(plot), plot;
            try {
                return plot.init(target, _data, _options), plot.draw(), plot.themeEngine.init.call(plot), plot
            } catch (e) {
                var msg = $.jqplot.config.errorMessage || e.message;
                $("#" + target).append('<div class="jqplot-error-message">' + msg + "</div>"), $("#" + target).addClass("jqplot-error"), document.getElementById(target).style.background = $.jqplot.config.errorBackground, document.getElementById(target).style.border = $.jqplot.config.errorBorder, document.getElementById(target).style.fontFamily = $.jqplot.config.errorFontFamily, document.getElementById(target).style.fontSize = $.jqplot.config.errorFontSize, document.getElementById(target).style.fontStyle = $.jqplot.config.errorFontStyle, document.getElementById(target).style.fontWeight = $.jqplot.config.errorFontWeight
            }
        }, $.jqplot.version = "1.0.8", $.jqplot.revision = "1250", $.jqplot.targetCounter = 1, $.jqplot.CanvasManager = function() {
            "undefined" == typeof $.jqplot.CanvasManager.canvases && ($.jqplot.CanvasManager.canvases = [], $.jqplot.CanvasManager.free = []);
            var myCanvases = [];
            this.getCanvas = function() {
                var canvas, makeNew = !0;
                if (!$.jqplot.use_excanvas)
                    for (var i = 0, l = $.jqplot.CanvasManager.canvases.length; l > i; i++)
                        if ($.jqplot.CanvasManager.free[i] === !0) {
                            makeNew = !1, canvas = $.jqplot.CanvasManager.canvases[i], $.jqplot.CanvasManager.free[i] = !1, myCanvases.push(i);
                            break
                        }
                return makeNew && (canvas = document.createElement("canvas"), myCanvases.push($.jqplot.CanvasManager.canvases.length), $.jqplot.CanvasManager.canvases.push(canvas), $.jqplot.CanvasManager.free.push(!1)), canvas
            }, this.initCanvas = function(canvas) {
                return $.jqplot.use_excanvas ? window.G_vmlCanvasManager.initElement(canvas) : canvas
            }, this.freeAllCanvases = function() {
                for (var i = 0, l = myCanvases.length; l > i; i++) this.freeCanvas(myCanvases[i]);
                myCanvases = []
            }, this.freeCanvas = function(idx) {
                if ($.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== undefined) window.G_vmlCanvasManager.uninitElement($.jqplot.CanvasManager.canvases[idx]), $.jqplot.CanvasManager.canvases[idx] = null;
                else {
                    var canvas = $.jqplot.CanvasManager.canvases[idx];
                    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height), $(canvas).unbind().removeAttr("class").removeAttr("style"), $(canvas).css({
                        left: "",
                        top: "",
                        position: ""
                    }), canvas.width = 0, canvas.height = 0, $.jqplot.CanvasManager.free[idx] = !0
                }
            }
        }, $.jqplot.log = function() {
            window.console && window.console.log.apply(window.console, arguments)
        }, $.jqplot.config = {
            addDomReference: !1,
            enablePlugins: !1,
            defaultHeight: 300,
            defaultWidth: 400,
            UTCAdjust: !1,
            timezoneOffset: new Date(6e4 * (new Date).getTimezoneOffset()),
            errorMessage: "",
            errorBackground: "",
            errorBorder: "",
            errorFontFamily: "",
            errorFontSize: "",
            errorFontStyle: "",
            errorFontWeight: "",
            catchErrors: !1,
            defaultTickFormatString: "%.1f",
            defaultColors: ["#4bb2c5", "#EAA228", "#c5b47f", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc", "#c747a3", "#cddf54", "#FBD178", "#26B4E3", "#bd70c7"],
            defaultNegativeColors: ["#498991", "#C08840", "#9F9274", "#546D61", "#646C4A", "#6F6621", "#6E3F5F", "#4F64B0", "#A89050", "#C45923", "#187399", "#945381", "#959E5C", "#C7AF7B", "#478396", "#907294"],
            dashLength: 4,
            gapLength: 4,
            dotGapLength: 2.5,
            srcLocation: "jqplot/src/",
            pluginLocation: "jqplot/src/plugins/"
        }, $.jqplot.arrayMax = function(array) {
            return Math.max.apply(Math, array)
        }, $.jqplot.arrayMin = function(array) {
            return Math.min.apply(Math, array)
        }, $.jqplot.enablePlugins = $.jqplot.config.enablePlugins, $.jqplot.support_canvas = function() {
            return "undefined" == typeof $.jqplot.support_canvas.result && ($.jqplot.support_canvas.result = !!document.createElement("canvas").getContext), $.jqplot.support_canvas.result
        }, $.jqplot.support_canvas_text = function() {
            return "undefined" == typeof $.jqplot.support_canvas_text.result && (window.G_vmlCanvasManager !== undefined && window.G_vmlCanvasManager._version > 887 ? $.jqplot.support_canvas_text.result = !0 : $.jqplot.support_canvas_text.result = !(!document.createElement("canvas").getContext || "function" != typeof document.createElement("canvas").getContext("2d").fillText)), $.jqplot.support_canvas_text.result
        }, $.jqplot.use_excanvas = !($.support.boxModel && $.support.objectAll && $support.leadingWhitespace || $.jqplot.support_canvas()), $.jqplot.preInitHooks = [], $.jqplot.postInitHooks = [], $.jqplot.preParseOptionsHooks = [], $.jqplot.postParseOptionsHooks = [], $.jqplot.preDrawHooks = [], $.jqplot.postDrawHooks = [], $.jqplot.preDrawSeriesHooks = [], $.jqplot.postDrawSeriesHooks = [], $.jqplot.preDrawLegendHooks = [], $.jqplot.addLegendRowHooks = [], $.jqplot.preSeriesInitHooks = [], $.jqplot.postSeriesInitHooks = [], $.jqplot.preParseSeriesOptionsHooks = [], $.jqplot.postParseSeriesOptionsHooks = [], $.jqplot.eventListenerHooks = [], $.jqplot.preDrawSeriesShadowHooks = [], $.jqplot.postDrawSeriesShadowHooks = [], $.jqplot.ElemContainer = function() {
            this._elem, this._plotWidth, this._plotHeight, this._plotDimensions = {
                height: null,
                width: null
            }
        }, $.jqplot.ElemContainer.prototype.createElement = function(el, offsets, clss, cssopts, attrib) {
            this._offsets = offsets;
            var klass = clss || "jqplot",
                elem = document.createElement(el);
            return this._elem = $(elem), this._elem.addClass(klass), this._elem.css(cssopts), this._elem.attr(attrib), elem = null, this._elem
        }, $.jqplot.ElemContainer.prototype.getWidth = function() {
            return this._elem ? this._elem.outerWidth(!0) : null
        }, $.jqplot.ElemContainer.prototype.getHeight = function() {
            return this._elem ? this._elem.outerHeight(!0) : null
        }, $.jqplot.ElemContainer.prototype.getPosition = function() {
            return this._elem ? this._elem.position() : {
                top: null,
                left: null,
                bottom: null,
                right: null
            }
        }, $.jqplot.ElemContainer.prototype.getTop = function() {
            return this.getPosition().top
        }, $.jqplot.ElemContainer.prototype.getLeft = function() {
            return this.getPosition().left
        }, $.jqplot.ElemContainer.prototype.getBottom = function() {
            return this._elem.css("bottom")
        }, $.jqplot.ElemContainer.prototype.getRight = function() {
            return this._elem.css("right")
        }, Axis.prototype = new $.jqplot.ElemContainer, Axis.prototype.constructor = Axis, Axis.prototype.init = function() {
            $.isFunction(this.renderer) && (this.renderer = new this.renderer), this.tickOptions.axis = this.name, null == this.tickOptions.showMark && (this.tickOptions.showMark = this.showTicks), null == this.tickOptions.showMark && (this.tickOptions.showMark = this.showTickMarks), null == this.tickOptions.showLabel && (this.tickOptions.showLabel = this.showTicks), null == this.label || "" == this.label ? this.showLabel = !1 : this.labelOptions.label = this.label, 0 == this.showLabel && (this.labelOptions.show = !1), 0 == this.pad && (this.pad = 1), 0 == this.padMax && (this.padMax = 1), 0 == this.padMin && (this.padMin = 1), null == this.padMax && (this.padMax = (this.pad - 1) / 2 + 1), null == this.padMin && (this.padMin = (this.pad - 1) / 2 + 1), this.pad = this.padMax + this.padMin - 1, null == this.min && null == this.max || (this.autoscale = !1), null == this.syncTicks && this.name.indexOf("y") > -1 ? this.syncTicks = !0 : null == this.syncTicks && (this.syncTicks = !1), this.renderer.init.call(this, this.rendererOptions)
        }, Axis.prototype.draw = function(ctx, plot) {
            return this.__ticks && (this.__ticks = null), this.renderer.draw.call(this, ctx, plot)
        }, Axis.prototype.set = function() {
            this.renderer.set.call(this)
        }, Axis.prototype.pack = function(pos, offsets) {
            this.show && this.renderer.pack.call(this, pos, offsets), null == this._min && (this._min = this.min, this._max = this.max, this._tickInterval = this.tickInterval, this._numberTicks = this.numberTicks, this.__ticks = this._ticks)
        }, Axis.prototype.reset = function() {
            this.renderer.reset.call(this)
        }, Axis.prototype.resetScale = function(opts) {
            $.extend(!0, this, {
                min: null,
                max: null,
                numberTicks: null,
                tickInterval: null,
                _ticks: [],
                ticks: []
            }, opts), this.resetDataBounds()
        }, Axis.prototype.resetDataBounds = function() {
            var db = this._dataBounds;
            db.min = null, db.max = null;
            for (var l, s, d, doforce = !!this.show, i = 0; i < this._series.length; i++)
                if (s = this._series[i], s.show || this.scaleToHiddenSeries) {
                    d = s._plotData, "line" === s._type && s.renderer.bands.show && "x" !== this.name.charAt(0) && (d = [
                        [0, s.renderer.bands._min],
                        [1, s.renderer.bands._max]
                    ]);
                    var minyidx = 1,
                        maxyidx = 1;
                    null != s._type && "ohlc" == s._type && (minyidx = 3, maxyidx = 2);
                    for (var j = 0, l = d.length; l > j; j++) "xaxis" == this.name || "x2axis" == this.name ? ((null != d[j][0] && d[j][0] < db.min || null == db.min) && (db.min = d[j][0]), (null != d[j][0] && d[j][0] > db.max || null == db.max) && (db.max = d[j][0])) : ((null != d[j][minyidx] && d[j][minyidx] < db.min || null == db.min) && (db.min = d[j][minyidx]), (null != d[j][maxyidx] && d[j][maxyidx] > db.max || null == db.max) && (db.max = d[j][maxyidx]));
                    doforce && s.renderer.constructor !== $.jqplot.BarRenderer ? doforce = !1 : doforce && this._options.hasOwnProperty("forceTickAt0") && 0 == this._options.forceTickAt0 ? doforce = !1 : doforce && s.renderer.constructor === $.jqplot.BarRenderer && ("vertical" == s.barDirection && "xaxis" != this.name && "x2axis" != this.name ? null == this._options.pad && null == this._options.padMin || (doforce = !1) : "horizontal" != s.barDirection || "xaxis" != this.name && "x2axis" != this.name || null == this._options.pad && null == this._options.padMin || (doforce = !1))
                }
            doforce && this.renderer.constructor === $.jqplot.LinearAxisRenderer && db.min >= 0 && (this.padMin = 1, this.forceTickAt0 = !0)
        }, Legend.prototype = new $.jqplot.ElemContainer, Legend.prototype.constructor = Legend, Legend.prototype.setOptions = function(options) {
            if ($.extend(!0, this, options), "inside" == this.placement && (this.placement = "insideGrid"), this.xoffset > 0) {
                if ("insideGrid" == this.placement) switch (this.location) {
                    case "nw":
                    case "w":
                    case "sw":
                        null == this.marginLeft && (this.marginLeft = this.xoffset + "px"), this.marginRight = "0px";
                        break;
                    case "ne":
                    case "e":
                    case "se":
                    default:
                        null == this.marginRight && (this.marginRight = this.xoffset + "px"), this.marginLeft = "0px"
                } else if ("outside" == this.placement) switch (this.location) {
                    case "nw":
                    case "w":
                    case "sw":
                        null == this.marginRight && (this.marginRight = this.xoffset + "px"), this.marginLeft = "0px";
                        break;
                    case "ne":
                    case "e":
                    case "se":
                    default:
                        null == this.marginLeft && (this.marginLeft = this.xoffset + "px"), this.marginRight = "0px"
                }
                this.xoffset = 0
            }
            if (this.yoffset > 0) {
                if ("outside" == this.placement) switch (this.location) {
                    case "sw":
                    case "s":
                    case "se":
                        null == this.marginTop && (this.marginTop = this.yoffset + "px"), this.marginBottom = "0px";
                        break;
                    case "ne":
                    case "n":
                    case "nw":
                    default:
                        null == this.marginBottom && (this.marginBottom = this.yoffset + "px"), this.marginTop = "0px"
                } else if ("insideGrid" == this.placement) switch (this.location) {
                    case "sw":
                    case "s":
                    case "se":
                        null == this.marginBottom && (this.marginBottom = this.yoffset + "px"), this.marginTop = "0px";
                        break;
                    case "ne":
                    case "n":
                    case "nw":
                    default:
                        null == this.marginTop && (this.marginTop = this.yoffset + "px"), this.marginBottom = "0px"
                }
                this.yoffset = 0
            }
        }, Legend.prototype.init = function() {
            $.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions)
        }, Legend.prototype.draw = function(offsets, plot) {
            for (var i = 0; i < $.jqplot.preDrawLegendHooks.length; i++) $.jqplot.preDrawLegendHooks[i].call(this, offsets);
            return this.renderer.draw.call(this, offsets, plot)
        }, Legend.prototype.pack = function(offsets) {
            this.renderer.pack.call(this, offsets)
        }, Title.prototype = new $.jqplot.ElemContainer, Title.prototype.constructor = Title, Title.prototype.init = function() {
            $.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions)
        }, Title.prototype.draw = function(width) {
            return this.renderer.draw.call(this, width)
        }, Title.prototype.pack = function() {
            this.renderer.pack.call(this)
        }, Series.prototype = new $.jqplot.ElemContainer, Series.prototype.constructor = Series, Series.prototype.init = function(index, gridbw, plot) {
            this.index = index, this.gridBorderWidth = gridbw;
            var i, l, d = this.data,
                temp = [];
            for (i = 0, l = d.length; l > i; i++)
                if (this.breakOnNull) temp.push(d[i]);
                else {
                    if (null == d[i] || null == d[i][0] || null == d[i][1]) continue;
                    temp.push(d[i])
                }
            if (this.data = temp, this.color || (this.color = plot.colorGenerator.get(this.index)), this.negativeColor || (this.negativeColor = plot.negativeColorGenerator.get(this.index)), this.fillColor || (this.fillColor = this.color), this.fillAlpha) {
                var comp = $.jqplot.normalize2rgb(this.fillColor),
                    comp = $.jqplot.getColorComponents(comp);
                this.fillColor = "rgba(" + comp[0] + "," + comp[1] + "," + comp[2] + "," + this.fillAlpha + ")"
            }
            $.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions, plot), this.markerRenderer = new this.markerRenderer, this.markerOptions.color || (this.markerOptions.color = this.color), null == this.markerOptions.show && (this.markerOptions.show = this.showMarker), this.showMarker = this.markerOptions.show, this.markerRenderer.init(this.markerOptions)
        }, Series.prototype.draw = function(sctx, opts, plot) {
            var options = opts == undefined ? {} : opts;
            sctx = sctx == undefined ? this.canvas._ctx : sctx;
            var j, data, gridData;
            for (j = 0; j < $.jqplot.preDrawSeriesHooks.length; j++) $.jqplot.preDrawSeriesHooks[j].call(this, sctx, options);
            for (this.show && (this.renderer.setGridData.call(this, plot), options.preventJqPlotSeriesDrawTrigger || $(sctx.canvas).trigger("jqplotSeriesDraw", [this.data, this.gridData]), data = [], data = options.data ? options.data : this._stack ? this._plotData : this.data, gridData = options.gridData || this.renderer.makeGridData.call(this, data, plot), "line" === this._type && this.renderer.smooth && this.renderer._smoothedData.length && (gridData = this.renderer._smoothedData), this.renderer.draw.call(this, sctx, gridData, options, plot)), j = 0; j < $.jqplot.postDrawSeriesHooks.length; j++) $.jqplot.postDrawSeriesHooks[j].call(this, sctx, options, plot);
            sctx = opts = plot = j = data = gridData = null
        }, Series.prototype.drawShadow = function(sctx, opts, plot) {
            var options = opts == undefined ? {} : opts;
            sctx = sctx == undefined ? this.shadowCanvas._ctx : sctx;
            var j, data, gridData;
            for (j = 0; j < $.jqplot.preDrawSeriesShadowHooks.length; j++) $.jqplot.preDrawSeriesShadowHooks[j].call(this, sctx, options);
            for (this.shadow && (this.renderer.setGridData.call(this, plot), data = [], data = options.data ? options.data : this._stack ? this._plotData : this.data, gridData = options.gridData || this.renderer.makeGridData.call(this, data, plot), this.renderer.drawShadow.call(this, sctx, gridData, options, plot)), j = 0; j < $.jqplot.postDrawSeriesShadowHooks.length; j++) $.jqplot.postDrawSeriesShadowHooks[j].call(this, sctx, options);
            sctx = opts = plot = j = data = gridData = null
        }, Series.prototype.toggleDisplay = function(ev, callback) {
            var s, speed;
            s = ev.data.series ? ev.data.series : this, ev.data.speed && (speed = ev.data.speed), speed ? s.canvas._elem.is(":hidden") || !s.show ? (s.show = !0, s.canvas._elem.removeClass("jqplot-series-hidden"), s.shadowCanvas._elem && s.shadowCanvas._elem.fadeIn(speed), s.canvas._elem.fadeIn(speed, callback), s.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + s.index).fadeIn(speed)) : (s.show = !1, s.canvas._elem.addClass("jqplot-series-hidden"), s.shadowCanvas._elem && s.shadowCanvas._elem.fadeOut(speed), s.canvas._elem.fadeOut(speed, callback), s.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + s.index).fadeOut(speed)) : s.canvas._elem.is(":hidden") || !s.show ? (s.show = !0, s.canvas._elem.removeClass("jqplot-series-hidden"), s.shadowCanvas._elem && s.shadowCanvas._elem.show(), s.canvas._elem.show(0, callback), s.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + s.index).show()) : (s.show = !1, s.canvas._elem.addClass("jqplot-series-hidden"), s.shadowCanvas._elem && s.shadowCanvas._elem.hide(), s.canvas._elem.hide(0, callback), s.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + s.index).hide())
        }, Grid.prototype = new $.jqplot.ElemContainer, Grid.prototype.constructor = Grid, Grid.prototype.init = function() {
            $.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions)
        }, Grid.prototype.createElement = function(offsets, plot) {
            return this._offsets = offsets, this.renderer.createElement.call(this, plot)
        }, Grid.prototype.draw = function() {
            this.renderer.draw.call(this)
        }, $.jqplot.GenericCanvas = function() {
            $.jqplot.ElemContainer.call(this), this._ctx
        }, $.jqplot.GenericCanvas.prototype = new $.jqplot.ElemContainer, $.jqplot.GenericCanvas.prototype.constructor = $.jqplot.GenericCanvas, $.jqplot.GenericCanvas.prototype.createElement = function(offsets, clss, plotDimensions, plot) {
            this._offsets = offsets;
            var klass = "jqplot";
            clss != undefined && (klass = clss);
            var elem;
            return elem = plot.canvasManager.getCanvas(), null != plotDimensions && (this._plotDimensions = plotDimensions), elem.width = this._plotDimensions.width - this._offsets.left - this._offsets.right, elem.height = this._plotDimensions.height - this._offsets.top - this._offsets.bottom, this._elem = $(elem), this._elem.css({
                position: "absolute",
                left: this._offsets.left,
                top: this._offsets.top
            }), this._elem.addClass(klass), elem = plot.canvasManager.initCanvas(elem), elem = null, this._elem
        }, $.jqplot.GenericCanvas.prototype.setContext = function() {
            return this._ctx = this._elem.get(0).getContext("2d"), this._ctx
        }, $.jqplot.GenericCanvas.prototype.resetCanvas = function() {
            this._elem && ($.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== undefined && window.G_vmlCanvasManager.uninitElement(this._elem.get(0)), this._elem.emptyForce()), this._ctx = null
        }, $.jqplot.HooksManager = function() {
            this.hooks = [], this.args = []
        }, $.jqplot.HooksManager.prototype.addOnce = function(fn, args) {
            args = args || [];
            for (var havehook = !1, i = 0, l = this.hooks.length; l > i; i++) this.hooks[i] == fn && (havehook = !0);
            havehook || (this.hooks.push(fn), this.args.push(args))
        }, $.jqplot.HooksManager.prototype.add = function(fn, args) {
            args = args || [], this.hooks.push(fn), this.args.push(args)
        }, $.jqplot.EventListenerManager = function() {
            this.hooks = []
        }, $.jqplot.EventListenerManager.prototype.addOnce = function(ev, fn) {
            for (var h, i, havehook = !1, i = 0, l = this.hooks.length; l > i; i++) h = this.hooks[i], h[0] == ev && h[1] == fn && (havehook = !0);
            havehook || this.hooks.push([ev, fn])
        }, $.jqplot.EventListenerManager.prototype.add = function(ev, fn) {
            this.hooks.push([ev, fn])
        };
        var _axisNames = ["yMidAxis", "xaxis", "yaxis", "x2axis", "y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis"];
        $.jqplot.computeHighlightColors = function(colors) {
            var ret;
            if ($.isArray(colors)) {
                ret = [];
                for (var i = 0; i < colors.length; i++) {
                    for (var rgba = $.jqplot.getColorComponents(colors[i]), newrgb = [rgba[0], rgba[1], rgba[2]], sum = newrgb[0] + newrgb[1] + newrgb[2], j = 0; 3 > j; j++) newrgb[j] = sum > 660 ? .85 * newrgb[j] : .73 * newrgb[j] + 90, newrgb[j] = parseInt(newrgb[j], 10), newrgb[j] > 255 ? 255 : newrgb[j];
                    newrgb[3] = .3 + .35 * rgba[3], ret.push("rgba(" + newrgb[0] + "," + newrgb[1] + "," + newrgb[2] + "," + newrgb[3] + ")")
                }
            } else {
                for (var rgba = $.jqplot.getColorComponents(colors), newrgb = [rgba[0], rgba[1], rgba[2]], sum = newrgb[0] + newrgb[1] + newrgb[2], j = 0; 3 > j; j++) newrgb[j] = sum > 660 ? .85 * newrgb[j] : .73 * newrgb[j] + 90, newrgb[j] = parseInt(newrgb[j], 10), newrgb[j] > 255 ? 255 : newrgb[j];
                newrgb[3] = .3 + .35 * rgba[3], ret = "rgba(" + newrgb[0] + "," + newrgb[1] + "," + newrgb[2] + "," + newrgb[3] + ")"
            }
            return ret
        }, $.jqplot.ColorGenerator = function(colors) {
            colors = colors || $.jqplot.config.defaultColors;
            var idx = 0;
            this.next = function() {
                return idx < colors.length ? colors[idx++] : (idx = 0, colors[idx++])
            }, this.previous = function() {
                return idx > 0 ? colors[idx--] : (idx = colors.length - 1, colors[idx])
            }, this.get = function(i) {
                var idx = i - colors.length * Math.floor(i / colors.length);
                return colors[idx]
            }, this.setColors = function(c) {
                colors = c
            }, this.reset = function() {
                idx = 0
            }, this.getIndex = function() {
                return idx
            }, this.setIndex = function(index) {
                idx = index
            }
        }, $.jqplot.hex2rgb = function(h, a) {
            h = h.replace("#", ""), 3 == h.length && (h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2));
            var rgb;
            return rgb = "rgba(" + parseInt(h.slice(0, 2), 16) + ", " + parseInt(h.slice(2, 4), 16) + ", " + parseInt(h.slice(4, 6), 16), a && (rgb += ", " + a), rgb += ")"
        }, $.jqplot.rgb2hex = function(s) {
            for (var pat = /rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/, m = s.match(pat), h = "#", i = 1; 4 > i; i++) {
                var temp; - 1 != m[i].search(/%/) ? (temp = parseInt(255 * m[i] / 100, 10).toString(16), 1 == temp.length && (temp = "0" + temp)) : (temp = parseInt(m[i], 10).toString(16), 1 == temp.length && (temp = "0" + temp)), h += temp
            }
            return h
        }, $.jqplot.normalize2rgb = function(s, a) {
            if (-1 != s.search(/^ *rgba?\(/)) return s;
            if (-1 != s.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/)) return $.jqplot.hex2rgb(s, a);
            throw new Error("Invalid color spec")
        }, $.jqplot.getColorComponents = function(s) {
            s = $.jqplot.colorKeywordMap[s] || s;
            for (var rgb = $.jqplot.normalize2rgb(s), pat = /rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/, m = rgb.match(pat), ret = [], i = 1; 4 > i; i++) - 1 != m[i].search(/%/) ? ret[i - 1] = parseInt(255 * m[i] / 100, 10) : ret[i - 1] = parseInt(m[i], 10);
            return ret[3] = parseFloat(m[4]) ? parseFloat(m[4]) : 1, ret
        }, $.jqplot.colorKeywordMap = {
            aliceblue: "rgb(240, 248, 255)",
            antiquewhite: "rgb(250, 235, 215)",
            aqua: "rgb( 0, 255, 255)",
            aquamarine: "rgb(127, 255, 212)",
            azure: "rgb(240, 255, 255)",
            beige: "rgb(245, 245, 220)",
            bisque: "rgb(255, 228, 196)",
            black: "rgb( 0, 0, 0)",
            blanchedalmond: "rgb(255, 235, 205)",
            blue: "rgb( 0, 0, 255)",
            blueviolet: "rgb(138, 43, 226)",
            brown: "rgb(165, 42, 42)",
            burlywood: "rgb(222, 184, 135)",
            cadetblue: "rgb( 95, 158, 160)",
            chartreuse: "rgb(127, 255, 0)",
            chocolate: "rgb(210, 105, 30)",
            coral: "rgb(255, 127, 80)",
            cornflowerblue: "rgb(100, 149, 237)",
            cornsilk: "rgb(255, 248, 220)",
            crimson: "rgb(220, 20, 60)",
            cyan: "rgb( 0, 255, 255)",
            darkblue: "rgb( 0, 0, 139)",
            darkcyan: "rgb( 0, 139, 139)",
            darkgoldenrod: "rgb(184, 134, 11)",
            darkgray: "rgb(169, 169, 169)",
            darkgreen: "rgb( 0, 100, 0)",
            darkgrey: "rgb(169, 169, 169)",
            darkkhaki: "rgb(189, 183, 107)",
            darkmagenta: "rgb(139, 0, 139)",
            darkolivegreen: "rgb( 85, 107, 47)",
            darkorange: "rgb(255, 140, 0)",
            darkorchid: "rgb(153, 50, 204)",
            darkred: "rgb(139, 0, 0)",
            darksalmon: "rgb(233, 150, 122)",
            darkseagreen: "rgb(143, 188, 143)",
            darkslateblue: "rgb( 72, 61, 139)",
            darkslategray: "rgb( 47, 79, 79)",
            darkslategrey: "rgb( 47, 79, 79)",
            darkturquoise: "rgb( 0, 206, 209)",
            darkviolet: "rgb(148, 0, 211)",
            deeppink: "rgb(255, 20, 147)",
            deepskyblue: "rgb( 0, 191, 255)",
            dimgray: "rgb(105, 105, 105)",
            dimgrey: "rgb(105, 105, 105)",
            dodgerblue: "rgb( 30, 144, 255)",
            firebrick: "rgb(178, 34, 34)",
            floralwhite: "rgb(255, 250, 240)",
            forestgreen: "rgb( 34, 139, 34)",
            fuchsia: "rgb(255, 0, 255)",
            gainsboro: "rgb(220, 220, 220)",
            ghostwhite: "rgb(248, 248, 255)",
            gold: "rgb(255, 215, 0)",
            goldenrod: "rgb(218, 165, 32)",
            gray: "rgb(128, 128, 128)",
            grey: "rgb(128, 128, 128)",
            green: "rgb( 0, 128, 0)",
            greenyellow: "rgb(173, 255, 47)",
            honeydew: "rgb(240, 255, 240)",
            hotpink: "rgb(255, 105, 180)",
            indianred: "rgb(205, 92, 92)",
            indigo: "rgb( 75, 0, 130)",
            ivory: "rgb(255, 255, 240)",
            khaki: "rgb(240, 230, 140)",
            lavender: "rgb(230, 230, 250)",
            lavenderblush: "rgb(255, 240, 245)",
            lawngreen: "rgb(124, 252, 0)",
            lemonchiffon: "rgb(255, 250, 205)",
            lightblue: "rgb(173, 216, 230)",
            lightcoral: "rgb(240, 128, 128)",
            lightcyan: "rgb(224, 255, 255)",
            lightgoldenrodyellow: "rgb(250, 250, 210)",
            lightgray: "rgb(211, 211, 211)",
            lightgreen: "rgb(144, 238, 144)",
            lightgrey: "rgb(211, 211, 211)",
            lightpink: "rgb(255, 182, 193)",
            lightsalmon: "rgb(255, 160, 122)",
            lightseagreen: "rgb( 32, 178, 170)",
            lightskyblue: "rgb(135, 206, 250)",
            lightslategray: "rgb(119, 136, 153)",
            lightslategrey: "rgb(119, 136, 153)",
            lightsteelblue: "rgb(176, 196, 222)",
            lightyellow: "rgb(255, 255, 224)",
            lime: "rgb( 0, 255, 0)",
            limegreen: "rgb( 50, 205, 50)",
            linen: "rgb(250, 240, 230)",
            magenta: "rgb(255, 0, 255)",
            maroon: "rgb(128, 0, 0)",
            mediumaquamarine: "rgb(102, 205, 170)",
            mediumblue: "rgb( 0, 0, 205)",
            mediumorchid: "rgb(186, 85, 211)",
            mediumpurple: "rgb(147, 112, 219)",
            mediumseagreen: "rgb( 60, 179, 113)",
            mediumslateblue: "rgb(123, 104, 238)",
            mediumspringgreen: "rgb( 0, 250, 154)",
            mediumturquoise: "rgb( 72, 209, 204)",
            mediumvioletred: "rgb(199, 21, 133)",
            midnightblue: "rgb( 25, 25, 112)",
            mintcream: "rgb(245, 255, 250)",
            mistyrose: "rgb(255, 228, 225)",
            moccasin: "rgb(255, 228, 181)",
            navajowhite: "rgb(255, 222, 173)",
            navy: "rgb( 0, 0, 128)",
            oldlace: "rgb(253, 245, 230)",
            olive: "rgb(128, 128, 0)",
            olivedrab: "rgb(107, 142, 35)",
            orange: "rgb(255, 165, 0)",
            orangered: "rgb(255, 69, 0)",
            orchid: "rgb(218, 112, 214)",
            palegoldenrod: "rgb(238, 232, 170)",
            palegreen: "rgb(152, 251, 152)",
            paleturquoise: "rgb(175, 238, 238)",
            palevioletred: "rgb(219, 112, 147)",
            papayawhip: "rgb(255, 239, 213)",
            peachpuff: "rgb(255, 218, 185)",
            peru: "rgb(205, 133, 63)",
            pink: "rgb(255, 192, 203)",
            plum: "rgb(221, 160, 221)",
            powderblue: "rgb(176, 224, 230)",
            purple: "rgb(128, 0, 128)",
            red: "rgb(255, 0, 0)",
            rosybrown: "rgb(188, 143, 143)",
            royalblue: "rgb( 65, 105, 225)",
            saddlebrown: "rgb(139, 69, 19)",
            salmon: "rgb(250, 128, 114)",
            sandybrown: "rgb(244, 164, 96)",
            seagreen: "rgb( 46, 139, 87)",
            seashell: "rgb(255, 245, 238)",
            sienna: "rgb(160, 82, 45)",
            silver: "rgb(192, 192, 192)",
            skyblue: "rgb(135, 206, 235)",
            slateblue: "rgb(106, 90, 205)",
            slategray: "rgb(112, 128, 144)",
            slategrey: "rgb(112, 128, 144)",
            snow: "rgb(255, 250, 250)",
            springgreen: "rgb( 0, 255, 127)",
            steelblue: "rgb( 70, 130, 180)",
            tan: "rgb(210, 180, 140)",
            teal: "rgb( 0, 128, 128)",
            thistle: "rgb(216, 191, 216)",
            tomato: "rgb(255, 99, 71)",
            turquoise: "rgb( 64, 224, 208)",
            violet: "rgb(238, 130, 238)",
            wheat: "rgb(245, 222, 179)",
            white: "rgb(255, 255, 255)",
            whitesmoke: "rgb(245, 245, 245)",
            yellow: "rgb(255, 255, 0)",
            yellowgreen: "rgb(154, 205, 50)"
        }, $.jqplot.AxisLabelRenderer = function(options) {
            $.jqplot.ElemContainer.call(this), this.axis, this.show = !0, this.label = "", this.fontFamily = null, this.fontSize = null, this.textColor = null, this._elem, this.escapeHTML = !1, $.extend(!0, this, options)
        }, $.jqplot.AxisLabelRenderer.prototype = new $.jqplot.ElemContainer, $.jqplot.AxisLabelRenderer.prototype.constructor = $.jqplot.AxisLabelRenderer, $.jqplot.AxisLabelRenderer.prototype.init = function(options) {
            $.extend(!0, this, options)
        }, $.jqplot.AxisLabelRenderer.prototype.draw = function(ctx, plot) {
            return this._elem && (this._elem.emptyForce(), this._elem = null), this._elem = $('<div style="position:absolute;" class="jqplot-' + this.axis + '-label"></div>'), Number(this.label) && this._elem.css("white-space", "nowrap"), this.escapeHTML ? this._elem.text(this.label) : this._elem.html(this.label), this.fontFamily && this._elem.css("font-family", this.fontFamily), this.fontSize && this._elem.css("font-size", this.fontSize), this.textColor && this._elem.css("color", this.textColor), this._elem
        }, $.jqplot.AxisLabelRenderer.prototype.pack = function() {}, $.jqplot.AxisTickRenderer = function(options) {
            $.jqplot.ElemContainer.call(this), this.mark = "outside", this.axis, this.showMark = !0, this.showGridline = !0, this.isMinorTick = !1, this.size = 4, this.markSize = 6, this.show = !0, this.showLabel = !0, this.label = null, this.value = null, this._styles = {}, this.formatter = $.jqplot.DefaultTickFormatter, this.prefix = "", this.suffix = "", this.formatString = "", this.fontFamily, this.fontSize, this.textColor, this.escapeHTML = !1, this._elem, this._breakTick = !1, $.extend(!0, this, options)
        }, $.jqplot.AxisTickRenderer.prototype.init = function(options) {
            $.extend(!0, this, options)
        }, $.jqplot.AxisTickRenderer.prototype = new $.jqplot.ElemContainer, $.jqplot.AxisTickRenderer.prototype.constructor = $.jqplot.AxisTickRenderer, $.jqplot.AxisTickRenderer.prototype.setTick = function(value, axisName, isMinor) {
            return this.value = value, this.axis = axisName, isMinor && (this.isMinorTick = !0), this
        }, $.jqplot.AxisTickRenderer.prototype.draw = function() {
            null === this.label && (this.label = this.prefix + this.formatter(this.formatString, this.value) + this.suffix);
            var style = {
                position: "absolute"
            };
            Number(this.label) && (style.whitSpace = "nowrap"), this._elem && (this._elem.emptyForce(), this._elem = null), this._elem = $(document.createElement("div")), this._elem.addClass("jqplot-" + this.axis + "-tick"), this.escapeHTML ? this._elem.text(this.label) : this._elem.html(this.label), this._elem.css(style);
            for (var s in this._styles) this._elem.css(s, this._styles[s]);
            return this.fontFamily && this._elem.css("font-family", this.fontFamily), this.fontSize && this._elem.css("font-size", this.fontSize), this.textColor && this._elem.css("color", this.textColor), this._breakTick && this._elem.addClass("jqplot-breakTick"), this._elem
        }, $.jqplot.DefaultTickFormatter = function(format, val) {
            return "number" == typeof val ? (format || (format = $.jqplot.config.defaultTickFormatString), $.jqplot.sprintf(format, val)) : String(val)
        }, $.jqplot.PercentTickFormatter = function(format, val) {
            return "number" == typeof val ? (val = 100 * val, format || (format = $.jqplot.config.defaultTickFormatString), $.jqplot.sprintf(format, val)) : String(val)
        }, $.jqplot.AxisTickRenderer.prototype.pack = function() {}, $.jqplot.CanvasGridRenderer = function() {
            this.shadowRenderer = new $.jqplot.ShadowRenderer
        }, $.jqplot.CanvasGridRenderer.prototype.init = function(options) {
            this._ctx, $.extend(!0, this, options);
            var sopts = {
                lineJoin: "miter",
                lineCap: "round",
                fill: !1,
                isarc: !1,
                angle: this.shadowAngle,
                offset: this.shadowOffset,
                alpha: this.shadowAlpha,
                depth: this.shadowDepth,
                lineWidth: this.shadowWidth,
                closePath: !1,
                strokeStyle: this.shadowColor
            };
            this.renderer.shadowRenderer.init(sopts)
        }, $.jqplot.CanvasGridRenderer.prototype.createElement = function(plot) {
            var elem;
            this._elem && ($.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== undefined && (elem = this._elem.get(0), window.G_vmlCanvasManager.uninitElement(elem), elem = null), this._elem.emptyForce(), this._elem = null), elem = plot.canvasManager.getCanvas();
            var w = this._plotDimensions.width,
                h = this._plotDimensions.height;
            return elem.width = w, elem.height = h, this._elem = $(elem), this._elem.addClass("jqplot-grid-canvas"), this._elem.css({
                position: "absolute",
                left: 0,
                top: 0
            }), elem = plot.canvasManager.initCanvas(elem), this._top = this._offsets.top, this._bottom = h - this._offsets.bottom, this._left = this._offsets.left, this._right = w - this._offsets.right, this._width = this._right - this._left, this._height = this._bottom - this._top, elem = null, this._elem
        }, $.jqplot.CanvasGridRenderer.prototype.draw = function() {
            function drawLine(bx, by, ex, ey, opts) {
                ctx.save(), opts = opts || {}, null != opts.lineWidth && 0 == opts.lineWidth || ($.extend(!0, ctx, opts), ctx.beginPath(), ctx.moveTo(bx, by), ctx.lineTo(ex, ey), ctx.stroke(), ctx.restore())
            }
            this._ctx = this._elem.get(0).getContext("2d");
            var ctx = this._ctx,
                axes = this._axes;
            ctx.save(), ctx.clearRect(0, 0, this._plotDimensions.width, this._plotDimensions.height), ctx.fillStyle = this.backgroundColor || this.background, ctx.fillRect(this._left, this._top, this._width, this._height), ctx.save(), ctx.lineJoin = "miter", ctx.lineCap = "butt", ctx.lineWidth = this.gridLineWidth, ctx.strokeStyle = this.gridLineColor;
            for (var b, e, s, m, ax = ["xaxis", "yaxis", "x2axis", "y2axis"], i = 4; i > 0; i--) {
                var name = ax[i - 1],
                    axis = axes[name],
                    ticks = axis._ticks,
                    numticks = ticks.length;
                if (axis.show) {
                    if (axis.drawBaseline) {
                        var bopts = {};
                        switch (null !== axis.baselineWidth && (bopts.lineWidth = axis.baselineWidth), null !== axis.baselineColor && (bopts.strokeStyle = axis.baselineColor), name) {
                            case "xaxis":
                                drawLine(this._left, this._bottom, this._right, this._bottom, bopts);
                                break;
                            case "yaxis":
                                drawLine(this._left, this._bottom, this._left, this._top, bopts);
                                break;
                            case "x2axis":
                                drawLine(this._left, this._bottom, this._right, this._bottom, bopts);
                                break;
                            case "y2axis":
                                drawLine(this._right, this._bottom, this._right, this._top, bopts)
                        }
                    }
                    for (var j = numticks; j > 0; j--) {
                        var t = ticks[j - 1];
                        if (t.show) {
                            var pos = Math.round(axis.u2p(t.value)) + .5;
                            switch (name) {
                                case "xaxis":
                                    if (t.showGridline && this.drawGridlines && (!t.isMinorTick && axis.drawMajorGridlines || t.isMinorTick && axis.drawMinorGridlines) && drawLine(pos, this._top, pos, this._bottom), t.showMark && t.mark && (!t.isMinorTick && axis.drawMajorTickMarks || t.isMinorTick && axis.drawMinorTickMarks)) {
                                        s = t.markSize, m = t.mark;
                                        var pos = Math.round(axis.u2p(t.value)) + .5;
                                        switch (m) {
                                            case "outside":
                                                b = this._bottom, e = this._bottom + s;
                                                break;
                                            case "inside":
                                                b = this._bottom - s, e = this._bottom;
                                                break;
                                            case "cross":
                                                b = this._bottom - s, e = this._bottom + s;
                                                break;
                                            default:
                                                b = this._bottom, e = this._bottom + s
                                        }
                                        this.shadow && this.renderer.shadowRenderer.draw(ctx, [
                                            [pos, b],
                                            [pos, e]
                                        ], {
                                            lineCap: "butt",
                                            lineWidth: this.gridLineWidth,
                                            offset: .75 * this.gridLineWidth,
                                            depth: 2,
                                            fill: !1,
                                            closePath: !1
                                        }), drawLine(pos, b, pos, e)
                                    }
                                    break;
                                case "yaxis":
                                    if (t.showGridline && this.drawGridlines && (!t.isMinorTick && axis.drawMajorGridlines || t.isMinorTick && axis.drawMinorGridlines) && drawLine(this._right, pos, this._left, pos), t.showMark && t.mark && (!t.isMinorTick && axis.drawMajorTickMarks || t.isMinorTick && axis.drawMinorTickMarks)) {
                                        s = t.markSize, m = t.mark;
                                        var pos = Math.round(axis.u2p(t.value)) + .5;
                                        switch (m) {
                                            case "outside":
                                                b = this._left - s, e = this._left;
                                                break;
                                            case "inside":
                                                b = this._left, e = this._left + s;
                                                break;
                                            case "cross":
                                                b = this._left - s, e = this._left + s;
                                                break;
                                            default:
                                                b = this._left - s, e = this._left
                                        }
                                        this.shadow && this.renderer.shadowRenderer.draw(ctx, [
                                            [b, pos],
                                            [e, pos]
                                        ], {
                                            lineCap: "butt",
                                            lineWidth: 1.5 * this.gridLineWidth,
                                            offset: .75 * this.gridLineWidth,
                                            fill: !1,
                                            closePath: !1
                                        }), drawLine(b, pos, e, pos, {
                                            strokeStyle: axis.borderColor
                                        })
                                    }
                                    break;
                                case "x2axis":
                                    if (t.showGridline && this.drawGridlines && (!t.isMinorTick && axis.drawMajorGridlines || t.isMinorTick && axis.drawMinorGridlines) && drawLine(pos, this._bottom, pos, this._top), t.showMark && t.mark && (!t.isMinorTick && axis.drawMajorTickMarks || t.isMinorTick && axis.drawMinorTickMarks)) {
                                        s = t.markSize, m = t.mark;
                                        var pos = Math.round(axis.u2p(t.value)) + .5;
                                        switch (m) {
                                            case "outside":
                                                b = this._top - s, e = this._top;
                                                break;
                                            case "inside":
                                                b = this._top, e = this._top + s;
                                                break;
                                            case "cross":
                                                b = this._top - s, e = this._top + s;
                                                break;
                                            default:
                                                b = this._top - s, e = this._top
                                        }
                                        this.shadow && this.renderer.shadowRenderer.draw(ctx, [
                                            [pos, b],
                                            [pos, e]
                                        ], {
                                            lineCap: "butt",
                                            lineWidth: this.gridLineWidth,
                                            offset: .75 * this.gridLineWidth,
                                            depth: 2,
                                            fill: !1,
                                            closePath: !1
                                        }), drawLine(pos, b, pos, e)
                                    }
                                    break;
                                case "y2axis":
                                    if (t.showGridline && this.drawGridlines && (!t.isMinorTick && axis.drawMajorGridlines || t.isMinorTick && axis.drawMinorGridlines) && drawLine(this._left, pos, this._right, pos), t.showMark && t.mark && (!t.isMinorTick && axis.drawMajorTickMarks || t.isMinorTick && axis.drawMinorTickMarks)) {
                                        s = t.markSize, m = t.mark;
                                        var pos = Math.round(axis.u2p(t.value)) + .5;
                                        switch (m) {
                                            case "outside":
                                                b = this._right, e = this._right + s;
                                                break;
                                            case "inside":
                                                b = this._right - s, e = this._right;
                                                break;
                                            case "cross":
                                                b = this._right - s, e = this._right + s;
                                                break;
                                            default:
                                                b = this._right, e = this._right + s
                                        }
                                        this.shadow && this.renderer.shadowRenderer.draw(ctx, [
                                            [b, pos],
                                            [e, pos]
                                        ], {
                                            lineCap: "butt",
                                            lineWidth: 1.5 * this.gridLineWidth,
                                            offset: .75 * this.gridLineWidth,
                                            fill: !1,
                                            closePath: !1
                                        }), drawLine(b, pos, e, pos, {
                                            strokeStyle: axis.borderColor
                                        })
                                    }
                            }
                        }
                    }
                    t = null
                }
                axis = null, ticks = null
            }
            ax = ["y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis", "yMidAxis"];
            for (var i = 7; i > 0; i--) {
                var axis = axes[ax[i - 1]],
                    ticks = axis._ticks;
                if (axis.show) {
                    var tn = ticks[axis.numberTicks - 1],
                        t0 = ticks[0],
                        left = axis.getLeft(),
                        points = [
                            [left, tn.getTop() + tn.getHeight() / 2],
                            [left, t0.getTop() + t0.getHeight() / 2 + 1]
                        ];
                    this.shadow && this.renderer.shadowRenderer.draw(ctx, points, {
                        lineCap: "butt",
                        fill: !1,
                        closePath: !1
                    }), drawLine(points[0][0], points[0][1], points[1][0], points[1][1], {
                        lineCap: "butt",
                        strokeStyle: axis.borderColor,
                        lineWidth: axis.borderWidth
                    });
                    for (var j = ticks.length; j > 0; j--) {
                        var t = ticks[j - 1];
                        s = t.markSize, m = t.mark;
                        var pos = Math.round(axis.u2p(t.value)) + .5;
                        if (t.showMark && t.mark) {
                            switch (m) {
                                case "outside":
                                    b = left, e = left + s;
                                    break;
                                case "inside":
                                    b = left - s, e = left;
                                    break;
                                case "cross":
                                    b = left - s, e = left + s;
                                    break;
                                default:
                                    b = left, e = left + s
                            }
                            points = [
                                [b, pos],
                                [e, pos]
                            ], this.shadow && this.renderer.shadowRenderer.draw(ctx, points, {
                                lineCap: "butt",
                                lineWidth: 1.5 * this.gridLineWidth,
                                offset: .75 * this.gridLineWidth,
                                fill: !1,
                                closePath: !1
                            }), drawLine(b, pos, e, pos, {
                                strokeStyle: axis.borderColor
                            })
                        }
                        t = null
                    }
                    t0 = null
                }
                axis = null, ticks = null
            }
            if (ctx.restore(), this.shadow) {
                var points = [
                    [this._left, this._bottom],
                    [this._right, this._bottom],
                    [this._right, this._top]
                ];
                this.renderer.shadowRenderer.draw(ctx, points)
            }
            0 != this.borderWidth && this.drawBorder && (drawLine(this._left, this._top, this._right, this._top, {
                lineCap: "round",
                strokeStyle: axes.x2axis.borderColor,
                lineWidth: axes.x2axis.borderWidth
            }), drawLine(this._right, this._top, this._right, this._bottom, {
                lineCap: "round",
                strokeStyle: axes.y2axis.borderColor,
                lineWidth: axes.y2axis.borderWidth
            }), drawLine(this._right, this._bottom, this._left, this._bottom, {
                lineCap: "round",
                strokeStyle: axes.xaxis.borderColor,
                lineWidth: axes.xaxis.borderWidth
            }), drawLine(this._left, this._bottom, this._left, this._top, {
                lineCap: "round",
                strokeStyle: axes.yaxis.borderColor,
                lineWidth: axes.yaxis.borderWidth
            })), ctx.restore(), ctx = null, axes = null
        }, $.jqplot.DivTitleRenderer = function() {}, $.jqplot.DivTitleRenderer.prototype.init = function(options) {
            $.extend(!0, this, options)
        }, $.jqplot.DivTitleRenderer.prototype.draw = function() {
            this._elem && (this._elem.emptyForce(), this._elem = null);
            var elem = (this.renderer, document.createElement("div"));
            if (this._elem = $(elem), this._elem.addClass("jqplot-title"), this.text) {
                if (this.text) {
                    var color;
                    this.color ? color = this.color : this.textColor && (color = this.textColor);
                    var styles = {
                        position: "absolute",
                        top: "0px",
                        left: "0px"
                    };
                    this._plotWidth && (styles.width = this._plotWidth + "px"), this.fontSize && (styles.fontSize = this.fontSize), "string" == typeof this.textAlign ? styles.textAlign = this.textAlign : styles.textAlign = "center", color && (styles.color = color), this.paddingBottom && (styles.paddingBottom = this.paddingBottom), this.fontFamily && (styles.fontFamily = this.fontFamily), this._elem.css(styles), this.escapeHtml ? this._elem.text(this.text) : this._elem.html(this.text)
                }
            } else this.show = !1, this._elem.height(0), this._elem.width(0);
            return elem = null, this._elem
        }, $.jqplot.DivTitleRenderer.prototype.pack = function() {};
        var dotlen = .1;
        $.jqplot.LinePattern = function(ctx, pattern) {
            var defaultLinePatterns = {
                dotted: [dotlen, $.jqplot.config.dotGapLength],
                dashed: [$.jqplot.config.dashLength, $.jqplot.config.gapLength],
                solid: null
            };
            if ("string" == typeof pattern)
                if ("." === pattern[0] || "-" === pattern[0]) {
                    var s = pattern;
                    pattern = [];
                    for (var i = 0, imax = s.length; imax > i; i++) {
                        if ("." === s[i]) pattern.push(dotlen);
                        else {
                            if ("-" !== s[i]) continue;
                            pattern.push($.jqplot.config.dashLength)
                        }
                        pattern.push($.jqplot.config.gapLength)
                    }
                } else pattern = defaultLinePatterns[pattern];
            if (!pattern || !pattern.length) return ctx;
            var patternIndex = 0,
                patternDistance = pattern[0],
                px = 0,
                py = 0,
                pathx0 = 0,
                pathy0 = 0,
                moveTo = function(x, y) {
                    ctx.moveTo(x, y), px = x, py = y, pathx0 = x, pathy0 = y
                },
                lineTo = function(x, y) {
                    var scale = ctx.lineWidth,
                        dx = x - px,
                        dy = y - py,
                        dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > 0 && scale > 0)
                        for (dx /= dist, dy /= dist;;) {
                            var dp = scale * patternDistance;
                            if (!(dist > dp)) {
                                px = x, py = y, 0 == (1 & patternIndex) ? ctx.lineTo(px, py) : ctx.moveTo(px, py), patternDistance -= dist / scale;
                                break
                            }
                            px += dp * dx, py += dp * dy, 0 == (1 & patternIndex) ? ctx.lineTo(px, py) : ctx.moveTo(px, py), dist -= dp, patternIndex++, patternIndex >= pattern.length && (patternIndex = 0), patternDistance = pattern[patternIndex]
                        }
                },
                beginPath = function() {
                    ctx.beginPath();
                },
                closePath = function() {
                    lineTo(pathx0, pathy0)
                };
            return {
                moveTo: moveTo,
                lineTo: lineTo,
                beginPath: beginPath,
                closePath: closePath
            }
        }, $.jqplot.LineRenderer = function() {
            this.shapeRenderer = new $.jqplot.ShapeRenderer, this.shadowRenderer = new $.jqplot.ShadowRenderer
        }, $.jqplot.LineRenderer.prototype.init = function(options, plot) {
            options = options || {}, this._type = "line", this.renderer.animation = {
                show: !1,
                direction: "left",
                speed: 2500,
                _supported: !0
            }, this.renderer.smooth = !1, this.renderer.tension = null, this.renderer.constrainSmoothing = !0, this.renderer._smoothedData = [], this.renderer._smoothedPlotData = [], this.renderer._hiBandGridData = [], this.renderer._lowBandGridData = [], this.renderer._hiBandSmoothedData = [], this.renderer._lowBandSmoothedData = [], this.renderer.bandData = [], this.renderer.bands = {
                show: !1,
                hiData: [],
                lowData: [],
                color: this.color,
                showLines: !1,
                fill: !0,
                fillColor: null,
                _min: null,
                _max: null,
                interval: "3%"
            };
            var lopts = {
                highlightMouseOver: options.highlightMouseOver,
                highlightMouseDown: options.highlightMouseDown,
                highlightColor: options.highlightColor
            };
            delete options.highlightMouseOver, delete options.highlightMouseDown, delete options.highlightColor, $.extend(!0, this.renderer, options), this.renderer.options = options, this.renderer.bandData.length > 1 && (!options.bands || null == options.bands.show) ? this.renderer.bands.show = !0 : options.bands && null == options.bands.show && null != options.bands.interval && (this.renderer.bands.show = !0), this.fill && (this.renderer.bands.show = !1), this.renderer.bands.show && this.renderer.initBands.call(this, this.renderer.options, plot), this._stack && (this.renderer.smooth = !1);
            var opts = {
                lineJoin: this.lineJoin,
                lineCap: this.lineCap,
                fill: this.fill,
                isarc: !1,
                strokeStyle: this.color,
                fillStyle: this.fillColor,
                lineWidth: this.lineWidth,
                linePattern: this.linePattern,
                closePath: this.fill
            };
            this.renderer.shapeRenderer.init(opts);
            var shadow_offset = options.shadowOffset;
            null == shadow_offset && (shadow_offset = this.lineWidth > 2.5 ? 1.25 * (1 + .6 * (Math.atan(this.lineWidth / 2.5) / .785398163 - 1)) : 1.25 * Math.atan(this.lineWidth / 2.5) / .785398163);
            var sopts = {
                lineJoin: this.lineJoin,
                lineCap: this.lineCap,
                fill: this.fill,
                isarc: !1,
                angle: this.shadowAngle,
                offset: shadow_offset,
                alpha: this.shadowAlpha,
                depth: this.shadowDepth,
                lineWidth: this.lineWidth,
                linePattern: this.linePattern,
                closePath: this.fill
            };
            if (this.renderer.shadowRenderer.init(sopts), this._areaPoints = [], this._boundingBox = [
                    [],
                    []
                ], !this.isTrendline && this.fill || this.renderer.bands.show) {
                if (this.highlightMouseOver = !0, this.highlightMouseDown = !1, this.highlightColor = null, lopts.highlightMouseDown && null == lopts.highlightMouseOver && (lopts.highlightMouseOver = !1), $.extend(!0, this, {
                        highlightMouseOver: lopts.highlightMouseOver,
                        highlightMouseDown: lopts.highlightMouseDown,
                        highlightColor: lopts.highlightColor
                    }), !this.highlightColor) {
                    var fc = this.renderer.bands.show ? this.renderer.bands.fillColor : this.fillColor;
                    this.highlightColor = $.jqplot.computeHighlightColors(fc)
                }
                this.highlighter && (this.highlighter.show = !1)
            }!this.isTrendline && plot && (plot.plugins.lineRenderer = {}, plot.postInitHooks.addOnce(postInit), plot.postDrawHooks.addOnce(postPlotDraw), plot.eventListenerHooks.addOnce("jqplotMouseMove", handleMove), plot.eventListenerHooks.addOnce("jqplotMouseDown", handleMouseDown), plot.eventListenerHooks.addOnce("jqplotMouseUp", handleMouseUp), plot.eventListenerHooks.addOnce("jqplotClick", handleClick), plot.eventListenerHooks.addOnce("jqplotRightClick", handleRightClick))
        }, $.jqplot.LineRenderer.prototype.initBands = function(options, plot) {
            var bd = options.bandData || [],
                bands = this.renderer.bands;
            bands.hiData = [], bands.lowData = [];
            var data = this.data;
            if (bands._max = null, bands._min = null, 2 == bd.length)
                if ($.isArray(bd[0][0])) {
                    for (var p, bdminidx = 0, bdmaxidx = 0, i = 0, l = bd[0].length; l > i; i++) p = bd[0][i], (null != p[1] && p[1] > bands._max || null == bands._max) && (bands._max = p[1]), (null != p[1] && p[1] < bands._min || null == bands._min) && (bands._min = p[1]);
                    for (var i = 0, l = bd[1].length; l > i; i++) p = bd[1][i], (null != p[1] && p[1] > bands._max || null == bands._max) && (bands._max = p[1], bdmaxidx = 1), (null != p[1] && p[1] < bands._min || null == bands._min) && (bands._min = p[1], bdminidx = 1);
                    bdmaxidx === bdminidx && (bands.show = !1), bands.hiData = bd[bdmaxidx], bands.lowData = bd[bdminidx]
                } else if (bd[0].length === data.length && bd[1].length === data.length)
                    for (var hi = bd[0][0] > bd[1][0] ? 0 : 1, low = hi ? 0 : 1, i = 0, l = data.length; l > i; i++) bands.hiData.push([data[i][0], bd[hi][i]]), bands.lowData.push([data[i][0], bd[low][i]]);
                else bands.show = !1;
            else if (bd.length > 2 && !$.isArray(bd[0][0]))
                for (var hi = bd[0][0] > bd[0][1] ? 0 : 1, low = hi ? 0 : 1, i = 0, l = bd.length; l > i; i++) bands.hiData.push([data[i][0], bd[i][hi]]), bands.lowData.push([data[i][0], bd[i][low]]);
            else {
                var intrv = bands.interval,
                    a = null,
                    b = null,
                    afunc = null,
                    bfunc = null;
                if ($.isArray(intrv) ? (a = intrv[0], b = intrv[1]) : a = intrv, isNaN(a) ? "%" === a.charAt(a.length - 1) && (afunc = "multiply", a = parseFloat(a) / 100 + 1) : (a = parseFloat(a), afunc = "add"), null !== b && isNaN(b) ? "%" === b.charAt(b.length - 1) && (bfunc = "multiply", b = parseFloat(b) / 100 + 1) : null !== b && (b = parseFloat(b), bfunc = "add"), null !== a) {
                    if (null === b && (b = -a, bfunc = afunc, "multiply" === bfunc && (b += 2)), b > a) {
                        var temp = a;
                        a = b, b = temp, temp = afunc, afunc = bfunc, bfunc = temp
                    }
                    for (var i = 0, l = data.length; l > i; i++) {
                        switch (afunc) {
                            case "add":
                                bands.hiData.push([data[i][0], data[i][1] + a]);
                                break;
                            case "multiply":
                                bands.hiData.push([data[i][0], data[i][1] * a])
                        }
                        switch (bfunc) {
                            case "add":
                                bands.lowData.push([data[i][0], data[i][1] + b]);
                                break;
                            case "multiply":
                                bands.lowData.push([data[i][0], data[i][1] * b])
                        }
                    }
                } else bands.show = !1
            }
            for (var hd = bands.hiData, ld = bands.lowData, i = 0, l = hd.length; l > i; i++)(null != hd[i][1] && hd[i][1] > bands._max || null == bands._max) && (bands._max = hd[i][1]);
            for (var i = 0, l = ld.length; l > i; i++)(null != ld[i][1] && ld[i][1] < bands._min || null == bands._min) && (bands._min = ld[i][1]);
            if (null === bands.fillColor) {
                var c = $.jqplot.getColorComponents(bands.color);
                c[3] = .5 * c[3], bands.fillColor = "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] + ")"
            }
        }, $.jqplot.LineRenderer.prototype.setGridData = function(plot) {
            var xp = this._xaxis.series_u2p,
                yp = this._yaxis.series_u2p,
                data = this._plotData,
                pdata = this._prevPlotData;
            this.gridData = [], this._prevGridData = [], this.renderer._smoothedData = [], this.renderer._smoothedPlotData = [], this.renderer._hiBandGridData = [], this.renderer._lowBandGridData = [], this.renderer._hiBandSmoothedData = [], this.renderer._lowBandSmoothedData = [];
            for (var bands = this.renderer.bands, hasNull = !1, i = 0, l = data.length; l > i; i++) null != data[i][0] && null != data[i][1] ? this.gridData.push([xp.call(this._xaxis, data[i][0]), yp.call(this._yaxis, data[i][1])]) : null == data[i][0] ? (hasNull = !0, this.gridData.push([null, yp.call(this._yaxis, data[i][1])])) : null == data[i][1] && (hasNull = !0, this.gridData.push([xp.call(this._xaxis, data[i][0]), null])), null != pdata[i] && null != pdata[i][0] && null != pdata[i][1] ? this._prevGridData.push([xp.call(this._xaxis, pdata[i][0]), yp.call(this._yaxis, pdata[i][1])]) : null != pdata[i] && null == pdata[i][0] ? this._prevGridData.push([null, yp.call(this._yaxis, pdata[i][1])]) : null != pdata[i] && null != pdata[i][0] && null == pdata[i][1] && this._prevGridData.push([xp.call(this._xaxis, pdata[i][0]), null]);
            if (hasNull && (this.renderer.smooth = !1, "line" === this._type && (bands.show = !1)), "line" === this._type && bands.show) {
                for (var i = 0, l = bands.hiData.length; l > i; i++) this.renderer._hiBandGridData.push([xp.call(this._xaxis, bands.hiData[i][0]), yp.call(this._yaxis, bands.hiData[i][1])]);
                for (var i = 0, l = bands.lowData.length; l > i; i++) this.renderer._lowBandGridData.push([xp.call(this._xaxis, bands.lowData[i][0]), yp.call(this._yaxis, bands.lowData[i][1])])
            }
            if ("line" === this._type && this.renderer.smooth && this.gridData.length > 2) {
                var ret;
                this.renderer.constrainSmoothing ? (ret = computeConstrainedSmoothedData.call(this, this.gridData), this.renderer._smoothedData = ret[0], this.renderer._smoothedPlotData = ret[1], bands.show && (ret = computeConstrainedSmoothedData.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = ret[0], ret = computeConstrainedSmoothedData.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = ret[0]), ret = null) : (ret = computeHermiteSmoothedData.call(this, this.gridData), this.renderer._smoothedData = ret[0], this.renderer._smoothedPlotData = ret[1], bands.show && (ret = computeHermiteSmoothedData.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = ret[0], ret = computeHermiteSmoothedData.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = ret[0]), ret = null)
            }
        }, $.jqplot.LineRenderer.prototype.makeGridData = function(data, plot) {
            var xp = this._xaxis.series_u2p,
                yp = this._yaxis.series_u2p,
                gd = [];
            this.renderer._smoothedData = [], this.renderer._smoothedPlotData = [], this.renderer._hiBandGridData = [], this.renderer._lowBandGridData = [], this.renderer._hiBandSmoothedData = [], this.renderer._lowBandSmoothedData = [];
            for (var bands = this.renderer.bands, hasNull = !1, i = 0; i < data.length; i++) null != data[i][0] && null != data[i][1] ? gd.push([xp.call(this._xaxis, data[i][0]), yp.call(this._yaxis, data[i][1])]) : null == data[i][0] ? (hasNull = !0, gd.push([null, yp.call(this._yaxis, data[i][1])])) : null == data[i][1] && (hasNull = !0, gd.push([xp.call(this._xaxis, data[i][0]), null]));
            if (hasNull && (this.renderer.smooth = !1, "line" === this._type && (bands.show = !1)), "line" === this._type && bands.show) {
                for (var i = 0, l = bands.hiData.length; l > i; i++) this.renderer._hiBandGridData.push([xp.call(this._xaxis, bands.hiData[i][0]), yp.call(this._yaxis, bands.hiData[i][1])]);
                for (var i = 0, l = bands.lowData.length; l > i; i++) this.renderer._lowBandGridData.push([xp.call(this._xaxis, bands.lowData[i][0]), yp.call(this._yaxis, bands.lowData[i][1])])
            }
            if ("line" === this._type && this.renderer.smooth && gd.length > 2) {
                var ret;
                this.renderer.constrainSmoothing ? (ret = computeConstrainedSmoothedData.call(this, gd), this.renderer._smoothedData = ret[0], this.renderer._smoothedPlotData = ret[1], bands.show && (ret = computeConstrainedSmoothedData.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = ret[0], ret = computeConstrainedSmoothedData.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = ret[0]), ret = null) : (ret = computeHermiteSmoothedData.call(this, gd), this.renderer._smoothedData = ret[0], this.renderer._smoothedPlotData = ret[1], bands.show && (ret = computeHermiteSmoothedData.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = ret[0], ret = computeHermiteSmoothedData.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = ret[0]), ret = null)
            }
            return gd
        }, $.jqplot.LineRenderer.prototype.draw = function(ctx, gd, options, plot) {
            var i, xmin, ymin, xmax, ymax, opts = $.extend(!0, {}, options),
                shadow = opts.shadow != undefined ? opts.shadow : this.shadow,
                showLine = opts.showLine != undefined ? opts.showLine : this.showLine,
                fill = opts.fill != undefined ? opts.fill : this.fill,
                fillAndStroke = opts.fillAndStroke != undefined ? opts.fillAndStroke : this.fillAndStroke;
            if (ctx.save(), gd.length) {
                if (showLine)
                    if (fill) {
                        if (this.fillToZero) {
                            var negativeColor = this.negativeColor;
                            this.useNegativeColors || (negativeColor = opts.fillStyle);
                            var isnegative = !1,
                                posfs = opts.fillStyle;
                            if (fillAndStroke) var fasgd = gd.slice(0);
                            if (0 != this.index && this._stack) {
                                for (var prev = this._prevGridData, i = prev.length; i > 0; i--) gd.push(prev[i - 1]);
                                shadow && this.renderer.shadowRenderer.draw(ctx, gd, opts), this._areaPoints = gd, this.renderer.shapeRenderer.draw(ctx, gd, opts)
                            } else {
                                var tempgd = [],
                                    pd = this.renderer.smooth ? this.renderer._smoothedPlotData : this._plotData;
                                this._areaPoints = [];
                                var pyzero = this._yaxis.series_u2p(this.fillToValue);
                                this._xaxis.series_u2p(this.fillToValue);
                                if (opts.closePath = !0, "y" == this.fillAxis) {
                                    tempgd.push([gd[0][0], pyzero]), this._areaPoints.push([gd[0][0], pyzero]);
                                    for (var i = 0; i < gd.length - 1; i++)
                                        if (tempgd.push(gd[i]), this._areaPoints.push(gd[i]), pd[i][1] * pd[i + 1][1] <= 0) {
                                            pd[i][1] < 0 ? (isnegative = !0, opts.fillStyle = negativeColor) : (isnegative = !1, opts.fillStyle = posfs);
                                            var xintercept = gd[i][0] + (gd[i + 1][0] - gd[i][0]) * (pyzero - gd[i][1]) / (gd[i + 1][1] - gd[i][1]);
                                            tempgd.push([xintercept, pyzero]), this._areaPoints.push([xintercept, pyzero]), shadow && this.renderer.shadowRenderer.draw(ctx, tempgd, opts), this.renderer.shapeRenderer.draw(ctx, tempgd, opts), tempgd = [
                                                [xintercept, pyzero]
                                            ]
                                        }
                                    pd[gd.length - 1][1] < 0 ? (isnegative = !0, opts.fillStyle = negativeColor) : (isnegative = !1, opts.fillStyle = posfs), tempgd.push(gd[gd.length - 1]), this._areaPoints.push(gd[gd.length - 1]), tempgd.push([gd[gd.length - 1][0], pyzero]), this._areaPoints.push([gd[gd.length - 1][0], pyzero])
                                }
                                shadow && this.renderer.shadowRenderer.draw(ctx, tempgd, opts), this.renderer.shapeRenderer.draw(ctx, tempgd, opts)
                            }
                        } else {
                            if (fillAndStroke) var fasgd = gd.slice(0);
                            if (0 != this.index && this._stack)
                                for (var prev = this._prevGridData, i = prev.length; i > 0; i--) gd.push(prev[i - 1]);
                            else {
                                var gridymin = ctx.canvas.height;
                                gd.unshift([gd[0][0], gridymin]);
                                var len = gd.length;
                                gd.push([gd[len - 1][0], gridymin])
                            }
                            this._areaPoints = gd, shadow && this.renderer.shadowRenderer.draw(ctx, gd, opts), this.renderer.shapeRenderer.draw(ctx, gd, opts)
                        }
                        if (fillAndStroke) {
                            var fasopts = $.extend(!0, {}, opts, {
                                fill: !1,
                                closePath: !1
                            });
                            if (this.renderer.shapeRenderer.draw(ctx, fasgd, fasopts), this.markerRenderer.show)
                                for (this.renderer.smooth && (fasgd = this.gridData), i = 0; i < fasgd.length; i++) this.markerRenderer.draw(fasgd[i][0], fasgd[i][1], ctx, opts.markerOptions)
                        }
                    } else {
                        if (this.renderer.bands.show) {
                            var bdat, bopts = $.extend(!0, {}, opts);
                            this.renderer.bands.showLines && (bdat = this.renderer.smooth ? this.renderer._hiBandSmoothedData : this.renderer._hiBandGridData, this.renderer.shapeRenderer.draw(ctx, bdat, opts), bdat = this.renderer.smooth ? this.renderer._lowBandSmoothedData : this.renderer._lowBandGridData, this.renderer.shapeRenderer.draw(ctx, bdat, bopts)), this.renderer.bands.fill && (bdat = this.renderer.smooth ? this.renderer._hiBandSmoothedData.concat(this.renderer._lowBandSmoothedData.reverse()) : this.renderer._hiBandGridData.concat(this.renderer._lowBandGridData.reverse()), this._areaPoints = bdat, bopts.closePath = !0, bopts.fill = !0, bopts.fillStyle = this.renderer.bands.fillColor, this.renderer.shapeRenderer.draw(ctx, bdat, bopts))
                        }
                        shadow && this.renderer.shadowRenderer.draw(ctx, gd, opts), this.renderer.shapeRenderer.draw(ctx, gd, opts)
                    }
                var xmin = xmax = ymin = ymax = null;
                for (i = 0; i < this._areaPoints.length; i++) {
                    var p = this._areaPoints[i];
                    (xmin > p[0] || null == xmin) && (xmin = p[0]), (ymax < p[1] || null == ymax) && (ymax = p[1]), (xmax < p[0] || null == xmax) && (xmax = p[0]), (ymin > p[1] || null == ymin) && (ymin = p[1])
                }
                if ("line" === this.type && this.renderer.bands.show && (ymax = this._yaxis.series_u2p(this.renderer.bands._min), ymin = this._yaxis.series_u2p(this.renderer.bands._max)), this._boundingBox = [
                        [xmin, ymax],
                        [xmax, ymin]
                    ], this.markerRenderer.show && !fill)
                    for (this.renderer.smooth && (gd = this.gridData), i = 0; i < gd.length; i++) null != gd[i][0] && null != gd[i][1] && this.markerRenderer.draw(gd[i][0], gd[i][1], ctx, opts.markerOptions)
            }
            ctx.restore()
        }, $.jqplot.LineRenderer.prototype.drawShadow = function(ctx, gd, options) {}, $.jqplot.LinearAxisRenderer = function() {}, $.jqplot.LinearAxisRenderer.prototype.init = function(options) {
            this.breakPoints = null, this.breakTickLabel = "&asymp;", this.drawBaseline = !0, this.baselineWidth = null, this.baselineColor = null, this.forceTickAt0 = !1, this.forceTickAt100 = !1, this.tickInset = 0, this.minorTicks = 0, this.alignTicks = !1, this._autoFormatString = "", this._overrideFormatString = !1, this._scalefact = 1, $.extend(!0, this, options), this.breakPoints && ($.isArray(this.breakPoints) ? (this.breakPoints.length < 2 || this.breakPoints[1] <= this.breakPoints[0]) && (this.breakPoints = null) : this.breakPoints = null), null != this.numberTicks && this.numberTicks < 2 && (this.numberTicks = 2), this.resetDataBounds()
        }, $.jqplot.LinearAxisRenderer.prototype.draw = function(ctx, plot) {
            if (this.show) {
                this.renderer.createTicks.call(this, plot);
                if (this._elem && (this._elem.emptyForce(), this._elem = null), this._elem = $(document.createElement("div")), this._elem.addClass("jqplot-axis jqplot-" + this.name), this._elem.css("position", "absolute"), "xaxis" == this.name || "x2axis" == this.name ? this._elem.width(this._plotDimensions.width) : this._elem.height(this._plotDimensions.height), this.labelOptions.axis = this.name, this._label = new this.labelRenderer(this.labelOptions), this._label.show) {
                    var elem = this._label.draw(ctx, plot);
                    elem.appendTo(this._elem), elem = null
                }
                for (var tick, t = this._ticks, i = 0; i < t.length; i++) tick = t[i], tick.show && tick.showLabel && (!tick.isMinorTick || this.showMinorTicks) && this._elem.append(tick.draw(ctx, plot));
                tick = null, t = null
            }
            return this._elem
        }, $.jqplot.LinearAxisRenderer.prototype.reset = function() {
            this.min = this._options.min, this.max = this._options.max, this.tickInterval = this._options.tickInterval, this.numberTicks = this._options.numberTicks, this._autoFormatString = "", this._overrideFormatString && this.tickOptions && this.tickOptions.formatString && (this.tickOptions.formatString = "")
        }, $.jqplot.LinearAxisRenderer.prototype.set = function() {
            var temp, dim = 0,
                w = 0,
                h = 0,
                lshow = null == this._label ? !1 : this._label.show;
            if (this.show) {
                for (var tick, t = this._ticks, i = 0; i < t.length; i++) tick = t[i], tick._breakTick || !tick.show || !tick.showLabel || tick.isMinorTick && !this.showMinorTicks || (temp = "xaxis" == this.name || "x2axis" == this.name ? tick._elem.outerHeight(!0) : tick._elem.outerWidth(!0), temp > dim && (dim = temp));
                tick = null, t = null, lshow && (w = this._label._elem.outerWidth(!0), h = this._label._elem.outerHeight(!0)), "xaxis" == this.name ? (dim += h, this._elem.css({
                    height: dim + "px",
                    left: "0px",
                    bottom: "0px"
                })) : "x2axis" == this.name ? (dim += h, this._elem.css({
                    height: dim + "px",
                    left: "0px",
                    top: "0px"
                })) : "yaxis" == this.name ? (dim += w, this._elem.css({
                    width: dim + "px",
                    left: "0px",
                    top: "0px"
                }), lshow && this._label.constructor == $.jqplot.AxisLabelRenderer && this._label._elem.css("width", w + "px")) : (dim += w, this._elem.css({
                    width: dim + "px",
                    right: "0px",
                    top: "0px"
                }), lshow && this._label.constructor == $.jqplot.AxisLabelRenderer && this._label._elem.css("width", w + "px"))
            }
        }, $.jqplot.LinearAxisRenderer.prototype.createTicks = function(plot) {
            var min, max, tt, i, ticks = this._ticks,
                userTicks = this.ticks,
                name = this.name,
                db = this._dataBounds,
                dim = "x" === this.name.charAt(0) ? this._plotDimensions.width : this._plotDimensions.height,
                userMin = this.min,
                userMax = this.max,
                userNT = this.numberTicks,
                userTI = this.tickInterval,
                threshold = 30;
            if (this._scalefact = (Math.max(dim, threshold + 1) - threshold) / 300, userTicks.length) {
                for (i = 0; i < userTicks.length; i++) {
                    var ut = userTicks[i],
                        t = new this.tickRenderer(this.tickOptions);
                    $.isArray(ut) ? (t.value = ut[0], this.breakPoints ? ut[0] == this.breakPoints[0] ? (t.label = this.breakTickLabel, t._breakTick = !0, t.showGridline = !1, t.showMark = !1) : ut[0] > this.breakPoints[0] && ut[0] <= this.breakPoints[1] ? (t.show = !1, t.showGridline = !1, t.label = ut[1]) : t.label = ut[1] : t.label = ut[1], t.setTick(ut[0], this.name), this._ticks.push(t)) : $.isPlainObject(ut) ? ($.extend(!0, t, ut), t.axis = this.name, this._ticks.push(t)) : (t.value = ut, this.breakPoints && (ut == this.breakPoints[0] ? (t.label = this.breakTickLabel, t._breakTick = !0, t.showGridline = !1, t.showMark = !1) : ut > this.breakPoints[0] && ut <= this.breakPoints[1] && (t.show = !1, t.showGridline = !1)), t.setTick(ut, this.name), this._ticks.push(t))
                }
                this.numberTicks = userTicks.length, this.min = this._ticks[0].value, this.max = this._ticks[this.numberTicks - 1].value, this.tickInterval = (this.max - this.min) / (this.numberTicks - 1)
            } else {
                dim = "xaxis" == name || "x2axis" == name ? this._plotDimensions.width : this._plotDimensions.height;
                var _numberTicks = this.numberTicks;
                this.alignTicks && ("x2axis" === this.name && plot.axes.xaxis.show ? _numberTicks = plot.axes.xaxis.numberTicks : "y" === this.name.charAt(0) && "yaxis" !== this.name && "yMidAxis" !== this.name && plot.axes.yaxis.show && (_numberTicks = plot.axes.yaxis.numberTicks)), min = null != this.min ? this.min : db.min, max = null != this.max ? this.max : db.max;
                var rmin, rmax, temp, range = max - min;
                if (null != this.tickOptions && this.tickOptions.formatString || (this._overrideFormatString = !0), null == this.min || null == this.max && null == this.tickInterval && !this.autoscale) {
                    this.forceTickAt0 && (min > 0 && (min = 0), 0 > max && (max = 0)), this.forceTickAt100 && (min > 100 && (min = 100), 100 > max && (max = 100));
                    var keepMin = !1,
                        keepMax = !1;
                    null != this.min ? keepMin = !0 : null != this.max && (keepMax = !0);
                    var ret = $.jqplot.LinearTickGenerator(min, max, this._scalefact, _numberTicks, keepMin, keepMax),
                        tumin = null != this.min ? min : min + range * (this.padMin - 1),
                        tumax = null != this.max ? max : max - range * (this.padMax - 1);
                    (tumin > min || max > tumax) && (tumin = null != this.min ? min : min - range * (this.padMin - 1), tumax = null != this.max ? max : max + range * (this.padMax - 1), ret = $.jqplot.LinearTickGenerator(tumin, tumax, this._scalefact, _numberTicks, keepMin, keepMax)), this.min = ret[0], this.max = ret[1], this.numberTicks = ret[2], this._autoFormatString = ret[3], this.tickInterval = ret[4]
                } else {
                    if (min == max) {
                        var adj = .05;
                        min > 0 && (adj = Math.max(Math.log(min) / Math.LN10, .05)), min -= adj, max += adj
                    }
                    if (this.autoscale && null == this.min && null == this.max) {
                        for (var rrange, ti, margin, forceMinZero = !1, forceZeroLine = !1, i = 0; i < this._series.length; i++) {
                            var s = this._series[i],
                                faname = "x" == s.fillAxis ? s._xaxis.name : s._yaxis.name;
                            if (this.name == faname) {
                                for (var vals = s._plotValues[s.fillAxis], vmin = vals[0], vmax = vals[0], j = 1; j < vals.length; j++) vals[j] < vmin ? vmin = vals[j] : vals[j] > vmax && (vmax = vals[j]);
                                var dp = (vmax - vmin) / vmax;
                                s.renderer.constructor == $.jqplot.BarRenderer ? vmin >= 0 && (s.fillToZero || dp > .1) ? forceMinZero = !0 : (forceMinZero = !1, forceZeroLine = !!(s.fill && s.fillToZero && 0 > vmin && vmax > 0)) : s.fill ? vmin >= 0 && (s.fillToZero || dp > .1) ? forceMinZero = !0 : 0 > vmin && vmax > 0 && s.fillToZero ? (forceMinZero = !1, forceZeroLine = !0) : (forceMinZero = !1, forceZeroLine = !1) : 0 > vmin && (forceMinZero = !1)
                            }
                        }
                        if (forceMinZero) this.numberTicks = 2 + Math.ceil((dim - (this.tickSpacing - 1)) / this.tickSpacing), this.min = 0, userMin = 0, ti = max / (this.numberTicks - 1), temp = Math.pow(10, Math.abs(Math.floor(Math.log(ti) / Math.LN10))), ti / temp == parseInt(ti / temp, 10) && (ti += temp), this.tickInterval = Math.ceil(ti / temp) * temp, this.max = this.tickInterval * (this.numberTicks - 1);
                        else if (forceZeroLine) {
                            this.numberTicks = 2 + Math.ceil((dim - (this.tickSpacing - 1)) / this.tickSpacing);
                            var ntmin = Math.ceil(Math.abs(min) / range * (this.numberTicks - 1)),
                                ntmax = this.numberTicks - 1 - ntmin;
                            ti = Math.max(Math.abs(min / ntmin), Math.abs(max / ntmax)), temp = Math.pow(10, Math.abs(Math.floor(Math.log(ti) / Math.LN10))), this.tickInterval = Math.ceil(ti / temp) * temp, this.max = this.tickInterval * ntmax, this.min = -this.tickInterval * ntmin
                        } else null == this.numberTicks && (this.tickInterval ? this.numberTicks = 3 + Math.ceil(range / this.tickInterval) : this.numberTicks = 2 + Math.ceil((dim - (this.tickSpacing - 1)) / this.tickSpacing)), null == this.tickInterval ? (ti = range / (this.numberTicks - 1), temp = 1 > ti ? Math.pow(10, Math.abs(Math.floor(Math.log(ti) / Math.LN10))) : 1, this.tickInterval = Math.ceil(ti * temp * this.pad) / temp) : temp = 1 / this.tickInterval, rrange = this.tickInterval * (this.numberTicks - 1), margin = (rrange - range) / 2, null == this.min && (this.min = Math.floor(temp * (min - margin)) / temp), null == this.max && (this.max = this.min + rrange);
                        var fstr, sf = $.jqplot.getSignificantFigures(this.tickInterval);
                        if (sf.digitsLeft >= sf.significantDigits) fstr = "%d";
                        else {
                            var temp = Math.max(0, 5 - sf.digitsLeft);
                            temp = Math.min(temp, sf.digitsRight), fstr = "%." + temp + "f"
                        }
                        this._autoFormatString = fstr
                    } else {
                        rmin = null != this.min ? this.min : min - range * (this.padMin - 1), rmax = null != this.max ? this.max : max + range * (this.padMax - 1), range = rmax - rmin, null == this.numberTicks && (null != this.tickInterval ? this.numberTicks = Math.ceil((rmax - rmin) / this.tickInterval) + 1 : dim > 100 ? this.numberTicks = parseInt(3 + (dim - 100) / 75, 10) : this.numberTicks = 2), null == this.tickInterval && (this.tickInterval = range / (this.numberTicks - 1)), null == this.max && (rmax = rmin + this.tickInterval * (this.numberTicks - 1)), null == this.min && (rmin = rmax - this.tickInterval * (this.numberTicks - 1));
                        var fstr, sf = $.jqplot.getSignificantFigures(this.tickInterval);
                        if (sf.digitsLeft >= sf.significantDigits) fstr = "%d";
                        else {
                            var temp = Math.max(0, 5 - sf.digitsLeft);
                            temp = Math.min(temp, sf.digitsRight), fstr = "%." + temp + "f"
                        }
                        this._autoFormatString = fstr, this.min = rmin, this.max = rmax
                    }
                    if (this.renderer.constructor == $.jqplot.LinearAxisRenderer && "" == this._autoFormatString) {
                        range = this.max - this.min;
                        var temptick = new this.tickRenderer(this.tickOptions),
                            fs = temptick.formatString || $.jqplot.config.defaultTickFormatString,
                            fs = fs.match($.jqplot.sprintf.regex)[0],
                            precision = 0;
                        if (fs) {
                            if (fs.search(/[fFeEgGpP]/) > -1) {
                                var m = fs.match(/\%\.(\d{0,})?[eEfFgGpP]/);
                                precision = m ? parseInt(m[1], 10) : 6
                            } else fs.search(/[di]/) > -1 && (precision = 0);
                            var fact = Math.pow(10, -precision);
                            if (this.tickInterval < fact && null == userNT && null == userTI)
                                if (this.tickInterval = fact, null == userMax && null == userMin) {
                                    this.min = Math.floor(this._dataBounds.min / fact) * fact, this.min == this._dataBounds.min && (this.min = this._dataBounds.min - this.tickInterval), this.max = Math.ceil(this._dataBounds.max / fact) * fact, this.max == this._dataBounds.max && (this.max = this._dataBounds.max + this.tickInterval);
                                    var n = (this.max - this.min) / this.tickInterval;
                                    n = n.toFixed(11), n = Math.ceil(n), this.numberTicks = n + 1
                                } else if (null == userMax) {
                                    var n = (this._dataBounds.max - this.min) / this.tickInterval;
                                    n = n.toFixed(11), this.numberTicks = Math.ceil(n) + 2, this.max = this.min + this.tickInterval * (this.numberTicks - 1)
                                } else if (null == userMin) {
                                    var n = (this.max - this._dataBounds.min) / this.tickInterval;
                                    n = n.toFixed(11), this.numberTicks = Math.ceil(n) + 2, this.min = this.max - this.tickInterval * (this.numberTicks - 1)
                                } else this.numberTicks = Math.ceil((userMax - userMin) / this.tickInterval) + 1, this.min = Math.floor(userMin * Math.pow(10, precision)) / Math.pow(10, precision), this.max = Math.ceil(userMax * Math.pow(10, precision)) / Math.pow(10, precision), this.numberTicks = Math.ceil((this.max - this.min) / this.tickInterval) + 1
                        }
                    }
                }
                this._overrideFormatString && "" != this._autoFormatString && (this.tickOptions = this.tickOptions || {}, this.tickOptions.formatString = this._autoFormatString);
                for (var t, to, i = 0; i < this.numberTicks; i++) {
                    if (tt = this.min + i * this.tickInterval, t = new this.tickRenderer(this.tickOptions), t.setTick(tt, this.name), this._ticks.push(t), i < this.numberTicks - 1)
                        for (var j = 0; j < this.minorTicks; j++) tt += this.tickInterval / (this.minorTicks + 1), to = $.extend(!0, {}, this.tickOptions, {
                            name: this.name,
                            value: tt,
                            label: "",
                            isMinorTick: !0
                        }), t = new this.tickRenderer(to), this._ticks.push(t);
                    t = null
                }
            }
            this.tickInset && (this.min = this.min - this.tickInset * this.tickInterval, this.max = this.max + this.tickInset * this.tickInterval), ticks = null
        }, $.jqplot.LinearAxisRenderer.prototype.resetTickValues = function(opts) {
            if ($.isArray(opts) && opts.length == this._ticks.length) {
                for (var t, i = 0; i < opts.length; i++) t = this._ticks[i], t.value = opts[i], t.label = t.formatter(t.formatString, opts[i]), t.label = t.prefix + t.label, t._elem.html(t.label);
                t = null, this.min = $.jqplot.arrayMin(opts), this.max = $.jqplot.arrayMax(opts), this.pack()
            }
        }, $.jqplot.LinearAxisRenderer.prototype.pack = function(pos, offsets) {
            pos = pos || {}, offsets = offsets || this._offsets;
            var ticks = this._ticks,
                max = this.max,
                min = this.min,
                offmax = offsets.max,
                offmin = offsets.min,
                lshow = null == this._label ? !1 : this._label.show;
            for (var p in pos) this._elem.css(p, pos[p]);
            this._offsets = offsets;
            var pixellength = offmax - offmin,
                unitlength = max - min;
            if (this.breakPoints ? (unitlength = unitlength - this.breakPoints[1] + this.breakPoints[0], this.p2u = function(p) {
                    return (p - offmin) * unitlength / pixellength + min
                }, this.u2p = function(u) {
                    return u > this.breakPoints[0] && u < this.breakPoints[1] && (u = this.breakPoints[0]), u <= this.breakPoints[0] ? (u - min) * pixellength / unitlength + offmin : (u - this.breakPoints[1] + this.breakPoints[0] - min) * pixellength / unitlength + offmin
                }, "x" == this.name.charAt(0) ? (this.series_u2p = function(u) {
                    return u > this.breakPoints[0] && u < this.breakPoints[1] && (u = this.breakPoints[0]), u <= this.breakPoints[0] ? (u - min) * pixellength / unitlength : (u - this.breakPoints[1] + this.breakPoints[0] - min) * pixellength / unitlength
                }, this.series_p2u = function(p) {
                    return p * unitlength / pixellength + min
                }) : (this.series_u2p = function(u) {
                    return u > this.breakPoints[0] && u < this.breakPoints[1] && (u = this.breakPoints[0]), u >= this.breakPoints[1] ? (u - max) * pixellength / unitlength : (u + this.breakPoints[1] - this.breakPoints[0] - max) * pixellength / unitlength
                }, this.series_p2u = function(p) {
                    return p * unitlength / pixellength + max
                })) : (this.p2u = function(p) {
                    return (p - offmin) * unitlength / pixellength + min
                }, this.u2p = function(u) {
                    return (u - min) * pixellength / unitlength + offmin
                }, "xaxis" == this.name || "x2axis" == this.name ? (this.series_u2p = function(u) {
                    return (u - min) * pixellength / unitlength
                }, this.series_p2u = function(p) {
                    return p * unitlength / pixellength + min
                }) : (this.series_u2p = function(u) {
                    return (u - max) * pixellength / unitlength
                }, this.series_p2u = function(p) {
                    return p * unitlength / pixellength + max
                })), this.show)
                if ("xaxis" == this.name || "x2axis" == this.name) {
                    for (var i = 0; i < ticks.length; i++) {
                        var t = ticks[i];
                        if (t.show && t.showLabel) {
                            var shim;
                            if (t.constructor == $.jqplot.CanvasAxisTickRenderer && t.angle) {
                                var temp = "xaxis" == this.name ? 1 : -1;
                                switch (t.labelPosition) {
                                    case "auto":
                                        shim = temp * t.angle < 0 ? -t.getWidth() + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2 : -t._textRenderer.height * Math.sin(t._textRenderer.angle) / 2;
                                        break;
                                    case "end":
                                        shim = -t.getWidth() + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2;
                                        break;
                                    case "start":
                                        shim = -t._textRenderer.height * Math.sin(t._textRenderer.angle) / 2;
                                        break;
                                    case "middle":
                                        shim = -t.getWidth() / 2 + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2;
                                        break;
                                    default:
                                        shim = -t.getWidth() / 2 + t._textRenderer.height * Math.sin(-t._textRenderer.angle) / 2
                                }
                            } else shim = -t.getWidth() / 2;
                            var val = this.u2p(t.value) + shim + "px";
                            t._elem.css("left", val), t.pack()
                        }
                    }
                    if (lshow) {
                        var w = this._label._elem.outerWidth(!0);
                        this._label._elem.css("left", offmin + pixellength / 2 - w / 2 + "px"), "xaxis" == this.name ? this._label._elem.css("bottom", "0px") : this._label._elem.css("top", "0px"), this._label.pack()
                    }
                } else {
                    for (var i = 0; i < ticks.length; i++) {
                        var t = ticks[i];
                        if (t.show && t.showLabel) {
                            var shim;
                            if (t.constructor == $.jqplot.CanvasAxisTickRenderer && t.angle) {
                                var temp = "yaxis" == this.name ? 1 : -1;
                                switch (t.labelPosition) {
                                    case "auto":
                                    case "end":
                                        shim = temp * t.angle < 0 ? -t._textRenderer.height * Math.cos(-t._textRenderer.angle) / 2 : -t.getHeight() + t._textRenderer.height * Math.cos(t._textRenderer.angle) / 2;
                                        break;
                                    case "start":
                                        shim = t.angle > 0 ? -t._textRenderer.height * Math.cos(-t._textRenderer.angle) / 2 : -t.getHeight() + t._textRenderer.height * Math.cos(t._textRenderer.angle) / 2;
                                        break;
                                    case "middle":
                                        shim = -t.getHeight() / 2;
                                        break;
                                    default:
                                        shim = -t.getHeight() / 2
                                }
                            } else shim = -t.getHeight() / 2;
                            var val = this.u2p(t.value) + shim + "px";
                            t._elem.css("top", val), t.pack()
                        }
                    }
                    if (lshow) {
                        var h = this._label._elem.outerHeight(!0);
                        this._label._elem.css("top", offmax - pixellength / 2 - h / 2 + "px"), "yaxis" == this.name ? this._label._elem.css("left", "0px") : this._label._elem.css("right", "0px"), this._label.pack()
                    }
                }
            ticks = null
        };
        $.jqplot.LinearTickGenerator = function(axis_min, axis_max, scalefact, numberTicks, keepMin, keepMax) {
            if (keepMin = null === keepMin ? !1 : keepMin, keepMax = null === keepMax || keepMin ? !1 : keepMax, axis_min === axis_max && (axis_max = axis_max ? 0 : 1), scalefact = scalefact || 1, axis_min > axis_max) {
                var a = axis_max;
                axis_max = axis_min, axis_min = a
            }
            var r = [],
                ss = bestLinearInterval(axis_max - axis_min, scalefact),
                gsf = $.jqplot.getSignificantFigures;
            if (null == numberTicks)
                if (keepMin || keepMax) {
                    if (keepMin) {
                        r[0] = axis_min, r[2] = Math.ceil((axis_max - axis_min) / ss + 1), r[1] = axis_min + (r[2] - 1) * ss;
                        var digitsMin = gsf(axis_min).digitsRight,
                            digitsSS = gsf(ss).digitsRight;
                        digitsSS > digitsMin ? r[3] = bestFormatString(ss) : r[3] = "%." + digitsMin + "f", r[4] = ss
                    } else if (keepMax) {
                        r[1] = axis_max, r[2] = Math.ceil((axis_max - axis_min) / ss + 1), r[0] = axis_max - (r[2] - 1) * ss;
                        var digitsMax = gsf(axis_max).digitsRight,
                            digitsSS = gsf(ss).digitsRight;
                        digitsSS > digitsMax ? r[3] = bestFormatString(ss) : r[3] = "%." + digitsMax + "f", r[4] = ss
                    }
                } else r[0] = Math.floor(axis_min / ss) * ss, r[1] = Math.ceil(axis_max / ss) * ss, r[2] = Math.round((r[1] - r[0]) / ss + 1), r[3] = bestFormatString(ss), r[4] = ss;
            else {
                var tempr = [];
                if (tempr[0] = Math.floor(axis_min / ss) * ss, tempr[1] = Math.ceil(axis_max / ss) * ss, tempr[2] = Math.round((tempr[1] - tempr[0]) / ss + 1), tempr[3] = bestFormatString(ss), tempr[4] = ss, tempr[2] === numberTicks) r = tempr;
                else {
                    var newti = bestInterval(tempr[1] - tempr[0], numberTicks);
                    r[0] = tempr[0], r[2] = numberTicks, r[4] = newti, r[3] = bestFormatString(newti), r[1] = r[0] + (r[2] - 1) * r[4]
                }
            }
            return r
        }, $.jqplot.LinearTickGenerator.bestLinearInterval = bestLinearInterval, $.jqplot.LinearTickGenerator.bestInterval = bestInterval, $.jqplot.LinearTickGenerator.bestLinearComponents = bestLinearComponents, $.jqplot.LinearTickGenerator.bestConstrainedInterval = bestConstrainedInterval, $.jqplot.MarkerRenderer = function(options) {
            this.show = !0, this.style = "filledCircle", this.lineWidth = 2, this.size = 9, this.color = "#666666", this.shadow = !0, this.shadowAngle = 45, this.shadowOffset = 1, this.shadowDepth = 3, this.shadowAlpha = "0.07", this.shadowRenderer = new $.jqplot.ShadowRenderer, this.shapeRenderer = new $.jqplot.ShapeRenderer, $.extend(!0, this, options)
        }, $.jqplot.MarkerRenderer.prototype.init = function(options) {
            $.extend(!0, this, options);
            var sdopt = {
                angle: this.shadowAngle,
                offset: this.shadowOffset,
                alpha: this.shadowAlpha,
                lineWidth: this.lineWidth,
                depth: this.shadowDepth,
                closePath: !0
            }; - 1 != this.style.indexOf("filled") && (sdopt.fill = !0), -1 != this.style.indexOf("ircle") && (sdopt.isarc = !0,
                sdopt.closePath = !1), this.shadowRenderer.init(sdopt);
            var shopt = {
                fill: !1,
                isarc: !1,
                strokeStyle: this.color,
                fillStyle: this.color,
                lineWidth: this.lineWidth,
                closePath: !0
            }; - 1 != this.style.indexOf("filled") && (shopt.fill = !0), -1 != this.style.indexOf("ircle") && (shopt.isarc = !0, shopt.closePath = !1), this.shapeRenderer.init(shopt)
        }, $.jqplot.MarkerRenderer.prototype.drawDiamond = function(x, y, ctx, fill, options) {
            var stretch = 1.2,
                dx = this.size / 2 / stretch,
                dy = this.size / 2 * stretch,
                points = [
                    [x - dx, y],
                    [x, y + dy],
                    [x + dx, y],
                    [x, y - dy]
                ];
            this.shadow && this.shadowRenderer.draw(ctx, points), this.shapeRenderer.draw(ctx, points, options)
        }, $.jqplot.MarkerRenderer.prototype.drawPlus = function(x, y, ctx, fill, options) {
            var stretch = 1,
                dx = this.size / 2 * stretch,
                dy = this.size / 2 * stretch,
                points1 = [
                    [x, y - dy],
                    [x, y + dy]
                ],
                points2 = [
                    [x + dx, y],
                    [x - dx, y]
                ],
                opts = $.extend(!0, {}, this.options, {
                    closePath: !1
                });
            this.shadow && (this.shadowRenderer.draw(ctx, points1, {
                closePath: !1
            }), this.shadowRenderer.draw(ctx, points2, {
                closePath: !1
            })), this.shapeRenderer.draw(ctx, points1, opts), this.shapeRenderer.draw(ctx, points2, opts)
        }, $.jqplot.MarkerRenderer.prototype.drawX = function(x, y, ctx, fill, options) {
            var stretch = 1,
                dx = this.size / 2 * stretch,
                dy = this.size / 2 * stretch,
                opts = $.extend(!0, {}, this.options, {
                    closePath: !1
                }),
                points1 = [
                    [x - dx, y - dy],
                    [x + dx, y + dy]
                ],
                points2 = [
                    [x - dx, y + dy],
                    [x + dx, y - dy]
                ];
            this.shadow && (this.shadowRenderer.draw(ctx, points1, {
                closePath: !1
            }), this.shadowRenderer.draw(ctx, points2, {
                closePath: !1
            })), this.shapeRenderer.draw(ctx, points1, opts), this.shapeRenderer.draw(ctx, points2, opts)
        }, $.jqplot.MarkerRenderer.prototype.drawDash = function(x, y, ctx, fill, options) {
            var stretch = 1,
                dx = this.size / 2 * stretch,
                points = (this.size / 2 * stretch, [
                    [x - dx, y],
                    [x + dx, y]
                ]);
            this.shadow && this.shadowRenderer.draw(ctx, points), this.shapeRenderer.draw(ctx, points, options)
        }, $.jqplot.MarkerRenderer.prototype.drawLine = function(p1, p2, ctx, fill, options) {
            var points = [p1, p2];
            this.shadow && this.shadowRenderer.draw(ctx, points), this.shapeRenderer.draw(ctx, points, options)
        }, $.jqplot.MarkerRenderer.prototype.drawSquare = function(x, y, ctx, fill, options) {
            var stretch = 1,
                dx = this.size / 2 / stretch,
                dy = this.size / 2 * stretch,
                points = [
                    [x - dx, y - dy],
                    [x - dx, y + dy],
                    [x + dx, y + dy],
                    [x + dx, y - dy]
                ];
            this.shadow && this.shadowRenderer.draw(ctx, points), this.shapeRenderer.draw(ctx, points, options)
        }, $.jqplot.MarkerRenderer.prototype.drawCircle = function(x, y, ctx, fill, options) {
            var radius = this.size / 2,
                end = 2 * Math.PI,
                points = [x, y, radius, 0, end, !0];
            this.shadow && this.shadowRenderer.draw(ctx, points), this.shapeRenderer.draw(ctx, points, options)
        }, $.jqplot.MarkerRenderer.prototype.draw = function(x, y, ctx, options) {
            if (options = options || {}, null == options.show || 0 != options.show) switch (options.color && !options.fillStyle && (options.fillStyle = options.color), options.color && !options.strokeStyle && (options.strokeStyle = options.color), this.style) {
                case "diamond":
                    this.drawDiamond(x, y, ctx, !1, options);
                    break;
                case "filledDiamond":
                    this.drawDiamond(x, y, ctx, !0, options);
                    break;
                case "circle":
                    this.drawCircle(x, y, ctx, !1, options);
                    break;
                case "filledCircle":
                    this.drawCircle(x, y, ctx, !0, options);
                    break;
                case "square":
                    this.drawSquare(x, y, ctx, !1, options);
                    break;
                case "filledSquare":
                    this.drawSquare(x, y, ctx, !0, options);
                    break;
                case "x":
                    this.drawX(x, y, ctx, !0, options);
                    break;
                case "plus":
                    this.drawPlus(x, y, ctx, !0, options);
                    break;
                case "dash":
                    this.drawDash(x, y, ctx, !0, options);
                    break;
                case "line":
                    this.drawLine(x, y, ctx, !1, options);
                    break;
                default:
                    this.drawDiamond(x, y, ctx, !1, options)
            }
        }, $.jqplot.ShadowRenderer = function(options) {
            this.angle = 45, this.offset = 1, this.alpha = .07, this.lineWidth = 1.5, this.lineJoin = "miter", this.lineCap = "round", this.closePath = !1, this.fill = !1, this.depth = 3, this.strokeStyle = "rgba(0,0,0,0.1)", this.isarc = !1, $.extend(!0, this, options)
        }, $.jqplot.ShadowRenderer.prototype.init = function(options) {
            $.extend(!0, this, options)
        }, $.jqplot.ShadowRenderer.prototype.draw = function(ctx, points, options) {
            ctx.save();
            var opts = null != options ? options : {},
                fill = null != opts.fill ? opts.fill : this.fill,
                fillRect = null != opts.fillRect ? opts.fillRect : this.fillRect,
                closePath = null != opts.closePath ? opts.closePath : this.closePath,
                offset = null != opts.offset ? opts.offset : this.offset,
                alpha = null != opts.alpha ? opts.alpha : this.alpha,
                depth = null != opts.depth ? opts.depth : this.depth,
                isarc = null != opts.isarc ? opts.isarc : this.isarc,
                linePattern = null != opts.linePattern ? opts.linePattern : this.linePattern;
            ctx.lineWidth = null != opts.lineWidth ? opts.lineWidth : this.lineWidth, ctx.lineJoin = null != opts.lineJoin ? opts.lineJoin : this.lineJoin, ctx.lineCap = null != opts.lineCap ? opts.lineCap : this.lineCap, ctx.strokeStyle = opts.strokeStyle || this.strokeStyle || "rgba(0,0,0," + alpha + ")", ctx.fillStyle = opts.fillStyle || this.fillStyle || "rgba(0,0,0," + alpha + ")";
            for (var j = 0; depth > j; j++) {
                var ctxPattern = $.jqplot.LinePattern(ctx, linePattern);
                if (ctx.translate(Math.cos(this.angle * Math.PI / 180) * offset, Math.sin(this.angle * Math.PI / 180) * offset), ctxPattern.beginPath(), isarc) ctx.arc(points[0], points[1], points[2], points[3], points[4], !0);
                else if (fillRect) fillRect && ctx.fillRect(points[0], points[1], points[2], points[3]);
                else if (points && points.length)
                    for (var move = !0, i = 0; i < points.length; i++) null != points[i][0] && null != points[i][1] ? move ? (ctxPattern.moveTo(points[i][0], points[i][1]), move = !1) : ctxPattern.lineTo(points[i][0], points[i][1]) : move = !0;
                closePath && ctxPattern.closePath(), fill ? ctx.fill() : ctx.stroke()
            }
            ctx.restore()
        }, $.jqplot.ShapeRenderer = function(options) {
            this.lineWidth = 1.5, this.linePattern = "solid", this.lineJoin = "miter", this.lineCap = "round", this.closePath = !1, this.fill = !1, this.isarc = !1, this.fillRect = !1, this.strokeRect = !1, this.clearRect = !1, this.strokeStyle = "#999999", this.fillStyle = "#999999", $.extend(!0, this, options)
        }, $.jqplot.ShapeRenderer.prototype.init = function(options) {
            $.extend(!0, this, options)
        }, $.jqplot.ShapeRenderer.prototype.draw = function(ctx, points, options) {
            ctx.save();
            var opts = null != options ? options : {},
                fill = null != opts.fill ? opts.fill : this.fill,
                closePath = null != opts.closePath ? opts.closePath : this.closePath,
                fillRect = null != opts.fillRect ? opts.fillRect : this.fillRect,
                strokeRect = null != opts.strokeRect ? opts.strokeRect : this.strokeRect,
                clearRect = null != opts.clearRect ? opts.clearRect : this.clearRect,
                isarc = null != opts.isarc ? opts.isarc : this.isarc,
                linePattern = null != opts.linePattern ? opts.linePattern : this.linePattern,
                ctxPattern = $.jqplot.LinePattern(ctx, linePattern);
            if (ctx.lineWidth = opts.lineWidth || this.lineWidth, ctx.lineJoin = opts.lineJoin || this.lineJoin, ctx.lineCap = opts.lineCap || this.lineCap, ctx.strokeStyle = opts.strokeStyle || opts.color || this.strokeStyle, ctx.fillStyle = opts.fillStyle || this.fillStyle, ctx.beginPath(), isarc) return ctx.arc(points[0], points[1], points[2], points[3], points[4], !0), closePath && ctx.closePath(), fill ? ctx.fill() : ctx.stroke(), void ctx.restore();
            if (clearRect) return ctx.clearRect(points[0], points[1], points[2], points[3]), void ctx.restore();
            if (fillRect || strokeRect) {
                if (fillRect && ctx.fillRect(points[0], points[1], points[2], points[3]), strokeRect) return ctx.strokeRect(points[0], points[1], points[2], points[3]), void ctx.restore()
            } else if (points && points.length) {
                for (var move = !0, i = 0; i < points.length; i++) null != points[i][0] && null != points[i][1] ? move ? (ctxPattern.moveTo(points[i][0], points[i][1]), move = !1) : ctxPattern.lineTo(points[i][0], points[i][1]) : move = !0;
                closePath && ctxPattern.closePath(), fill ? ctx.fill() : ctx.stroke()
            }
            ctx.restore()
        }, $.jqplot.TableLegendRenderer = function() {}, $.jqplot.TableLegendRenderer.prototype.init = function(options) {
            $.extend(!0, this, options)
        }, $.jqplot.TableLegendRenderer.prototype.addrow = function(label, color, pad, reverse) {
            var tr, td, elem, div0, div1, rs = pad ? this.rowSpacing + "px" : "0px";
            elem = document.createElement("tr"), tr = $(elem), tr.addClass("jqplot-table-legend"), elem = null, reverse ? tr.prependTo(this._elem) : tr.appendTo(this._elem), this.showSwatches && (td = $(document.createElement("td")), td.addClass("jqplot-table-legend jqplot-table-legend-swatch"), td.css({
                textAlign: "center",
                paddingTop: rs
            }), div0 = $(document.createElement("div")), div0.addClass("jqplot-table-legend-swatch-outline"), div1 = $(document.createElement("div")), div1.addClass("jqplot-table-legend-swatch"), div1.css({
                backgroundColor: color,
                borderColor: color
            }), tr.append(td.append(div0.append(div1)))), this.showLabels && (td = $(document.createElement("td")), td.addClass("jqplot-table-legend jqplot-table-legend-label"), td.css("paddingTop", rs), tr.append(td), this.escapeHtml ? td.text(label) : td.html(label)), td = null, div0 = null, div1 = null, tr = null, elem = null
        }, $.jqplot.TableLegendRenderer.prototype.draw = function() {
            if (this._elem && (this._elem.emptyForce(), this._elem = null), this.show) {
                var series = this._series,
                    elem = document.createElement("table");
                this._elem = $(elem), this._elem.addClass("jqplot-table-legend");
                var ss = {
                    position: "absolute"
                };
                this.background && (ss.background = this.background), this.border && (ss.border = this.border), this.fontSize && (ss.fontSize = this.fontSize), this.fontFamily && (ss.fontFamily = this.fontFamily), this.textColor && (ss.textColor = this.textColor), null != this.marginTop && (ss.marginTop = this.marginTop), null != this.marginBottom && (ss.marginBottom = this.marginBottom), null != this.marginLeft && (ss.marginLeft = this.marginLeft), null != this.marginRight && (ss.marginRight = this.marginRight);
                for (var s, pad = !1, reverse = !1, i = 0; i < series.length; i++)
                    if (s = series[i], (s._stack || s.renderer.constructor == $.jqplot.BezierCurveRenderer) && (reverse = !0), s.show && s.showLabel) {
                        var lt = this.labels[i] || s.label.toString();
                        if (lt) {
                            var color = s.color;
                            reverse && i < series.length - 1 ? pad = !0 : reverse && i == series.length - 1 && (pad = !1), this.renderer.addrow.call(this, lt, color, pad, reverse), pad = !0
                        }
                        for (var j = 0; j < $.jqplot.addLegendRowHooks.length; j++) {
                            var item = $.jqplot.addLegendRowHooks[j].call(this, s);
                            item && (this.renderer.addrow.call(this, item.label, item.color, pad), pad = !0)
                        }
                        lt = null
                    }
            }
            return this._elem
        }, $.jqplot.TableLegendRenderer.prototype.pack = function(offsets) {
            if (this.show)
                if ("insideGrid" == this.placement) switch (this.location) {
                    case "nw":
                        var a = offsets.left,
                            b = offsets.top;
                        this._elem.css("left", a), this._elem.css("top", b);
                        break;
                    case "n":
                        var a = (offsets.left + (this._plotDimensions.width - offsets.right)) / 2 - this.getWidth() / 2,
                            b = offsets.top;
                        this._elem.css("left", a), this._elem.css("top", b);
                        break;
                    case "ne":
                        var a = offsets.right,
                            b = offsets.top;
                        this._elem.css({
                            right: a,
                            top: b
                        });
                        break;
                    case "e":
                        var a = offsets.right,
                            b = (offsets.top + (this._plotDimensions.height - offsets.bottom)) / 2 - this.getHeight() / 2;
                        this._elem.css({
                            right: a,
                            top: b
                        });
                        break;
                    case "se":
                        var a = offsets.right,
                            b = offsets.bottom;
                        this._elem.css({
                            right: a,
                            bottom: b
                        });
                        break;
                    case "s":
                        var a = (offsets.left + (this._plotDimensions.width - offsets.right)) / 2 - this.getWidth() / 2,
                            b = offsets.bottom;
                        this._elem.css({
                            left: a,
                            bottom: b
                        });
                        break;
                    case "sw":
                        var a = offsets.left,
                            b = offsets.bottom;
                        this._elem.css({
                            left: a,
                            bottom: b
                        });
                        break;
                    case "w":
                        var a = offsets.left,
                            b = (offsets.top + (this._plotDimensions.height - offsets.bottom)) / 2 - this.getHeight() / 2;
                        this._elem.css({
                            left: a,
                            top: b
                        });
                        break;
                    default:
                        var a = offsets.right,
                            b = offsets.bottom;
                        this._elem.css({
                            right: a,
                            bottom: b
                        })
                } else if ("outside" == this.placement) switch (this.location) {
                    case "nw":
                        var a = this._plotDimensions.width - offsets.left,
                            b = offsets.top;
                        this._elem.css("right", a), this._elem.css("top", b);
                        break;
                    case "n":
                        var a = (offsets.left + (this._plotDimensions.width - offsets.right)) / 2 - this.getWidth() / 2,
                            b = this._plotDimensions.height - offsets.top;
                        this._elem.css("left", a), this._elem.css("bottom", b);
                        break;
                    case "ne":
                        var a = this._plotDimensions.width - offsets.right,
                            b = offsets.top;
                        this._elem.css({
                            left: a,
                            top: b
                        });
                        break;
                    case "e":
                        var a = this._plotDimensions.width - offsets.right,
                            b = (offsets.top + (this._plotDimensions.height - offsets.bottom)) / 2 - this.getHeight() / 2;
                        this._elem.css({
                            left: a,
                            top: b
                        });
                        break;
                    case "se":
                        var a = this._plotDimensions.width - offsets.right,
                            b = offsets.bottom;
                        this._elem.css({
                            left: a,
                            bottom: b
                        });
                        break;
                    case "s":
                        var a = (offsets.left + (this._plotDimensions.width - offsets.right)) / 2 - this.getWidth() / 2,
                            b = this._plotDimensions.height - offsets.bottom;
                        this._elem.css({
                            left: a,
                            top: b
                        });
                        break;
                    case "sw":
                        var a = this._plotDimensions.width - offsets.left,
                            b = offsets.bottom;
                        this._elem.css({
                            right: a,
                            bottom: b
                        });
                        break;
                    case "w":
                        var a = this._plotDimensions.width - offsets.left,
                            b = (offsets.top + (this._plotDimensions.height - offsets.bottom)) / 2 - this.getHeight() / 2;
                        this._elem.css({
                            right: a,
                            top: b
                        });
                        break;
                    default:
                        var a = offsets.right,
                            b = offsets.bottom;
                        this._elem.css({
                            right: a,
                            bottom: b
                        })
                } else switch (this.location) {
                    case "nw":
                        this._elem.css({
                            left: 0,
                            top: offsets.top
                        });
                        break;
                    case "n":
                        var a = (offsets.left + (this._plotDimensions.width - offsets.right)) / 2 - this.getWidth() / 2;
                        this._elem.css({
                            left: a,
                            top: offsets.top
                        });
                        break;
                    case "ne":
                        this._elem.css({
                            right: 0,
                            top: offsets.top
                        });
                        break;
                    case "e":
                        var b = (offsets.top + (this._plotDimensions.height - offsets.bottom)) / 2 - this.getHeight() / 2;
                        this._elem.css({
                            right: offsets.right,
                            top: b
                        });
                        break;
                    case "se":
                        this._elem.css({
                            right: offsets.right,
                            bottom: offsets.bottom
                        });
                        break;
                    case "s":
                        var a = (offsets.left + (this._plotDimensions.width - offsets.right)) / 2 - this.getWidth() / 2;
                        this._elem.css({
                            left: a,
                            bottom: offsets.bottom
                        });
                        break;
                    case "sw":
                        this._elem.css({
                            left: offsets.left,
                            bottom: offsets.bottom
                        });
                        break;
                    case "w":
                        var b = (offsets.top + (this._plotDimensions.height - offsets.bottom)) / 2 - this.getHeight() / 2;
                        this._elem.css({
                            left: offsets.left,
                            top: b
                        });
                        break;
                    default:
                        this._elem.css({
                            right: offsets.right,
                            bottom: offsets.bottom
                        })
                }
        }, $.jqplot.ThemeEngine = function() {
            this.themes = {}, this.activeTheme = null
        }, $.jqplot.ThemeEngine.prototype.init = function() {
            var n, i, nn, th = new $.jqplot.Theme({
                _name: "Default"
            });
            for (n in th.target) "textColor" == n ? th.target[n] = this.target.css("color") : th.target[n] = this.target.css(n);
            if (this.title.show && this.title._elem)
                for (n in th.title) "textColor" == n ? th.title[n] = this.title._elem.css("color") : th.title[n] = this.title._elem.css(n);
            for (n in th.grid) th.grid[n] = this.grid[n];
            if (null == th.grid.backgroundColor && null != this.grid.background && (th.grid.backgroundColor = this.grid.background), this.legend.show && this.legend._elem)
                for (n in th.legend) "textColor" == n ? th.legend[n] = this.legend._elem.css("color") : th.legend[n] = this.legend._elem.css(n);
            var s;
            for (i = 0; i < this.series.length; i++) {
                s = this.series[i], s.renderer.constructor == $.jqplot.LineRenderer ? th.series.push(new LineSeriesProperties) : s.renderer.constructor == $.jqplot.BarRenderer ? th.series.push(new BarSeriesProperties) : s.renderer.constructor == $.jqplot.PieRenderer ? th.series.push(new PieSeriesProperties) : s.renderer.constructor == $.jqplot.DonutRenderer ? th.series.push(new DonutSeriesProperties) : s.renderer.constructor == $.jqplot.FunnelRenderer ? th.series.push(new FunnelSeriesProperties) : s.renderer.constructor == $.jqplot.MeterGaugeRenderer ? th.series.push(new MeterSeriesProperties) : th.series.push({});
                for (n in th.series[i]) th.series[i][n] = s[n]
            }
            var a, ax;
            for (n in this.axes) {
                if (ax = this.axes[n], a = th.axes[n] = new AxisProperties, a.borderColor = ax.borderColor, a.borderWidth = ax.borderWidth, ax._ticks && ax._ticks[0])
                    for (nn in a.ticks) ax._ticks[0].hasOwnProperty(nn) ? a.ticks[nn] = ax._ticks[0][nn] : ax._ticks[0]._elem && (a.ticks[nn] = ax._ticks[0]._elem.css(nn));
                if (ax._label && ax._label.show)
                    for (nn in a.label) ax._label[nn] ? a.label[nn] = ax._label[nn] : ax._label._elem && ("textColor" == nn ? a.label[nn] = ax._label._elem.css("color") : a.label[nn] = ax._label._elem.css(nn))
            }
            this.themeEngine._add(th), this.themeEngine.activeTheme = this.themeEngine.themes[th._name]
        }, $.jqplot.ThemeEngine.prototype.get = function(name) {
            return name ? this.themes[name] : this.activeTheme
        }, $.jqplot.ThemeEngine.prototype.getThemeNames = function() {
            var tn = [];
            for (var n in this.themes) tn.push(n);
            return tn.sort(numericalOrder)
        }, $.jqplot.ThemeEngine.prototype.getThemes = function() {
            var tn = [],
                themes = [];
            for (var n in this.themes) tn.push(n);
            tn.sort(numericalOrder);
            for (var i = 0; i < tn.length; i++) themes.push(this.themes[tn[i]]);
            return themes
        }, $.jqplot.ThemeEngine.prototype.activate = function(plot, name) {
            var redrawPlot = !1;
            if (!name && this.activeTheme && this.activeTheme._name && (name = this.activeTheme._name), !this.themes.hasOwnProperty(name)) throw new Error("No theme of that name");
            var th = this.themes[name];
            this.activeTheme = th;
            var val, arr = ["xaxis", "x2axis", "yaxis", "y2axis"];
            for (i = 0; i < arr.length; i++) {
                var ax = arr[i];
                null != th.axesStyles.borderColor && (plot.axes[ax].borderColor = th.axesStyles.borderColor), null != th.axesStyles.borderWidth && (plot.axes[ax].borderWidth = th.axesStyles.borderWidth)
            }
            for (var axname in plot.axes) {
                var axis = plot.axes[axname];
                if (axis.show) {
                    var thaxis = th.axes[axname] || {},
                        thaxstyle = th.axesStyles,
                        thax = $.jqplot.extend(!0, {}, thaxis, thaxstyle);
                    if (val = null != th.axesStyles.borderColor ? th.axesStyles.borderColor : thax.borderColor, null != thax.borderColor && (axis.borderColor = thax.borderColor, redrawPlot = !0), val = null != th.axesStyles.borderWidth ? th.axesStyles.borderWidth : thax.borderWidth, null != thax.borderWidth && (axis.borderWidth = thax.borderWidth, redrawPlot = !0), axis._ticks && axis._ticks[0])
                        for (var nn in thax.ticks) val = thax.ticks[nn], null != val && (axis.tickOptions[nn] = val, axis._ticks = [], redrawPlot = !0);
                    if (axis._label && axis._label.show)
                        for (var nn in thax.label) val = thax.label[nn], null != val && (axis.labelOptions[nn] = val, redrawPlot = !0)
                }
            }
            for (var n in th.grid) null != th.grid[n] && (plot.grid[n] = th.grid[n]);
            if (redrawPlot || plot.grid.draw(), plot.legend.show)
                for (n in th.legend) null != th.legend[n] && (plot.legend[n] = th.legend[n]);
            if (plot.title.show)
                for (n in th.title) null != th.title[n] && (plot.title[n] = th.title[n]);
            var i;
            for (i = 0; i < th.series.length; i++) {
                var opts = {};
                for (n in th.series[i]) val = null != th.seriesStyles[n] ? th.seriesStyles[n] : th.series[i][n], null != val && (opts[n] = val, "color" == n ? (plot.series[i].renderer.shapeRenderer.fillStyle = val, plot.series[i].renderer.shapeRenderer.strokeStyle = val, plot.series[i][n] = val) : "lineWidth" == n || "linePattern" == n ? (plot.series[i].renderer.shapeRenderer[n] = val, plot.series[i][n] = val) : "markerOptions" == n ? (merge(plot.series[i].markerOptions, val), merge(plot.series[i].markerRenderer, val)) : plot.series[i][n] = val, redrawPlot = !0)
            }
            redrawPlot && (plot.target.empty(), plot.draw());
            for (n in th.target) null != th.target[n] && plot.target.css(n, th.target[n])
        }, $.jqplot.ThemeEngine.prototype._add = function(theme, name) {
            if (name && (theme._name = name), theme._name || (theme._name = Date.parse(new Date)), this.themes.hasOwnProperty(theme._name)) throw new Error("jqplot.ThemeEngine Error: Theme already in use");
            this.themes[theme._name] = theme
        }, $.jqplot.ThemeEngine.prototype.remove = function(name) {
            return "Default" == name ? !1 : delete this.themes[name]
        }, $.jqplot.ThemeEngine.prototype.newTheme = function(name, obj) {
            "object" == typeof name && (obj = obj || name, name = null), name = obj && obj._name ? obj._name : name || Date.parse(new Date);
            var th = this.copy(this.themes.Default._name, name);
            return $.jqplot.extend(th, obj), th
        }, $.jqplot.clone = clone, $.jqplot.merge = merge, $.jqplot.extend = function() {
            var options, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, i = 2), "object" != typeof target && "[object Function]" === !toString.call(target) && (target = {}); length > i; i++)
                if (null != (options = arguments[i]))
                    for (var name in options) {
                        var src = target[name],
                            copy = options[name];
                        target !== copy && (deep && copy && "object" == typeof copy && !copy.nodeType ? target[name] = $.jqplot.extend(deep, src || (null != copy.length ? [] : {}), copy) : copy !== undefined && (target[name] = copy))
                    }
            return target
        }, $.jqplot.ThemeEngine.prototype.rename = function(oldName, newName) {
            if ("Default" == oldName || "Default" == newName) throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default");
            if (this.themes.hasOwnProperty(newName)) throw new Error("jqplot.ThemeEngine Error: New name already in use.");
            if (this.themes.hasOwnProperty(oldName)) {
                var th = this.copy(oldName, newName);
                return this.remove(oldName), th
            }
            throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid")
        }, $.jqplot.ThemeEngine.prototype.copy = function(sourceName, targetName, obj) {
            if ("Default" == targetName) throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme");
            if (!this.themes.hasOwnProperty(sourceName)) {
                var s = "jqplot.ThemeEngine Error: Source name invalid";
                throw new Error(s)
            }
            if (this.themes.hasOwnProperty(targetName)) {
                var s = "jqplot.ThemeEngine Error: Target name invalid";
                throw new Error(s)
            }
            var th = clone(this.themes[sourceName]);
            return th._name = targetName, $.jqplot.extend(!0, th, obj), this._add(th), th
        }, $.jqplot.Theme = function(name, obj) {
            "object" == typeof name && (obj = obj || name, name = null), name = name || Date.parse(new Date), this._name = name, this.target = {
                backgroundColor: null
            }, this.legend = {
                textColor: null,
                fontFamily: null,
                fontSize: null,
                border: null,
                background: null
            }, this.title = {
                textColor: null,
                fontFamily: null,
                fontSize: null,
                textAlign: null
            }, this.seriesStyles = {}, this.series = [], this.grid = {
                drawGridlines: null,
                gridLineColor: null,
                gridLineWidth: null,
                backgroundColor: null,
                borderColor: null,
                borderWidth: null,
                shadow: null
            }, this.axesStyles = {
                label: {},
                ticks: {}
            }, this.axes = {}, "string" == typeof obj ? this._name = obj : "object" == typeof obj && $.jqplot.extend(!0, this, obj)
        };
        var AxisProperties = function() {
                this.borderColor = null, this.borderWidth = null, this.ticks = new AxisTicks, this.label = new AxisLabel
            },
            AxisTicks = function() {
                this.show = null, this.showGridline = null, this.showLabel = null, this.showMark = null, this.size = null, this.textColor = null, this.whiteSpace = null, this.fontSize = null, this.fontFamily = null
            },
            AxisLabel = function() {
                this.textColor = null, this.whiteSpace = null, this.fontSize = null, this.fontFamily = null, this.fontWeight = null
            },
            LineSeriesProperties = function() {
                this.color = null, this.lineWidth = null, this.linePattern = null, this.shadow = null, this.fillColor = null, this.showMarker = null, this.markerOptions = new MarkerOptions
            },
            MarkerOptions = function() {
                this.show = null, this.style = null, this.lineWidth = null, this.size = null, this.color = null, this.shadow = null
            },
            BarSeriesProperties = function() {
                this.color = null, this.seriesColors = null, this.lineWidth = null, this.shadow = null, this.barPadding = null, this.barMargin = null, this.barWidth = null, this.highlightColors = null
            },
            PieSeriesProperties = function() {
                this.seriesColors = null, this.padding = null, this.sliceMargin = null, this.fill = null, this.shadow = null, this.startAngle = null, this.lineWidth = null, this.highlightColors = null
            },
            DonutSeriesProperties = function() {
                this.seriesColors = null, this.padding = null, this.sliceMargin = null, this.fill = null, this.shadow = null, this.startAngle = null, this.lineWidth = null, this.innerDiameter = null, this.thickness = null, this.ringMargin = null, this.highlightColors = null
            },
            FunnelSeriesProperties = function() {
                this.color = null, this.lineWidth = null, this.shadow = null, this.padding = null, this.sectionMargin = null, this.seriesColors = null, this.highlightColors = null
            },
            MeterSeriesProperties = function() {
                this.padding = null, this.backgroundColor = null, this.ringColor = null, this.tickColor = null, this.ringWidth = null, this.intervalColors = null, this.intervalInnerRadius = null, this.intervalOuterRadius = null, this.hubRadius = null, this.needleThickness = null, this.needlePad = null
            };
        $.fn.jqplotChildText = function() {
            return $(this).contents().filter(function() {
                return 3 == this.nodeType
            }).text()
        }, $.fn.jqplotGetComputedFontStyle = function() {
            for (var css = window.getComputedStyle ? window.getComputedStyle(this[0], "") : this[0].currentStyle, attrs = css["font-style"] ? ["font-style", "font-weight", "font-size", "font-family"] : ["fontStyle", "fontWeight", "fontSize", "fontFamily"], style = [], i = 0; i < attrs.length; ++i) {
                var attr = String(css[attrs[i]]);
                attr && "normal" != attr && style.push(attr)
            }
            return style.join(" ")
        }, $.fn.jqplotToImageCanvas = function(options) {
            function getLineheight(el) {
                var lineheight = parseInt($(el).css("line-height"), 10);
                return isNaN(lineheight) && (lineheight = 1.2 * parseInt($(el).css("font-size"), 10)), lineheight
            }

            function writeWrappedText(el, context, text, left, top, canvasWidth) {
                for (var lineheight = getLineheight(el), tagwidth = $(el).innerWidth(), words = ($(el).innerHeight(), text.split(/\s+/)), wl = words.length, w = "", breaks = [], temptop = top, templeft = left, i = 0; wl > i; i++) w += words[i], context.measureText(w).width > tagwidth && (breaks.push(i), w = "", i--);
                if (0 === breaks.length) "center" === $(el).css("textAlign") && (templeft = left + (canvasWidth - context.measureText(w).width) / 2 - transx), context.fillText(text, templeft, top);
                else {
                    w = words.slice(0, breaks[0]).join(" "), "center" === $(el).css("textAlign") && (templeft = left + (canvasWidth - context.measureText(w).width) / 2 - transx), context.fillText(w, templeft, temptop), temptop += lineheight;
                    for (var i = 1, l = breaks.length; l > i; i++) w = words.slice(breaks[i - 1], breaks[i]).join(" "), "center" === $(el).css("textAlign") && (templeft = left + (canvasWidth - context.measureText(w).width) / 2 - transx), context.fillText(w, templeft, temptop), temptop += lineheight;
                    w = words.slice(breaks[i - 1], words.length).join(" "), "center" === $(el).css("textAlign") && (templeft = left + (canvasWidth - context.measureText(w).width) / 2 - transx), context.fillText(w, templeft, temptop)
                }
            }

            function _jqpToImage(el, x_offset, y_offset) {
                var tagname = el.tagName.toLowerCase(),
                    p = $(el).position(),
                    css = window.getComputedStyle ? window.getComputedStyle(el, "") : el.currentStyle,
                    left = x_offset + p.left + parseInt(css.marginLeft, 10) + parseInt(css.borderLeftWidth, 10) + parseInt(css.paddingLeft, 10),
                    top = y_offset + p.top + parseInt(css.marginTop, 10) + parseInt(css.borderTopWidth, 10) + parseInt(css.paddingTop, 10),
                    w = newCanvas.width;
                if ("div" != tagname && "span" != tagname || $(el).hasClass("jqplot-highlighter-tooltip"))
                    if ("table" === tagname && $(el).hasClass("jqplot-table-legend")) {
                        newContext.strokeStyle = $(el).css("border-top-color"), newContext.fillStyle = $(el).css("background-color"), newContext.fillRect(left, top, $(el).innerWidth(), $(el).innerHeight()), parseInt($(el).css("border-top-width"), 10) > 0 && newContext.strokeRect(left, top, $(el).innerWidth(), $(el).innerHeight()), $(el).find("div.jqplot-table-legend-swatch-outline").each(function() {
                            var elem = $(this);
                            newContext.strokeStyle = elem.css("border-top-color");
                            var l = left + elem.position().left,
                                t = top + elem.position().top;
                            newContext.strokeRect(l, t, elem.innerWidth(), elem.innerHeight()), l += parseInt(elem.css("padding-left"), 10), t += parseInt(elem.css("padding-top"), 10);
                            var h = elem.innerHeight() - 2 * parseInt(elem.css("padding-top"), 10),
                                w = elem.innerWidth() - 2 * parseInt(elem.css("padding-left"), 10),
                                swatch = elem.children("div.jqplot-table-legend-swatch");
                            newContext.fillStyle = swatch.css("background-color"), newContext.fillRect(l, t, w, h)
                        }), $(el).find("td.jqplot-table-legend-label").each(function() {
                            var elem = $(this),
                                l = left + elem.position().left,
                                t = top + elem.position().top + parseInt(elem.css("padding-top"), 10);
                            newContext.font = elem.jqplotGetComputedFontStyle(), newContext.fillStyle = elem.css("color"), writeWrappedText(elem, newContext, elem.text(), l, t, w)
                        })
                    } else "canvas" == tagname && newContext.drawImage(el, left, top);
                else {
                    $(el).children().each(function() {
                        _jqpToImage(this, left, top)
                    });
                    var text = $(el).jqplotChildText();
                    text && (newContext.font = $(el).jqplotGetComputedFontStyle(), newContext.fillStyle = $(el).css("color"), writeWrappedText(el, newContext, text, left, top, w))
                }
            }
            options = options || {};
            var x_offset = null == options.x_offset ? 0 : options.x_offset,
                y_offset = null == options.y_offset ? 0 : options.y_offset,
                backgroundColor = null == options.backgroundColor ? "rgb(255,255,255)" : options.backgroundColor;
            if (0 == $(this).width() || 0 == $(this).height()) return null;
            if ($.jqplot.use_excanvas) return null;
            for (var temptop, templeft, tempbottom, tempright, newCanvas = document.createElement("canvas"), h = $(this).outerHeight(!0), w = $(this).outerWidth(!0), offs = $(this).offset(), plotleft = offs.left, plottop = offs.top, transx = 0, transy = 0, clses = ["jqplot-table-legend", "jqplot-xaxis-tick", "jqplot-x2axis-tick", "jqplot-yaxis-tick", "jqplot-y2axis-tick", "jqplot-y3axis-tick", "jqplot-y4axis-tick", "jqplot-y5axis-tick", "jqplot-y6axis-tick", "jqplot-y7axis-tick", "jqplot-y8axis-tick", "jqplot-y9axis-tick", "jqplot-xaxis-label", "jqplot-x2axis-label", "jqplot-yaxis-label", "jqplot-y2axis-label", "jqplot-y3axis-label", "jqplot-y4axis-label", "jqplot-y5axis-label", "jqplot-y6axis-label", "jqplot-y7axis-label", "jqplot-y8axis-label", "jqplot-y9axis-label"], i = 0; i < clses.length; i++) $(this).find("." + clses[i]).each(function() {
                temptop = $(this).offset().top - plottop, templeft = $(this).offset().left - plotleft, tempright = templeft + $(this).outerWidth(!0) + transx, tempbottom = temptop + $(this).outerHeight(!0) + transy, -transx > templeft && (w = w - transx - templeft, transx = -templeft), -transy > temptop && (h = h - transy - temptop, transy = -temptop), tempright > w && (w = tempright), tempbottom > h && (h = tempbottom)
            });
            newCanvas.width = w + Number(x_offset), newCanvas.height = h + Number(y_offset);
            var newContext = newCanvas.getContext("2d");
            return newContext.save(), newContext.fillStyle = backgroundColor, newContext.fillRect(0, 0, newCanvas.width, newCanvas.height), newContext.restore(), newContext.translate(transx, transy), newContext.textAlign = "left", newContext.textBaseline = "top", $(this).children().each(function() {
                _jqpToImage(this, x_offset, y_offset)
            }), newCanvas
        }, $.fn.jqplotToImageStr = function(options) {
            var imgCanvas = $(this).jqplotToImageCanvas(options);
            return imgCanvas ? imgCanvas.toDataURL("image/png") : null
        }, $.fn.jqplotToImageElem = function(options) {
            var elem = document.createElement("img"),
                str = $(this).jqplotToImageStr(options);
            return elem.src = str, elem
        }, $.fn.jqplotToImageElemStr = function(options) {
            var str = "<img src=" + $(this).jqplotToImageStr(options) + " />";
            return str
        }, $.fn.jqplotSaveImage = function() {
            var imgData = $(this).jqplotToImageStr({});
            imgData && (window.location.href = imgData.replace("image/png", "image/octet-stream"))
        }, $.fn.jqplotViewImage = function() {
            var imgStr = $(this).jqplotToImageElemStr({});
            $(this).jqplotToImageStr({});
            if (imgStr) {
                var w = window.open("");
                w.document.open("image/png"), w.document.write(imgStr), w.document.close(), w = null
            }
        };
        var jsDate = function() {
            switch (this.syntax = jsDate.config.syntax, this._type = "jsDate", this.proxy = new Date, this.options = {}, this.locale = jsDate.regional.getLocale(), this.formatString = "", this.defaultCentury = jsDate.config.defaultCentury, arguments.length) {
                case 0:
                    break;
                case 1:
                    if ("[object Object]" == get_type(arguments[0]) && "jsDate" != arguments[0]._type) {
                        var opts = this.options = arguments[0];
                        this.syntax = opts.syntax || this.syntax, this.defaultCentury = opts.defaultCentury || this.defaultCentury, this.proxy = jsDate.createDate(opts.date)
                    } else this.proxy = jsDate.createDate(arguments[0]);
                    break;
                default:
                    for (var a = [], i = 0; i < arguments.length; i++) a.push(arguments[i]);
                    this.proxy = new Date, this.proxy.setFullYear.apply(this.proxy, a.slice(0, 3)), a.slice(3).length && this.proxy.setHours.apply(this.proxy, a.slice(3))
            }
        };
        jsDate.config = {
            defaultLocale: "en",
            syntax: "perl",
            defaultCentury: 1900
        }, jsDate.prototype.add = function(number, unit) {
            var factor = multipliers[unit] || multipliers.day;
            return "number" == typeof factor ? this.proxy.setTime(this.proxy.getTime() + factor * number) : factor.add(this, number), this
        }, jsDate.prototype.clone = function() {
            return new jsDate(this.proxy.getTime())
        }, jsDate.prototype.getUtcOffset = function() {
            return 6e4 * this.proxy.getTimezoneOffset()
        }, jsDate.prototype.diff = function(dateObj, unit, allowDecimal) {
            if (dateObj = new jsDate(dateObj), null === dateObj) return null;
            var factor = multipliers[unit] || multipliers.day;
            if ("number" == typeof factor) var unitDiff = (this.proxy.getTime() - dateObj.proxy.getTime()) / factor;
            else var unitDiff = factor.diff(this.proxy, dateObj.proxy);
            return allowDecimal ? unitDiff : Math[unitDiff > 0 ? "floor" : "ceil"](unitDiff)
        }, jsDate.prototype.getAbbrDayName = function() {
            return jsDate.regional[this.locale].dayNamesShort[this.proxy.getDay()]
        }, jsDate.prototype.getAbbrMonthName = function() {
            return jsDate.regional[this.locale].monthNamesShort[this.proxy.getMonth()]
        }, jsDate.prototype.getAMPM = function() {
            return this.proxy.getHours() >= 12 ? "PM" : "AM"
        }, jsDate.prototype.getAmPm = function() {
            return this.proxy.getHours() >= 12 ? "pm" : "am"
        }, jsDate.prototype.getCentury = function() {
            return parseInt(this.proxy.getFullYear() / 100, 10)
        }, jsDate.prototype.getDate = function() {
            return this.proxy.getDate()
        }, jsDate.prototype.getDay = function() {
            return this.proxy.getDay()
        }, jsDate.prototype.getDayOfWeek = function() {
            var dow = this.proxy.getDay();
            return 0 === dow ? 7 : dow
        }, jsDate.prototype.getDayOfYear = function() {
            var d = this.proxy,
                ms = d - new Date("" + d.getFullYear() + "/1/1 GMT");
            return ms += 6e4 * d.getTimezoneOffset(), d = null, parseInt(ms / 6e4 / 60 / 24, 10) + 1
        }, jsDate.prototype.getDayName = function() {
            return jsDate.regional[this.locale].dayNames[this.proxy.getDay()]
        }, jsDate.prototype.getFullWeekOfYear = function() {
            var d = this.proxy,
                doy = this.getDayOfYear(),
                rdow = 6 - d.getDay(),
                woy = parseInt((doy + rdow) / 7, 10);
            return woy
        }, jsDate.prototype.getFullYear = function() {
            return this.proxy.getFullYear()
        }, jsDate.prototype.getGmtOffset = function() {
            var hours = this.proxy.getTimezoneOffset() / 60,
                prefix = 0 > hours ? "+" : "-";
            return hours = Math.abs(hours), prefix + addZeros(Math.floor(hours), 2) + ":" + addZeros(hours % 1 * 60, 2)
        }, jsDate.prototype.getHours = function() {
            return this.proxy.getHours()
        }, jsDate.prototype.getHours12 = function() {
            var hours = this.proxy.getHours();
            return hours > 12 ? hours - 12 : 0 == hours ? 12 : hours
        }, jsDate.prototype.getIsoWeek = function() {
            var d = this.proxy,
                woy = this.getWeekOfYear(),
                dow1_1 = new Date("" + d.getFullYear() + "/1/1").getDay(),
                idow = woy + (dow1_1 > 4 || 1 >= dow1_1 ? 0 : 1);
            return 53 == idow && new Date("" + d.getFullYear() + "/12/31").getDay() < 4 ? idow = 1 : 0 === idow && (d = new jsDate(new Date("" + (d.getFullYear() - 1) + "/12/31")), idow = d.getIsoWeek()), d = null, idow
        }, jsDate.prototype.getMilliseconds = function() {
            return this.proxy.getMilliseconds()
        }, jsDate.prototype.getMinutes = function() {
            return this.proxy.getMinutes()
        }, jsDate.prototype.getMonth = function() {
            return this.proxy.getMonth()
        }, jsDate.prototype.getMonthName = function() {
            return jsDate.regional[this.locale].monthNames[this.proxy.getMonth()]
        }, jsDate.prototype.getMonthNumber = function() {
            return this.proxy.getMonth() + 1
        }, jsDate.prototype.getSeconds = function() {
            return this.proxy.getSeconds()
        }, jsDate.prototype.getShortYear = function() {
            return this.proxy.getYear() % 100
        }, jsDate.prototype.getTime = function() {
            return this.proxy.getTime()
        }, jsDate.prototype.getTimezoneAbbr = function() {
            return this.proxy.toString().replace(/^.*\(([^)]+)\)$/, "$1")
        }, jsDate.prototype.getTimezoneName = function() {
            var match = /(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());
            return match[1] || match[2] || "GMT" + this.getGmtOffset()
        }, jsDate.prototype.getTimezoneOffset = function() {
            return this.proxy.getTimezoneOffset()
        }, jsDate.prototype.getWeekOfYear = function() {
            var doy = this.getDayOfYear(),
                rdow = 7 - this.getDayOfWeek(),
                woy = parseInt((doy + rdow) / 7, 10);
            return woy
        }, jsDate.prototype.getUnix = function() {
            return Math.round(this.proxy.getTime() / 1e3, 0)
        }, jsDate.prototype.getYear = function() {
            return this.proxy.getYear()
        }, jsDate.prototype.next = function(unit) {
            return unit = unit || "day", this.clone().add(1, unit)
        }, jsDate.prototype.set = function() {
            switch (arguments.length) {
                case 0:
                    this.proxy = new Date;
                    break;
                case 1:
                    if ("[object Object]" == get_type(arguments[0]) && "jsDate" != arguments[0]._type) {
                        var opts = this.options = arguments[0];
                        this.syntax = opts.syntax || this.syntax, this.defaultCentury = opts.defaultCentury || this.defaultCentury, this.proxy = jsDate.createDate(opts.date)
                    } else this.proxy = jsDate.createDate(arguments[0]);
                    break;
                default:
                    for (var a = [], i = 0; i < arguments.length; i++) a.push(arguments[i]);
                    this.proxy = new Date, this.proxy.setFullYear.apply(this.proxy, a.slice(0, 3)), a.slice(3).length && this.proxy.setHours.apply(this.proxy, a.slice(3))
            }
            return this
        }, jsDate.prototype.setDate = function(n) {
            return this.proxy.setDate(n), this
        }, jsDate.prototype.setFullYear = function() {
            return this.proxy.setFullYear.apply(this.proxy, arguments), this
        }, jsDate.prototype.setHours = function() {
            return this.proxy.setHours.apply(this.proxy, arguments), this
        }, jsDate.prototype.setMilliseconds = function(n) {
            return this.proxy.setMilliseconds(n), this
        }, jsDate.prototype.setMinutes = function() {
            return this.proxy.setMinutes.apply(this.proxy, arguments), this
        }, jsDate.prototype.setMonth = function() {
            return this.proxy.setMonth.apply(this.proxy, arguments), this
        }, jsDate.prototype.setSeconds = function() {
            return this.proxy.setSeconds.apply(this.proxy, arguments), this
        }, jsDate.prototype.setTime = function(n) {
            return this.proxy.setTime(n), this
        }, jsDate.prototype.setYear = function() {
            return this.proxy.setYear.apply(this.proxy, arguments), this
        }, jsDate.prototype.strftime = function(formatString) {
            return formatString = formatString || this.formatString || jsDate.regional[this.locale].formatString, jsDate.strftime(this, formatString, this.syntax)
        }, jsDate.prototype.toString = function() {
            return this.proxy.toString()
        }, jsDate.prototype.toYmdInt = function() {
            return 1e4 * this.proxy.getFullYear() + 100 * this.getMonthNumber() + this.proxy.getDate()
        }, jsDate.regional = {
            en: {
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            fr: {
                monthNames: ["Janvier", "FÃƒÆ’Ã‚Â©vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "AoÃƒÆ’Ã‚Â»t", "Septembre", "Octobre", "Novembre", "DÃƒÆ’Ã‚Â©cembre"],
                monthNamesShort: ["Jan", "FÃƒÆ’Ã‚Â©v", "Mar", "Avr", "Mai", "Jun", "Jul", "AoÃƒÆ’Ã‚Â»", "Sep", "Oct", "Nov", "DÃƒÆ’Ã‚Â©c"],
                dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            de: {
                monthNames: ["Januar", "Februar", "MÃƒÆ’Ã‚Â¤rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                monthNamesShort: ["Jan", "Feb", "MÃƒÆ’Ã‚Â¤r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            es: {
                monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                dayNames: ["Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&aacute;bado"],
                dayNamesShort: ["Dom", "Lun", "Mar", "Mi&eacute;", "Juv", "Vie", "S&aacute;b"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            ru: {
                monthNames: ["ÃƒÂÃ‚Â¯ÃƒÂÃ‚Â½ÃƒÂÃ‚Â²ÃƒÂÃ‚Â°Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã…â€™", "ÃƒÂÃ‚Â¤ÃƒÂÃ‚ÂµÃƒÂÃ‚Â²Ãƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â°ÃƒÂÃ‚Â»Ãƒâ€˜Ã…â€™", "ÃƒÂÃ…â€œÃƒÂÃ‚Â°Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã¢â‚¬Å¡", "ÃƒÂÃ‚ÂÃƒÂÃ‚Â¿Ãƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚ÂµÃƒÂÃ‚Â»Ãƒâ€˜Ã…â€™", "ÃƒÂÃ…â€œÃƒÂÃ‚Â°ÃƒÂÃ‚Â¹", "ÃƒÂÃ‹Å“Ãƒâ€˜Ã…Â½ÃƒÂÃ‚Â½Ãƒâ€˜Ã…â€™", "ÃƒÂÃ‹Å“Ãƒâ€˜Ã…Â½ÃƒÂÃ‚Â»Ãƒâ€˜Ã…â€™", "ÃƒÂÃ‚ÂÃƒÂÃ‚Â²ÃƒÂÃ‚Â³Ãƒâ€˜Ã†â€™Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡", "ÃƒÂÃ‚Â¡ÃƒÂÃ‚ÂµÃƒÂÃ‚Â½Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã‚ÂÃƒÂÃ‚Â±Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã…â€™", "ÃƒÂÃ…Â¾ÃƒÂÃ‚ÂºÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã‚ÂÃƒÂÃ‚Â±Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã…â€™", "ÃƒÂÃ‚ÂÃƒÂÃ‚Â¾Ãƒâ€˜Ã‚ÂÃƒÂÃ‚Â±Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã…â€™", "ÃƒÂÃ¢â‚¬ÂÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒÂÃ‚Â°ÃƒÂÃ‚Â±Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã…â€™"],
                monthNamesShort: ["ÃƒÂÃ‚Â¯ÃƒÂÃ‚Â½ÃƒÂÃ‚Â²", "ÃƒÂÃ‚Â¤ÃƒÂÃ‚ÂµÃƒÂÃ‚Â²", "ÃƒÂÃ…â€œÃƒÂÃ‚Â°Ãƒâ€˜Ã¢â€šÂ¬", "ÃƒÂÃ‚ÂÃƒÂÃ‚Â¿Ãƒâ€˜Ã¢â€šÂ¬", "ÃƒÂÃ…â€œÃƒÂÃ‚Â°ÃƒÂÃ‚Â¹", "ÃƒÂÃ‹Å“Ãƒâ€˜Ã…Â½ÃƒÂÃ‚Â½", "ÃƒÂÃ‹Å“Ãƒâ€˜Ã…Â½ÃƒÂÃ‚Â»", "ÃƒÂÃ‚ÂÃƒÂÃ‚Â²ÃƒÂÃ‚Â³", "ÃƒÂÃ‚Â¡ÃƒÂÃ‚ÂµÃƒÂÃ‚Â½", "ÃƒÂÃ…Â¾ÃƒÂÃ‚ÂºÃƒâ€˜Ã¢â‚¬Å¡", "ÃƒÂÃ‚ÂÃƒÂÃ‚Â¾Ãƒâ€˜Ã‚Â", "ÃƒÂÃ¢â‚¬ÂÃƒÂÃ‚ÂµÃƒÂÃ‚Âº"],
                dayNames: ["ÃƒÂÃ‚Â²ÃƒÂÃ‚Â¾Ãƒâ€˜Ã‚ÂÃƒÂÃ‚ÂºÃƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚ÂµÃƒâ€˜Ã‚ÂÃƒÂÃ‚ÂµÃƒÂÃ‚Â½Ãƒâ€˜Ã…â€™ÃƒÂÃ‚Âµ", "ÃƒÂÃ‚Â¿ÃƒÂÃ‚Â¾ÃƒÂÃ‚Â½ÃƒÂÃ‚ÂµÃƒÂÃ‚Â´ÃƒÂÃ‚ÂµÃƒÂÃ‚Â»Ãƒâ€˜Ã…â€™ÃƒÂÃ‚Â½ÃƒÂÃ‚Â¸ÃƒÂÃ‚Âº", "ÃƒÂÃ‚Â²Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â¾Ãƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â½ÃƒÂÃ‚Â¸ÃƒÂÃ‚Âº", "Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚ÂµÃƒÂÃ‚Â´ÃƒÂÃ‚Â°", "Ãƒâ€˜Ã¢â‚¬Â¡ÃƒÂÃ‚ÂµÃƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â²ÃƒÂÃ‚ÂµÃƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â³", "ÃƒÂÃ‚Â¿Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â½ÃƒÂÃ‚Â¸Ãƒâ€˜Ã¢â‚¬ ÃƒÂÃ‚Â°", "Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã†â€™ÃƒÂÃ‚Â±ÃƒÂÃ‚Â±ÃƒÂÃ‚Â¾Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â°"],
                dayNamesShort: ["ÃƒÂÃ‚Â²Ãƒâ€˜Ã‚ÂÃƒÂÃ‚Âº", "ÃƒÂÃ‚Â¿ÃƒÂÃ‚Â½ÃƒÂÃ‚Â´", "ÃƒÂÃ‚Â²Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã¢â€šÂ¬", "Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â´", "Ãƒâ€˜Ã¢â‚¬Â¡Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â²", "ÃƒÂÃ‚Â¿Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â½", "Ãƒâ€˜Ã‚ÂÃƒÂÃ‚Â±Ãƒâ€˜Ã¢â‚¬Å¡"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            ar: {
                monthNames: ["Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬ Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬ Ãƒâ„¢Ã… ", "ÃƒËœÃ‚Â´ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â·", "ÃƒËœÃ‚Â¢ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±", "Ãƒâ„¢Ã¢â‚¬ Ãƒâ„¢Ã… ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬ ", "ÃƒËœÃ‚Â¢ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±", "ÃƒËœÃ‚Â­ÃƒËœÃ‚Â²Ãƒâ„¢Ã… ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬ ", "ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â²", "ÃƒËœÃ‚Â¢ÃƒËœÃ‚Â¨", "ÃƒËœÃ‚Â£Ãƒâ„¢Ã… Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾", "ÃƒËœÃ‚ÂªÃƒËœÃ‚Â´ÃƒËœÃ‚Â±Ãƒâ„¢Ã… Ãƒâ„¢Ã¢â‚¬  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾", "ÃƒËœÃ‚ÂªÃƒËœÃ‚Â´ÃƒËœÃ‚Â±Ãƒâ„¢Ã… Ãƒâ„¢Ã¢â‚¬  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬ Ãƒâ„¢Ã… ", "Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬ Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾"],
                monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                dayNames: ["ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ÃƒËœÃ‚Âª", "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯", "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬ Ãƒâ„¢Ã… Ãƒâ„¢Ã¢â‚¬ ", "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡", "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡", "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã… ÃƒËœÃ‚Â³", "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©"],
                dayNamesShort: ["ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ÃƒËœÃ‚Âª", "ÃƒËœÃ‚Â£ÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯", "ÃƒËœÃ‚Â§ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬ Ãƒâ„¢Ã… Ãƒâ„¢Ã¢â‚¬ ", "ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡", "ÃƒËœÃ‚Â£ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡", "ÃƒËœÃ‚Â®Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã… ÃƒËœÃ‚Â³", "ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            pt: {
                monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado"],
                dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            "pt-BR": {
                monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado"],
                dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            pl: {
                monthNames: ["StyczeÃƒâ€¦Ã¢â‚¬Å¾", "Luty", "Marzec", "KwiecieÃƒâ€¦Ã¢â‚¬Å¾", "Maj", "Czerwiec", "Lipiec", "SierpieÃƒâ€¦Ã¢â‚¬Å¾", "WrzesieÃƒâ€¦Ã¢â‚¬Å¾", "PaÃƒâ€¦Ã‚Âºdziernik", "Listopad", "GrudzieÃƒâ€¦Ã¢â‚¬Å¾"],
                monthNamesShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "PaÃƒâ€¦Ã‚Âº", "Lis", "Gru"],
                dayNames: ["Niedziela", "PoniedziaÃƒâ€¦Ã¢â‚¬Å¡ek", "Wtorek", "Ãƒâ€¦Ã…Â¡roda", "Czwartek", "PiÃƒâ€žÃ¢â‚¬Â¦tek", "Sobota"],
                dayNamesShort: ["Ni", "Pn", "Wt", "Ãƒâ€¦Ã…Â¡r", "Cz", "Pt", "Sb"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            nl: {
                monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "July", "Augustus", "September", "Oktober", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                dayNames: ",".Zaterdag,
                dayNamesShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
                formatString: "%Y-%m-%d %H:%M:%S"
            },
            sv: {
                monthNames: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
                monthNamesShort: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
                dayNames: ["sÃƒÆ’Ã‚Â¶ndag", "mÃƒÆ’Ã‚Â¥ndag", "tisdag", "onsdag", "torsdag", "fredag", "lÃƒÆ’Ã‚Â¶rdag"],
                dayNamesShort: ["sÃƒÆ’Ã‚Â¶n", "mÃƒÆ’Ã‚Â¥n", "tis", "ons", "tor", "fre", "lÃƒÆ’Ã‚Â¶r"],
                formatString: "%Y-%m-%d %H:%M:%S"
            }
        }, jsDate.regional["en-US"] = jsDate.regional["en-GB"] = jsDate.regional.en, jsDate.regional.getLocale = function() {
            var l = jsDate.config.defaultLocale;
            return document && document.getElementsByTagName("html") && document.getElementsByTagName("html")[0].lang && (l = document.getElementsByTagName("html")[0].lang, jsDate.regional.hasOwnProperty(l) || (l = jsDate.config.defaultLocale)), l
        };
        var day = 864e5,
            addZeros = function(num, digits) {
                num = String(num);
                var i = digits - num.length,
                    s = String(Math.pow(10, i)).slice(1);
                return s.concat(num)
            },
            multipliers = {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: day,
                week: 7 * day,
                month: {
                    add: function(d, number) {
                        multipliers.year.add(d, Math[number > 0 ? "floor" : "ceil"](number / 12));
                        var prevMonth = d.getMonth() + number % 12;
                        12 == prevMonth ? (prevMonth = 0, d.setYear(d.getFullYear() + 1)) : -1 == prevMonth && (prevMonth = 11, d.setYear(d.getFullYear() - 1)), d.setMonth(prevMonth)
                    },
                    diff: function(d1, d2) {
                        var diffYears = d1.getFullYear() - d2.getFullYear(),
                            diffMonths = d1.getMonth() - d2.getMonth() + 12 * diffYears,
                            diffDays = d1.getDate() - d2.getDate();
                        return diffMonths + diffDays / 30
                    }
                },
                year: {
                    add: function(d, number) {
                        d.setYear(d.getFullYear() + Math[number > 0 ? "floor" : "ceil"](number))
                    },
                    diff: function(d1, d2) {
                        return multipliers.month.diff(d1, d2) / 12
                    }
                }
            };
        for (var unit in multipliers) "s" != unit.substring(unit.length - 1) && (multipliers[unit + "s"] = multipliers[unit]);
        var format = function(d, code, syntax) {
            if (jsDate.formats[syntax].shortcuts[code]) return jsDate.strftime(d, jsDate.formats[syntax].shortcuts[code], syntax);
            var getter = (jsDate.formats[syntax].codes[code] || "").split("."),
                nbr = d["get" + getter[0]] ? d["get" + getter[0]]() : "";
            return getter[1] && (nbr = addZeros(nbr, getter[1])), nbr
        };
        jsDate.strftime = function(d, formatString, syntax, locale) {
            var syn = "perl",
                loc = jsDate.regional.getLocale();
            syntax && jsDate.formats.hasOwnProperty(syntax) ? syn = syntax : syntax && jsDate.regional.hasOwnProperty(syntax) && (loc = syntax), locale && jsDate.formats.hasOwnProperty(locale) ? syn = locale : locale && jsDate.regional.hasOwnProperty(locale) && (loc = locale), "[object Object]" == get_type(d) && "jsDate" == d._type || (d = new jsDate(d), d.locale = loc), formatString || (formatString = d.formatString || jsDate.regional[loc].formatString);
            for (var match, source = formatString || "%Y-%m-%d", result = ""; source.length > 0;)(match = source.match(jsDate.formats[syn].codes.matcher)) ? (result += source.slice(0, match.index), result += (match[1] || "") + format(d, match[2], syn), source = source.slice(match.index + match[0].length)) : (result += source, source = "");
            return result
        }, jsDate.formats = {
            ISO: "%Y-%m-%dT%H:%M:%S.%N%G",
            SQL: "%Y-%m-%d %H:%M:%S"
        }, jsDate.formats.perl = {
            codes: {
                matcher: /()%(#?(%|[a-z]))/i,
                Y: "FullYear",
                y: "ShortYear.2",
                m: "MonthNumber.2",
                "#m": "MonthNumber",
                B: "MonthName",
                b: "AbbrMonthName",
                d: "Date.2",
                "#d": "Date",
                e: "Date",
                A: "DayName",
                a: "AbbrDayName",
                w: "Day",
                H: "Hours.2",
                "#H": "Hours",
                I: "Hours12.2",
                "#I": "Hours12",
                p: "AMPM",
                M: "Minutes.2",
                "#M": "Minutes",
                S: "Seconds.2",
                "#S": "Seconds",
                s: "Unix",
                N: "Milliseconds.3",
                "#N": "Milliseconds",
                O: "TimezoneOffset",
                Z: "TimezoneName",
                G: "GmtOffset"
            },
            shortcuts: {
                F: "%Y-%m-%d",
                T: "%H:%M:%S",
                X: "%H:%M:%S",
                x: "%m/%d/%y",
                D: "%m/%d/%y",
                "#c": "%a %b %e %H:%M:%S %Y",
                v: "%e-%b-%Y",
                R: "%H:%M",
                r: "%I:%M:%S %p",
                t: "	",
                n: "\n",
                "%": "%"
            }
        }, jsDate.formats.php = {
            codes: {
                matcher: /()%((%|[a-z]))/i,
                a: "AbbrDayName",
                A: "DayName",
                d: "Date.2",
                e: "Date",
                j: "DayOfYear.3",
                u: "DayOfWeek",
                w: "Day",
                U: "FullWeekOfYear.2",
                V: "IsoWeek.2",
                W: "WeekOfYear.2",
                b: "AbbrMonthName",
                B: "MonthName",
                m: "MonthNumber.2",
                h: "AbbrMonthName",
                C: "Century.2",
                y: "ShortYear.2",
                Y: "FullYear",
                H: "Hours.2",
                I: "Hours12.2",
                l: "Hours12",
                p: "AMPM",
                P: "AmPm",
                M: "Minutes.2",
                S: "Seconds.2",
                s: "Unix",
                O: "TimezoneOffset",
                z: "GmtOffset",
                Z: "TimezoneAbbr"
            },
            shortcuts: {
                D: "%m/%d/%y",
                F: "%Y-%m-%d",
                T: "%H:%M:%S",
                X: "%H:%M:%S",
                x: "%m/%d/%y",
                R: "%H:%M",
                r: "%I:%M:%S %p",
                t: "	",
                n: "\n",
                "%": "%"
            }
        }, jsDate.createDate = function(date) {
            function h1(parsable, match) {
                var ny, nd, nm, str, m1 = parseFloat(match[1]),
                    m2 = parseFloat(match[2]),
                    m3 = parseFloat(match[3]),
                    cent = jsDate.config.defaultCentury;
                return m1 > 31 ? (nd = m3, nm = m2, ny = cent + m1) : (nd = m2, nm = m1, ny = cent + m3), str = nm + "/" + nd + "/" + ny, parsable.replace(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/, str)
            }
            if (null == date) return new Date;
            if (date instanceof Date) return date;
            if ("number" == typeof date) return new Date(date);
            var parsable = String(date).replace(/^\s*(.+)\s*$/g, "$1");
            parsable = parsable.replace(/^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,4})/, "$1/$2/$3"), parsable = parsable.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{4})/i, "$1 $2 $3");
            var match = parsable.match(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i);
            if (match && match.length > 3) {
                var m3 = parseFloat(match[3]),
                    ny = jsDate.config.defaultCentury + m3;
                ny = String(ny), parsable = parsable.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i, match[1] + " " + match[2] + " " + ny)
            }
            match = parsable.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[^0-9]/), match && match.length > 3 && (parsable = h1(parsable, match));
            var match = parsable.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})$/);
            match && match.length > 3 && (parsable = h1(parsable, match));
            for (var pattern, ms, obj, i = 0, length = jsDate.matchers.length, current = parsable; length > i;) {
                if (ms = Date.parse(current), !isNaN(ms)) return new Date(ms);
                if (pattern = jsDate.matchers[i], "function" == typeof pattern) {
                    if (obj = pattern.call(jsDate, current), obj instanceof Date) return obj
                } else current = parsable.replace(pattern[0], pattern[1]);
                i++
            }
            return NaN
        }, jsDate.daysInMonth = function(year, month) {
            return 2 == month ? 29 == new Date(year, 1, 29).getDate() ? 29 : 28 : [undefined, 31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        }, jsDate.matchers = [
            [/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/, "$2/$1/$3"],
            [/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/, "$2/$3/$1"],
            function(str) {
                var match = str.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);
                if (match) {
                    if (match[1]) {
                        var d = this.createDate(match[1]);
                        if (isNaN(d)) return
                    } else {
                        var d = new Date;
                        d.setMilliseconds(0)
                    }
                    var hour = parseFloat(match[2]);
                    return match[6] && (hour = "am" == match[6].toLowerCase() ? 12 == hour ? 0 : hour : 12 == hour ? 12 : hour + 12), d.setHours(hour, parseInt(match[3] || 0, 10), parseInt(match[4] || 0, 10), 1e3 * (parseFloat(match[5] || 0) || 0)), d
                }
                return str
            },
            function(str) {
                var match = str.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);
                if (match) {
                    if (match[1]) {
                        var d = this.createDate(match[1]);
                        if (isNaN(d)) return
                    } else {
                        var d = new Date;
                        d.setMilliseconds(0)
                    }
                    var hour = parseFloat(match[2]);
                    return d.setHours(hour, parseInt(match[3], 10), parseInt(match[4], 10), 1e3 * parseFloat(match[5])), d
                }
                return str
            },
            function(str) {
                var match = str.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);
                if (match) {
                    var ny, nd, nm, d = new Date,
                        cent = jsDate.config.defaultCentury,
                        m1 = parseFloat(match[1]),
                        m3 = parseFloat(match[3]);
                    m1 > 31 ? (nd = m3, ny = cent + m1) : (nd = m1, ny = cent + m3);
                    var nm = inArray(match[2], jsDate.regional[jsDate.regional.getLocale()].monthNamesShort);
                    return -1 == nm && (nm = inArray(match[2], jsDate.regional[jsDate.regional.getLocale()].monthNames)), d.setFullYear(ny, nm, nd), d.setHours(0, 0, 0, 0), d
                }
                return str
            }
        ], $.jsDate = jsDate, $.jqplot.sprintf = function() {
            function pad(str, len, chr, leftJustify) {
                var padding = str.length >= len ? "" : Array(1 + len - str.length >>> 0).join(chr);
                return leftJustify ? str + padding : padding + str
            }

            function thousand_separate(value) {
                for (var value_str = new String(value), i = 10; i > 0 && value_str != (value_str = value_str.replace(/^(\d+)(\d{3})/, "$1" + $.jqplot.sprintf.thousandsSeparator + "$2")); i--);
                return value_str
            }

            function justify(value, prefix, leftJustify, minWidth, zeroPad, htmlSpace) {
                var diff = minWidth - value.length;
                if (diff > 0) {
                    var spchar = " ";
                    htmlSpace && (spchar = "&nbsp;"), value = leftJustify || !zeroPad ? pad(value, minWidth, spchar, leftJustify) : value.slice(0, prefix.length) + pad("", diff, "0", !0) + value.slice(prefix.length)
                }
                return value
            }

            function formatBaseX(value, base, prefix, leftJustify, minWidth, precision, zeroPad, htmlSpace) {
                var number = value >>> 0;
                return prefix = prefix && number && {
                    2: "0b",
                    8: "0",
                    16: "0x"
                }[base] || "", value = prefix + pad(number.toString(base), precision || 0, "0", !1), justify(value, prefix, leftJustify, minWidth, zeroPad, htmlSpace)
            }

            function formatString(value, leftJustify, minWidth, precision, zeroPad, htmlSpace) {
                return null != precision && (value = value.slice(0, precision)), justify(value, "", leftJustify, minWidth, zeroPad, htmlSpace)
            }
            var a = arguments,
                i = 0,
                format = a[i++];
            return format.replace($.jqplot.sprintf.regex, function(substring, valueIndex, flags, minWidth, _, precision, type) {
                if ("%%" == substring) return "%";
                for (var leftJustify = !1, positivePrefix = "", zeroPad = !1, prefixBaseX = !1, htmlSpace = !1, thousandSeparation = !1, j = 0; flags && j < flags.length; j++) switch (flags.charAt(j)) {
                    case " ":
                        positivePrefix = " ";
                        break;
                    case "+":
                        positivePrefix = "+";
                        break;
                    case "-":
                        leftJustify = !0;
                        break;
                    case "0":
                        zeroPad = !0;
                        break;
                    case "#":
                        prefixBaseX = !0;
                        break;
                    case "&":
                        htmlSpace = !0;
                        break;
                    case "'":
                        thousandSeparation = !0
                }
                if (minWidth = minWidth ? "*" == minWidth ? +a[i++] : "*" == minWidth.charAt(0) ? +a[minWidth.slice(1, -1)] : +minWidth : 0, 0 > minWidth && (minWidth = -minWidth, leftJustify = !0), !isFinite(minWidth)) throw new Error("$.jqplot.sprintf: (minimum-)width must be finite");
                precision = precision ? "*" == precision ? +a[i++] : "*" == precision.charAt(0) ? +a[precision.slice(1, -1)] : +precision : "fFeE".indexOf(type) > -1 ? 6 : "d" == type ? 0 : void 0;
                var value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];
                switch (type) {
                    case "s":
                        return null == value ? "" : formatString(String(value), leftJustify, minWidth, precision, zeroPad, htmlSpace);
                    case "c":
                        return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad, htmlSpace);
                    case "b":
                        return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad, htmlSpace);
                    case "o":
                        return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad, htmlSpace);
                    case "x":
                        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad, htmlSpace);
                    case "X":
                        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad, htmlSpace).toUpperCase();
                    case "u":
                        return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad, htmlSpace);
                    case "i":
                        var number = parseInt(+value, 10);
                        if (isNaN(number)) return "";
                        var prefix = 0 > number ? "-" : positivePrefix,
                            number_str = thousandSeparation ? thousand_separate(String(Math.abs(number))) : String(Math.abs(number));
                        return value = prefix + pad(number_str, precision, "0", !1), justify(value, prefix, leftJustify, minWidth, zeroPad, htmlSpace);
                    case "d":
                        var number = Math.round(+value);
                        if (isNaN(number)) return "";
                        var prefix = 0 > number ? "-" : positivePrefix,
                            number_str = thousandSeparation ? thousand_separate(String(Math.abs(number))) : String(Math.abs(number));
                        return value = prefix + pad(number_str, precision, "0", !1), justify(value, prefix, leftJustify, minWidth, zeroPad, htmlSpace);
                    case "e":
                    case "E":
                    case "f":
                    case "F":
                    case "g":
                    case "G":
                        var number = +value;
                        if (isNaN(number)) return "";
                        var prefix = 0 > number ? "-" : positivePrefix,
                            method = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(type.toLowerCase())],
                            textTransform = ["toString", "toUpperCase"]["eEfFgG".indexOf(type) % 2],
                            number_str = Math.abs(number)[method](precision),
                            parts = number_str.toString().split(".");
                        parts[0] = thousandSeparation ? thousand_separate(parts[0]) : parts[0], number_str = parts.join($.jqplot.sprintf.decimalMark), value = prefix + number_str;
                        var justified = justify(value, prefix, leftJustify, minWidth, zeroPad, htmlSpace)[textTransform]();
                        return justified;
                    case "p":
                    case "P":
                        var number = +value;
                        if (isNaN(number)) return "";
                        var prefix = 0 > number ? "-" : positivePrefix,
                            parts = String(Number(Math.abs(number)).toExponential()).split(/e|E/),
                            sd = -1 != parts[0].indexOf(".") ? parts[0].length - 1 : String(number).length,
                            zeros = parts[1] < 0 ? -parts[1] - 1 : 0;
                        if (Math.abs(number) < 1) value = precision >= sd + zeros ? prefix + Math.abs(number).toPrecision(sd) : precision - 1 >= sd ? prefix + Math.abs(number).toExponential(sd - 1) : prefix + Math.abs(number).toExponential(precision - 1);
                        else {
                            var prec = precision >= sd ? sd : precision;
                            value = prefix + Math.abs(number).toPrecision(prec)
                        }
                        var textTransform = ["toString", "toUpperCase"]["pP".indexOf(type) % 2];
                        return justify(value, prefix, leftJustify, minWidth, zeroPad, htmlSpace)[textTransform]();
                    case "n":
                        return "";
                    default:
                        return substring
                }
            })
        }, $.jqplot.sprintf.thousandsSeparator = ",", $.jqplot.sprintf.decimalMark = ".", $.jqplot.sprintf.regex = /%%|%(\d+\$)?([-+#0&\' ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g, $.jqplot.getSignificantFigures = function(number) {
            var parts = String(Number(Math.abs(number)).toExponential()).split(/e|E/),
                sd = -1 != parts[0].indexOf(".") ? parts[0].length - 1 : parts[0].length,
                zeros = parts[1] < 0 ? -parts[1] - 1 : 0,
                expn = parseInt(parts[1], 10),
                dleft = expn + 1 > 0 ? expn + 1 : 0,
                dright = dleft >= sd ? 0 : sd - expn - 1;
            return {
                significantDigits: sd,
                digitsLeft: dleft,
                digitsRight: dright,
                zeros: zeros,
                exponent: expn
            }
        }, $.jqplot.getPrecision = function(number) {
            return $.jqplot.getSignificantFigures(number).digitsRight
        };
        var backCompat = $.uiBackCompat !== !1;
        $.jqplot.effects = {
            effect: {}
        };
        var dataSpace = "jqplot.storage.";
        $.extend($.jqplot.effects, {
            version: "1.9pre",
            save: function(element, set) {
                for (var i = 0; i < set.length; i++) null !== set[i] && element.data(dataSpace + set[i], element[0].style[set[i]])
            },
            restore: function(element, set) {
                for (var i = 0; i < set.length; i++) null !== set[i] && element.css(set[i], element.data(dataSpace + set[i]))
            },
            setMode: function(el, mode) {
                return "toggle" === mode && (mode = el.is(":hidden") ? "show" : "hide"), mode
            },
            createWrapper: function(element) {
                if (element.parent().is(".ui-effects-wrapper")) return element.parent();
                var props = {
                        width: element.outerWidth(!0),
                        height: element.outerHeight(!0),
                        "float": element.css("float")
                    },
                    wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    size = {
                        width: element.width(),
                        height: element.height()
                    },
                    active = document.activeElement;
                return element.wrap(wrapper), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), wrapper = element.parent(), "static" === element.css("position") ? (wrapper.css({
                    position: "relative"
                }), element.css({
                    position: "relative"
                })) : ($.extend(props, {
                    position: element.css("position"),
                    zIndex: element.css("z-index")
                }), $.each(["top", "left", "bottom", "right"], function(i, pos) {
                    props[pos] = element.css(pos), isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto")
                }), element.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), element.css(size), wrapper.css(props).show()
            },
            removeWrapper: function(element) {
                var active = document.activeElement;
                return element.parent().is(".ui-effects-wrapper") && (element.parent().replaceWith(element), (element[0] === active || $.contains(element[0], active)) && $(active).focus()), element
            }
        }), $.fn.extend({
            jqplotEffect: function(effect, options, speed, callback) {
                function run(next) {
                    function done() {
                        $.isFunction(complete) && complete.call(elem[0]), $.isFunction(next) && next()
                    }
                    var elem = $(this),
                        complete = args.complete,
                        mode = args.mode;
                    (elem.is(":hidden") ? "hide" === mode : "show" === mode) ? done(): effectMethod.call(elem[0], args, done)
                }
                var args = _normalizeArguments.apply(this, arguments),
                    mode = args.mode,
                    queue = args.queue,
                    effectMethod = $.jqplot.effects.effect[args.effect],
                    oldEffectMethod = !effectMethod && backCompat && $.jqplot.effects[args.effect];
                return $.fx.off || !effectMethod && !oldEffectMethod ? mode ? this[mode](args.duration, args.complete) : this.each(function() {
                    args.complete && args.complete.call(this)
                }) : effectMethod ? queue === !1 ? this.each(run) : this.queue(queue || "fx", run) : oldEffectMethod.call(this, {
                    options: args,
                    duration: args.duration,
                    callback: args.complete,
                    mode: args.mode
                })
            }
        });
        var rvertical = /up|down|vertical/,
            rpositivemotion = /up|left|vertical|horizontal/;
        $.jqplot.effects.effect.blind = function(o, done) {
            var wrapper, distance, top, el = $(this),
                props = ["position", "top", "bottom", "left", "right", "height", "width"],
                mode = $.jqplot.effects.setMode(el, o.mode || "hide"),
                direction = o.direction || "up",
                vertical = rvertical.test(direction),
                ref = vertical ? "height" : "width",
                ref2 = vertical ? "top" : "left",
                motion = rpositivemotion.test(direction),
                animation = {},
                show = "show" === mode;
            el.parent().is(".ui-effects-wrapper") ? $.jqplot.effects.save(el.parent(), props) : $.jqplot.effects.save(el, props), el.show(), top = parseInt(el.css("top"), 10), wrapper = $.jqplot.effects.createWrapper(el).css({
                overflow: "hidden"
            }), distance = vertical ? wrapper[ref]() + top : wrapper[ref](), animation[ref] = show ? String(distance) : "0", motion || (el.css(vertical ? "bottom" : "right", 0).css(vertical ? "top" : "left", "").css({
                position: "absolute"
            }), animation[ref2] = show ? "0" : String(distance)), show && (wrapper.css(ref, 0), motion || wrapper.css(ref2, distance)), wrapper.animate(animation, {
                duration: o.duration,
                easing: o.easing,
                queue: !1,
                complete: function() {
                    "hide" === mode && el.hide(), $.jqplot.effects.restore(el, props), $.jqplot.effects.removeWrapper(el), done()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.jqplot.CanvasTextRenderer = function(b) {
            this.fontStyle = "normal", this.fontVariant = "normal", this.fontWeight = "normal", this.fontSize = "10px", this.fontFamily = "sans-serif", this.fontStretch = 1, this.fillStyle = "#666666", this.angle = 0, this.textAlign = "start", this.textBaseline = "alphabetic", this.text, this.width, this.height, this.pt2px = 1.28, a.extend(!0, this, b), this.normalizedFontSize = this.normalizeFontSize(this.fontSize), this.setHeight()
        }, a.jqplot.CanvasTextRenderer.prototype.init = function(b) {
            a.extend(!0, this, b), this.normalizedFontSize = this.normalizeFontSize(this.fontSize), this.setHeight()
        }, a.jqplot.CanvasTextRenderer.prototype.normalizeFontSize = function(b) {
            b = String(b);
            var c = parseFloat(b);
            return b.indexOf("px") > -1 ? c / this.pt2px : b.indexOf("pt") > -1 ? c : b.indexOf("em") > -1 ? 12 * c : b.indexOf("%") > -1 ? 12 * c / 100 : c / this.pt2px
        }, a.jqplot.CanvasTextRenderer.prototype.fontWeight2Float = function(b) {
            if (Number(b)) return b / 400;
            switch (b) {
                case "normal":
                    return 1;
                case "bold":
                    return 1.75;
                case "bolder":
                    return 2.25;
                case "lighter":
                    return .75;
                default:
                    return 1
            }
        }, a.jqplot.CanvasTextRenderer.prototype.getText = function() {
            return this.text
        }, a.jqplot.CanvasTextRenderer.prototype.setText = function(c, b) {
            return this.text = c, this.setWidth(b), this
        }, a.jqplot.CanvasTextRenderer.prototype.getWidth = function(b) {
            return this.width
        }, a.jqplot.CanvasTextRenderer.prototype.setWidth = function(c, b) {
            return b ? this.width = b : this.width = this.measure(c, this.text), this
        }, a.jqplot.CanvasTextRenderer.prototype.getHeight = function(b) {
            return this.height
        }, a.jqplot.CanvasTextRenderer.prototype.setHeight = function(b) {
            return b ? this.height = b : this.height = this.normalizedFontSize * this.pt2px, this
        }, a.jqplot.CanvasTextRenderer.prototype.letter = function(b) {
            return this.letters[b]
        }, a.jqplot.CanvasTextRenderer.prototype.ascent = function() {
            return this.normalizedFontSize
        }, a.jqplot.CanvasTextRenderer.prototype.descent = function() {
            return 7 * this.normalizedFontSize / 25
        }, a.jqplot.CanvasTextRenderer.prototype.measure = function(d, g) {
            for (var f = 0, b = g.length, e = 0; b > e; e++) {
                var h = this.letter(g.charAt(e));
                h && (f += h.width * this.normalizedFontSize / 25 * this.fontStretch)
            }
            return f
        }, a.jqplot.CanvasTextRenderer.prototype.draw = function(s, n) {
            var r = 0,
                o = .72 * this.height,
                p = 0,
                l = n.length,
                k = this.normalizedFontSize / 25;
            s.save();
            var h, f; - Math.PI / 2 <= this.angle && this.angle <= 0 || 3 * Math.PI / 2 <= this.angle && this.angle <= 2 * Math.PI ? (h = 0, f = -Math.sin(this.angle) * this.width) : 0 < this.angle && this.angle <= Math.PI / 2 || 2 * -Math.PI <= this.angle && this.angle <= 3 * -Math.PI / 2 ? (h = Math.sin(this.angle) * this.height, f = 0) : -Math.PI < this.angle && this.angle < -Math.PI / 2 || Math.PI <= this.angle && this.angle <= 3 * Math.PI / 2 ? (h = -Math.cos(this.angle) * this.width, f = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height) : (3 * -Math.PI / 2 < this.angle && this.angle < Math.PI || Math.PI / 2 < this.angle && this.angle < Math.PI) && (h = Math.sin(this.angle) * this.height - Math.cos(this.angle) * this.width, f = -Math.cos(this.angle) * this.height), s.strokeStyle = this.fillStyle, s.fillStyle = this.fillStyle, s.translate(h, f), s.rotate(this.angle), s.lineCap = "round";
            var t = this.normalizedFontSize > 30 ? 2 : 2 + (30 - this.normalizedFontSize) / 20;
            s.lineWidth = t * k * this.fontWeight2Float(this.fontWeight);
            for (var g = 0; l > g; g++) {
                var m = this.letter(n.charAt(g));
                if (m) {
                    s.beginPath();
                    for (var e = 1, d = 0; d < m.points.length; d++) {
                        var q = m.points[d]; - 1 != q[0] || -1 != q[1] ? e ? (s.moveTo(r + q[0] * k * this.fontStretch, o - q[1] * k), e = !1) : s.lineTo(r + q[0] * k * this.fontStretch, o - q[1] * k) : e = 1
                    }
                    s.stroke(), r += m.width * k * this.fontStretch
                }
            }
            return s.restore(), p
        }, a.jqplot.CanvasTextRenderer.prototype.letters = {
            " ": {
                width: 16,
                points: []
            },
            "!": {
                width: 10,
                points: [
                    [5, 21],
                    [5, 7],
                    [-1, -1],
                    [5, 2],
                    [4, 1],
                    [5, 0],
                    [6, 1],
                    [5, 2]
                ]
            },
            '"': {
                width: 16,
                points: [
                    [4, 21],
                    [4, 14],
                    [-1, -1],
                    [12, 21],
                    [12, 14]
                ]
            },
            "#": {
                width: 21,
                points: [
                    [11, 25],
                    [4, -7],
                    [-1, -1],
                    [17, 25],
                    [10, -7],
                    [-1, -1],
                    [4, 12],
                    [18, 12],
                    [-1, -1],
                    [3, 6],
                    [17, 6]
                ]
            },
            $: {
                width: 20,
                points: [
                    [8, 25],
                    [8, -4],
                    [-1, -1],
                    [12, 25],
                    [12, -4],
                    [-1, -1],
                    [17, 18],
                    [15, 20],
                    [12, 21],
                    [8, 21],
                    [5, 20],
                    [3, 18],
                    [3, 16],
                    [4, 14],
                    [5, 13],
                    [7, 12],
                    [13, 10],
                    [15, 9],
                    [16, 8],
                    [17, 6],
                    [17, 3],
                    [15, 1],
                    [12, 0],
                    [8, 0],
                    [5, 1],
                    [3, 3]
                ]
            },
            "%": {
                width: 24,
                points: [
                    [21, 21],
                    [3, 0],
                    [-1, -1],
                    [8, 21],
                    [10, 19],
                    [10, 17],
                    [9, 15],
                    [7, 14],
                    [5, 14],
                    [3, 16],
                    [3, 18],
                    [4, 20],
                    [6, 21],
                    [8, 21],
                    [10, 20],
                    [13, 19],
                    [16, 19],
                    [19, 20],
                    [21, 21],
                    [-1, -1],
                    [17, 7],
                    [15, 6],
                    [14, 4],
                    [14, 2],
                    [16, 0],
                    [18, 0],
                    [20, 1],
                    [21, 3],
                    [21, 5],
                    [19, 7],
                    [17, 7]
                ]
            },
            "&": {
                width: 26,
                points: [
                    [23, 12],
                    [23, 13],
                    [22, 14],
                    [21, 14],
                    [20, 13],
                    [19, 11],
                    [17, 6],
                    [15, 3],
                    [13, 1],
                    [11, 0],
                    [7, 0],
                    [5, 1],
                    [4, 2],
                    [3, 4],
                    [3, 6],
                    [4, 8],
                    [5, 9],
                    [12, 13],
                    [13, 14],
                    [14, 16],
                    [14, 18],
                    [13, 20],
                    [11, 21],
                    [9, 20],
                    [8, 18],
                    [8, 16],
                    [9, 13],
                    [11, 10],
                    [16, 3],
                    [18, 1],
                    [20, 0],
                    [22, 0],
                    [23, 1],
                    [23, 2]
                ]
            },
            "'": {
                width: 10,
                points: [
                    [5, 19],
                    [4, 20],
                    [5, 21],
                    [6, 20],
                    [6, 18],
                    [5, 16],
                    [4, 15]
                ]
            },
            "(": {
                width: 14,
                points: [
                    [11, 25],
                    [9, 23],
                    [7, 20],
                    [5, 16],
                    [4, 11],
                    [4, 7],
                    [5, 2],
                    [7, -2],
                    [9, -5],
                    [11, -7]
                ]
            },
            ")": {
                width: 14,
                points: [
                    [3, 25],
                    [5, 23],
                    [7, 20],
                    [9, 16],
                    [10, 11],
                    [10, 7],
                    [9, 2],
                    [7, -2],
                    [5, -5],
                    [3, -7]
                ]
            },
            "*": {
                width: 16,
                points: [
                    [8, 21],
                    [8, 9],
                    [-1, -1],
                    [3, 18],
                    [13, 12],
                    [-1, -1],
                    [13, 18],
                    [3, 12]
                ]
            },
            "+": {
                width: 26,
                points: [
                    [13, 18],
                    [13, 0],
                    [-1, -1],
                    [4, 9],
                    [22, 9]
                ]
            },
            ",": {
                width: 10,
                points: [
                    [6, 1],
                    [5, 0],
                    [4, 1],
                    [5, 2],
                    [6, 1],
                    [6, -1],
                    [5, -3],
                    [4, -4]
                ]
            },
            "-": {
                width: 18,
                points: [
                    [6, 9],
                    [12, 9]
                ]
            },
            ".": {
                width: 10,
                points: [
                    [5, 2],
                    [4, 1],
                    [5, 0],
                    [6, 1],
                    [5, 2]
                ]
            },
            "/": {
                width: 22,
                points: [
                    [20, 25],
                    [2, -7]
                ]
            },
            0: {
                width: 20,
                points: [
                    [9, 21],
                    [6, 20],
                    [4, 17],
                    [3, 12],
                    [3, 9],
                    [4, 4],
                    [6, 1],
                    [9, 0],
                    [11, 0],
                    [14, 1],
                    [16, 4],
                    [17, 9],
                    [17, 12],
                    [16, 17],
                    [14, 20],
                    [11, 21],
                    [9, 21]
                ]
            },
            1: {
                width: 20,
                points: [
                    [6, 17],
                    [8, 18],
                    [11, 21],
                    [11, 0]
                ]
            },
            2: {
                width: 20,
                points: [
                    [4, 16],
                    [4, 17],
                    [5, 19],
                    [6, 20],
                    [8, 21],
                    [12, 21],
                    [14, 20],
                    [15, 19],
                    [16, 17],
                    [16, 15],
                    [15, 13],
                    [13, 10],
                    [3, 0],
                    [17, 0]
                ]
            },
            3: {
                width: 20,
                points: [
                    [5, 21],
                    [16, 21],
                    [10, 13],
                    [13, 13],
                    [15, 12],
                    [16, 11],
                    [17, 8],
                    [17, 6],
                    [16, 3],
                    [14, 1],
                    [11, 0],
                    [8, 0],
                    [5, 1],
                    [4, 2],
                    [3, 4]
                ]
            },
            4: {
                width: 20,
                points: [
                    [13, 21],
                    [3, 7],
                    [18, 7],
                    [-1, -1],
                    [13, 21],
                    [13, 0]
                ]
            },
            5: {
                width: 20,
                points: [
                    [15, 21],
                    [5, 21],
                    [4, 12],
                    [5, 13],
                    [8, 14],
                    [11, 14],
                    [14, 13],
                    [16, 11],
                    [17, 8],
                    [17, 6],
                    [16, 3],
                    [14, 1],
                    [11, 0],
                    [8, 0],
                    [5, 1],
                    [4, 2],
                    [3, 4]
                ]
            },
            6: {
                width: 20,
                points: [
                    [16, 18],
                    [15, 20],
                    [12, 21],
                    [10, 21],
                    [7, 20],
                    [5, 17],
                    [4, 12],
                    [4, 7],
                    [5, 3],
                    [7, 1],
                    [10, 0],
                    [11, 0],
                    [14, 1],
                    [16, 3],
                    [17, 6],
                    [17, 7],
                    [16, 10],
                    [14, 12],
                    [11, 13],
                    [10, 13],
                    [7, 12],
                    [5, 10],
                    [4, 7]
                ]
            },
            7: {
                width: 20,
                points: [
                    [17, 21],
                    [7, 0],
                    [-1, -1],
                    [3, 21],
                    [17, 21]
                ]
            },
            8: {
                width: 20,
                points: [
                    [8, 21],
                    [5, 20],
                    [4, 18],
                    [4, 16],
                    [5, 14],
                    [7, 13],
                    [11, 12],
                    [14, 11],
                    [16, 9],
                    [17, 7],
                    [17, 4],
                    [16, 2],
                    [15, 1],
                    [12, 0],
                    [8, 0],
                    [5, 1],
                    [4, 2],
                    [3, 4],
                    [3, 7],
                    [4, 9],
                    [6, 11],
                    [9, 12],
                    [13, 13],
                    [15, 14],
                    [16, 16],
                    [16, 18],
                    [15, 20],
                    [12, 21],
                    [8, 21]
                ]
            },
            9: {
                width: 20,
                points: [
                    [16, 14],
                    [15, 11],
                    [13, 9],
                    [10, 8],
                    [9, 8],
                    [6, 9],
                    [4, 11],
                    [3, 14],
                    [3, 15],
                    [4, 18],
                    [6, 20],
                    [9, 21],
                    [10, 21],
                    [13, 20],
                    [15, 18],
                    [16, 14],
                    [16, 9],
                    [15, 4],
                    [13, 1],
                    [10, 0],
                    [8, 0],
                    [5, 1],
                    [4, 3]
                ]
            },
            ":": {
                width: 10,
                points: [
                    [5, 14],
                    [4, 13],
                    [5, 12],
                    [6, 13],
                    [5, 14],
                    [-1, -1],
                    [5, 2],
                    [4, 1],
                    [5, 0],
                    [6, 1],
                    [5, 2]
                ]
            },
            ";": {
                width: 10,
                points: [
                    [5, 14],
                    [4, 13],
                    [5, 12],
                    [6, 13],
                    [5, 14],
                    [-1, -1],
                    [6, 1],
                    [5, 0],
                    [4, 1],
                    [5, 2],
                    [6, 1],
                    [6, -1],
                    [5, -3],
                    [4, -4]
                ]
            },
            "<": {
                width: 24,
                points: [
                    [20, 18],
                    [4, 9],
                    [20, 0]
                ]
            },
            "=": {
                width: 26,
                points: [
                    [4, 12],
                    [22, 12],
                    [-1, -1],
                    [4, 6],
                    [22, 6]
                ]
            },
            ">": {
                width: 24,
                points: [
                    [4, 18],
                    [20, 9],
                    [4, 0]
                ]
            },
            "?": {
                width: 18,
                points: [
                    [3, 16],
                    [3, 17],
                    [4, 19],
                    [5, 20],
                    [7, 21],
                    [11, 21],
                    [13, 20],
                    [14, 19],
                    [15, 17],
                    [15, 15],
                    [14, 13],
                    [13, 12],
                    [9, 10],
                    [9, 7],
                    [-1, -1],
                    [9, 2],
                    [8, 1],
                    [9, 0],
                    [10, 1],
                    [9, 2]
                ]
            },
            "@": {
                width: 27,
                points: [
                    [18, 13],
                    [17, 15],
                    [15, 16],
                    [12, 16],
                    [10, 15],
                    [9, 14],
                    [8, 11],
                    [8, 8],
                    [9, 6],
                    [11, 5],
                    [14, 5],
                    [16, 6],
                    [17, 8],
                    [-1, -1],
                    [12, 16],
                    [10, 14],
                    [9, 11],
                    [9, 8],
                    [10, 6],
                    [11, 5],
                    [-1, -1],
                    [18, 16],
                    [17, 8],
                    [17, 6],
                    [19, 5],
                    [21, 5],
                    [23, 7],
                    [24, 10],
                    [24, 12],
                    [23, 15],
                    [22, 17],
                    [20, 19],
                    [18, 20],
                    [15, 21],
                    [12, 21],
                    [9, 20],
                    [7, 19],
                    [5, 17],
                    [4, 15],
                    [3, 12],
                    [3, 9],
                    [4, 6],
                    [5, 4],
                    [7, 2],
                    [9, 1],
                    [12, 0],
                    [15, 0],
                    [18, 1],
                    [20, 2],
                    [21, 3],
                    [-1, -1],
                    [19, 16],
                    [18, 8],
                    [18, 6],
                    [19, 5]
                ]
            },
            A: {
                width: 18,
                points: [
                    [9, 21],
                    [1, 0],
                    [-1, -1],
                    [9, 21],
                    [17, 0],
                    [-1, -1],
                    [4, 7],
                    [14, 7]
                ]
            },
            B: {
                width: 21,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [13, 21],
                    [16, 20],
                    [17, 19],
                    [18, 17],
                    [18, 15],
                    [17, 13],
                    [16, 12],
                    [13, 11],
                    [-1, -1],
                    [4, 11],
                    [13, 11],
                    [16, 10],
                    [17, 9],
                    [18, 7],
                    [18, 4],
                    [17, 2],
                    [16, 1],
                    [13, 0],
                    [4, 0]
                ]
            },
            C: {
                width: 21,
                points: [
                    [18, 16],
                    [17, 18],
                    [15, 20],
                    [13, 21],
                    [9, 21],
                    [7, 20],
                    [5, 18],
                    [4, 16],
                    [3, 13],
                    [3, 8],
                    [4, 5],
                    [5, 3],
                    [7, 1],
                    [9, 0],
                    [13, 0],
                    [15, 1],
                    [17, 3],
                    [18, 5]
                ]
            },
            D: {
                width: 21,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [11, 21],
                    [14, 20],
                    [16, 18],
                    [17, 16],
                    [18, 13],
                    [18, 8],
                    [17, 5],
                    [16, 3],
                    [14, 1],
                    [11, 0],
                    [4, 0]
                ]
            },
            E: {
                width: 19,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [17, 21],
                    [-1, -1],
                    [4, 11],
                    [12, 11],
                    [-1, -1],
                    [4, 0],
                    [17, 0]
                ]
            },
            F: {
                width: 18,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [17, 21],
                    [-1, -1],
                    [4, 11],
                    [12, 11]
                ]
            },
            G: {
                width: 21,
                points: [
                    [18, 16],
                    [17, 18],
                    [15, 20],
                    [13, 21],
                    [9, 21],
                    [7, 20],
                    [5, 18],
                    [4, 16],
                    [3, 13],
                    [3, 8],
                    [4, 5],
                    [5, 3],
                    [7, 1],
                    [9, 0],
                    [13, 0],
                    [15, 1],
                    [17, 3],
                    [18, 5],
                    [18, 8],
                    [-1, -1],
                    [13, 8],
                    [18, 8]
                ]
            },
            H: {
                width: 22,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [18, 21],
                    [18, 0],
                    [-1, -1],
                    [4, 11],
                    [18, 11]
                ]
            },
            I: {
                width: 8,
                points: [
                    [4, 21],
                    [4, 0]
                ]
            },
            J: {
                width: 16,
                points: [
                    [12, 21],
                    [12, 5],
                    [11, 2],
                    [10, 1],
                    [8, 0],
                    [6, 0],
                    [4, 1],
                    [3, 2],
                    [2, 5],
                    [2, 7]
                ]
            },
            K: {
                width: 21,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [18, 21],
                    [4, 7],
                    [-1, -1],
                    [9, 12],
                    [18, 0]
                ]
            },
            L: {
                width: 17,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 0],
                    [16, 0]
                ]
            },
            M: {
                width: 24,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [12, 0],
                    [-1, -1],
                    [20, 21],
                    [12, 0],
                    [-1, -1],
                    [20, 21],
                    [20, 0]
                ]
            },
            N: {
                width: 22,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [18, 0],
                    [-1, -1],
                    [18, 21],
                    [18, 0]
                ]
            },
            O: {
                width: 22,
                points: [
                    [9, 21],
                    [7, 20],
                    [5, 18],
                    [4, 16],
                    [3, 13],
                    [3, 8],
                    [4, 5],
                    [5, 3],
                    [7, 1],
                    [9, 0],
                    [13, 0],
                    [15, 1],
                    [17, 3],
                    [18, 5],
                    [19, 8],
                    [19, 13],
                    [18, 16],
                    [17, 18],
                    [15, 20],
                    [13, 21],
                    [9, 21]
                ]
            },
            P: {
                width: 21,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [13, 21],
                    [16, 20],
                    [17, 19],
                    [18, 17],
                    [18, 14],
                    [17, 12],
                    [16, 11],
                    [13, 10],
                    [4, 10]
                ]
            },
            Q: {
                width: 22,
                points: [
                    [9, 21],
                    [7, 20],
                    [5, 18],
                    [4, 16],
                    [3, 13],
                    [3, 8],
                    [4, 5],
                    [5, 3],
                    [7, 1],
                    [9, 0],
                    [13, 0],
                    [15, 1],
                    [17, 3],
                    [18, 5],
                    [19, 8],
                    [19, 13],
                    [18, 16],
                    [17, 18],
                    [15, 20],
                    [13, 21],
                    [9, 21],
                    [-1, -1],
                    [12, 4],
                    [18, -2]
                ]
            },
            R: {
                width: 21,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 21],
                    [13, 21],
                    [16, 20],
                    [17, 19],
                    [18, 17],
                    [18, 15],
                    [17, 13],
                    [16, 12],
                    [13, 11],
                    [4, 11],
                    [-1, -1],
                    [11, 11],
                    [18, 0]
                ]
            },
            S: {
                width: 20,
                points: [
                    [17, 18],
                    [15, 20],
                    [12, 21],
                    [8, 21],
                    [5, 20],
                    [3, 18],
                    [3, 16],
                    [4, 14],
                    [5, 13],
                    [7, 12],
                    [13, 10],
                    [15, 9],
                    [16, 8],
                    [17, 6],
                    [17, 3],
                    [15, 1],
                    [12, 0],
                    [8, 0],
                    [5, 1],
                    [3, 3]
                ]
            },
            T: {
                width: 16,
                points: [
                    [8, 21],
                    [8, 0],
                    [-1, -1],
                    [1, 21],
                    [15, 21]
                ]
            },
            U: {
                width: 22,
                points: [
                    [4, 21],
                    [4, 6],
                    [5, 3],
                    [7, 1],
                    [10, 0],
                    [12, 0],
                    [15, 1],
                    [17, 3],
                    [18, 6],
                    [18, 21]
                ]
            },
            V: {
                width: 18,
                points: [
                    [1, 21],
                    [9, 0],
                    [-1, -1],
                    [17, 21],
                    [9, 0]
                ]
            },
            W: {
                width: 24,
                points: [
                    [2, 21],
                    [7, 0],
                    [-1, -1],
                    [12, 21],
                    [7, 0],
                    [-1, -1],
                    [12, 21],
                    [17, 0],
                    [-1, -1],
                    [22, 21],
                    [17, 0]
                ]
            },
            X: {
                width: 20,
                points: [
                    [3, 21],
                    [17, 0],
                    [-1, -1],
                    [17, 21],
                    [3, 0]
                ]
            },
            Y: {
                width: 18,
                points: [
                    [1, 21],
                    [9, 11],
                    [9, 0],
                    [-1, -1],
                    [17, 21],
                    [9, 11]
                ]
            },
            Z: {
                width: 20,
                points: [
                    [17, 21],
                    [3, 0],
                    [-1, -1],
                    [3, 21],
                    [17, 21],
                    [-1, -1],
                    [3, 0],
                    [17, 0]
                ]
            },
            "[": {
                width: 14,
                points: [
                    [4, 25],
                    [4, -7],
                    [-1, -1],
                    [5, 25],
                    [5, -7],
                    [-1, -1],
                    [4, 25],
                    [11, 25],
                    [-1, -1],
                    [4, -7],
                    [11, -7]
                ]
            },
            "\\": {
                width: 14,
                points: [
                    [0, 21],
                    [14, -3]
                ]
            },
            "]": {
                width: 14,
                points: [
                    [9, 25],
                    [9, -7],
                    [-1, -1],
                    [10, 25],
                    [10, -7],
                    [-1, -1],
                    [3, 25],
                    [10, 25],
                    [-1, -1],
                    [3, -7],
                    [10, -7]
                ]
            },
            "^": {
                width: 16,
                points: [
                    [6, 15],
                    [8, 18],
                    [10, 15],
                    [-1, -1],
                    [3, 12],
                    [8, 17],
                    [13, 12],
                    [-1, -1],
                    [8, 17],
                    [8, 0]
                ]
            },
            _: {
                width: 16,
                points: [
                    [0, -2],
                    [16, -2]
                ]
            },
            "`": {
                width: 10,
                points: [
                    [6, 21],
                    [5, 20],
                    [4, 18],
                    [4, 16],
                    [5, 15],
                    [6, 16],
                    [5, 17]
                ]
            },
            a: {
                width: 19,
                points: [
                    [15, 14],
                    [15, 0],
                    [-1, -1],
                    [15, 11],
                    [13, 13],
                    [11, 14],
                    [8, 14],
                    [6, 13],
                    [4, 11],
                    [3, 8],
                    [3, 6],
                    [4, 3],
                    [6, 1],
                    [8, 0],
                    [11, 0],
                    [13, 1],
                    [15, 3]
                ]
            },
            b: {
                width: 19,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 11],
                    [6, 13],
                    [8, 14],
                    [11, 14],
                    [13, 13],
                    [15, 11],
                    [16, 8],
                    [16, 6],
                    [15, 3],
                    [13, 1],
                    [11, 0],
                    [8, 0],
                    [6, 1],
                    [4, 3]
                ]
            },
            c: {
                width: 18,
                points: [
                    [15, 11],
                    [13, 13],
                    [11, 14],
                    [8, 14],
                    [6, 13],
                    [4, 11],
                    [3, 8],
                    [3, 6],
                    [4, 3],
                    [6, 1],
                    [8, 0],
                    [11, 0],
                    [13, 1],
                    [15, 3]
                ]
            },
            d: {
                width: 19,
                points: [
                    [15, 21],
                    [15, 0],
                    [-1, -1],
                    [15, 11],
                    [13, 13],
                    [11, 14],
                    [8, 14],
                    [6, 13],
                    [4, 11],
                    [3, 8],
                    [3, 6],
                    [4, 3],
                    [6, 1],
                    [8, 0],
                    [11, 0],
                    [13, 1],
                    [15, 3]
                ]
            },
            e: {
                width: 18,
                points: [
                    [3, 8],
                    [15, 8],
                    [15, 10],
                    [14, 12],
                    [13, 13],
                    [11, 14],
                    [8, 14],
                    [6, 13],
                    [4, 11],
                    [3, 8],
                    [3, 6],
                    [4, 3],
                    [6, 1],
                    [8, 0],
                    [11, 0],
                    [13, 1],
                    [15, 3]
                ]
            },
            f: {
                width: 12,
                points: [
                    [10, 21],
                    [8, 21],
                    [6, 20],
                    [5, 17],
                    [5, 0],
                    [-1, -1],
                    [2, 14],
                    [9, 14]
                ]
            },
            g: {
                width: 19,
                points: [
                    [15, 14],
                    [15, -2],
                    [14, -5],
                    [13, -6],
                    [11, -7],
                    [8, -7],
                    [6, -6],
                    [-1, -1],
                    [15, 11],
                    [13, 13],
                    [11, 14],
                    [8, 14],
                    [6, 13],
                    [4, 11],
                    [3, 8],
                    [3, 6],
                    [4, 3],
                    [6, 1],
                    [8, 0],
                    [11, 0],
                    [13, 1],
                    [15, 3]
                ]
            },
            h: {
                width: 19,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [4, 10],
                    [7, 13],
                    [9, 14],
                    [12, 14],
                    [14, 13],
                    [15, 10],
                    [15, 0]
                ]
            },
            i: {
                width: 8,
                points: [
                    [3, 21],
                    [4, 20],
                    [5, 21],
                    [4, 22],
                    [3, 21],
                    [-1, -1],
                    [4, 14],
                    [4, 0]
                ]
            },
            j: {
                width: 10,
                points: [
                    [5, 21],
                    [6, 20],
                    [7, 21],
                    [6, 22],
                    [5, 21],
                    [-1, -1],
                    [6, 14],
                    [6, -3],
                    [5, -6],
                    [3, -7],
                    [1, -7]
                ]
            },
            k: {
                width: 17,
                points: [
                    [4, 21],
                    [4, 0],
                    [-1, -1],
                    [14, 14],
                    [4, 4],
                    [-1, -1],
                    [8, 8],
                    [15, 0]
                ]
            },
            l: {
                width: 8,
                points: [
                    [4, 21],
                    [4, 0]
                ]
            },
            m: {
                width: 30,
                points: [
                    [4, 14],
                    [4, 0],
                    [-1, -1],
                    [4, 10],
                    [7, 13],
                    [9, 14],
                    [12, 14],
                    [14, 13],
                    [15, 10],
                    [15, 0],
                    [-1, -1],
                    [15, 10],
                    [18, 13],
                    [20, 14],
                    [23, 14],
                    [25, 13],
                    [26, 10],
                    [26, 0]
                ]
            },
            n: {
                width: 19,
                points: [
                    [4, 14],
                    [4, 0],
                    [-1, -1],
                    [4, 10],
                    [7, 13],
                    [9, 14],
                    [12, 14],
                    [14, 13],
                    [15, 10],
                    [15, 0]
                ]
            },
            o: {
                width: 19,
                points: [
                    [8, 14],
                    [6, 13],
                    [4, 11],
                    [3, 8],
                    [3, 6],
                    [4, 3],
                    [6, 1],
                    [8, 0],
                    [11, 0],
                    [13, 1],
                    [15, 3],
                    [16, 6],
                    [16, 8],
                    [15, 11],
                    [13, 13],
                    [11, 14],
                    [8, 14]
                ]
            },
            p: {
                width: 19,
                points: [
                    [4, 14],
                    [4, -7],
                    [-1, -1],
                    [4, 11],
                    [6, 13],
                    [8, 14],
                    [11, 14],
                    [13, 13],
                    [15, 11],
                    [16, 8],
                    [16, 6],
                    [15, 3],
                    [13, 1],
                    [11, 0],
                    [8, 0],
                    [6, 1],
                    [4, 3]
                ]
            },
            q: {
                width: 19,
                points: [
                    [15, 14],
                    [15, -7],
                    [-1, -1],
                    [15, 11],
                    [13, 13],
                    [11, 14],
                    [8, 14],
                    [6, 13],
                    [4, 11],
                    [3, 8],
                    [3, 6],
                    [4, 3],
                    [6, 1],
                    [8, 0],
                    [11, 0],
                    [13, 1],
                    [15, 3]
                ]
            },
            r: {
                width: 13,
                points: [
                    [4, 14],
                    [4, 0],
                    [-1, -1],
                    [4, 8],
                    [5, 11],
                    [7, 13],
                    [9, 14],
                    [12, 14]
                ]
            },
            s: {
                width: 17,
                points: [
                    [14, 11],
                    [13, 13],
                    [10, 14],
                    [7, 14],
                    [4, 13],
                    [3, 11],
                    [4, 9],
                    [6, 8],
                    [11, 7],
                    [13, 6],
                    [14, 4],
                    [14, 3],
                    [13, 1],
                    [10, 0],
                    [7, 0],
                    [4, 1],
                    [3, 3]
                ]
            },
            t: {
                width: 12,
                points: [
                    [5, 21],
                    [5, 4],
                    [6, 1],
                    [8, 0],
                    [10, 0],
                    [-1, -1],
                    [2, 14],
                    [9, 14]
                ]
            },
            u: {
                width: 19,
                points: [
                    [4, 14],
                    [4, 4],
                    [5, 1],
                    [7, 0],
                    [10, 0],
                    [12, 1],
                    [15, 4],
                    [-1, -1],
                    [15, 14],
                    [15, 0]
                ]
            },
            v: {
                width: 16,
                points: [
                    [2, 14],
                    [8, 0],
                    [-1, -1],
                    [14, 14],
                    [8, 0]
                ]
            },
            w: {
                width: 22,
                points: [
                    [3, 14],
                    [7, 0],
                    [-1, -1],
                    [11, 14],
                    [7, 0],
                    [-1, -1],
                    [11, 14],
                    [15, 0],
                    [-1, -1],
                    [19, 14],
                    [15, 0]
                ]
            },
            x: {
                width: 17,
                points: [
                    [3, 14],
                    [14, 0],
                    [-1, -1],
                    [14, 14],
                    [3, 0]
                ]
            },
            y: {
                width: 16,
                points: [
                    [2, 14],
                    [8, 0],
                    [-1, -1],
                    [14, 14],
                    [8, 0],
                    [6, -4],
                    [4, -6],
                    [2, -7],
                    [1, -7]
                ]
            },
            z: {
                width: 17,
                points: [
                    [14, 14],
                    [3, 0],
                    [-1, -1],
                    [3, 14],
                    [14, 14],
                    [-1, -1],
                    [3, 0],
                    [14, 0]
                ]
            },
            "{": {
                width: 14,
                points: [
                    [9, 25],
                    [7, 24],
                    [6, 23],
                    [5, 21],
                    [5, 19],
                    [6, 17],
                    [7, 16],
                    [8, 14],
                    [8, 12],
                    [6, 10],
                    [-1, -1],
                    [7, 24],
                    [6, 22],
                    [6, 20],
                    [7, 18],
                    [8, 17],
                    [9, 15],
                    [9, 13],
                    [8, 11],
                    [4, 9],
                    [8, 7],
                    [9, 5],
                    [9, 3],
                    [8, 1],
                    [7, 0],
                    [6, -2],
                    [6, -4],
                    [7, -6],
                    [-1, -1],
                    [6, 8],
                    [8, 6],
                    [8, 4],
                    [7, 2],
                    [6, 1],
                    [5, -1],
                    [5, -3],
                    [6, -5],
                    [7, -6],
                    [9, -7]
                ]
            },
            "|": {
                width: 8,
                points: [
                    [4, 25],
                    [4, -7]
                ]
            },
            "}": {
                width: 14,
                points: [
                    [5, 25],
                    [7, 24],
                    [8, 23],
                    [9, 21],
                    [9, 19],
                    [8, 17],
                    [7, 16],
                    [6, 14],
                    [6, 12],
                    [8, 10],
                    [-1, -1],
                    [7, 24],
                    [8, 22],
                    [8, 20],
                    [7, 18],
                    [6, 17],
                    [5, 15],
                    [5, 13],
                    [6, 11],
                    [10, 9],
                    [6, 7],
                    [5, 5],
                    [5, 3],
                    [6, 1],
                    [7, 0],
                    [8, -2],
                    [8, -4],
                    [7, -6],
                    [-1, -1],
                    [8, 8],
                    [6, 6],
                    [6, 4],
                    [7, 2],
                    [8, 1],
                    [9, -1],
                    [9, -3],
                    [8, -5],
                    [7, -6],
                    [5, -7]
                ]
            },
            "~": {
                width: 24,
                points: [
                    [3, 6],
                    [3, 8],
                    [4, 11],
                    [6, 12],
                    [8, 12],
                    [10, 11],
                    [14, 8],
                    [16, 7],
                    [18, 7],
                    [20, 8],
                    [21, 10],
                    [-1, -1],
                    [3, 8],
                    [4, 10],
                    [6, 11],
                    [8, 11],
                    [10, 10],
                    [14, 7],
                    [16, 6],
                    [18, 6],
                    [20, 7],
                    [21, 10],
                    [21, 12]
                ]
            }
        }, a.jqplot.CanvasFontRenderer = function(b) {
            b = b || {}, b.pt2px || (b.pt2px = 1.5), a.jqplot.CanvasTextRenderer.call(this, b)
        }, a.jqplot.CanvasFontRenderer.prototype = new a.jqplot.CanvasTextRenderer({}), a.jqplot.CanvasFontRenderer.prototype.constructor = a.jqplot.CanvasFontRenderer, a.jqplot.CanvasFontRenderer.prototype.measure = function(c, e) {
            var d = this.fontSize + " " + this.fontFamily;
            c.save(), c.font = d;
            var b = c.measureText(e).width;
            return c.restore(), b
        }, a.jqplot.CanvasFontRenderer.prototype.draw = function(e, g) {
            var c = 0,
                h = .72 * this.height;
            e.save();
            var d, b; - Math.PI / 2 <= this.angle && this.angle <= 0 || 3 * Math.PI / 2 <= this.angle && this.angle <= 2 * Math.PI ? (d = 0, b = -Math.sin(this.angle) * this.width) : 0 < this.angle && this.angle <= Math.PI / 2 || 2 * -Math.PI <= this.angle && this.angle <= 3 * -Math.PI / 2 ? (d = Math.sin(this.angle) * this.height, b = 0) : -Math.PI < this.angle && this.angle < -Math.PI / 2 || Math.PI <= this.angle && this.angle <= 3 * Math.PI / 2 ? (d = -Math.cos(this.angle) * this.width, b = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height) : (3 * -Math.PI / 2 < this.angle && this.angle < Math.PI || Math.PI / 2 < this.angle && this.angle < Math.PI) && (d = Math.sin(this.angle) * this.height - Math.cos(this.angle) * this.width, b = -Math.cos(this.angle) * this.height), e.strokeStyle = this.fillStyle, e.fillStyle = this.fillStyle;
            var f = this.fontSize + " " + this.fontFamily;
            e.font = f, e.translate(d, b), e.rotate(this.angle), e.fillText(g, c, h), e.restore()
        }
    }(jQuery),
    function(a) {
        a.jqplot.CanvasAxisLabelRenderer = function(b) {
            this.angle = 0, this.axis, this.show = !0, this.showLabel = !0, this.label = "", this.fontFamily = '"Trebuchet MS", Arial, Helvetica, sans-serif', this.fontSize = "11pt", this.fontWeight = "normal", this.fontStretch = 1, this.textColor = "#666666", this.enableFontSupport = !0, this.pt2px = null, this._elem, this._ctx, this._plotWidth, this._plotHeight, this._plotDimensions = {
                height: null,
                width: null
            }, a.extend(!0, this, b), null == b.angle && "xaxis" != this.axis && "x2axis" != this.axis && (this.angle = -90);
            var c = {
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                fontStretch: this.fontStretch,
                fillStyle: this.textColor,
                angle: this.getAngleRad(),
                fontFamily: this.fontFamily
            };
            this.pt2px && (c.pt2px = this.pt2px), this.enableFontSupport && a.jqplot.support_canvas_text() ? this._textRenderer = new a.jqplot.CanvasFontRenderer(c) : this._textRenderer = new a.jqplot.CanvasTextRenderer(c)
        }, a.jqplot.CanvasAxisLabelRenderer.prototype.init = function(b) {
            a.extend(!0, this, b), this._textRenderer.init({
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                fontStretch: this.fontStretch,
                fillStyle: this.textColor,
                angle: this.getAngleRad(),
                fontFamily: this.fontFamily
            })
        }, a.jqplot.CanvasAxisLabelRenderer.prototype.getWidth = function(d) {
            if (this._elem) return this._elem.outerWidth(!0);
            var f = this._textRenderer,
                c = f.getWidth(d),
                e = f.getHeight(d),
                b = Math.abs(Math.sin(f.angle) * e) + Math.abs(Math.cos(f.angle) * c);
            return b
        }, a.jqplot.CanvasAxisLabelRenderer.prototype.getHeight = function(d) {
            if (this._elem) return this._elem.outerHeight(!0);
            var f = this._textRenderer,
                c = f.getWidth(d),
                e = f.getHeight(d),
                b = Math.abs(Math.cos(f.angle) * e) + Math.abs(Math.sin(f.angle) * c);
            return b
        }, a.jqplot.CanvasAxisLabelRenderer.prototype.getAngleRad = function() {
            var b = this.angle * Math.PI / 180;
            return b
        }, a.jqplot.CanvasAxisLabelRenderer.prototype.draw = function(c, f) {
            this._elem && (a.jqplot.use_excanvas && void 0 !== window.G_vmlCanvasManager.uninitElement && window.G_vmlCanvasManager.uninitElement(this._elem.get(0)), this._elem.emptyForce(), this._elem = null);
            var e = f.canvasManager.getCanvas();
            this._textRenderer.setText(this.label, c);
            var b = this.getWidth(c),
                d = this.getHeight(c);
            return e.width = b, e.height = d, e.style.width = b, e.style.height = d, e = f.canvasManager.initCanvas(e), this._elem = a(e), this._elem.css({
                position: "absolute"
            }), this._elem.addClass("jqplot-" + this.axis + "-label"), e = null, this._elem
        }, a.jqplot.CanvasAxisLabelRenderer.prototype.pack = function() {
            this._textRenderer.draw(this._elem.get(0).getContext("2d"), this.label)
        }
    }(jQuery),
    function(a) {
        a.jqplot.CanvasAxisTickRenderer = function(b) {
            this.mark = "outside", this.showMark = !0, this.showGridline = !0, this.isMinorTick = !1, this.angle = 0, this.markSize = 4, this.show = !0, this.showLabel = !0, this.labelPosition = "auto", this.label = "", this.value = null, this._styles = {}, this.formatter = a.jqplot.DefaultTickFormatter, this.formatString = "", this.prefix = "", this.fontFamily = '"Trebuchet MS", Arial, Helvetica, sans-serif', this.fontSize = "10pt", this.fontWeight = "normal", this.fontStretch = 1, this.textColor = "#666666", this.enableFontSupport = !0, this.pt2px = null, this._elem, this._ctx, this._plotWidth, this._plotHeight, this._plotDimensions = {
                height: null,
                width: null
            }, a.extend(!0, this, b);
            var c = {
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                fontStretch: this.fontStretch,
                fillStyle: this.textColor,
                angle: this.getAngleRad(),
                fontFamily: this.fontFamily
            };
            this.pt2px && (c.pt2px = this.pt2px), this.enableFontSupport && a.jqplot.support_canvas_text() ? this._textRenderer = new a.jqplot.CanvasFontRenderer(c) : this._textRenderer = new a.jqplot.CanvasTextRenderer(c)
        }, a.jqplot.CanvasAxisTickRenderer.prototype.init = function(b) {
            a.extend(!0, this, b), this._textRenderer.init({
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                fontStretch: this.fontStretch,
                fillStyle: this.textColor,
                angle: this.getAngleRad(),
                fontFamily: this.fontFamily
            })
        }, a.jqplot.CanvasAxisTickRenderer.prototype.getWidth = function(d) {
            if (this._elem) return this._elem.outerWidth(!0);
            var f = this._textRenderer,
                c = f.getWidth(d),
                e = f.getHeight(d),
                b = Math.abs(Math.sin(f.angle) * e) + Math.abs(Math.cos(f.angle) * c);
            return b
        }, a.jqplot.CanvasAxisTickRenderer.prototype.getHeight = function(d) {
            if (this._elem) return this._elem.outerHeight(!0);
            var f = this._textRenderer,
                c = f.getWidth(d),
                e = f.getHeight(d),
                b = Math.abs(Math.cos(f.angle) * e) + Math.abs(Math.sin(f.angle) * c);
            return b
        }, a.jqplot.CanvasAxisTickRenderer.prototype.getTop = function(b) {
            return this._elem ? this._elem.position().top : null
        }, a.jqplot.CanvasAxisTickRenderer.prototype.getAngleRad = function() {
            var b = this.angle * Math.PI / 180;
            return b
        }, a.jqplot.CanvasAxisTickRenderer.prototype.setTick = function(b, d, c) {
            return this.value = b, c && (this.isMinorTick = !0), this
        }, a.jqplot.CanvasAxisTickRenderer.prototype.draw = function(c, f) {
            this.label || (this.label = this.prefix + this.formatter(this.formatString, this.value)), this._elem && (a.jqplot.use_excanvas && void 0 !== window.G_vmlCanvasManager.uninitElement && window.G_vmlCanvasManager.uninitElement(this._elem.get(0)), this._elem.emptyForce(), this._elem = null);
            var e = f.canvasManager.getCanvas();
            this._textRenderer.setText(this.label, c);
            var b = this.getWidth(c),
                d = this.getHeight(c);
            return e.width = b, e.height = d, e.style.width = b, e.style.height = d, e.style.textAlign = "left", e.style.position = "absolute", e = f.canvasManager.initCanvas(e), this._elem = a(e), this._elem.css(this._styles), this._elem.addClass("jqplot-" + this.axis + "-tick"), e = null, this._elem
        }, a.jqplot.CanvasAxisTickRenderer.prototype.pack = function() {
            this._textRenderer.draw(this._elem.get(0).getContext("2d"), this.label)
        }
    }(jQuery),
    function($) {
        function draw(plot, neighbor) {
            var hl = plot.plugins.highlighter,
                s = plot.series[neighbor.seriesIndex],
                smr = s.markerRenderer,
                mr = hl.markerRenderer;
            mr.style = smr.style, mr.lineWidth = smr.lineWidth + hl.lineWidthAdjust, mr.size = smr.size + hl.sizeAdjust;
            var rgba = $.jqplot.getColorComponents(smr.color),
                newrgb = [rgba[0], rgba[1], rgba[2]],
                alpha = rgba[3] >= .6 ? .6 * rgba[3] : rgba[3] * (2 - rgba[3]);
            mr.color = "rgba(" + newrgb[0] + "," + newrgb[1] + "," + newrgb[2] + "," + alpha + ")", mr.init(), mr.draw(s.gridData[neighbor.pointIndex][0], s.gridData[neighbor.pointIndex][1], hl.highlightCanvas._ctx)
        }

        function showTooltip(plot, series, neighbor) {
            var hl = plot.plugins.highlighter,
                elem = hl._tooltipElem,
                serieshl = series.highlighter || {},
                opts = $.extend(!0, {}, hl, serieshl);
            if (opts.useAxesFormatters) {
                for (var str, xf = series._xaxis._ticks[0].formatter, yf = series._yaxis._ticks[0].formatter, xfstr = series._xaxis._ticks[0].formatString, yfstr = series._yaxis._ticks[0].formatString, xstr = xf(xfstr, neighbor.data[0]), ystrs = [], i = 1; i < opts.yvalues + 1; i++) ystrs.push(yf(yfstr, neighbor.data[i]));
                if ("string" == typeof opts.formatString) switch (opts.tooltipAxes) {
                    case "both":
                    case "xy":
                        ystrs.unshift(xstr), ystrs.unshift(opts.formatString), str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs);
                        break;
                    case "yx":
                        ystrs.push(xstr), ystrs.unshift(opts.formatString), str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs);
                        break;
                    case "x":
                        str = $.jqplot.sprintf.apply($.jqplot.sprintf, [opts.formatString, xstr]);
                        break;
                    case "y":
                        ystrs.unshift(opts.formatString), str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs);
                        break;
                    default:
                        ystrs.unshift(xstr), ystrs.unshift(opts.formatString), str = $.jqplot.sprintf.apply($.jqplot.sprintf, ystrs)
                } else switch (opts.tooltipAxes) {
                    case "both":
                    case "xy":
                        str = xstr;
                        for (var i = 0; i < ystrs.length; i++) str += opts.tooltipSeparator + ystrs[i];
                        break;
                    case "yx":
                        str = "";
                        for (var i = 0; i < ystrs.length; i++) str += ystrs[i] + opts.tooltipSeparator;
                        str += xstr;
                        break;
                    case "x":
                        str = xstr;
                        break;
                    case "y":
                        str = ystrs.join(opts.tooltipSeparator);
                        break;
                    default:
                        str = xstr;
                        for (var i = 0; i < ystrs.length; i++) str += opts.tooltipSeparator + ystrs[i]
                }
            } else {
                var str;
                "string" == typeof opts.formatString ? str = $.jqplot.sprintf.apply($.jqplot.sprintf, [opts.formatString].concat(neighbor.data)) : "both" == opts.tooltipAxes || "xy" == opts.tooltipAxes ? str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[0]) + opts.tooltipSeparator + $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[1]) : "yx" == opts.tooltipAxes ? str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[1]) + opts.tooltipSeparator + $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[0]) : "x" == opts.tooltipAxes ? str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[0]) : "y" == opts.tooltipAxes && (str = $.jqplot.sprintf(opts.tooltipFormatString, neighbor.data[1]))
            }
            $.isFunction(opts.tooltipContentEditor) && (str = opts.tooltipContentEditor(str, neighbor.seriesIndex, neighbor.pointIndex, plot)), elem.html(str);
            var gridpos = {
                    x: neighbor.gridData[0],
                    y: neighbor.gridData[1]
                },
                ms = 0,
                fact = .707;
            1 == series.markerRenderer.show && (ms = (series.markerRenderer.size + opts.sizeAdjust) / 2);
            var loc = locations;
            switch (series.fillToZero && series.fill && neighbor.data[1] < 0 && (loc = oppositeLocations), loc[locationIndicies[opts.tooltipLocation]]) {
                case "nw":
                    var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(!0) - opts.tooltipOffset - fact * ms,
                        y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(!0) - fact * ms;
                    break;
                case "n":
                    var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(!0) / 2,
                        y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(!0) - ms;
                    break;
                case "ne":
                    var x = gridpos.x + plot._gridPadding.left + opts.tooltipOffset + fact * ms,
                        y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(!0) - fact * ms;
                    break;
                case "e":
                    var x = gridpos.x + plot._gridPadding.left + opts.tooltipOffset + ms,
                        y = gridpos.y + plot._gridPadding.top - elem.outerHeight(!0) / 2;
                    break;
                case "se":
                    var x = gridpos.x + plot._gridPadding.left + opts.tooltipOffset + fact * ms,
                        y = gridpos.y + plot._gridPadding.top + opts.tooltipOffset + fact * ms;
                    break;
                case "s":
                    var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(!0) / 2,
                        y = gridpos.y + plot._gridPadding.top + opts.tooltipOffset + ms;
                    break;
                case "sw":
                    var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(!0) - opts.tooltipOffset - fact * ms,
                        y = gridpos.y + plot._gridPadding.top + opts.tooltipOffset + fact * ms;
                    break;
                case "w":
                    var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(!0) - opts.tooltipOffset - ms,
                        y = gridpos.y + plot._gridPadding.top - elem.outerHeight(!0) / 2;
                    break;
                default:
                    var x = gridpos.x + plot._gridPadding.left - elem.outerWidth(!0) - opts.tooltipOffset - fact * ms,
                        y = gridpos.y + plot._gridPadding.top - opts.tooltipOffset - elem.outerHeight(!0) - fact * ms
            }
            elem.css("left", x), elem.css("top", y), opts.fadeTooltip ? elem.stop(!0, !0).fadeIn(opts.tooltipFadeSpeed) : elem.show(), elem = null
        }

        function handleMove(ev, gridpos, datapos, neighbor, plot) {
            var hl = plot.plugins.highlighter,
                c = plot.plugins.cursor;
            if (hl.show)
                if (null == neighbor && hl.isHighlighting) {
                    var evt = jQuery.Event("jqplotHighlighterUnhighlight");
                    plot.target.trigger(evt);
                    var ctx = hl.highlightCanvas._ctx;
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height), hl.fadeTooltip ? hl._tooltipElem.fadeOut(hl.tooltipFadeSpeed) : hl._tooltipElem.hide(), hl.bringSeriesToFront && plot.restorePreviousSeriesOrder(), hl.isHighlighting = !1, hl.currentNeighbor = null, ctx = null
                } else if (null != neighbor && plot.series[neighbor.seriesIndex].showHighlight && !hl.isHighlighting) {
                    var evt = jQuery.Event("jqplotHighlighterHighlight");
                    evt.which = ev.which, evt.pageX = ev.pageX, evt.pageY = ev.pageY;
                    var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data, plot];
                    plot.target.trigger(evt, ins), hl.isHighlighting = !0, hl.currentNeighbor = neighbor, hl.showMarker && draw(plot, neighbor), !plot.series[neighbor.seriesIndex].show || !hl.showTooltip || c && c._zoom.started || showTooltip(plot, plot.series[neighbor.seriesIndex], neighbor), hl.bringSeriesToFront && plot.moveSeriesToFront(neighbor.seriesIndex)
                } else if (null != neighbor && hl.isHighlighting && hl.currentNeighbor != neighbor && plot.series[neighbor.seriesIndex].showHighlight) {
                    var ctx = hl.highlightCanvas._ctx;
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height), hl.isHighlighting = !0, hl.currentNeighbor = neighbor, hl.showMarker && draw(plot, neighbor), !plot.series[neighbor.seriesIndex].show || !hl.showTooltip || c && c._zoom.started || showTooltip(plot, plot.series[neighbor.seriesIndex], neighbor), hl.bringSeriesToFront && plot.moveSeriesToFront(neighbor.seriesIndex)
                }
        }
        $.jqplot.eventListenerHooks.push(["jqplotMouseMove", handleMove]), $.jqplot.Highlighter = function(options) {
            this.show = $.jqplot.config.enablePlugins, this.markerRenderer = new $.jqplot.MarkerRenderer({
                shadow: !1
            }), this.showMarker = !0, this.lineWidthAdjust = 2.5, this.sizeAdjust = 5, this.showTooltip = !0, this.tooltipLocation = "nw", this.fadeTooltip = !0, this.tooltipFadeSpeed = "fast", this.tooltipOffset = 2, this.tooltipAxes = "both", this.tooltipSeparator = ", ", this.tooltipContentEditor = null, this.useAxesFormatters = !0, this.tooltipFormatString = "%.5P", this.formatString = null, this.yvalues = 1, this.bringSeriesToFront = !1, this._tooltipElem, this.isHighlighting = !1, this.currentNeighbor = null, $.extend(!0, this, options)
        };
        var locations = ["nw", "n", "ne", "e", "se", "s", "sw", "w"],
            locationIndicies = {
                nw: 0,
                n: 1,
                ne: 2,
                e: 3,
                se: 4,
                s: 5,
                sw: 6,
                w: 7
            },
            oppositeLocations = ["se", "s", "sw", "w", "nw", "n", "ne", "e"];
        $.jqplot.Highlighter.init = function(target, data, opts) {
            var options = opts || {};
            this.plugins.highlighter = new $.jqplot.Highlighter(options.highlighter)
        }, $.jqplot.Highlighter.parseOptions = function(defaults, options) {
            this.showHighlight = !0
        }, $.jqplot.Highlighter.postPlotDraw = function() {
            this.plugins.highlighter && this.plugins.highlighter.highlightCanvas && (this.plugins.highlighter.highlightCanvas.resetCanvas(), this.plugins.highlighter.highlightCanvas = null), this.plugins.highlighter && this.plugins.highlighter._tooltipElem && (this.plugins.highlighter._tooltipElem.emptyForce(), this.plugins.highlighter._tooltipElem = null), this.plugins.highlighter.highlightCanvas = new $.jqplot.GenericCanvas, this.eventCanvas._elem.before(this.plugins.highlighter.highlightCanvas.createElement(this._gridPadding, "jqplot-highlight-canvas", this._plotDimensions, this)), this.plugins.highlighter.highlightCanvas.setContext();
            var elem = document.createElement("div");
            this.plugins.highlighter._tooltipElem = $(elem), elem = null, this.plugins.highlighter._tooltipElem.addClass("jqplot-highlighter-tooltip"), this.plugins.highlighter._tooltipElem.css({
                position: "absolute",
                display: "none"
            }), this.eventCanvas._elem.before(this.plugins.highlighter._tooltipElem)
        }, $.jqplot.preInitHooks.push($.jqplot.Highlighter.init), $.jqplot.preParseSeriesOptionsHooks.push($.jqplot.Highlighter.parseOptions), $.jqplot.postDrawHooks.push($.jqplot.Highlighter.postPlotDraw)
    }(jQuery),
    function(d) {
        function g(t, p, o, w) {
            if ("horizontal" == this.rendererOptions.barDirection && (this._stackAxis = "x", this._primaryAxis = "_yaxis"), 1 == this.rendererOptions.waterfall) {
                this._data = d.extend(!0, [], this.data);
                for (var s = 0, u = this.rendererOptions.barDirection && "vertical" !== this.rendererOptions.barDirection && this.transposedData !== !1 ? 0 : 1, q = 0; q < this.data.length; q++) s += this.data[q][u], q > 0 && (this.data[q][u] += this.data[q - 1][u]);
                this.data[this.data.length] = 1 == u ? [this.data.length + 1, s] : [s, this.data.length + 1], this._data[this._data.length] = 1 == u ? [this._data.length + 1, s] : [s, this._data.length + 1]
            }
            if (this.rendererOptions.groups > 1) {
                this.breakOnNull = !0;
                for (var n = this.data.length, v = parseInt(n / this.rendererOptions.groups, 10), r = 0, q = v; n > q; q += v) this.data.splice(q + r, 0, [null, null]), this._plotData.splice(q + r, 0, [null, null]), this._stackData.splice(q + r, 0, [null, null]), r++;
                for (q = 0; q < this.data.length; q++) "_xaxis" == this._primaryAxis ? (this.data[q][0] = q + 1, this._plotData[q][0] = q + 1, this._stackData[q][0] = q + 1) : (this.data[q][1] = q + 1, this._plotData[q][1] = q + 1, this._stackData[q][1] = q + 1)
            }
        }

        function i(v, u, s, t, o) {
            var n, p, q = v,
                w = v - 1,
                r = "x" === o ? 0 : 1;
            return q > 0 ? (p = t.series[w]._plotData[u][r], n = 0 > s * p ? i(w, u, s, t, o) : t.series[w].gridData[u][r]) : n = 0 === r ? t.series[q]._xaxis.series_u2p(0) : t.series[q]._yaxis.series_u2p(0), n
        }

        function h(q, p, n) {
            for (var o = 0; o < this.series.length; o++) this.series[o].renderer.constructor == d.jqplot.BarRenderer && this.series[o].highlightMouseOver && (this.series[o].highlightMouseDown = !1)
        }

        function j() {
            this.plugins.barRenderer && this.plugins.barRenderer.highlightCanvas && (this.plugins.barRenderer.highlightCanvas.resetCanvas(), this.plugins.barRenderer.highlightCanvas = null), this.plugins.barRenderer = {
                highlightedSeriesIndex: null
            }, this.plugins.barRenderer.highlightCanvas = new d.jqplot.GenericCanvas, this.eventCanvas._elem.before(this.plugins.barRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-barRenderer-highlight-canvas", this._plotDimensions, this)), this.plugins.barRenderer.highlightCanvas.setContext(), this.eventCanvas._elem.bind("mouseleave", {
                plot: this
            }, function(n) {
                k(n.data.plot)
            })
        }

        function c(u, t, q, p) {
            var o = u.series[t],
                n = u.plugins.barRenderer.highlightCanvas;
            n._ctx.clearRect(0, 0, n._ctx.canvas.width, n._ctx.canvas.height), o._highlightedPoint = q, u.plugins.barRenderer.highlightedSeriesIndex = t;
            var r = {
                fillStyle: o.highlightColors[q]
            };
            o.renderer.shapeRenderer.draw(n._ctx, p, r), n = null
        }

        function k(p) {
            var n = p.plugins.barRenderer.highlightCanvas;
            n._ctx.clearRect(0, 0, n._ctx.canvas.width, n._ctx.canvas.height);
            for (var o = 0; o < p.series.length; o++) p.series[o]._highlightedPoint = null;
            p.plugins.barRenderer.highlightedSeriesIndex = null, p.target.trigger("jqplotDataUnhighlight"), n = null
        }

        function b(r, q, u, t, s) {
            if (t) {
                var p = [t.seriesIndex, t.pointIndex, t.data],
                    o = jQuery.Event("jqplotDataMouseOver");
                if (o.pageX = r.pageX, o.pageY = r.pageY, s.target.trigger(o, p), s.series[p[0]].show && s.series[p[0]].highlightMouseOver && (p[0] != s.plugins.barRenderer.highlightedSeriesIndex || p[1] != s.series[p[0]]._highlightedPoint)) {
                    var n = jQuery.Event("jqplotDataHighlight");
                    n.which = r.which, n.pageX = r.pageX, n.pageY = r.pageY, s.target.trigger(n, p), c(s, t.seriesIndex, t.pointIndex, t.points)
                }
            } else null == t && k(s)
        }

        function a(q, p, t, s, r) {
            if (s) {
                var o = [s.seriesIndex, s.pointIndex, s.data];
                if (r.series[o[0]].highlightMouseDown && (o[0] != r.plugins.barRenderer.highlightedSeriesIndex || o[1] != r.series[o[0]]._highlightedPoint)) {
                    var n = jQuery.Event("jqplotDataHighlight");
                    n.which = q.which, n.pageX = q.pageX, n.pageY = q.pageY, r.target.trigger(n, o), c(r, s.seriesIndex, s.pointIndex, s.points)
                }
            } else null == s && k(r)
        }

        function l(p, o, s, r, q) {
            var n = q.plugins.barRenderer.highlightedSeriesIndex;
            null != n && q.series[n].highlightMouseDown && k(q)
        }

        function e(q, p, t, s, r) {
            if (s) {
                var o = [s.seriesIndex, s.pointIndex, s.data],
                    n = jQuery.Event("jqplotDataClick");
                n.which = q.which, n.pageX = q.pageX, n.pageY = q.pageY, r.target.trigger(n, o)
            }
        }

        function m(r, q, u, t, s) {
            if (t) {
                var p = [t.seriesIndex, t.pointIndex, t.data],
                    n = s.plugins.barRenderer.highlightedSeriesIndex;
                null != n && s.series[n].highlightMouseDown && k(s);
                var o = jQuery.Event("jqplotDataRightClick");
                o.which = r.which, o.pageX = r.pageX, o.pageY = r.pageY, s.target.trigger(o, p)
            }
        }
        d.jqplot.BarRenderer = function() {
            d.jqplot.LineRenderer.call(this)
        }, d.jqplot.BarRenderer.prototype = new d.jqplot.LineRenderer, d.jqplot.BarRenderer.prototype.constructor = d.jqplot.BarRenderer, d.jqplot.BarRenderer.prototype.init = function(o, q) {
            this.barPadding = 8, this.barMargin = 10, this.barDirection = "vertical", this.barWidth = null, this.shadowOffset = 2, this.shadowDepth = 5, this.shadowAlpha = .08, this.waterfall = !1, this.groups = 1, this.varyBarColor = !1, this.highlightMouseOver = !0, this.highlightMouseDown = !1, this.highlightColors = [], this.transposedData = !0, this.renderer.animation = {
                show: !1,
                direction: "down",
                speed: 3e3,
                _supported: !0
            }, this._type = "bar", o.highlightMouseDown && null == o.highlightMouseOver && (o.highlightMouseOver = !1), d.extend(!0, this, o), d.extend(!0, this.renderer, o), this.fill = !0, "horizontal" === this.barDirection && this.rendererOptions.animation && null == this.rendererOptions.animation.direction && (this.renderer.animation.direction = "left"), this.waterfall && (this.fillToZero = !1, this.disableStack = !0), "vertical" == this.barDirection ? (this._primaryAxis = "_xaxis", this._stackAxis = "y", this.fillAxis = "y") : (this._primaryAxis = "_yaxis", this._stackAxis = "x", this.fillAxis = "x"), this._highlightedPoint = null, this._plotSeriesInfo = null, this._dataColors = [], this._barPoints = [];
            var p = {
                lineJoin: "miter",
                lineCap: "round",
                fill: !0,
                isarc: !1,
                strokeStyle: this.color,
                fillStyle: this.color,
                closePath: this.fill
            };
            this.renderer.shapeRenderer.init(p);
            var n = {
                lineJoin: "miter",
                lineCap: "round",
                fill: !0,
                isarc: !1,
                angle: this.shadowAngle,
                offset: this.shadowOffset,
                alpha: this.shadowAlpha,
                depth: this.shadowDepth,
                closePath: this.fill
            };
            this.renderer.shadowRenderer.init(n), q.postInitHooks.addOnce(h), q.postDrawHooks.addOnce(j), q.eventListenerHooks.addOnce("jqplotMouseMove", b), q.eventListenerHooks.addOnce("jqplotMouseDown", a), q.eventListenerHooks.addOnce("jqplotMouseUp", l), q.eventListenerHooks.addOnce("jqplotClick", e), q.eventListenerHooks.addOnce("jqplotRightClick", m)
        }, d.jqplot.preSeriesInitHooks.push(g), d.jqplot.BarRenderer.prototype.calcSeriesNumbers = function() {
            for (var o, u, r = 0, t = 0, q = this[this._primaryAxis], n = 0; n < q._series.length; n++) o = q._series[n], o === this && (u = n), o.renderer.constructor == d.jqplot.BarRenderer && (r += o.data.length, t += 1);
            return [r, t, u]
        }, d.jqplot.BarRenderer.prototype.setBarWidth = function() {
            var n = 0,
                o = 0,
                t = this[this._primaryAxis],
                w = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
            n = w[0], o = w[1];
            var u = t.numberTicks,
                p = (u - 1) / 2;
            return "xaxis" == t.name || "x2axis" == t.name ? this._stack ? this.barWidth = (t._offsets.max - t._offsets.min) / n * o - this.barMargin : this.barWidth = ((t._offsets.max - t._offsets.min) / p - this.barPadding * (o - 1) - 2 * this.barMargin) / o : this._stack ? this.barWidth = (t._offsets.min - t._offsets.max) / n * o - this.barMargin : this.barWidth = ((t._offsets.min - t._offsets.max) / p - this.barPadding * (o - 1) - 2 * this.barMargin) / o, [n, o]
        }, d.jqplot.BarRenderer.prototype.draw = function(E, L, q, G) {
            var I, A = d.extend({}, q),
                w = void 0 != A.shadow ? A.shadow : this.shadow,
                O = void 0 != A.showLine ? A.showLine : this.showLine;
            void 0 != A.fill ? A.fill : this.fill, this.xaxis, this.yaxis, this._xaxis.series_u2p, this._yaxis.series_u2p;
            this._dataColors = [], this._barPoints = [], null == this.barWidth && this.renderer.setBarWidth.call(this);
            var N = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this),
                v = (N[0], N[1]),
                s = N[2],
                H = [];
            if (this._stack ? this._barNudge = 0 : this._barNudge = (-Math.abs(v / 2 - .5) + s) * (this.barWidth + this.barPadding), O) {
                var u = new d.jqplot.ColorGenerator(this.negativeSeriesColors),
                    B = new d.jqplot.ColorGenerator(this.seriesColors),
                    M = u.get(this.index);
                this.useNegativeColors || (M = A.fillStyle);
                var r, P, o, t = A.fillStyle;
                if ("vertical" == this.barDirection) {
                    for (var I = 0; I < L.length; I++)
                        if (this._stack || null != this.data[I][1]) {
                            if (H = [], r = L[I][0] + this._barNudge, o = this._stack && this._prevGridData.length ? i(this.index, I, this._plotData[I][1], G, "y") : this.fillToZero ? this._yaxis.series_u2p(0) : this.waterfall && I > 0 && I < this.gridData.length - 1 ? this.gridData[I - 1][1] : this.waterfall && 0 == I && I < this.gridData.length - 1 ? this._yaxis.min <= 0 && this._yaxis.max >= 0 ? this._yaxis.series_u2p(0) : this._yaxis.min > 0 ? E.canvas.height : 0 : this.waterfall && I == this.gridData.length - 1 ? this._yaxis.min <= 0 && this._yaxis.max >= 0 ? this._yaxis.series_u2p(0) : this._yaxis.min > 0 ? E.canvas.height : 0 : E.canvas.height, this.fillToZero && this._plotData[I][1] < 0 || this.waterfall && this._data[I][1] < 0 ? this.varyBarColor && !this._stack ? this.useNegativeColors ? A.fillStyle = u.next() : A.fillStyle = B.next() : A.fillStyle = M : this.varyBarColor && !this._stack ? A.fillStyle = B.next() : A.fillStyle = t, !this.fillToZero || this._plotData[I][1] >= 0 ? (H.push([r - this.barWidth / 2, o]), H.push([r - this.barWidth / 2, L[I][1]]), H.push([r + this.barWidth / 2, L[I][1]]), H.push([r + this.barWidth / 2, o])) : (H.push([r - this.barWidth / 2, L[I][1]]), H.push([r - this.barWidth / 2, o]), H.push([r + this.barWidth / 2, o]), H.push([r + this.barWidth / 2, L[I][1]])), this._barPoints.push(H), w && !this._stack) {
                                var z = d.extend(!0, {}, A);
                                delete z.fillStyle, this.renderer.shadowRenderer.draw(E, H, z)
                            }
                            var n = A.fillStyle || this.color;
                            this._dataColors.push(n), this.renderer.shapeRenderer.draw(E, H, A)
                        }
                } else if ("horizontal" == this.barDirection)
                    for (var I = 0; I < L.length; I++)
                        if (this._stack || null != this.data[I][0]) {
                            if (H = [], r = L[I][1] - this._barNudge, P = this._stack && this._prevGridData.length ? i(this.index, I, this._plotData[I][0], G, "x") : this.fillToZero ? this._xaxis.series_u2p(0) : this.waterfall && I > 0 && I < this.gridData.length - 1 ? this.gridData[I - 1][0] : this.waterfall && 0 == I && I < this.gridData.length - 1 ? this._xaxis.min <= 0 && this._xaxis.max >= 0 ? this._xaxis.series_u2p(0) : (this._xaxis.min > 0, 0) : this.waterfall && I == this.gridData.length - 1 ? this._xaxis.min <= 0 && this._xaxis.max >= 0 ? this._xaxis.series_u2p(0) : this._xaxis.min > 0 ? 0 : E.canvas.width : 0, this.fillToZero && this._plotData[I][0] < 0 || this.waterfall && this._data[I][0] < 0 ? this.varyBarColor && !this._stack ? this.useNegativeColors ? A.fillStyle = u.next() : A.fillStyle = B.next() : A.fillStyle = M : this.varyBarColor && !this._stack ? A.fillStyle = B.next() : A.fillStyle = t, !this.fillToZero || this._plotData[I][0] >= 0 ? (H.push([P, r + this.barWidth / 2]), H.push([P, r - this.barWidth / 2]), H.push([L[I][0], r - this.barWidth / 2]), H.push([L[I][0], r + this.barWidth / 2])) : (H.push([L[I][0], r + this.barWidth / 2]), H.push([L[I][0], r - this.barWidth / 2]), H.push([P, r - this.barWidth / 2]), H.push([P, r + this.barWidth / 2])), this._barPoints.push(H), w && !this._stack) {
                                var z = d.extend(!0, {}, A);
                                delete z.fillStyle, this.renderer.shadowRenderer.draw(E, H, z)
                            }
                            var n = A.fillStyle || this.color;
                            this._dataColors.push(n), this.renderer.shapeRenderer.draw(E, H, A)
                        }
            }
            if (0 == this.highlightColors.length) this.highlightColors = d.jqplot.computeHighlightColors(this._dataColors);
            else if ("string" == typeof this.highlightColors) {
                var N = this.highlightColors;
                this.highlightColors = [];
                for (var I = 0; I < this._dataColors.length; I++) this.highlightColors.push(N)
            }
        }, d.jqplot.BarRenderer.prototype.drawShadow = function(z, G, p, B) {
            var D, C, u, s, r, w = void 0 != p ? p : {},
                I = (void 0 != w.shadow ? w.shadow : this.shadow, void 0 != w.showLine ? w.showLine : this.showLine);
            void 0 != w.fill ? w.fill : this.fill, this.xaxis, this.yaxis, this._xaxis.series_u2p, this._yaxis.series_u2p;
            if (this._stack && this.shadow) {
                null == this.barWidth && this.renderer.setBarWidth.call(this);
                var H = this._plotSeriesInfo = this.renderer.calcSeriesNumbers.call(this);
                if (u = H[0], s = H[1], r = H[2], this._stack ? this._barNudge = 0 : this._barNudge = (-Math.abs(s / 2 - .5) + r) * (this.barWidth + this.barPadding), I)
                    if ("vertical" == this.barDirection) {
                        for (var D = 0; D < G.length; D++)
                            if (null != this.data[D][1]) {
                                C = [];
                                var n, q = G[D][0] + this._barNudge;
                                n = this._stack && this._prevGridData.length ? i(this.index, D, this._plotData[D][1], B, "y") : this.fillToZero ? this._yaxis.series_u2p(0) : z.canvas.height, C.push([q - this.barWidth / 2, n]), C.push([q - this.barWidth / 2, G[D][1]]), C.push([q + this.barWidth / 2, G[D][1]]), C.push([q + this.barWidth / 2, n]), this.renderer.shadowRenderer.draw(z, C, w)
                            }
                    } else if ("horizontal" == this.barDirection)
                        for (var D = 0; D < G.length; D++)
                            if (null != this.data[D][0]) {
                                C = [];
                                var J, q = G[D][1] - this._barNudge;
                                J = this._stack && this._prevGridData.length ? i(this.index, D, this._plotData[D][0], B, "x") : this.fillToZero ? this._xaxis.series_u2p(0) : 0, C.push([J, q + this.barWidth / 2]), C.push([G[D][0], q + this.barWidth / 2]), C.push([G[D][0], q - this.barWidth / 2]), C.push([J, q - this.barWidth / 2]), this.renderer.shadowRenderer.draw(z, C, w)
                            }
            }
        }
    }(jQuery),
    function(a) {
        a.jqplot.CategoryAxisRenderer = function(b) {
            a.jqplot.LinearAxisRenderer.call(this), this.sortMergedLabels = !1
        }, a.jqplot.CategoryAxisRenderer.prototype = new a.jqplot.LinearAxisRenderer, a.jqplot.CategoryAxisRenderer.prototype.constructor = a.jqplot.CategoryAxisRenderer, a.jqplot.CategoryAxisRenderer.prototype.init = function(e) {
            this.groups = 1, this.groupLabels = [], this._groupLabels = [], this._grouped = !1, this._barsPerGroup = null, this.reverse = !1, a.extend(!0, this, {
                tickOptions: {
                    formatString: "%d"
                }
            }, e);
            for (var b = this._dataBounds, f = 0; f < this._series.length; f++) {
                var g = this._series[f];
                g.groups && (this.groups = g.groups);
                for (var h = g.data, c = 0; c < h.length; c++) "xaxis" == this.name || "x2axis" == this.name ? ((h[c][0] < b.min || null == b.min) && (b.min = h[c][0]), (h[c][0] > b.max || null == b.max) && (b.max = h[c][0])) : ((h[c][1] < b.min || null == b.min) && (b.min = h[c][1]), (h[c][1] > b.max || null == b.max) && (b.max = h[c][1]))
            }
            this.groupLabels.length && (this.groups = this.groupLabels.length)
        }, a.jqplot.CategoryAxisRenderer.prototype.createTicks = function() {
            var v, q, w, b, x, z = (this._ticks, this.ticks),
                F = this.name;
            this._dataBounds;
            if (z.length) {
                if (this.groups > 1 && !this._grouped) {
                    for (var r = z.length, p = parseInt(r / this.groups, 10), e = 0, x = p; r > x; x += p) z.splice(x + e, 0, " "), e++;
                    this._grouped = !0
                }
                this.min = .5, this.max = z.length + .5;
                var m = this.max - this.min;
                for (this.numberTicks = 2 * z.length + 1, x = 0; x < z.length; x++) {
                    b = this.min + 2 * x * m / (this.numberTicks - 1);
                    var h = new this.tickRenderer(this.tickOptions);
                    h.showLabel = !1, h.setTick(b, this.name), this._ticks.push(h);
                    var h = new this.tickRenderer(this.tickOptions);
                    h.label = z[x], h.showMark = !1, h.showGridline = !1, h.setTick(b + .5, this.name), this._ticks.push(h)
                }
                var h = new this.tickRenderer(this.tickOptions);
                h.showLabel = !1, h.setTick(b + 1, this.name), this._ticks.push(h)
            } else {
                v = "xaxis" == F || "x2axis" == F ? this._plotDimensions.width : this._plotDimensions.height, null != this.min && null != this.max && null != this.numberTicks && (this.tickInterval = null), null != this.min && null != this.max && null != this.tickInterval && parseInt((this.max - this.min) / this.tickInterval, 10) != (this.max - this.min) / this.tickInterval && (this.tickInterval = null);
                for (var w, E, y = [], B = 0, q = .5, f = !1, x = 0; x < this._series.length; x++)
                    for (var k = this._series[x], u = 0; u < k.data.length; u++) E = "xaxis" == this.name || "x2axis" == this.name ? k.data[u][0] : k.data[u][1], -1 == a.inArray(E, y) && (f = !0, B += 1, y.push(E));
                f && this.sortMergedLabels && ("string" == typeof y[0] ? y.sort() : y.sort(function(j, i) {
                    return j - i
                })), this.ticks = y;
                for (var x = 0; x < this._series.length; x++)
                    for (var k = this._series[x], u = 0; u < k.data.length; u++) {
                        E = "xaxis" == this.name || "x2axis" == this.name ? k.data[u][0] : k.data[u][1];
                        var n = a.inArray(E, y) + 1;
                        "xaxis" == this.name || "x2axis" == this.name ? k.data[u][0] = n : k.data[u][1] = n
                    }
                if (this.groups > 1 && !this._grouped) {
                    for (var r = y.length, p = parseInt(r / this.groups, 10), e = 0, x = p; r > x; x += p + 1) y[x] = " ";
                    this._grouped = !0
                }
                w = B + .5, null == this.numberTicks && (this.numberTicks = 2 * B + 1);
                var m = w - q;
                this.min = q, this.max = w;
                var o = 0,
                    g = parseInt(3 + v / 10, 10),
                    p = parseInt(B / g, 10);
                null == this.tickInterval && (this.tickInterval = m / (this.numberTicks - 1));
                for (var x = 0; x < this.numberTicks; x++) {
                    b = this.min + x * this.tickInterval;
                    var h = new this.tickRenderer(this.tickOptions);
                    x / 2 == parseInt(x / 2, 10) ? (h.showLabel = !1, h.showMark = !0) : (p > 0 && p > o ? (h.showLabel = !1, o += 1) : (h.showLabel = !0, o = 0), h.label = h.formatter(h.formatString, y[(x - 1) / 2]), h.showMark = !1, h.showGridline = !1), h.setTick(b, this.name), this._ticks.push(h)
                }
            }
        }, a.jqplot.CategoryAxisRenderer.prototype.draw = function(b, j) {
            if (this.show) {
                this.renderer.createTicks.call(this);
                if (this._elem && this._elem.emptyForce(), this._elem = this._elem || a('<div class="jqplot-axis jqplot-' + this.name + '" style="position:absolute;"></div>'), "xaxis" == this.name || "x2axis" == this.name ? this._elem.width(this._plotDimensions.width) : this._elem.height(this._plotDimensions.height), this.labelOptions.axis = this.name, this._label = new this.labelRenderer(this.labelOptions), this._label.show) {
                    var g = this._label.draw(b, j);
                    g.appendTo(this._elem)
                }
                for (var f = this._ticks, e = 0; e < f.length; e++) {
                    var d = f[e];
                    if (d.showLabel && (!d.isMinorTick || this.showMinorTicks)) {
                        var g = d.draw(b, j);
                        g.appendTo(this._elem)
                    }
                }
                this._groupLabels = [];
                for (var e = 0; e < this.groupLabels.length; e++) {
                    var g = a('<div style="position:absolute;" class="jqplot-' + this.name + '-groupLabel"></div>');
                    g.html(this.groupLabels[e]), this._groupLabels.push(g), g.appendTo(this._elem)
                }
            }
            return this._elem
        }, a.jqplot.CategoryAxisRenderer.prototype.set = function() {
            var m, e = 0,
                k = 0,
                f = 0,
                d = null == this._label ? !1 : this._label.show;
            if (this.show) {
                for (var n = this._ticks, c = 0; c < n.length; c++) {
                    var g = n[c];
                    !g.showLabel || g.isMinorTick && !this.showMinorTicks || (m = "xaxis" == this.name || "x2axis" == this.name ? g._elem.outerHeight(!0) : g._elem.outerWidth(!0), m > e && (e = m))
                }
                for (var j = 0, c = 0; c < this._groupLabels.length; c++) {
                    var b = this._groupLabels[c];
                    m = "xaxis" == this.name || "x2axis" == this.name ? b.outerHeight(!0) : b.outerWidth(!0), m > j && (j = m)
                }
                d && (k = this._label._elem.outerWidth(!0), f = this._label._elem.outerHeight(!0)), "xaxis" == this.name ? (e += j + f, this._elem.css({
                    height: e + "px",
                    left: "0px",
                    bottom: "0px"
                })) : "x2axis" == this.name ? (e += j + f, this._elem.css({
                    height: e + "px",
                    left: "0px",
                    top: "0px"
                })) : "yaxis" == this.name ? (e += j + k, this._elem.css({
                    width: e + "px",
                    left: "0px",
                    top: "0px"
                }), d && this._label.constructor == a.jqplot.AxisLabelRenderer && this._label._elem.css("width", k + "px")) : (e += j + k, this._elem.css({
                    width: e + "px",
                    right: "0px",
                    top: "0px"
                }), d && this._label.constructor == a.jqplot.AxisLabelRenderer && this._label._elem.css("width", k + "px"))
            }
        }, a.jqplot.CategoryAxisRenderer.prototype.pack = function(e, c) {
            var x, C = this._ticks,
                v = this.max,
                s = this.min,
                n = c.max,
                l = c.min,
                q = null == this._label ? !1 : this._label.show;
            for (var r in e) this._elem.css(r, e[r]);
            this._offsets = c;
            var g = n - l,
                k = v - s;
            if (this.reverse ? (this.u2p = function(h) {
                    return l + (v - h) * g / k
                }, this.p2u = function(h) {
                    return s + (h - l) * k / g
                }, "xaxis" == this.name || "x2axis" == this.name ? (this.series_u2p = function(h) {
                    return (v - h) * g / k
                }, this.series_p2u = function(h) {
                    return h * k / g + v
                }) : (this.series_u2p = function(h) {
                    return (s - h) * g / k
                }, this.series_p2u = function(h) {
                    return h * k / g + s
                })) : (this.u2p = function(h) {
                    return (h - s) * g / k + l
                }, this.p2u = function(h) {
                    return (h - l) * k / g + s
                }, "xaxis" == this.name || "x2axis" == this.name ? (this.series_u2p = function(h) {
                    return (h - s) * g / k
                }, this.series_p2u = function(h) {
                    return h * k / g + s
                }) : (this.series_u2p = function(h) {
                    return (h - v) * g / k
                }, this.series_p2u = function(h) {
                    return h * k / g + v
                })), this.show)
                if ("xaxis" == this.name || "x2axis" == this.name) {
                    for (x = 0; x < C.length; x++) {
                        var o = C[x];
                        if (o.show && o.showLabel) {
                            var b;
                            if (o.constructor == a.jqplot.CanvasAxisTickRenderer && o.angle) {
                                var A = "xaxis" == this.name ? 1 : -1;
                                switch (o.labelPosition) {
                                    case "auto":
                                        b = A * o.angle < 0 ? -o.getWidth() + o._textRenderer.height * Math.sin(-o._textRenderer.angle) / 2 : -o._textRenderer.height * Math.sin(o._textRenderer.angle) / 2;
                                        break;
                                    case "end":
                                        b = -o.getWidth() + o._textRenderer.height * Math.sin(-o._textRenderer.angle) / 2;
                                        break;
                                    case "start":
                                        b = -o._textRenderer.height * Math.sin(o._textRenderer.angle) / 2;
                                        break;
                                    case "middle":
                                        b = -o.getWidth() / 2 + o._textRenderer.height * Math.sin(-o._textRenderer.angle) / 2;
                                        break;
                                    default:
                                        b = -o.getWidth() / 2 + o._textRenderer.height * Math.sin(-o._textRenderer.angle) / 2
                                }
                            } else b = -o.getWidth() / 2;
                            var D = this.u2p(o.value) + b + "px";
                            o._elem.css("left", D), o.pack()
                        }
                    }
                    var z = ["bottom", 0];
                    if (q) {
                        var m = this._label._elem.outerWidth(!0);
                        this._label._elem.css("left", l + g / 2 - m / 2 + "px"), "xaxis" == this.name ? (this._label._elem.css("bottom", "0px"), z = ["bottom", this._label._elem.outerHeight(!0)]) : (this._label._elem.css("top", "0px"), z = ["top", this._label._elem.outerHeight(!0)]), this._label.pack()
                    }
                    var d = parseInt(this._ticks.length / this.groups, 10) + 1;
                    for (x = 0; x < this._groupLabels.length; x++) {
                        for (var B = 0, f = 0, u = x * d;
                             (x + 1) * d > u; u++)
                            if (!(u >= this._ticks.length - 1) && this._ticks[u]._elem && " " != this._ticks[u].label) {
                                var o = this._ticks[u]._elem,
                                    r = o.position();
                                B += r.left + o.outerWidth(!0) / 2, f++
                            }
                        B /= f, this._groupLabels[x].css({
                            left: B - this._groupLabels[x].outerWidth(!0) / 2
                        }), this._groupLabels[x].css(z[0], z[1])
                    }
                } else {
                    for (x = 0; x < C.length; x++) {
                        var o = C[x];
                        if (o.show && o.showLabel) {
                            var b;
                            if (o.constructor == a.jqplot.CanvasAxisTickRenderer && o.angle) {
                                var A = "yaxis" == this.name ? 1 : -1;
                                switch (o.labelPosition) {
                                    case "auto":
                                    case "end":
                                        b = A * o.angle < 0 ? -o._textRenderer.height * Math.cos(-o._textRenderer.angle) / 2 : -o.getHeight() + o._textRenderer.height * Math.cos(o._textRenderer.angle) / 2;
                                        break;
                                    case "start":
                                        b = o.angle > 0 ? -o._textRenderer.height * Math.cos(-o._textRenderer.angle) / 2 : -o.getHeight() + o._textRenderer.height * Math.cos(o._textRenderer.angle) / 2;
                                        break;
                                    case "middle":
                                        b = -o.getHeight() / 2;
                                        break;
                                    default:
                                        b = -o.getHeight() / 2
                                }
                            } else b = -o.getHeight() / 2;
                            var D = this.u2p(o.value) + b + "px";
                            o._elem.css("top", D), o.pack()
                        }
                    }
                    var z = ["left", 0];
                    if (q) {
                        var y = this._label._elem.outerHeight(!0);
                        this._label._elem.css("top", n - g / 2 - y / 2 + "px"), "yaxis" == this.name ? (this._label._elem.css("left", "0px"), z = ["left", this._label._elem.outerWidth(!0)]) : (this._label._elem.css("right", "0px"), z = ["right", this._label._elem.outerWidth(!0)]), this._label.pack()
                    }
                    var d = parseInt(this._ticks.length / this.groups, 10) + 1;
                    for (x = 0; x < this._groupLabels.length; x++) {
                        for (var B = 0, f = 0, u = x * d;
                             (x + 1) * d > u; u++)
                            if (!(u >= this._ticks.length - 1) && this._ticks[u]._elem && " " != this._ticks[u].label) {
                                var o = this._ticks[u]._elem,
                                    r = o.position();
                                B += r.top + o.outerHeight() / 2, f++
                            }
                        B /= f, this._groupLabels[x].css({
                            top: B - this._groupLabels[x].outerHeight() / 2
                        }), this._groupLabels[x].css(z[0], z[1])
                    }
                }
        }
    }(jQuery),
    function(e) {
        function h(o) {
            return Math.sin((o - (o - Math.PI) / 8 / Math.PI) / 2)
        }

        function j(u, t, o, v, r) {
            var w = 0,
                q = t - u,
                s = Math.abs(q),
                p = o;
            return 0 == v && (p += r), p > 0 && s > .01 && 6.282 > s && (w = parseFloat(p) / 2 / h(q)), w
        }

        function c(s, r, p) {
            p = p || {}, p.axesDefaults = p.axesDefaults || {}, p.legend = p.legend || {}, p.seriesDefaults = p.seriesDefaults || {};
            var o = !1;
            if (p.seriesDefaults.renderer == e.jqplot.PieRenderer) o = !0;
            else if (p.series)
                for (var q = 0; q < p.series.length; q++) p.series[q].renderer == e.jqplot.PieRenderer && (o = !0);
            o && (p.axesDefaults.renderer = e.jqplot.PieAxisRenderer, p.legend.renderer = e.jqplot.PieLegendRenderer, p.legend.preDraw = !0, p.seriesDefaults.pointLabels = {
                show: !1
            })
        }

        function g(r, q, o) {
            for (var p = 0; p < this.series.length; p++) this.series[p].renderer.constructor == e.jqplot.PieRenderer && this.series[p].highlightMouseOver && (this.series[p].highlightMouseDown = !1)
        }

        function m(o) {
            for (var p = 0; p < this.series.length; p++) this.series[p].seriesColors = this.seriesColors, this.series[p].colorGenerator = e.jqplot.colorGenerator
        }

        function d(t, r, q) {
            var p = t.series[r],
                o = t.plugins.pieRenderer.highlightCanvas;
            o._ctx.clearRect(0, 0, o._ctx.canvas.width, o._ctx.canvas.height), p._highlightedPoint = q, t.plugins.pieRenderer.highlightedSeriesIndex = r, p.renderer.drawSlice.call(p, o._ctx, p._sliceAngles[q][0], p._sliceAngles[q][1], p.highlightColorGenerator.get(q), !1)
        }

        function k(q) {
            var o = q.plugins.pieRenderer.highlightCanvas;
            o._ctx.clearRect(0, 0, o._ctx.canvas.width, o._ctx.canvas.height);
            for (var p = 0; p < q.series.length; p++) q.series[p]._highlightedPoint = null;
            q.plugins.pieRenderer.highlightedSeriesIndex = null, q.target.trigger("jqplotDataUnhighlight")
        }

        function b(s, r, v, u, t) {
            if (u) {
                var q = [u.seriesIndex, u.pointIndex, u.data],
                    p = jQuery.Event("jqplotDataMouseOver");
                if (p.pageX = s.pageX, p.pageY = s.pageY, t.target.trigger(p, q), t.series[q[0]].highlightMouseOver && (q[0] != t.plugins.pieRenderer.highlightedSeriesIndex || q[1] != t.series[q[0]]._highlightedPoint)) {
                    var o = jQuery.Event("jqplotDataHighlight");
                    o.which = s.which, o.pageX = s.pageX, o.pageY = s.pageY, t.target.trigger(o, q), d(t, q[0], q[1])
                }
            } else null == u && k(t)
        }

        function a(r, q, u, t, s) {
            if (t) {
                var p = [t.seriesIndex, t.pointIndex, t.data];
                if (s.series[p[0]].highlightMouseDown && (p[0] != s.plugins.pieRenderer.highlightedSeriesIndex || p[1] != s.series[p[0]]._highlightedPoint)) {
                    var o = jQuery.Event("jqplotDataHighlight");
                    o.which = r.which, o.pageX = r.pageX, o.pageY = r.pageY, s.target.trigger(o, p), d(s, p[0], p[1])
                }
            } else null == t && k(s)
        }

        function l(q, p, t, s, r) {
            var o = r.plugins.pieRenderer.highlightedSeriesIndex;
            null != o && r.series[o].highlightMouseDown && k(r)
        }

        function f(r, q, u, t, s) {
            if (t) {
                var p = [t.seriesIndex, t.pointIndex, t.data],
                    o = jQuery.Event("jqplotDataClick");
                o.which = r.which, o.pageX = r.pageX, o.pageY = r.pageY, s.target.trigger(o, p)
            }
        }

        function n(s, r, v, u, t) {
            if (u) {
                var q = [u.seriesIndex, u.pointIndex, u.data],
                    o = t.plugins.pieRenderer.highlightedSeriesIndex;
                null != o && t.series[o].highlightMouseDown && k(t);
                var p = jQuery.Event("jqplotDataRightClick");
                p.which = s.which, p.pageX = s.pageX, p.pageY = s.pageY, t.target.trigger(p, q)
            }
        }

        function i() {
            this.plugins.pieRenderer && this.plugins.pieRenderer.highlightCanvas && (this.plugins.pieRenderer.highlightCanvas.resetCanvas(), this.plugins.pieRenderer.highlightCanvas = null), this.plugins.pieRenderer = {
                highlightedSeriesIndex: null
            }, this.plugins.pieRenderer.highlightCanvas = new e.jqplot.GenericCanvas;
            var p = e(this.targetId + " .jqplot-data-label");
            p.length ? e(p[0]).before(this.plugins.pieRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-pieRenderer-highlight-canvas", this._plotDimensions, this)) : this.eventCanvas._elem.before(this.plugins.pieRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-pieRenderer-highlight-canvas", this._plotDimensions, this));
            this.plugins.pieRenderer.highlightCanvas.setContext();
            this.eventCanvas._elem.bind("mouseleave", {
                plot: this
            }, function(q) {
                k(q.data.plot)
            })
        }
        e.jqplot.PieRenderer = function() {
            e.jqplot.LineRenderer.call(this)
        }, e.jqplot.PieRenderer.prototype = new e.jqplot.LineRenderer, e.jqplot.PieRenderer.prototype.constructor = e.jqplot.PieRenderer, e.jqplot.PieRenderer.prototype.init = function(q, u) {
            if (this.diameter = null, this.padding = 20, this.sliceMargin = 0, this.fill = !0, this.shadowOffset = 2, this.shadowAlpha = .07, this.shadowDepth = 5, this.highlightMouseOver = !0, this.highlightMouseDown = !1, this.highlightColors = [], this.dataLabels = "percent", this.showDataLabels = !1, this.dataLabelFormatString = null, this.dataLabelThreshold = 3, this.dataLabelPositionFactor = .52, this.dataLabelNudge = 2, this.dataLabelCenterOn = !0, this.startAngle = 0, this.tickRenderer = e.jqplot.PieTickRenderer, this._drawData = !0, this._type = "pie", q.highlightMouseDown && null == q.highlightMouseOver && (q.highlightMouseOver = !1), e.extend(!0, this, q), this.sliceMargin < 0 && (this.sliceMargin = 0), this._diameter = null, this._radius = null, this._sliceAngles = [], this._highlightedPoint = null, 0 == this.highlightColors.length)
                for (var s = 0; s < this.seriesColors.length; s++) {
                    for (var r = e.jqplot.getColorComponents(this.seriesColors[s]), o = [r[0], r[1], r[2]], t = o[0] + o[1] + o[2], p = 0; 3 > p; p++) o[p] = t > 570 ? .8 * o[p] : o[p] + .3 * (255 - o[p]), o[p] = parseInt(o[p], 10);
                    this.highlightColors.push("rgb(" + o[0] + "," + o[1] + "," + o[2] + ")")
                }
            this.highlightColorGenerator = new e.jqplot.ColorGenerator(this.highlightColors), u.postParseOptionsHooks.addOnce(m), u.postInitHooks.addOnce(g), u.eventListenerHooks.addOnce("jqplotMouseMove", b), u.eventListenerHooks.addOnce("jqplotMouseDown", a), u.eventListenerHooks.addOnce("jqplotMouseUp", l), u.eventListenerHooks.addOnce("jqplotClick", f), u.eventListenerHooks.addOnce("jqplotRightClick", n), u.postDrawHooks.addOnce(i)
        }, e.jqplot.PieRenderer.prototype.setGridData = function(t) {
            var p = [],
                u = [],
                s = (this.startAngle / 180 * Math.PI, 0);
            this._drawData = !1;
            for (var r = 0; r < this.data.length; r++) 0 != this.data[r][1] && (this._drawData = !0), p.push(this.data[r][1]), u.push([this.data[r][0]]), r > 0 && (p[r] += p[r - 1]), s += this.data[r][1];
            for (var q = 2 * Math.PI / p[p.length - 1], r = 0; r < p.length; r++) u[r][1] = p[r] * q, u[r][2] = this.data[r][1] / s;
            this.gridData = u
        }, e.jqplot.PieRenderer.prototype.makeGridData = function(t, u) {
            var p = [],
                v = [],
                s = 0;
            this.startAngle / 180 * Math.PI;
            this._drawData = !1;
            for (var r = 0; r < t.length; r++) 0 != this.data[r][1] && (this._drawData = !0), p.push(t[r][1]), v.push([t[r][0]]), r > 0 && (p[r] += p[r - 1]), s += t[r][1];
            for (var q = 2 * Math.PI / p[p.length - 1], r = 0; r < p.length; r++) v[r][1] = p[r] * q, v[r][2] = t[r][1] / s;
            return v
        }, e.jqplot.PieRenderer.prototype.drawSlice = function(B, z, y, u, w) {
            function q(r) {
                y > 6.282 + this.startAngle && (y = 6.282 + this.startAngle, z > y && (z = 6.281 + this.startAngle)), z >= y || (B.beginPath(), B.fillStyle = u, B.strokeStyle = u, B.lineWidth = x, B.arc(0, 0, r, z, y, !1), B.lineTo(0, 0), B.closePath(), A ? B.fill() : B.stroke())
            }
            if (this._drawData) {
                var p = this._radius,
                    A = this.fill,
                    x = this.lineWidth,
                    s = this.sliceMargin;
                0 == this.fill && (s += this.lineWidth), B.save(), B.translate(this._center[0], this._center[1]);
                var D = j(z, y, this.sliceMargin, this.fill, this.lineWidth),
                    o = D * Math.cos((z + y) / 2),
                    C = D * Math.sin((z + y) / 2);
                if (y - z <= Math.PI ? p -= D : p += D, B.translate(o, C), w) {
                    for (var v = 0, t = this.shadowDepth; t > v; v++) B.save(), B.translate(this.shadowOffset * Math.cos(this.shadowAngle / 180 * Math.PI), this.shadowOffset * Math.sin(this.shadowAngle / 180 * Math.PI)), q(p);
                    for (var v = 0, t = this.shadowDepth; t > v; v++) B.restore()
                } else q(p);
                B.restore()
            }
        }, e.jqplot.PieRenderer.prototype.draw = function(B, z, E, o) {
            var W, H = void 0 != E ? E : {},
                t = 0,
                s = 0,
                N = 1,
                L = new e.jqplot.ColorGenerator(this.seriesColors);
            if (E.legendInfo && "insideGrid" == E.legendInfo.placement) {
                var J = E.legendInfo;
                switch (J.location) {
                    case "nw":
                        t = J.width + J.xoffset;
                        break;
                    case "w":
                        t = J.width + J.xoffset;
                        break;
                    case "sw":
                        t = J.width + J.xoffset;
                        break;
                    case "ne":
                        t = J.width + J.xoffset, N = -1;
                        break;
                    case "e":
                        t = J.width + J.xoffset, N = -1;
                        break;
                    case "se":
                        t = J.width + J.xoffset, N = -1;
                        break;
                    case "n":
                        s = J.height + J.yoffset;
                        break;
                    case "s":
                        s = J.height + J.yoffset, N = -1
                }
            }
            var C = (void 0 != H.shadow ? H.shadow : this.shadow, void 0 != H.fill ? H.fill : this.fill, B.canvas.width),
                I = B.canvas.height,
                Q = C - t - 2 * this.padding,
                X = I - s - 2 * this.padding,
                M = Math.min(Q, X),
                Y = M;
            this._sliceAngles = [];
            var v = this.sliceMargin;
            0 == this.fill && (v += this.lineWidth);
            for (var q, aa, Z, ab, G = 0, D = this.startAngle / 180 * Math.PI, W = 0, V = z.length; V > W; W++) aa = 0 == W ? D : z[W - 1][1] + D, Z = z[W][1] + D, this._sliceAngles.push([aa, Z]), q = j(aa, Z, this.sliceMargin, this.fill, this.lineWidth), Math.abs(Z - aa) > Math.PI && (G = Math.max(q, G));
            if (null != this.diameter && this.diameter > 0 ? this._diameter = this.diameter - 2 * G : this._diameter = Y - 2 * G, this._diameter < 6) return void e.jqplot.log("Diameter of pie too small, not rendering.");
            this._radius = this._diameter / 2;
            if (this._center = [(C - N * t) / 2 + N * t + G * Math.cos(D), (I - N * s) / 2 + N * s + G * Math.sin(D)], this.shadow)
                for (var W = 0, V = z.length; V > W; W++) ab = "rgba(0,0,0," + this.shadowAlpha + ")", this.renderer.drawSlice.call(this, B, this._sliceAngles[W][0], this._sliceAngles[W][1], ab, !0);
            for (var W = 0; W < z.length; W++)
                if (this.renderer.drawSlice.call(this, B, this._sliceAngles[W][0], this._sliceAngles[W][1], L.next(), !1), this.showDataLabels && 100 * z[W][2] >= this.dataLabelThreshold) {
                    var F, T, U = (this._sliceAngles[W][0] + this._sliceAngles[W][1]) / 2;
                    "label" == this.dataLabels ? (F = this.dataLabelFormatString || "%s", T = e.jqplot.sprintf(F, z[W][0])) : "value" == this.dataLabels ? (F = this.dataLabelFormatString || "%d", T = e.jqplot.sprintf(F, this.data[W][1])) : "percent" == this.dataLabels ? (F = this.dataLabelFormatString || "%d%%", T = e.jqplot.sprintf(F, 100 * z[W][2])) : this.dataLabels.constructor == Array && (F = this.dataLabelFormatString || "%s", T = e.jqplot.sprintf(F, this.dataLabels[W]));
                    var p = this._radius * this.dataLabelPositionFactor + this.sliceMargin + this.dataLabelNudge,
                        P = this._center[0] + Math.cos(U) * p + this.canvas._offsets.left,
                        O = this._center[1] + Math.sin(U) * p + this.canvas._offsets.top,
                        u = e('<div class="jqplot-pie-series jqplot-data-label" style="position:absolute;">' + T + "</div>").insertBefore(o.eventCanvas._elem);
                    this.dataLabelCenterOn ? (P -= u.width() / 2, O -= u.height() / 2) : (P -= u.width() * Math.sin(U / 2), O -= u.height() / 2), P = Math.round(P), O = Math.round(O), u.css({
                        left: P,
                        top: O
                    })
                }
        }, e.jqplot.PieAxisRenderer = function() {
            e.jqplot.LinearAxisRenderer.call(this)
        }, e.jqplot.PieAxisRenderer.prototype = new e.jqplot.LinearAxisRenderer, e.jqplot.PieAxisRenderer.prototype.constructor = e.jqplot.PieAxisRenderer, e.jqplot.PieAxisRenderer.prototype.init = function(o) {
            this.tickRenderer = e.jqplot.PieTickRenderer, e.extend(!0, this, o), this._dataBounds = {
                min: 0,
                max: 100
            }, this.min = 0, this.max = 100, this.showTicks = !1, this.ticks = [], this.showMark = !1, this.show = !1
        }, e.jqplot.PieLegendRenderer = function() {
            e.jqplot.TableLegendRenderer.call(this)
        }, e.jqplot.PieLegendRenderer.prototype = new e.jqplot.TableLegendRenderer, e.jqplot.PieLegendRenderer.prototype.constructor = e.jqplot.PieLegendRenderer, e.jqplot.PieLegendRenderer.prototype.init = function(o) {
            this.numberRows = null, this.numberColumns = null, e.extend(!0, this, o)
        }, e.jqplot.PieLegendRenderer.prototype.draw = function() {
            if (this.show) {
                var B = this._series;
                this._elem = e(document.createElement("table")), this._elem.addClass("jqplot-table-legend");
                var E = {
                    position: "absolute"
                };
                this.background && (E.background = this.background), this.border && (E.border = this.border), this.fontSize && (E.fontSize = this.fontSize), this.fontFamily && (E.fontFamily = this.fontFamily), this.textColor && (E.textColor = this.textColor), null != this.marginTop && (E.marginTop = this.marginTop), null != this.marginBottom && (E.marginBottom = this.marginBottom), null != this.marginLeft && (E.marginLeft = this.marginLeft), null != this.marginRight && (E.marginRight = this.marginRight), this._elem.css(E);
                var o, y, I = !1,
                    A = !1,
                    C = B[0],
                    p = new e.jqplot.ColorGenerator(C.seriesColors);
                if (C.show) {
                    var J = C.data;
                    this.numberRows ? (o = this.numberRows, y = this.numberColumns ? this.numberColumns : Math.ceil(J.length / o)) : this.numberColumns ? (y = this.numberColumns, o = Math.ceil(J.length / this.numberColumns)) : (o = J.length, y = 1);
                    var H, G, q, w, v, x, z, F, u, t, D = 0;
                    for (H = 0; o > H; H++)
                        for (q = e(document.createElement("tr")), q.addClass("jqplot-table-legend"), A ? q.prependTo(this._elem) : q.appendTo(this._elem), G = 0; y > G; G++) D < J.length && (x = this.labels[D] || J[D][0].toString(), F = p.next(), I = A ? H != o - 1 : H > 0, z = I ? this.rowSpacing : "0", w = e(document.createElement("td")), w.addClass("jqplot-table-legend jqplot-table-legend-swatch"), w.css({
                            textAlign: "center",
                            paddingTop: z
                        }), u = e(document.createElement("div")), u.addClass("jqplot-table-legend-swatch-outline"), t = e(document.createElement("div")), t.addClass("jqplot-table-legend-swatch"), t.css({
                            backgroundColor: F,
                            borderColor: F
                        }), w.append(u.append(t)), v = e(document.createElement("td")), v.addClass("jqplot-table-legend jqplot-table-legend-label"), v.css("paddingTop", z), this.escapeHtml ? v.text(x) : v.html(x), A ? (v.prependTo(q), w.prependTo(q)) : (w.appendTo(q), v.appendTo(q)), I = !0), D++
                }
            }
            return this._elem
        }, e.jqplot.PieRenderer.prototype.handleMove = function(q, p, t, s, r) {
            if (s) {
                var o = [s.seriesIndex, s.pointIndex, s.data];
                r.target.trigger("jqplotDataMouseOver", o), !r.series[o[0]].highlightMouseOver || o[0] == r.plugins.pieRenderer.highlightedSeriesIndex && o[1] == r.series[o[0]]._highlightedPoint || (r.target.trigger("jqplotDataHighlight", o), d(r, o[0], o[1]))
            } else null == s && k(r)
        }, e.jqplot.preInitHooks.push(c), e.jqplot.PieTickRenderer = function() {
            e.jqplot.AxisTickRenderer.call(this)
        }, e.jqplot.PieTickRenderer.prototype = new e.jqplot.AxisTickRenderer, e.jqplot.PieTickRenderer.prototype.constructor = e.jqplot.PieTickRenderer
    }(jQuery),
    function(e) {
        function c(r, q, o) {
            o = o || {}, o.axesDefaults = o.axesDefaults || {}, o.legend = o.legend || {}, o.seriesDefaults = o.seriesDefaults || {};
            var n = !1;
            if (o.seriesDefaults.renderer == e.jqplot.DonutRenderer) n = !0;
            else if (o.series)
                for (var p = 0; p < o.series.length; p++) o.series[p].renderer == e.jqplot.DonutRenderer && (n = !0);
            n && (o.axesDefaults.renderer = e.jqplot.DonutAxisRenderer, o.legend.renderer = e.jqplot.DonutLegendRenderer, o.legend.preDraw = !0, o.seriesDefaults.pointLabels = {
                show: !1
            })
        }

        function g(r, q, o) {
            for (var p = 1; p < this.series.length; p++)
                if (!this.series[p]._previousSeries.length)
                    for (var n = 0; p > n; n++) this.series[p].renderer.constructor == e.jqplot.DonutRenderer && this.series[n].renderer.constructor == e.jqplot.DonutRenderer && this.series[p]._previousSeries.push(this.series[n]);
            for (p = 0; p < this.series.length; p++) this.series[p].renderer.constructor == e.jqplot.DonutRenderer && (this.series[p]._numberSeries = this.series.length, this.series[p].highlightMouseOver && (this.series[p].highlightMouseDown = !1))
        }

        function l(n) {
            for (var o = 0; o < this.series.length; o++) this.series[o].seriesColors = this.seriesColors, this.series[o].colorGenerator = e.jqplot.colorGenerator
        }

        function d(r, q, p) {
            var o = r.series[q],
                n = r.plugins.donutRenderer.highlightCanvas;
            n._ctx.clearRect(0, 0, n._ctx.canvas.width, n._ctx.canvas.height), o._highlightedPoint = p, r.plugins.donutRenderer.highlightedSeriesIndex = q, o.renderer.drawSlice.call(o, n._ctx, o._sliceAngles[p][0], o._sliceAngles[p][1], o.highlightColors[p], !1)
        }

        function i(p) {
            var n = p.plugins.donutRenderer.highlightCanvas;
            n._ctx.clearRect(0, 0, n._ctx.canvas.width, n._ctx.canvas.height);
            for (var o = 0; o < p.series.length; o++) p.series[o]._highlightedPoint = null;
            p.plugins.donutRenderer.highlightedSeriesIndex = null, p.target.trigger("jqplotDataUnhighlight")
        }

        function b(r, q, u, t, s) {
            if (t) {
                var p = [t.seriesIndex, t.pointIndex, t.data],
                    o = jQuery.Event("jqplotDataMouseOver");
                if (o.pageX = r.pageX, o.pageY = r.pageY, s.target.trigger(o, p), s.series[p[0]].highlightMouseOver && (p[0] != s.plugins.donutRenderer.highlightedSeriesIndex || p[1] != s.series[p[0]]._highlightedPoint)) {
                    var n = jQuery.Event("jqplotDataHighlight");
                    n.which = r.which, n.pageX = r.pageX, n.pageY = r.pageY, s.target.trigger(n, p), d(s, p[0], p[1])
                }
            } else null == t && i(s)
        }

        function a(q, p, t, s, r) {
            if (s) {
                var o = [s.seriesIndex, s.pointIndex, s.data];
                if (r.series[o[0]].highlightMouseDown && (o[0] != r.plugins.donutRenderer.highlightedSeriesIndex || o[1] != r.series[o[0]]._highlightedPoint)) {
                    var n = jQuery.Event("jqplotDataHighlight");
                    n.which = q.which, n.pageX = q.pageX, n.pageY = q.pageY, r.target.trigger(n, o), d(r, o[0], o[1])
                }
            } else null == s && i(r)
        }

        function j(p, o, s, r, q) {
            var n = q.plugins.donutRenderer.highlightedSeriesIndex;
            null != n && q.series[n].highlightMouseDown && i(q)
        }

        function f(q, p, t, s, r) {
            if (s) {
                var o = [s.seriesIndex, s.pointIndex, s.data],
                    n = jQuery.Event("jqplotDataClick");
                n.which = q.which, n.pageX = q.pageX, n.pageY = q.pageY, r.target.trigger(n, o)
            }
        }

        function m(r, q, u, t, s) {
            if (t) {
                var p = [t.seriesIndex, t.pointIndex, t.data],
                    n = s.plugins.donutRenderer.highlightedSeriesIndex;
                null != n && s.series[n].highlightMouseDown && i(s);
                var o = jQuery.Event("jqplotDataRightClick");
                o.which = r.which, o.pageX = r.pageX, o.pageY = r.pageY, s.target.trigger(o, p)
            }
        }

        function h() {
            this.plugins.donutRenderer && this.plugins.donutRenderer.highlightCanvas && (this.plugins.donutRenderer.highlightCanvas.resetCanvas(), this.plugins.donutRenderer.highlightCanvas = null), this.plugins.donutRenderer = {
                highlightedSeriesIndex: null
            }, this.plugins.donutRenderer.highlightCanvas = new e.jqplot.GenericCanvas;
            var o = e(this.targetId + " .jqplot-data-label");
            o.length ? e(o[0]).before(this.plugins.donutRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-donutRenderer-highlight-canvas", this._plotDimensions, this)) : this.eventCanvas._elem.before(this.plugins.donutRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-donutRenderer-highlight-canvas", this._plotDimensions, this));
            this.plugins.donutRenderer.highlightCanvas.setContext();
            this.eventCanvas._elem.bind("mouseleave", {
                plot: this
            }, function(p) {
                i(p.data.plot)
            })
        }
        e.jqplot.DonutRenderer = function() {
            e.jqplot.LineRenderer.call(this)
        }, e.jqplot.DonutRenderer.prototype = new e.jqplot.LineRenderer, e.jqplot.DonutRenderer.prototype.constructor = e.jqplot.DonutRenderer, e.jqplot.DonutRenderer.prototype.init = function(p, t) {
            if (this.diameter = null, this.innerDiameter = null, this.thickness = null, this.padding = 20, this.sliceMargin = 0, this.ringMargin = null, this.fill = !0, this.shadowOffset = 2, this.shadowAlpha = .07, this.shadowDepth = 5, this.highlightMouseOver = !0, this.highlightMouseDown = !1, this.highlightColors = [], this.dataLabels = "percent", this.showDataLabels = !1, this.dataLabelFormatString = null, this.dataLabelThreshold = 3, this.dataLabelPositionFactor = .4, this.dataLabelNudge = 0, this.startAngle = 0, this.tickRenderer = e.jqplot.DonutTickRenderer, this._drawData = !0, this._type = "donut", p.highlightMouseDown && null == p.highlightMouseOver && (p.highlightMouseOver = !1), e.extend(!0, this, p), null != this.diameter && (this.diameter = this.diameter - this.sliceMargin), this._diameter = null, this._innerDiameter = null, this._radius = null, this._innerRadius = null, this._thickness = null, this._previousSeries = [], this._numberSeries = 1, this._sliceAngles = [], this._highlightedPoint = null, 0 == this.highlightColors.length)
                for (var r = 0; r < this.seriesColors.length; r++) {
                    for (var q = e.jqplot.getColorComponents(this.seriesColors[r]), n = [q[0], q[1], q[2]], s = n[0] + n[1] + n[2], o = 0; 3 > o; o++) n[o] = s > 570 ? .8 * n[o] : n[o] + .3 * (255 - n[o]), n[o] = parseInt(n[o], 10);
                    this.highlightColors.push("rgb(" + n[0] + "," + n[1] + "," + n[2] + ")")
                }
            t.postParseOptionsHooks.addOnce(l), t.postInitHooks.addOnce(g), t.eventListenerHooks.addOnce("jqplotMouseMove", b), t.eventListenerHooks.addOnce("jqplotMouseDown", a), t.eventListenerHooks.addOnce("jqplotMouseUp", j), t.eventListenerHooks.addOnce("jqplotClick", f), t.eventListenerHooks.addOnce("jqplotRightClick", m), t.postDrawHooks.addOnce(h)
        }, e.jqplot.DonutRenderer.prototype.setGridData = function(s) {
            var o = [],
                t = [],
                r = (this.startAngle / 180 * Math.PI, 0);
            this._drawData = !1;
            for (var q = 0; q < this.data.length; q++) 0 != this.data[q][1] && (this._drawData = !0), o.push(this.data[q][1]), t.push([this.data[q][0]]), q > 0 && (o[q] += o[q - 1]), r += this.data[q][1];
            for (var p = 2 * Math.PI / o[o.length - 1], q = 0; q < o.length; q++) t[q][1] = o[q] * p, t[q][2] = this.data[q][1] / r;
            this.gridData = t
        }, e.jqplot.DonutRenderer.prototype.makeGridData = function(s, t) {
            var o = [],
                u = [],
                r = 0;
            this.startAngle / 180 * Math.PI;
            this._drawData = !1;
            for (var q = 0; q < s.length; q++) 0 != this.data[q][1] && (this._drawData = !0), o.push(s[q][1]), u.push([s[q][0]]), q > 0 && (o[q] += o[q - 1]), r += s[q][1];
            for (var p = 2 * Math.PI / o[o.length - 1], q = 0; q < o.length; q++) u[q][1] = o[q] * p, u[q][2] = s[q][1] / r;
            return u
        }, e.jqplot.DonutRenderer.prototype.drawSlice = function(x, u, t, p, s) {
            function o() {
                t > 6.282 + this.startAngle && (t = 6.282 + this.startAngle, u > t && (u = 6.281 + this.startAngle)), u >= t || (x.beginPath(), x.fillStyle = p, x.strokeStyle = p, x.arc(0, 0, n, u, t, !1), x.lineTo(v * Math.cos(t), v * Math.sin(t)), x.arc(0, 0, v, t, u, !0), x.closePath(), w ? x.fill() : x.stroke())
            }
            var n = this._diameter / 2,
                v = n - this._thickness,
                w = this.fill;
            if (x.save(), x.translate(this._center[0], this._center[1]), s)
                for (var q = 0; q < this.shadowDepth; q++) x.save(), x.translate(this.shadowOffset * Math.cos(this.shadowAngle / 180 * Math.PI), this.shadowOffset * Math.sin(this.shadowAngle / 180 * Math.PI)), o();
            else o();
            if (s)
                for (var q = 0; q < this.shadowDepth; q++) x.restore();
            x.restore()
        }, e.jqplot.DonutRenderer.prototype.draw = function(N, V, t, P) {
            var Q, J = void 0 != t ? t : {},
                q = 0,
                p = 0,
                u = 1;
            if (t.legendInfo && "insideGrid" == t.legendInfo.placement) {
                var I = t.legendInfo;
                switch (I.location) {
                    case "nw":
                        q = I.width + I.xoffset;
                        break;
                    case "w":
                        q = I.width + I.xoffset;
                        break;
                    case "sw":
                        q = I.width + I.xoffset;
                        break;
                    case "ne":
                        q = I.width + I.xoffset, u = -1;
                        break;
                    case "e":
                        q = I.width + I.xoffset, u = -1;
                        break;
                    case "se":
                        q = I.width + I.xoffset, u = -1;
                        break;
                    case "n":
                        p = I.height + I.yoffset;
                        break;
                    case "s":
                        p = I.height + I.yoffset, u = -1
                }
            }
            for (var s = (void 0 != J.shadow ? J.shadow : this.shadow, void 0 != J.showLine ? J.showLine : this.showLine, void 0 != J.fill ? J.fill : this.fill, N.canvas.width), H = N.canvas.height, G = s - q - 2 * this.padding, R = H - p - 2 * this.padding, v = Math.min(G, R), T = v, X = null == this.ringMargin ? 2 * this.sliceMargin : this.ringMargin, Q = 0; Q < this._previousSeries.length; Q++) T -= 2 * this._previousSeries[Q]._thickness + 2 * X;
            if (this._diameter = this.diameter || T, null != this.innerDiameter) {
                var M = this._numberSeries > 1 && this.index > 0 ? this._previousSeries[0]._diameter : this._diameter;
                this._thickness = this.thickness || (M - this.innerDiameter - 2 * X * this._numberSeries) / this._numberSeries / 2
            } else this._thickness = this.thickness || v / 2 / (this._numberSeries + 1) * .85;
            this._radius = this._diameter / 2;
            this._innerRadius = this._radius - this._thickness;
            var o = this.startAngle / 180 * Math.PI;
            if (this._center = [(s - u * q) / 2 + u * q, (H - u * p) / 2 + u * p], this.shadow)
                for (var L = "rgba(0,0,0," + this.shadowAlpha + ")", Q = 0; Q < V.length; Q++) {
                    var A = 0 == Q ? o : V[Q - 1][1] + o;
                    A += this.sliceMargin / 180 * Math.PI, this.renderer.drawSlice.call(this, N, A, V[Q][1] + o, L, !0)
                }
            for (var Q = 0; Q < V.length; Q++) {
                var A = 0 == Q ? o : V[Q - 1][1] + o;
                A += this.sliceMargin / 180 * Math.PI;
                var z = V[Q][1] + o;
                if (this._sliceAngles.push([A, z]), this.renderer.drawSlice.call(this, N, A, z, this.seriesColors[Q], !1), this.showDataLabels && 100 * V[Q][2] >= this.dataLabelThreshold) {
                    var S, C, U = (A + z) / 2;
                    "label" == this.dataLabels ? (S = this.dataLabelFormatString || "%s", C = e.jqplot.sprintf(S, V[Q][0])) : "value" == this.dataLabels ? (S = this.dataLabelFormatString || "%d", C = e.jqplot.sprintf(S, this.data[Q][1])) : "percent" == this.dataLabels ? (S = this.dataLabelFormatString || "%d%%", C = e.jqplot.sprintf(S, 100 * V[Q][2])) : this.dataLabels.constructor == Array && (S = this.dataLabelFormatString || "%s", C = e.jqplot.sprintf(S, this.dataLabels[Q]));
                    var n = this._innerRadius + this._thickness * this.dataLabelPositionFactor + this.sliceMargin + this.dataLabelNudge,
                        F = this._center[0] + Math.cos(U) * n + this.canvas._offsets.left,
                        E = this._center[1] + Math.sin(U) * n + this.canvas._offsets.top,
                        D = e('<span class="jqplot-donut-series jqplot-data-label" style="position:absolute;">' + C + "</span>").insertBefore(P.eventCanvas._elem);
                    F -= D.width() / 2, E -= D.height() / 2, F = Math.round(F), E = Math.round(E), D.css({
                        left: F,
                        top: E
                    })
                }
            }
        }, e.jqplot.DonutAxisRenderer = function() {
            e.jqplot.LinearAxisRenderer.call(this)
        }, e.jqplot.DonutAxisRenderer.prototype = new e.jqplot.LinearAxisRenderer, e.jqplot.DonutAxisRenderer.prototype.constructor = e.jqplot.DonutAxisRenderer, e.jqplot.DonutAxisRenderer.prototype.init = function(n) {
            this.tickRenderer = e.jqplot.DonutTickRenderer, e.extend(!0, this, n), this._dataBounds = {
                min: 0,
                max: 100
            }, this.min = 0, this.max = 100, this.showTicks = !1, this.ticks = [], this.showMark = !1, this.show = !1
        }, e.jqplot.DonutLegendRenderer = function() {
            e.jqplot.TableLegendRenderer.call(this)
        }, e.jqplot.DonutLegendRenderer.prototype = new e.jqplot.TableLegendRenderer, e.jqplot.DonutLegendRenderer.prototype.constructor = e.jqplot.DonutLegendRenderer, e.jqplot.DonutLegendRenderer.prototype.init = function(n) {
            this.numberRows = null, this.numberColumns = null, e.extend(!0, this, n)
        }, e.jqplot.DonutLegendRenderer.prototype.draw = function() {
            if (this.show) {
                var y = this._series,
                    B = "position:absolute;";
                B += this.background ? "background:" + this.background + ";" : "", B += this.border ? "border:" + this.border + ";" : "", B += this.fontSize ? "font-size:" + this.fontSize + ";" : "", B += this.fontFamily ? "font-family:" + this.fontFamily + ";" : "", B += this.textColor ? "color:" + this.textColor + ";" : "", B += null != this.marginTop ? "margin-top:" + this.marginTop + ";" : "", B += null != this.marginBottom ? "margin-bottom:" + this.marginBottom + ";" : "", B += null != this.marginLeft ? "margin-left:" + this.marginLeft + ";" : "", B += null != this.marginRight ? "margin-right:" + this.marginRight + ";" : "", this._elem = e('<table class="jqplot-table-legend" style="' + B + '"></table>');
                var n, v, F = !1,
                    x = !1,
                    z = y[0],
                    o = new e.jqplot.ColorGenerator(z.seriesColors);
                if (z.show) {
                    var G = z.data;
                    this.numberRows ? (n = this.numberRows, v = this.numberColumns ? this.numberColumns : Math.ceil(G.length / n)) : this.numberColumns ? (v = this.numberColumns, n = Math.ceil(G.length / this.numberColumns)) : (n = G.length, v = 1);
                    var E, D, p, t, r, u, w, C, A = 0;
                    for (E = 0; n > E; E++)
                        for (p = x ? e('<tr class="jqplot-table-legend"></tr>').prependTo(this._elem) : e('<tr class="jqplot-table-legend"></tr>').appendTo(this._elem), D = 0; v > D; D++) A < G.length && (u = this.labels[A] || G[A][0].toString(), C = o.next(), F = x ? E != n - 1 : E > 0, w = F ? this.rowSpacing : "0", t = e('<td class="jqplot-table-legend" style="text-align:center;padding-top:' + w + ';"><div><div class="jqplot-table-legend-swatch" style="border-color:' + C + ';"></div></div></td>'), r = e('<td class="jqplot-table-legend" style="padding-top:' + w + ';"></td>'), this.escapeHtml ? r.text(u) : r.html(u), x ? (r.prependTo(p), t.prependTo(p)) : (t.appendTo(p), r.appendTo(p)), F = !0), A++
                }
            }
            return this._elem
        };
        e.jqplot.preInitHooks.push(c), e.jqplot.DonutTickRenderer = function() {
            e.jqplot.AxisTickRenderer.call(this)
        }, e.jqplot.DonutTickRenderer.prototype = new e.jqplot.AxisTickRenderer, e.jqplot.DonutTickRenderer.prototype.constructor = e.jqplot.DonutTickRenderer
    }(jQuery),
    function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = {}.hasOwnProperty,
            r = function(a, b) {
                function c() {
                    this.constructor = a
                }
                for (var d in b) q.call(b, d) && (a[d] = b[d]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            };
        ! function() {
            var a, b, c, d, e, f, g;
            for (g = ["ms", "moz", "webkit", "o"], c = 0, e = g.length; e > c && (f = g[c], !window.requestAnimationFrame); c++) window.requestAnimationFrame = window[f + "RequestAnimationFrame"], window.cancelAnimationFrame = window[f + "CancelAnimationFrame"] || window[f + "CancelRequestAnimationFrame"];
            return a = null, d = 0, b = {}, requestAnimationFrame ? window.cancelAnimationFrame ? void 0 : (a = window.requestAnimationFrame, window.requestAnimationFrame = function(c, e) {
                var f;
                return f = ++d, a(function() {
                    return b[f] ? void 0 : c()
                }, e), f
            }, window.cancelAnimationFrame = function(a) {
                return b[a] = !0
            }) : (window.requestAnimationFrame = function(a, b) {
                var c, d, e, f;
                return c = (new Date).getTime(), f = Math.max(0, 16 - (c - e)), d = window.setTimeout(function() {
                    return a(c + f)
                }, f), e = c + f, d
            }, window.cancelAnimationFrame = function(a) {
                return clearTimeout(a)
            })
        }(), String.prototype.hashCode = function() {
            var a, b, c, d, e;
            if (b = 0, 0 === this.length) return b;
            for (c = d = 0, e = this.length; e >= 0 ? e > d : d > e; c = e >= 0 ? ++d : --d) a = this.charCodeAt(c), b = (b << 5) - b + a, b &= b;
            return b
        }, o = function(a) {
            var b, c;
            for (b = Math.floor(a / 3600), c = Math.floor((a - 3600 * b) / 60), a -= 3600 * b + 60 * c, a += "", c += ""; c.length < 2;) c = "0" + c;
            for (; a.length < 2;) a = "0" + a;
            return b = b ? b + ":" : "", b + c + ":" + a
        }, m = function(a) {
            return k(a.toFixed(0))
        }, p = function(a, b) {
            var c, d;
            for (c in b) q.call(b, c) && (d = b[c], a[c] = d);
            return a
        }, n = function(a, b) {
            var c, d, e;
            d = {};
            for (c in a) q.call(a, c) && (e = a[c], d[c] = e);
            for (c in b) q.call(b, c) && (e = b[c], d[c] = e);
            return d
        }, k = function(a) {
            var b, c, d, e;
            for (a += "", c = a.split("."), d = c[0], e = "", c.length > 1 && (e = "." + c[1]), b = /(\d+)(\d{3})/; b.test(d);) d = d.replace(b, "$1,$2");
            return d + e
        }, l = function(a) {
            return "#" === a.charAt(0) ? a.substring(1, 7) : a
        }, j = function() {
            function a(a, b) {
                null == a && (a = !0), this.clear = null != b ? b : !0, a && AnimationUpdater.add(this)
            }
            return a.prototype.animationSpeed = 32, a.prototype.update = function(a) {
                var b;
                return null == a && (a = !1), a || this.displayedValue !== this.value ? (this.ctx && this.clear && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), b = this.value - this.displayedValue, Math.abs(b / this.animationSpeed) <= .001 ? this.displayedValue = this.value : this.displayedValue = this.displayedValue + b / this.animationSpeed, this.render(), !0) : !1
            }, a
        }(), e = function(a) {
            function b() {
                return b.__super__.constructor.apply(this, arguments)
            }
            return r(b, a), b.prototype.displayScale = 1, b.prototype.setTextField = function(a) {
                return this.textField = a instanceof i ? a : new i(a)
            }, b.prototype.setMinValue = function(a, b) {
                var c, d, e, f, g;
                if (this.minValue = a, null == b && (b = !0), b) {
                    for (this.displayedValue = this.minValue, f = this.gp || [], g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(c.displayedValue = this.minValue);
                    return g
                }
            }, b.prototype.setOptions = function(a) {
                return null == a && (a = null), this.options = n(this.options, a), this.textField && (this.textField.el.style.fontSize = a.fontSize + "px"), this.options.angle > .5 && (this.gauge.options.angle = .5), this.configDisplayScale(), this
            }, b.prototype.configDisplayScale = function() {
                var a, b, c, d, e;
                return d = this.displayScale, this.options.highDpiSupport === !1 ? delete this.displayScale : (b = window.devicePixelRatio || 1, a = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1, this.displayScale = b / a), this.displayScale !== d && (e = this.canvas.G__width || this.canvas.width, c = this.canvas.G__height || this.canvas.height, this.canvas.width = e * this.displayScale, this.canvas.height = c * this.displayScale, this.canvas.style.width = e + "px", this.canvas.style.height = c + "px", this.canvas.G__width = e, this.canvas.G__height = c), this
            }, b
        }(j), i = function() {
            function a(a) {
                this.el = a
            }
            return a.prototype.render = function(a) {
                return this.el.innerHTML = m(a.displayedValue)
            }, a
        }(), a = function(a) {
            function b(a, b) {
                this.elem = a, this.text = null != b ? b : !1, this.value = 1 * this.elem.innerHTML, this.text && (this.value = 0)
            }
            return r(b, a), b.prototype.displayedValue = 0, b.prototype.value = 0, b.prototype.setVal = function(a) {
                return this.value = 1 * a
            }, b.prototype.render = function() {
                var a;
                return a = this.text ? o(this.displayedValue.toFixed(0)) : k(m(this.displayedValue)), this.elem.innerHTML = a
            }, b
        }(j), b = {
            create: function(b) {
                var c, d, e, f;
                for (f = [], d = 0, e = b.length; e > d; d++) c = b[d], f.push(new a(c));
                return f
            }
        }, h = function(a) {
            function b(a) {
                this.gauge = a, this.ctx = this.gauge.ctx, this.canvas = this.gauge.canvas, b.__super__.constructor.call(this, !1, !1), this.setOptions()
            }
            return r(b, a), b.prototype.displayedValue = 0, b.prototype.value = 0, b.prototype.options = {
                strokeWidth: .035,
                length: .1,
                color: "#000000"
            }, b.prototype.setOptions = function(a) {
                return null == a && (a = null), p(this.options, a), this.length = this.canvas.height * this.options.length, this.strokeWidth = this.canvas.height * this.options.strokeWidth, this.maxValue = this.gauge.maxValue, this.minValue = this.gauge.minValue, this.animationSpeed = this.gauge.animationSpeed, this.options.angle = this.gauge.options.angle
            }, b.prototype.render = function() {
                var a, b, c, d, e, f, g, h, i;
                return a = this.gauge.getAngle.call(this, this.displayedValue), b = this.canvas.width / 2, c = .9 * this.canvas.height, h = Math.round(b + this.length * Math.cos(a)), i = Math.round(c + this.length * Math.sin(a)), f = Math.round(b + this.strokeWidth * Math.cos(a - Math.PI / 2)), g = Math.round(c + this.strokeWidth * Math.sin(a - Math.PI / 2)), d = Math.round(b + this.strokeWidth * Math.cos(a + Math.PI / 2)), e = Math.round(c + this.strokeWidth * Math.sin(a + Math.PI / 2)), this.ctx.fillStyle = this.options.color, this.ctx.beginPath(), this.ctx.arc(b, c, this.strokeWidth, 0, 2 * Math.PI, !0), this.ctx.fill(), this.ctx.beginPath(), this.ctx.moveTo(f, g), this.ctx.lineTo(h, i), this.ctx.lineTo(d, e), this.ctx.fill()
            }, b
        }(j), c = function() {
            function a(a) {
                this.elem = a
            }
            return a.prototype.updateValues = function(a) {
                return this.value = a[0], this.maxValue = a[1], this.avgValue = a[2], this.render()
            }, a.prototype.render = function() {
                var a, b;
                return this.textField && this.textField.text(m(this.value)), 0 === this.maxValue && (this.maxValue = 2 * this.avgValue), b = this.value / this.maxValue * 100, a = this.avgValue / this.maxValue * 100, $(".bar-value", this.elem).css({
                    width: b + "%"
                }), $(".typical-value", this.elem).css({
                    width: a + "%"
                })
            }, a
        }(), g = function(a) {
            function b(a) {
                this.canvas = a, b.__super__.constructor.call(this), this.percentColors = null, "undefined" != typeof G_vmlCanvasManager && (this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)), this.ctx = this.canvas.getContext("2d"), this.gp = [new h(this)], this.setOptions(), this.render()
            }
            return r(b, a), b.prototype.elem = null, b.prototype.value = [20], b.prototype.maxValue = 80, b.prototype.minValue = 0, b.prototype.displayedAngle = 0, b.prototype.displayedValue = 0, b.prototype.lineWidth = 40, b.prototype.paddingBottom = .1, b.prototype.percentColors = null, b.prototype.options = {
                colorStart: "#6fadcf",
                colorStop: void 0,
                gradientType: 0,
                strokeColor: "#e0e0e0",
                pointer: {
                    length: .8,
                    strokeWidth: .035
                },
                angle: .15,
                lineWidth: .44,
                fontSize: 40,
                limitMax: !1
            }, b.prototype.setOptions = function(a) {
                var c, d, e, f;
                for (null == a && (a = null), b.__super__.setOptions.call(this, a), this.configPercentColors(), this.lineWidth = this.canvas.height * (1 - this.paddingBottom) * this.options.lineWidth, this.radius = this.canvas.height * (1 - this.paddingBottom) - this.lineWidth, this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.render(), f = this.gp, d = 0, e = f.length; e > d; d++) c = f[d], c.setOptions(this.options.pointer), c.render();
                return this
            }, b.prototype.configPercentColors = function() {
                var a, b, c, d, e, f, g;
                if (this.percentColors = null, void 0 !== this.options.percentColors) {
                    for (this.percentColors = new Array, f = [], c = d = 0, e = this.options.percentColors.length - 1; e >= 0 ? e >= d : d >= e; c = e >= 0 ? ++d : --d) g = parseInt(l(this.options.percentColors[c][1]).substring(0, 2), 16), b = parseInt(l(this.options.percentColors[c][1]).substring(2, 4), 16), a = parseInt(l(this.options.percentColors[c][1]).substring(4, 6), 16), f.push(this.percentColors[c] = {
                        pct: this.options.percentColors[c][0],
                        color: {
                            r: g,
                            g: b,
                            b: a
                        }
                    });
                    return f
                }
            }, b.prototype.set = function(a) {
                var b, c, d, e, f, g, i;
                if (a instanceof Array || (a = [a]), a.length > this.gp.length)
                    for (b = c = 0, g = a.length - this.gp.length; g >= 0 ? g > c : c > g; b = g >= 0 ? ++c : --c) this.gp.push(new h(this));
                for (b = 0, f = !1, d = 0, e = a.length; e > d; d++) i = a[d], i > this.maxValue && (this.maxValue = 1.1 * this.value, f = !0), this.gp[b].value = i, this.gp[b++].setOptions({
                    maxValue: this.maxValue,
                    angle: this.options.angle
                });
                return this.value = a[a.length - 1], f && this.options.limitMax ? void 0 : AnimationUpdater.run()
            }, b.prototype.getAngle = function(a) {
                return (1 + this.options.angle) * Math.PI + (a - this.minValue) / (this.maxValue - this.minValue) * (1 - 2 * this.options.angle) * Math.PI
            }, b.prototype.getColorForPercentage = function(a, b) {
                var c, d, e, f, g, h, i;
                if (0 === a) c = this.percentColors[0].color;
                else
                    for (c = this.percentColors[this.percentColors.length - 1].color, e = f = 0, h = this.percentColors.length - 1; h >= 0 ? h >= f : f >= h; e = h >= 0 ? ++f : --f)
                        if (a <= this.percentColors[e].pct) {
                            b === !0 ? (i = this.percentColors[e - 1], d = this.percentColors[e], g = (a - i.pct) / (d.pct - i.pct), c = {
                                r: Math.floor(i.color.r * (1 - g) + d.color.r * g),
                                g: Math.floor(i.color.g * (1 - g) + d.color.g * g),
                                b: Math.floor(i.color.b * (1 - g) + d.color.b * g)
                            }) : c = this.percentColors[e].color;
                            break
                        } return "rgb(" + [c.r, c.g, c.b].join(",") + ")"
            }, b.prototype.getColorForValue = function(a, b) {
                var c;
                return c = (a - this.minValue) / (this.maxValue - this.minValue), this.getColorForPercentage(c, b)
            }, b.prototype.render = function() {
                var a, b, c, d, e, f, g, h, i;
                for (i = this.canvas.width / 2, d = this.canvas.height * (1 - this.paddingBottom), a = this.getAngle(this.displayedValue), this.textField && this.textField.render(this), this.ctx.lineCap = "butt", void 0 !== this.options.customFillStyle ? b = this.options.customFillStyle(this) : null !== this.percentColors ? b = this.getColorForValue(this.displayedValue, !0) : void 0 !== this.options.colorStop ? (b = 0 === this.options.gradientType ? this.ctx.createRadialGradient(i, d, 9, i, d, 70) : this.ctx.createLinearGradient(0, 0, i, 0), b.addColorStop(0, this.options.colorStart), b.addColorStop(1, this.options.colorStop)) : b = this.options.colorStart, this.ctx.strokeStyle = b, this.ctx.beginPath(), this.ctx.arc(i, d, this.radius, (1 + this.options.angle) * Math.PI, a, !1), this.ctx.lineWidth = this.lineWidth, this.ctx.stroke(), this.ctx.strokeStyle = this.options.strokeColor, this.ctx.beginPath(), this.ctx.arc(i, d, this.radius, a, (2 - this.options.angle) * Math.PI, !1), this.ctx.stroke(), g = this.gp, h = [], e = 0, f = g.length; f > e; e++) c = g[e], h.push(c.update(!0));
                return h
            }, b
        }(e), d = function(a) {
            function b(a) {
                this.canvas = a, b.__super__.constructor.call(this), "undefined" != typeof G_vmlCanvasManager && (this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)), this.ctx = this.canvas.getContext("2d"), this.setOptions(), this.render()
            }
            return r(b, a), b.prototype.lineWidth = 15, b.prototype.displayedValue = 0, b.prototype.value = 33, b.prototype.maxValue = 80, b.prototype.minValue = 0, b.prototype.options = {
                lineWidth: .1,
                colorStart: "#6f6ea0",
                colorStop: "#c0c0db",
                strokeColor: "#eeeeee",
                shadowColor: "#d5d5d5",
                angle: .35
            }, b.prototype.getAngle = function(a) {
                return (1 - this.options.angle) * Math.PI + (a - this.minValue) / (this.maxValue - this.minValue) * (2 + this.options.angle - (1 - this.options.angle)) * Math.PI
            }, b.prototype.setOptions = function(a) {
                return null == a && (a = null), b.__super__.setOptions.call(this, a), this.lineWidth = this.canvas.height * this.options.lineWidth, this.radius = this.canvas.height / 2 - this.lineWidth / 2, this
            }, b.prototype.set = function(a) {
                return this.value = a, this.value > this.maxValue && (this.maxValue = 1.1 * this.value), AnimationUpdater.run()
            }, b.prototype.render = function() {
                var a, b, c, d, e, f;
                return a = this.getAngle(this.displayedValue), f = this.canvas.width / 2, c = this.canvas.height / 2, this.textField && this.textField.render(this), b = this.ctx.createRadialGradient(f, c, 39, f, c, 70), b.addColorStop(0, this.options.colorStart), b.addColorStop(1, this.options.colorStop), d = this.radius - this.lineWidth / 2, e = this.radius + this.lineWidth / 2, this.ctx.strokeStyle = this.options.strokeColor, this.ctx.beginPath(), this.ctx.arc(f, c, this.radius, (1 - this.options.angle) * Math.PI, (2 + this.options.angle) * Math.PI, !1), this.ctx.lineWidth = this.lineWidth, this.ctx.lineCap = "round", this.ctx.stroke(), this.ctx.strokeStyle = b, this.ctx.beginPath(), this.ctx.arc(f, c, this.radius, (1 - this.options.angle) * Math.PI, a, !1), this.ctx.stroke()
            }, b
        }(e), f = function(a) {
            function b() {
                return b.__super__.constructor.apply(this, arguments)
            }
            return r(b, a), b.prototype.strokeGradient = function(a, b, c, d) {
                var e;
                return e = this.ctx.createRadialGradient(a, b, c, a, b, d), e.addColorStop(0, this.options.shadowColor), e.addColorStop(.12, this.options._orgStrokeColor), e.addColorStop(.88, this.options._orgStrokeColor), e.addColorStop(1, this.options.shadowColor), e
            }, b.prototype.setOptions = function(a) {
                var c, d, e, f;
                return null == a && (a = null), b.__super__.setOptions.call(this, a), f = this.canvas.width / 2, c = this.canvas.height / 2, d = this.radius - this.lineWidth / 2, e = this.radius + this.lineWidth / 2, this.options._orgStrokeColor = this.options.strokeColor, this.options.strokeColor = this.strokeGradient(f, c, d, e), this
            }, b
        }(d), window.AnimationUpdater = {
            elements: [],
            animId: null,
            addAll: function(a) {
                var b, c, d, e;
                for (e = [], c = 0, d = a.length; d > c; c++) b = a[c], e.push(AnimationUpdater.elements.push(b));
                return e
            },
            add: function(a) {
                return AnimationUpdater.elements.push(a)
            },
            run: function() {
                var a, b, c, d, e;
                for (a = !0, e = AnimationUpdater.elements, c = 0, d = e.length; d > c; c++) b = e[c], b.update() && (a = !1);
                return a ? cancelAnimationFrame(AnimationUpdater.animId) : AnimationUpdater.animId = requestAnimationFrame(AnimationUpdater.run)
            }
        }, "function" == typeof window.define && null != window.define.amd ? define(function() {
            return {
                Gauge: g,
                Donut: f,
                BaseDonut: d,
                TextRenderer: i
            }
        }) : "undefined" != typeof module && null != module.exports ? module.exports = {
            Gauge: g,
            Donut: f,
            BaseDonut: d,
            TextRenderer: i
        } : (window.Gauge = g, window.Donut = f, window.BaseDonut = d, window.TextRenderer = i)
    }.call(this);
var PDFObject = function(y) {
    if (!y || !y.url) return !1;
    var a, x, w = "1.2",
        b = y.id || !1,
        i = y.width || "100%",
        z = y.height || "100%",
        r = y.pdfOpenParams,
        v = function() {
            var c = null;
            return !(!window.ActiveXObject || (c = new ActiveXObject("AcroPDF.PDF"), c || (c = new ActiveXObject("PDF.PdfCtrl")), null === c))
        },
        u = function() {
            var c, f = navigator.plugins,
                d = f.length,
                e = /Adobe Reader|Adobe PDF|Acrobat/gi;
            for (c = 0; d > c; c++)
                if (e.test(f[c].name)) return !0;
            return !1
        },
        t = function() {
            var c = navigator.mimeTypes["application/pdf"];
            return c && c.enabledPlugin
        },
        s = function() {
            var c = null;
            return u() || v() ? c = "Adobe" : t() && (c = "generic"), c
        },
        q = function() {
            var e = document.getElementsByTagName("html");
            if (!e) return !1;
            var c = e[0].style,
                d = document.body.style;
            c.height = "100%", c.overflow = "hidden", d.margin = "0", d.padding = "0", d.height = "100%", d.overflow = "hidden"
        },
        p = function(d) {
            var e, c = "";
            if (!d) return c;
            for (e in d) d.hasOwnProperty(e) && (c += e + "=", c += "search" === e ? encodeURI(d[e]) : d[e], c += "&");
            return c.slice(0, c.length - 1)
        },
        o = function(d) {
            var c = null;
            switch (d) {
                case "url":
                    c = a;
                    break;
                case "id":
                    c = b;
                    break;
                case "width":
                    c = i;
                    break;
                case "height":
                    c = z;
                    break;
                case "pdfOpenParams":
                    c = r;
                    break;
                case "pluginTypeFound":
                    c = x;
                    break;
                case "pdfobjectversion":
                    c = w
            }
            return c
        },
        n = function(d) {
            if (!x) return !1;
            var c = null;
            if (d) {
                if (c = d.nodeType && 1 === d.nodeType ? d : document.getElementById(d), !c) return !1
            } else c = document.body, q(), i = "100%", z = "100%";
            return c.innerHTML = '<object	data="' + a + '" type="application/pdf" width="' + i + '" height="' + z + '"></object>', c.getElementsByTagName("object")[0]
        };
    return a = encodeURI(y.url) + "#" + p(r), x = s(), this.get = function(c) {
        return o(c)
    }, this.embed = function(c) {
        return n(c)
    }, this
};
! function($) {
    $.extend({
        uploadPreview: function(options) {
            var settings = $.extend({
                input_field: ".image-input",
                preview_box: ".image-preview",
                label_field: ".image-label",
                label_default: "Choose File",
                label_selected: "Change File",
                no_label: !1,
                defaul_img_bg: "/assets/img/avatar/no-img.jpg",
                onSetElement: function() {}
            }, options);
            return window.File && window.FileList && window.FileReader ? void("undefined" != typeof $(settings.input_field) && null !== $(settings.input_field) && $(settings.input_field).change(function() {
                var files = event.target.files;
                if (files.length > 0) {
                    var file = files[0],
                        reader = new FileReader;
                    reader.addEventListener("load", function(event) {
                        var loadedFile = event.target;
                        file.type.match("image") ? ($(settings.preview_box).css("background-image", "url(" + loadedFile.result + ")"), $(settings.preview_box).css("background-size", "cover"), $(settings.preview_box).css("background-position", "center center"), settings.onSetElement()) : file.type.match("audio") ? $(settings.preview_box).html("<audio controls><source src='" + loadedFile.result + "' type='" + file.type + "' />Your browser does not support the audio element.</audio>") : alert("This file type is not supported yet.")
                    }), 0 == settings.no_label && $(settings.label_field).html(settings.label_selected), reader.readAsDataURL(file)
                } else 0 == settings.no_label && $(settings.label_field).html(settings.label_default), $(settings.preview_box).css("background-image", settings.defaul_img_bg), $(settings.preview_box + " audio").remove()
            })) : (alert("You need a browser with file reader support, to use this form properly."), !1)
        }
    })
}(jQuery);

$(function() {
    $("#datepicker").datepicker({
        inline: !0,
        showOn: "button",
        maxDate: 0,
        buttonImageOnly: !0,
        changeYear: !0,
        changeMonth: !0,
        dateFormat: "yy-mm-dd",
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        dayNamesMin: ["Dom", "Lun", "Mar", "Mi&eacute;", "Jue", "Vie", "S&aacute;b"]
    }), $("#datepicker").datepicker("setDate", new Date), $("#rango_inicial").val($("#datepicker").val()), $("#rango_final").val($("#datepicker").val());
    $("#tipo_grafica").val();
    $("#t_grafica_calori").length > 0 && graficar()
}), clear_ac_data = function() {
    $("#total-calorias-ac").html("--"), $("#total-calorias").html("--"), $("#total-calorias-pc").html("--"), $("#total-calorias-m").html("--"), $("#total-grasa-quemada").html("--"), $("#pasos-aerobicos").html("--"), $("#pasos-tradicionales").html("--"), $("#pasos-totales").html("--")
}, $(".filtrar-grafica").on("change", function() {
    console.log('test');
    var val='';
    var periodo=$(".filtrar-grafica").val();
    console.log(periodo);
    switch (periodo){
        case "year":
            val = 4;
            selector = "año";
            break;
        case "month":
            val = 3;
            selector = "mes";
            break;
        case "week":
            val = 2;
            selector = "semana";
            break;
        case "day":
            val = 1;
            selector = "día"
    }

    $("#tipo_periodo").val(val);
    console.log($("#tipo_periodo").val());
    graficar();
    //$(".selector").html(selector),,
}), $(".anterior-grafica").on("click", function() {
    fechaAnterior();

}), $(".siguiente-grafica").on("click", function() {
    fechaPosterior()
}), $(".tabs-calory").on("click", function() {
    setTimeout(function() {
        "CalorÃƒÆ’Ã‚Â­as" == $(".tabs-calory .active").html() || "Grasa Quemada" == $(".tabs-calory .active").html() ? $("#day").hide() : $("#day").show(), 0 == $("#chart-container").is(":visible") && ($(".menu-grafica").show(), $("#chart-container").show()), graficar()
    }, 50)
}), $("#estadisticas-actividad").on("click", function() {
    $("#chart-container").is(":visible") && ($("#chart-container").hide(), $(".menu-grafica").hide())
});
var gaucear = function(destino, valor, valor_max, color) {
        valor > valor_max && (valor_max = valor);
        var opts = {
                lines: 12,
                angle: .15,
                angle: .25,
                lineWidth: .1,
                pointer: {
                    length: .9,
                    strokeWidth: .035,
                    color: "#000000"
                },
                limitMax: "false",
                colorStart: color,
                colorStop: color,
                strokeColor: "#E0E0E0",
                generateGradient: !0
            },
            target = document.getElementById(destino),
            gauge = new Donut(target).setOptions(opts);
        gauge.animationSpeed = 32, gauge.maxValue = valor_max, gauge.set(valor)
    },
    colores_base = ["#FF0000", "#f9cf02", "#8AD030"],
    colores_imc = [colores_base[1], colores_base[2], colores_base[1], colores_base[0], colores_base[0], colores_base[0]],
    colores_estandar = [colores_base[2], colores_base[1], colores_base[0]],
    colores_presion = [colores_base[2], colores_base[2], colores_base[1], colores_base[1], colores_base[0], colores_base[0], colores_base[0]],
    colores_hdl = [colores_base[0], colores_base[2], colores_base[2]],
    colores_ldl = [colores_base[2], colores_base[2], colores_base[1], colores_base[1], colores_base[0]],
    colores_hemoglobina = [colores_base[0], colores_base[0], colores_base[1], colores_base[2]],
    colores_grasa = [colores_base[1], colores_base[2], colores_base[0]],
    colores_trigliceridos = [colores_base[2], colores_base[1], colores_base[0]];
ayuno = $("#horas_ayuno").val(), "12" == ayuno || "" == ayuno ? colores_glucosa = [colores_base[1], colores_base[2], colores_base[1], colores_base[0]] : colores_glucosa = [colores_base[1], colores_base[2], colores_base[0]];
var generar_gauges = function(div_data, div_gauge, colores) {
    v = $("#" + div_data).val(), valor = $("#" + div_data).val().split("_")[0], valor_max = $("#" + div_data).val().split("_")[1], evaluacion = $("#" + div_data).val().split("_")[2], valor = parseFloat(valor), valor < 0 && (valor = -1 * valor), void 0 != valor_max && gaucear(div_gauge, valor, valor_max, colores[evaluacion - 1])
};
$("#data-peso").length > 0 && (generar_gauges("data-peso", "medidor-peso", colores_imc), generar_gauges("data-imc", "medidor-imc", colores_imc), generar_gauges("data-cintura", "medidor-cintura", colores_estandar), generar_gauges("data-pgc", "medidor-pgc", colores_grasa), generar_gauges("data-presion", "medidor-presion", colores_presion), generar_gauges("data-glucosa", "medidor-glucosa", colores_glucosa), generar_gauges("data-colesterol", "medidor-colesterol", colores_estandar), generar_gauges("data-colesterol_hdl", "medidor-colesterol-hdl", colores_hdl), generar_gauges("data-colesterol_ldl", "medidor-colesterol-ldl", colores_ldl), generar_gauges("data-trigliceridos-cardiochek", "medidor-trigliceridos", colores_trigliceridos), generar_gauges("data-hemoglobina", "medidor-hemoglobina", colores_hemoglobina)), $(".cuenta-switch a").on("click", function() {
    $(".cuenta a.active").removeClass("active"), $(".cuenta-switch a.active").removeClass("active"), $(this).addClass("active"), el = $(this).attr("rel"), $(".forms").hide(), $("#" + el).show()
}), $(".graficar").on("click", function() {
    var tipo_grafica        = this.id;
    var fecha_col           = $('#fecha_colesterol').val();
    var fecha_col_hdl       = $('#fecha_colesterol_hdl').val();
    var fecha_col_ldl       = $('#fecha_colesterol_ldl').val();
    var fecha_glucosa       = $('#fecha_glucosa').val();
    var fecha_trigliceridos = $('#fecha_trigliceridos').val();
    var fecha_hemoglobina   = $('#fecha_hemoglobina').val();

    if (tipo_grafica === 'colesterol_c') {
        $('#rango_inicial').val(fecha_col);
    }

    if (tipo_grafica === 'colesterol_hdl_c') {
        $('#rango_inicial').val(fecha_col_hdl);
    }

    if (tipo_grafica === 'colesterol_ldl_c') {
        $('#rango_inicial').val(fecha_col_ldl);
    }

    if (tipo_grafica === 'glucosa') {
        $('#rango_inicial').val(fecha_glucosa);
    }

    if (tipo_grafica === 'trigliceridos_c') {
        $('#rango_inicial').val(fecha_trigliceridos);
    }

    if (tipo_grafica === 'hemoglobina') {
        $('#rango_inicial').val(fecha_hemoglobina);
    }

    tipo_grafica = this.id, $(".overlay-gauge").fadeIn(), $(".graficar#" + this.id + " .overlay-gauge").fadeOut(), $(".options-bar").fadeOut("fast", function() {
        $("#gauges").animate({
            "margin-top": "25px"
        }), $(".graficas-container").slideDown(), $("#tipo_grafica").val(tipo_grafica), graficar(), $("#grafica-container").slideDown("normal"), 0 == $(".vista-personalizada").is(":visible") && setTimeout(function() {
            $("html, body").animate({
                scrollTop: $(document).height() - $(window).height()
            })
        }, 1e3)
    })
});
var cerrar_graficador = function() {
    $("#grafica-container").hide();
    $("#tabla_resultado_container").hide();
    // $("#chart1").html(" "), $("#tabla_metas").html(" "), $("#tabla_podometro").html(" "),
    // $("#tabla_resultado_container").html(" "), $(".overlay-gauge").fadeOut(), $(".options-bar").fadeIn("fast"),

    $(".graficas-container").slideUp("fast", function() {
        $("#visor_graficas").html(), $("#gauges").animate({
            "margin-top": "155px"
        })
    })
};
$("#salud-tabs-container").on("click", function() {
    $("#grafica-container").is(":visible") && cerrar_graficador()
}), $(".cerrar-graficador").on("click", function() {
    cerrar_graficador()
}), $(".filtrar-grafica").on("click", function() {
    var val='';
    var periodo=$(".filtrar-grafica").val();
    console.log(periodo);
    switch (periodo){
        case "year":
            val = 4;
            selector = "año";
            break;
        case "month":
            val = 3;
            selector = "mes";
            break;
        case "week":
            val = 2;
            selector = "semana";
            break;
        case "day":
            val = 1;
            selector = "día"
    }

    $("#tipo_periodo").val(val);
    // $(".selector").html(selector);
    //,, graficar()
}), $(".anterior-grafica").on("click", function() {

    // alert('2');
}), $(".siguiente-grafica").on("click", function() {

}), $("#tablar-grafica").on("click", function() {

    // $("#tabla_resultado_container").show();
    $("#grafica-container").show();
    $( ".graficas-container").removeClass("oculto");
    $( "#tabla_resultado_container").removeClass("oculto");

    $("#grafica-container").toggle("normal", function() {

        $("#tabla_resultado_container").show();
    })
}), $("#regresar-grafica").on("click", function() {
    $("#tabla_resultado_container").toggle("normal", function() {
        $("#grafica-container").toggle("normal", function() {})
    })
}), $(".personalizar-gauge input[type=checkbox]").on("change", function() {
    $($(".lista-gauges #" + $(this).attr("rel"))).toggle("normal")
});