'use strict';

(function (window, undefined) {
    "use strict";

    var JSGlib = window.JSGlib || {};

    var METHOD_GET = 'GET';
    var METHOD_POST = 'POST';
    var METHOD_PUT = 'PUT';
    var METHOD_DELETE = 'DELETE';
    var DATA_TYPE_TEXT = 'TEXT';
    var DATA_TYPE_JSON = 'JSON';
    var DATA_TYPE_XML = 'XML';

    function getParamsStringFromData(data) {
        var params = [];

        for (var param in data) {
            if (data.hasOwnProperty(param)) {
                params.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
            }
        }

        return params.join('&');
    }

    function getReadyStateChangeHandler(xhr, data_type, resolve, reject) {
        return function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                    var response = void 0;

                    switch (data_type) {
                        case DATA_TYPE_JSON:
                            response = JSON.parse(xhr.responseText);
                            break;

                        case DATA_TYPE_XML:
                            response = xhr.responseXML;
                            break;

                        default:
                            response = xhr.responseText;
                            break;
                    }

                    resolve(response);
                } else {
                    reject(xhr);
                }
            }
        };
    }

    function performRequest(method, url) {
        var data = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
        var async = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
        var data_type = arguments.length <= 4 || arguments[4] === undefined ? DATA_TYPE_TEXT : arguments[4];

        var promise = function promise(resolve, reject) {
            var xhr = new XMLHttpRequest();
            var params_string = null;

            if (data) {
                params_string = getParamsStringFromData(data);
            }

            if (params_string && method === METHOD_GET) {
                url += url.indexOf('?') === -1 ? '?' : '&';
                url += params_string;
            }

            xhr.onreadystatechange = getReadyStateChangeHandler(xhr, data_type, resolve, reject);
            xhr.open(method, url, async);
            xhr.send(method === METHOD_POST ? params_string : null);
        };

        return new Promise(promise);
    }

    function getExposedMethod(request_method) {
        return function (url) {
            var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _ref$data = _ref.data;
            var data = _ref$data === undefined ? undefined : _ref$data;
            var _ref$async = _ref.async;
            var async = _ref$async === undefined ? true : _ref$async;
            var _ref$data_type = _ref.data_type;
            var data_type = _ref$data_type === undefined ? DATA_TYPE_TEXT : _ref$data_type;

            return performRequest(request_method, url, data, async, data_type);
        };
    }

    JSGlib.http = {
        DATA_TYPES: {
            TEXT: DATA_TYPE_TEXT,
            XML: DATA_TYPE_XML,
            JSON: DATA_TYPE_JSON
        },
        get: getExposedMethod(METHOD_GET),
        post: getExposedMethod(METHOD_POST),
        delete: getExposedMethod(METHOD_DELETE),
        put: getExposedMethod(METHOD_PUT)
    };

    window.JSGlib = JSGlib;
})(window);
//# sourceMappingURL=http.js.map