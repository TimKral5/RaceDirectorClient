var Kingsoft;
(function (Kingsoft) {
    var System;
    (function (System) {
        class Dictionary {
            constructor(keys = [], values = []) {
                this._keys = keys;
                this._values = values;
            }
            get(index) {
                var i = this._keys.indexOf(index);
                if (i != -1)
                    return this._values[i];
                return undefined;
            }
            set(index, value) {
                var i = this._keys.indexOf(index);
                if (i == -1) {
                    this._keys.push(index);
                    this._values.push(value);
                }
                else {
                    this._values[i] = value;
                }
            }
            get keys() {
                return this._keys;
            }
            get values() {
                return this._values;
            }
            get length() {
                return this._keys.length;
            }
            get string_object() {
                var res = {};
                for (let i = 0; i < this._keys.length; i++) {
                    const key = this._keys[i];
                    const value = this._values[i];
                    res[key] = value;
                }
                return res;
            }
            get num_object() {
                var res = {};
                for (let i = 0; i < this._keys.length; i++) {
                    const key = this._keys[i];
                    const value = this._values[i];
                    res[key] = value;
                }
                return res;
            }
            get elements() {
                var res = [];
                for (let i = 0; i < this._keys.length; i++) {
                    const key = this._keys[i];
                    const value = this._values[i];
                    res.push({ key: key, value: value });
                }
                return res;
            }
        }
        System.Dictionary = Dictionary;
    })(System = Kingsoft.System || (Kingsoft.System = {}));
})(Kingsoft || (Kingsoft = {}));
var Kingsoft;
(function (Kingsoft) {
    var HQuery;
    (function (HQuery) {
        var Queries;
        (function (Queries) {
            function parent(tokens, element) {
                if (tokens.get("parent")) {
                    element.parentElement.removeChild(element);
                    var parent_element = document.querySelector(tokens.get("parent"));
                    parent_element.appendChild(element);
                }
            }
            Queries.parent = parent;
        })(Queries = HQuery.Queries || (HQuery.Queries = {}));
    })(HQuery = Kingsoft.HQuery || (Kingsoft.HQuery = {}));
})(Kingsoft || (Kingsoft = {}));
var Kingsoft;
(function (Kingsoft) {
    var HQuery;
    (function (HQuery) {
        var States;
        (function (States) {
            States.tabgroups = new Kingsoft.System.Dictionary();
            States.activetabs = new Kingsoft.System.Dictionary();
        })(States = HQuery.States || (HQuery.States = {}));
    })(HQuery = Kingsoft.HQuery || (Kingsoft.HQuery = {}));
})(Kingsoft || (Kingsoft = {}));
(function (Kingsoft) {
    var HQuery;
    (function (HQuery) {
        var Queries;
        (function (Queries) {
            function tabsys(tokens, element) {
                tablink(tokens, element);
                tab(tokens, element);
            }
            Queries.tabsys = tabsys;
            function setActiveTab(group, id) {
                HQuery.States.activetabs.set(group, id);
                for (let i = 0; i < HQuery.States.tabgroups.get(group).elements.length; i++) {
                    const element = HQuery.States.tabgroups.get(group).elements[i];
                    element.value.setAttribute("hidden", "");
                    if (element.key == id)
                        element.value.removeAttribute("hidden");
                }
            }
            Queries.setActiveTab = setActiveTab;
            function getActiveTab(group) {
                return HQuery.States.activetabs.get(group);
            }
            Queries.getActiveTab = getActiveTab;
            function tablink(tokens, element) {
                var tablinkattr = tokens.get("tablink");
                if (tablinkattr) {
                    element.addEventListener("click", ev => {
                        var info = tablinkattr.split("/");
                        var tabgroup = info[1];
                        var tabid = info[2];
                        var group = HQuery.States.tabgroups.get(tabgroup);
                        group.values.forEach(_element => {
                            _element.setAttribute("hidden", "");
                        });
                        HQuery.States.tabgroups.get(tabgroup).get(tabid).removeAttribute("hidden");
                        HQuery.States.activetabs.set(tabgroup, tabid);
                    });
                }
            }
            function tab(tokens, element) {
                var tabid = tokens.get("tab");
                if (tabid) {
                    var query = element.parentElement.getAttribute(HQuery.Engine.HQqueryString);
                    var par_tokens = HQuery.Engine.DecodeQuery(query);
                    var tabgroup = par_tokens.get("tabgroup");
                    if (tabgroup) {
                        var tabgroup_dict = HQuery.States.tabgroups.get(tabgroup);
                        if (!tabgroup_dict) {
                            HQuery.States.tabgroups.set(tabgroup, new Kingsoft.System.Dictionary());
                        }
                        tabgroup_dict = HQuery.States.tabgroups.get(tabgroup);
                        tabgroup_dict.set(tabid, element);
                        element.setAttribute("hidden", "");
                        if (tabid == HQuery.States.activetabs.get(tabgroup))
                            element.removeAttribute("hidden");
                    }
                }
            }
        })(Queries = HQuery.Queries || (HQuery.Queries = {}));
    })(HQuery = Kingsoft.HQuery || (Kingsoft.HQuery = {}));
})(Kingsoft || (Kingsoft = {}));
var Kingsoft;
(function (Kingsoft) {
    var HQuery;
    (function (HQuery) {
        class Engine {
            static Run() {
                var elements = document.querySelectorAll(`[${Engine.UseHQbool}=""]`);
                elements.forEach(element => {
                    var tokens = Engine.DecodeQuery(element.getAttribute(Engine.HQqueryString));
                    element.removeAttribute(Engine.UseHQbool);
                    HQuery.Queries.parent(tokens, element);
                    HQuery.Queries.tabsys(tokens, element);
                    console.log(tokens.elements);
                });
            }
            static DecodeQuery(str) {
                var tokensA = str.split(";");
                var result = new Kingsoft.System.Dictionary();
                for (let i = 0; i < tokensA.length - 1; i++) {
                    const e = tokensA[i];
                    var _t = e.split("=")[0].split(" ");
                    var key = _t[_t.length - 1];
                    var value = e.split("=")[1];
                    result.set(key, value ? value : "");
                }
                return result;
            }
        }
        Engine.UseHQbool = "data-hq";
        Engine.HQqueryString = "data-hq_query";
        HQuery.Engine = Engine;
    })(HQuery = Kingsoft.HQuery || (Kingsoft.HQuery = {}));
})(Kingsoft || (Kingsoft = {}));
const init_hquery = Kingsoft.HQuery.Engine.Run;
const hq_setActiveTab = Kingsoft.HQuery.Queries.setActiveTab;
const hq_getActiveTab = Kingsoft.HQuery.Queries.getActiveTab;
const hq_getActiveTabState = (group, id) => {
    if (hq_getActiveTab(group) == id)
        return true;
    return false;
};
window.addEventListener("load", e => {
    init_hquery();
});
//# sourceMappingURL=hQuery.js.map