import { Injectable } from '@angular/core';
import { PrintOptions } from '../print-options';
import { PrinterManager } from '../printer-manager';
import { dely } from '@huajie-ng/utils';

/**
 * 浏览器的打印机管理.
 * 
 * @export
 * @class BrowserPrinterManager
 */
@Injectable()
export class BrowserPrinterManager extends PrinterManager {

    /**
     * 打印
     * 
     * @param {PrintOptions} [options] 
     * @memberof BrowserPrinterManager
     */
    async print(options?: PrintOptions) {
        window.print();
    }

    /**
     * 打开(预览)窗口
     * 
     * @param {string} url 
     * @param {PrintOptions} [options] 
     * @memberof BrowserPrinterManager
     */
    async openWindow(url: string, options?: PrintOptions): Promise<any> {
        return window.open(url, '_blank', 'menubar=no');
    }
}