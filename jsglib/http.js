(function(window, undefined) {
    "use strict";

    let JSGlib = window.JSGlib || {};

    const METHOD_GET = 'GET';
    const METHOD_POST = 'POST';
    const METHOD_PUT = 'PUT';
    const METHOD_DELETE = 'DELETE';
    const DATA_TYPE_TEXT = 'TEXT';
    const DATA_TYPE_JSON = 'JSON';
    const DATA_TYPE_XML = 'XML';

    function getParamsStringFromData(data) {
        var params = [];

        for (let param in data) {
            if (data.hasOwnProperty(param)) {
                params.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
            }
        }

        return params.join('&');
    }

    function getReadyStateChangeHandler(xhr, data_type, resolve, reject) {
        return () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                    let response;

                    switch(data_type) {
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
                }
                else {
                    reject(xhr);
                }
            }
        };
    }

    function performRequest(method, url, data = undefined, async = true, data_type = DATA_TYPE_TEXT) {
        let promise = (resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let params_string = null;

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
        return (url,  {data = undefined, async = true, data_type = DATA_TYPE_TEXT} = {}) => {
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