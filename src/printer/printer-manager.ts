import { Injectable } from '@angular/core';
import { PrintOptions } from './print-options';

/**
 * 打印机管理.
 * 
 * @export
 * @abstract
 * @class PrinterManager
 */
export abstract class PrinterManager {

    /**
     * 打印当前页面.
     * 
     * @param {PrintOptions} [options] 
     * @memberof PrinterManager
     */
    abstract print(options?: PrintOptions): Promise<void>;

    /**
     * 打开(预览)窗口
     * 
     * @abstract
     * @param {string} url 
     * @param {PrintOptions} [options] 
     * @returns {Promise<any>} 
     * @memberof PrinterManager
     */
    abstract openWindow(url: string, options?: PrintOptions): Promise<any>;
}