"use strict";

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';
const DATA_TYPE_TEXT = 'TEXT';
const DATA_TYPE_JSON = 'JSON';
const DATA_TYPE_XML = 'XML';

function getParamsStringFromData(data) {
    const params = [];

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
    return (url, {data = undefined, async = true, data_type = DATA_TYPE_TEXT} = {}) => {
        return performRequest(request_method, url, data, async, data_type);
    };
}

/**
 * @namespace $http
 * @description Utils handling Ajax requests.
 * @property {Object} DATA_TYPES A collection of data types constants.
 * It has the properties `TEXT`, `XML` and `JSON`.
 * @example const { $http } = JSGLib.Core;
 */
const $http = {
    DATA_TYPES: {
        TEXT: DATA_TYPE_TEXT,
        XML: DATA_TYPE_XML,
        JSON: DATA_TYPE_JSON
    },
    /**
     * @method get
     * @public
     * @description Perform a GET request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.get('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.get('http://my.url.com/', { data_type: $http.DATA_TYPES.JSON }).then((response) => {
     *  //  ...
     * });
     */
    get: getExposedMethod(METHOD_GET),
    /**
     * @method post
     * @public
     * @description Perform a POST request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.post('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.post('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
     *  //  ...
     * });
     */
    post: getExposedMethod(METHOD_POST),
    /**
     * @method delete
     * @public
     * @description Perform a DELETE request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.delete('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.delete('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
     *  //  ...
     * });
     */
    delete: getExposedMethod(METHOD_DELETE),
    /**
     * @method put
     * @public
     * @description Perform a PUT request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.put('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.put('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
     *  //  ...
     * });
     */
    put: getExposedMethod(METHOD_PUT)
};

export default $http;