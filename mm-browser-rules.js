(function() {
    "use strict";
    var a = {
        isInitialized: !1,
        browserRulesData: {
            BrowserId: {},
            OperatingSystemId: {},
            DeviceTypeId: {}
        },
        defaultEvents: function() {
            $(".mm-delete").click(function(a) {
                if ("undefined" != typeof $(this).data("is-postlink") && !$(this).data("is-postlink")) return !0;
                if ($(this).hasClass("disabled")) return !1;
                var b = $(this).data("need-confirm"),
                    c = $(this).data("conf-message");
                return "undefined" == typeof b || b ? ("undefined" != typeof c && null !== c && "" !== c && (confirm(c) ? PostIt(this) : a.stopImmediatePropagation()), !1) : (PostIt(this), !1)
            })
        },
        renderMoreBrowserRules: function() {
            var a = this,
                b = window.location.origin + window.location.pathname + "?Grid-page=1&Grid-orderBy=~&Grid-filter=~&Grid-size=100";
            $.ajax({
                type: "GET",
                url: b,
                success: function(b) {
                    var c = $(b).find("#Grid").html();
                    $("#Grid").html(c), a.defaultEvents()
                }
            })
        },
        browserRulesSetUp: function(a, b) {
            var c = this,
                d = b.length,
                e = 0,
                f = function(a) {
                    var b = "";
                    for (var c in a) b = b + c + "=" + a[c] + "&";
                    return b
                },
                g = "ExcludeRule=Exclude&",
                h = $("#campaignBrowserRules form, #domainBrowserRules form"),
                i = h.find(".primary-button.primary-green-button").attr("data-post-url"),
                j = "XsrfToken=" + h.find("#xsrfToken").val();
            a && (g = "IncludeRule=Include&"), a || $(".br_progress").addClass("br_progress_exclude"), $(".br_progress > i").text("0%"), $(".br_progress > span").css("width", "0%"), setTimeout(function() {
                $(".br_progress").show()
            }, 500);
            for (var k = 0; k < b.length; k++) {
                var l = f(b[k]) + g + j;
                $.ajax({
                    type: "POST",
                    url: i,
                    data: l,
                    success: function(a) {
                        var f = $(a).find("#Grid").html();
                        $("#Grid").html(f), e = 100 / b.length + e, $(".br_progress > span").css("width", e + "%"), $(".br_progress > i").text(Math.round(e) + "%"), d--, 0 === d && (c.renderMoreBrowserRules(), setTimeout(function() {
                            $(".br_progress").hide()
                        }, 1e3), setTimeout(function() {
                            $(".mm_br_overlay").fadeOut()
                        }, 1500))
                    }
                })
            }
        },
        browserRulesUI: function() {
            var a = '<style type="text/css">\t.br_add {\t\tmargin: 10px 0 50px;\t}\t.br_add:hover {\t\tcolor: #fff;\t}\t.mm_br_overlay {\t\tposition: fixed;\t\ttop: 0;\t\tleft: 0;\t\tz-index: 1000;\t\twidth: 100%;\t\theight: 100%;\t\tbackground-color: rgba(0, 0, 0, .4);\t\tcursor: pointer;\t\tdisplay: none;\t}\t.mm_br_popup {\t\twidth: 680px;\t\tposition: fixed;\t\ttop: 50%;\t\tleft: 50%;\t\tmargin: -100px 0 0 -340px;\t\tz-index: 999;\t\tbackground: #f1f1f1;\t\tpadding: 10px;\t\tbox-sizing: border-box;\t\tfont-size: 14px;\t\tborder-radius: 4px;\t\tborder: 1px solid #ccc;\t\tcursor: default;\t}\t.mm_br_popup * {\t\tbox-sizing: border-box;\t\tuser-select: none;\t\t-moz-user-select: none;\t\t-webkit-user-select: none;\t}\t.mm_br_popup label {\t\tcursor: pointer;\t}\t.mm_br_popup .mm_br_wrapper {\t\t\t}\t.mm_br_popup .mm_br_data {\t\toverflow: hidden;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type {\t\twidth: 33%;\t\tfloat: left;\t\tborder: 1px solid #969696;\t\tmargin-right: 2.5%;\t\tborder-radius: 4px;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type:last-child {\t\tmargin-right: 0;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type.mm_br_desktop {\t\twidth: 40%;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type.mm_br_tablet,\t.mm_br_popup .mm_br_data .mm_br_device_type.mm_br_mobile {\t\twidth: 27.5%;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type > h5 {\t\ttext-align: center;\t\tcursor: pointer;\t\tbackground: #ccc;\t\tpadding: 5px;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type > .mm_br_type {\t\toverflow: hidden;\t\tpadding: 10px 5px;\t\tborder-top: 1px solid #969696;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type > .mm_br_type span {\t\tfloat: left;\t\twidth: 60%;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type > .mm_br_type span:first-child {\t\twidth: 30%;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type > .mm_br_type span:last-child {\t\tfloat: right;\t\twidth: 8%;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type > .mm_br_type span > input[type="text"] {\t\theight: 15px;\t\tdisplay: block;\t\twidth: 100%;\t\tpadding: 0 5px;\t\tborder: 1px solid #969696;\t\tborder-radius: 4px;\t\theight: 20px;\t\toutline: none;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type > .mm_br_type span > input[type="checkbox"] {\t\tmargin: 0;\t\tfloat: right;\t\toutline: none;\t\tcursor: pointer;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type .mm_br_oc_type {\t\toverflow: hidden;\t\tborder-top: 1px solid #969696;\t\tpadding: 5px;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type .mm_br_oc_type .mm_br_os_name {\t\twidth: 40%;\t\tfloat: left;\t\tpadding: 5px 0;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type .mm_br_oc_type .mm_br_os_name span {\t\tcursor: pointer;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type .mm_br_oc_type .mm_br_type {\t\twidth: 60%;\t\tfloat: right;\t\toverflow: hidden;\t\tpadding: 5px 0;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type .mm_br_oc_type .mm_br_type span {\t\tfloat: right;\t}\t.mm_br_popup .mm_br_data .mm_br_device_type .mm_br_oc_type .mm_br_type span > input[type="checkbox"] {\t\tmargin: 0 0 0 10px;\t\tfloat: right;\t\toutline: none;\t\tcursor: pointer;\t}\t.mm_br_popup .mm_br_buttons {\t\tmargin: 20px auto 0;\t\ttext-align: right;\t}\t.mm_br_popup .mm_br_buttons > span {\t\tdisplay: inline-block;\t\tpadding: 5px 34px;\t\tborder-radius: 4px;\t\tcolor: #fff;\t\tcursor: pointer;\t\tmargin-left: 10px;\t}\t.mm_br_popup .mm_br_buttons .mm_br_button_include {\t\tborder: 1px solid #006600;\t\tbackground: #009900;\t\tbackground: -moz-linear-gradient(top, #009900 0%, #007d00 100%);\t\tbackground: -webkit-gradient(left top, left bottom, color-stop(0%, #009900), color-stop(100%, #007d00));\t\tbackground: -webkit-linear-gradient(top, #009900 0%, #007d00 100%);\t\tbackground: -o-linear-gradient(top, #009900 0%, #007d00 100%);\t\tbackground: -ms-linear-gradient(top, #009900 0%, #007d00 100%);\t\tbackground: linear-gradient(to bottom, #009900 0%, #007d00 100%);\t}\t.mm_br_popup .mm_br_buttons .mm_br_button_include:active {\t\tbackground: #007d00;\t\tbackground: -moz-linear-gradient(top, #007d00 0%, #009900 100%);\t\tbackground: -webkit-gradient(left top, left bottom, color-stop(0%, #007d00), color-stop(100%, #009900));\t\tbackground: -webkit-linear-gradient(top, #007d00 0%, #009900 100%);\t\tbackground: -o-linear-gradient(top, #007d00 0%, #009900 100%);\t\tbackground: -ms-linear-gradient(top, #007d00 0%, #009900 100%);\t\tbackground: linear-gradient(to bottom, #007d00 0%, #009900 100%);\t}\t.mm_br_popup .mm_br_buttons .mm_br_button_exclude {\t\tborder: 1px solid #990000;\t\tbackground: #e74545;\t\tbackground: -moz-linear-gradient(top, #e74545 0%, #c83934 100%);\t\tbackground: -webkit-gradient(left top, left bottom, color-stop(0%, #e74545), color-stop(100%, #c83934));\t\tbackground: -webkit-linear-gradient(top, #e74545 0%, #c83934 100%);\t\tbackground: -o-linear-gradient(top, #e74545 0%, #c83934 100%);\t\tbackground: -ms-linear-gradient(top, #e74545 0%, #c83934 100%);\t\tbackground: linear-gradient(to bottom, #e74545 0%, #c83934 100%);\t}\t.mm_br_popup .mm_br_buttons .mm_br_button_exclude:active {\t\tbackground: #c83934;\t\tbackground: -moz-linear-gradient(top, #c83934 0%, #e74545 100%);\t\tbackground: -webkit-gradient(left top, left bottom, color-stop(0%, #c83934), color-stop(100%, #e74545));\t\tbackground: -webkit-linear-gradient(top, #c83934 0%, #e74545 100%);\t\tbackground: -o-linear-gradient(top, #c83934 0%, #e74545 100%);\t\tbackground: -ms-linear-gradient(top, #c83934 0%, #e74545 100%);\t\tbackground: linear-gradient(to bottom, #c83934 0%, #e74545 100%);\t}\t.br_progress {\t\twidth: 50%;\t\tfloat: right;\t\tborder: none;\t\theight: 15px;\t\tpadding: 0;\t\tbackground-color: #eee;\t\tborder-radius: 2px;\t\tposition: relative;\t\tmargin-top: -20px;\t\tdisplay: none;\t\tmax-width: 250px;\t\tbox-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;\t}\t.br_progress > i {\t\tposition: absolute;\t\twidth: 100%;\t\tleft: 0;\t\ttop: 0;\t\tfont-size: 14px;\t\tline-height: 15px;\t\ttext-align: center;\t}\t.br_progress > span {\t\tborder-radius: 2px;\t\tdisplay: block;\t\theight: 15px;\t\twidth: 0%;\t\ttransition: width .5s linear 0s;\t\tbackground-color: rgb(43,194,83);\t\tbackground-image: linear-gradient(center bottom, rgb(43,194,83) 37%, rgb(84,240,84) 69%);\t\tbackground-color: rgb(43,194,83);\t\tbackground-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(43,194,83)), color-stop(1, rgb(84,240,84)) );\t\tbackground-image: -moz-linear-gradient( center bottom, rgb(43,194,83) 37%, rgb(84,240,84) 69% );\t\tbox-shadow: inset 0 2px 9px  rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.4);\t\tposition: relative;\t\toverflow: hidden;\t}\t.br_progress.br_progress_exclude > span {\t\tbackground-color: #f0a3a3;\t\tbackground-image: -moz-linear-gradient(top, #f0a3a3, #f42323);\t\tbackground-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #f0a3a3),color-stop(1, #f42323));\t\tbackground-image: -webkit-linear-gradient(#f0a3a3, #f42323);\t}\t.br_progress > span:after {\t\tcontent: "";\t\tposition: absolute;\t\ttop: 0; left: 0; bottom: 0; right: 0;\t\tbackground-image: linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);\t\tz-index: 1;\t\tbackground-size: 50px 50px;\t\tanimation: move 2s linear infinite;\t\tborder-top-right-radius: 8px;\t\tborder-bottom-right-radius: 8px;\t\tborder-top-left-radius: 20px;\t\tborder-bottom-left-radius: 20px;\t\toverflow: hidden;\t}\t@-webkit-keyframes move {\t\t0% {\t\t\tbackground-position: 0 0;\t\t}\t\t100% {\t\t\tbackground-position: 50px 50px;\t\t}\t}\t@-moz-keyframes move {\t\t0% {\t\t\tbackground-position: 0 0;\t\t}\t\t100% {\t\t\tbackground-position: 50px 50px;\t\t}\t}</style><div class="mm_br_overlay">\t<div class="mm_br_popup">\t\t<h2>Manage Browser Rules</h2>\t\t<div class="mm_br_wrapper">\t\t\t<div class="mm_br_data">\t\t\t\t<div class="mm_br_device_type mm_br_desktop">\t\t\t\t\t<h5>Desktop</h5>\t\t\t\t\t<div class="mm_br_type mm_br_type_ie">\t\t\t\t\t\t<span><label for="br_desktop_ie">IE</label></span>\t\t\t\t\t\t<span><input type="text" name="versions" value="11.*"></span>\t\t\t\t\t\t<span><input id="br_desktop_ie" type="checkbox" checked data-device="Desktop" data-browser="IE" data-os="Any" name="ie" value="1"></span>\t\t\t\t\t</div>\t\t\t\t\t<div class="mm_br_type mm_br_type_edge">\t\t\t\t\t\t<span><label for="br_desktop_edge">Edge</label></span>\t\t\t\t\t\t<span></span>\t\t\t\t\t\t<span><input id="br_desktop_edge" type="checkbox" checked data-device="Desktop" data-browser="Edge" data-os="Any" name="edge" value="1365"></span>\t\t\t\t\t</div>\t\t\t\t\t<div class="mm_br_type mm_br_type_safari">\t\t\t\t\t\t<span><label for="br_desktop_safari">Safari</label></span>\t\t\t\t\t\t<span><input type="text" name="" value="10.*, 9.*"></span>\t\t\t\t\t\t<span><input id="br_desktop_safari" type="checkbox" checked data-device="Desktop" data-browser="Safari" data-os="Any" name="safari" value="3"></span>\t\t\t\t\t</div>\t\t\t\t\t<div class="mm_br_type mm_br_type_chrome">\t\t\t\t\t\t<span><label for="br_desktop_chrome">Chrome</label></span>\t\t\t\t\t\t<span></span>\t\t\t\t\t\t<span><input id="br_desktop_chrome" type="checkbox" checked data-device="Desktop" data-browser="Chrome" data-os="Any" name="chrome" value="47"></span>\t\t\t\t\t</div>\t\t\t\t\t<div class="mm_br_type mm_br_type_firefox">\t\t\t\t\t\t<span><label for="br_desktop_firefox">Firefox</label></span>\t\t\t\t\t\t<span><input type="text" name="" value="4*, 5*"></span>\t\t\t\t\t\t<span><input id="br_desktop_firefox" type="checkbox" checked data-device="Desktop" data-browser="Firefox" data-os="Any" name="firefox" value="2"></span>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="mm_br_device_type mm_br_tablet">\t\t\t\t\t<h5>Tablet</h5>\t\t\t\t\t<div class="mm_br_os">\t\t\t\t\t\t<div class="mm_br_oc_type mm_br_oc_type_ios">\t\t\t\t\t\t\t<div class="mm_br_os_name"><span>iOS</span></div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_chrome">\t\t\t\t\t\t\t\t<span><input id="br_tablet_ios_chrome" type="checkbox" checked data-device="Tablet" data-browser="Chrome" data-os="iPhone OS" name="chrome" value="47"></span>\t\t\t\t\t\t\t\t<span><label for="br_tablet_ios_chrome">Chrome</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_safari">\t\t\t\t\t\t\t\t<span><input id="br_tablet_ios_safari" type="checkbox" checked data-device="Tablet" data-browser="Safari" data-os="iPhone OS" name="safari" value="3"></span>\t\t\t\t\t\t\t\t<span><label for="br_tablet_ios_safari">Safari</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="mm_br_oc_type mm_br_oc_type_android">\t\t\t\t\t\t\t<div class="mm_br_os_name"><span>Android</span></div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_chrome">\t\t\t\t\t\t\t\t<span><input id="br_tablet_android_chrome" type="checkbox" checked data-device="Tablet" data-browser="Chrome" data-os="Android" name="chrome" value="47"></span>\t\t\t\t\t\t\t\t<span><label for="br_tablet_android_chrome">Chrome</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_webkit">\t\t\t\t\t\t\t\t<span><input id="br_tablet_android_webkit" type="checkbox" checked data-device="Tablet" data-browser="Android Webkit" data-os="Android" name="webkit" value="1354"></span>\t\t\t\t\t\t\t\t<span><label for="br_tablet_android_webkit">Webkit</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="mm_br_device_type mm_br_mobile">\t\t\t\t\t<h5>Mobile</h5>\t\t\t\t\t<div class="mm_br_os">\t\t\t\t\t\t<div class="mm_br_oc_type mm_br_oc_type_ios">\t\t\t\t\t\t\t<div class="mm_br_os_name"><span>iOS</span></div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_chrome">\t\t\t\t\t\t\t\t<span><input id="br_phone_ios_chrome" type="checkbox" checked data-device="Phone" data-browser="Chrome" data-os="iPhone OS" name="chrome" value="47"></span>\t\t\t\t\t\t\t\t<span><label for="br_phone_ios_chrome">Chrome</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_safari">\t\t\t\t\t\t\t\t<span><input id="br_phone_ios_safari" type="checkbox" checked data-device="Phone" data-browser="Safari" data-os="iPhone OS" name="safari" value="3"></span>\t\t\t\t\t\t\t\t<span><label for="br_phone_ios_safari">Safari</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="mm_br_oc_type mm_br_oc_type_android">\t\t\t\t\t\t\t<div class="mm_br_os_name"><span>Android</span></div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_chrome">\t\t\t\t\t\t\t\t<span><input id="br_phone_android_chrome" type="checkbox" checked data-device="Phone" data-browser="Chrome" data-os="Android" name="chrome" value="47"></span>\t\t\t\t\t\t\t\t<span><label for="br_phone_android_chrome">Chrome</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mm_br_type mm_br_type_webkit">\t\t\t\t\t\t\t\t<span><input id="br_phone_android_webkit" type="checkbox" checked data-device="Phone" data-browser="Android Webkit" data-os="Android" name="webkit" value="1354"></span>\t\t\t\t\t\t\t\t<span><label for="br_phone_android_webkit">Webkit</label></span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>\t\t\t<div class="br_progress"><span></span><i></i></div>\t\t\t<div class="mm_br_buttons">\t\t\t\t<span class="mm_br_button_include">Include</span>\t\t\t\t<span class="mm_br_button_exclude">Exclude</span>\t\t\t</div>\t\t</div>\t</div></div>',
                b = '<div class="br_holder"><a class="br_add primary-green-button">Add the most common browser rules</a></div>';
            $("#campaignBrowserRules, #domainBrowserRules").after(b), $("body").append(a), $(".br_add").click(function() {
                $(".mm_br_overlay").fadeIn()
            }), $(".mm_br_overlay").click(function(a) {
                $(a.target).is(".mm_br_overlay") && $(".mm_br_overlay").fadeOut()
            })
        },
        storeData: function() {
            var a = this;
            $("select#BrowserId, select#OperatingSystemId, select#DeviceTypeId").each(function() {
                var b = $(this).attr("id");
                $(this).find("option").each(function() {
                    a.browserRulesData[b][$(this).text()] = $(this).val()
                })
            })
        },
        browserRulesAttachEvents: function(a) {
            var b = this;
            $(".mm_br_buttons > span").click(function(c) {
                var d = $(this).is(".mm_br_button_include"),
                    e = [];
                $('.mm_br_data input[type="checkbox"]:checked').length && ($('.mm_br_data input[type="checkbox"]:checked').each(function() {
                    var b = a.DeviceTypeId[$(this).attr("data-device")],
                        c = a.BrowserId[$(this).attr("data-browser")],
                        d = a.OperatingSystemId[$(this).attr("data-os")],
                        f = "",
                        g = $(this).closest(".mm_br_type").find('input[type="text"]').val(),
                        h = [];
                    if (g) {
                        h = g.split(/\,\s*/);
                        for (var i = 0; i < h.length; i++) e.push({
                            BrowserId: c,
                            BrowserVersionMask: h[i],
                            OperatingSystemId: d,
                            DeviceTypeId: b
                        })
                    } else e.push({
                        BrowserId: c,
                        BrowserVersionMask: f,
                        OperatingSystemId: d,
                        DeviceTypeId: b
                    })
                }), b.browserRulesSetUp(d, e))
            }), $(".mm_br_device_type h5").toggle(function() {
                $(this).closest(".mm_br_device_type").find('input[type="checkbox"]').removeAttr("checked")
            }, function() {
                $(this).closest(".mm_br_device_type").find('input[type="checkbox"]').attr("checked", "checked")
            }), $(".mm_br_os_name span").toggle(function() {
                $(this).closest(".mm_br_oc_type").find('input[type="checkbox"]').removeAttr("checked")
            }, function() {
                $(this).closest(".mm_br_oc_type").find('input[type="checkbox"]').attr("checked", "checked")
            })
        },
        init: function() {
            a.isInitialized || (a.storeData(), a.browserRulesUI(), a.browserRulesAttachEvents(a.browserRulesData), a.isInitialized = !0)
        }
    };
    a.init()
})();
