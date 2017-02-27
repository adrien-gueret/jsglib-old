import Core from './core';
import Traits from './traits';

/**
 * @class JSGlib
 * @description JSGLib library.
 * @property {ClientApi} ClientApi Client used to request OpenClassrooms API.
 * @property {Scopes} Scopes Enumeration containing scopes to request while asking
 * for authorization.
 * @property {LoginStatus} LoginStatus Enumeration representing login status.
 * @example
 * import * as OC_SDK from 'oc-sdk-js';
 * console.log(OC_SDK, OC_SDK.ClientApi);
 * @example
 * import { ClientApi } from 'oc-sdk-js';
 * console.log(ClientApi);
 * @example
 * <script src="./dist/oc-sdk.min.js"></script>
 * <script>
 *  console.log(OC_SDK, OC_SDK.ClientApi);
 * </script>
 */
export {
    Core,
    Traits,
};