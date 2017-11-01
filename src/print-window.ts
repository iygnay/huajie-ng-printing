import { Injectable } from '@angular/core';
import { PrintParams } from './print-params';
import { JsonStorage, JsonStorageWrapper } from '@huajie-ng/storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { resolve } from 'url';
import { PrinterManager } from './printer';

/**
 * 打印窗口服务.
 * 
 * 此服务用于调用打印窗口, 并且向窗口传递打印参数.
 * 
 * @export
 * @class PrintWindow
 */
@Injectable()
export class PrintWindow {
    private _storage: JsonStorage;

    constructor(
        private _router: Router,
        private _location: Location,
        private _printerMana: PrinterManager,
    ) {
        // todo(杨逸): 改进跨页面存储.
        this._storage = new JsonStorageWrapper(localStorage);
    }

    /**
     * 打开打印窗口
     * 
     * @template T 
     * @template any 
     * @param {any[]} commands 
     * @param {PrintParams<T>} params 
     * @memberof PrintWindow
     */
    async open<T = any>(commands: any[], params: PrintParams<T>) {
        params.page = params.page || {};
        this._storage.setItem(PrintWindow.PRINT_PARAMS_KEY, params);

        // 转换为绝对路径.
        let tree = this._router.createUrlTree(commands, { fragment: 'PRINTING' });
        let url = tree.toString();
        let externalUrl = resolve(location.href, this._location.prepareExternalUrl(url));

        // 打开新窗口.
        await this._printerMana.openWindow(externalUrl, params);
    }

    /**
     * 传递打印参数时的键值.
     * 
     * @static
     * @memberof PrintWindow
     */
    static readonly PRINT_PARAMS_KEY = 'PRINT_PARAMS';
}