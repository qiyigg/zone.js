/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('cordova', (global: any, Zone: ZoneType, api: _ZonePrivate) => {
  if (global.cordova) {
    const SUCCESS_SOURCE = 'cordova.exec.success';
    const ERROR_SOURCE = 'cordova.exec.error';
    const FUNCTION = 'function';
    const nativeExec: Function = api.patchMethod(
        global.cordova, 'exec', (delegate: Function) => function(self: any, args: any[]) {
          if (args.length > 0 && typeof args[0] === FUNCTION) {
            args[0] = Zone.current.wrap(args[0], SUCCESS_SOURCE);
          }
          if (args.length > 1 && typeof args[1] === FUNCTION) {
            args[1] = Zone.current.wrap(args[1], ERROR_SOURCE);
          }
          return nativeExec.apply(self, args);
        });
  }
});