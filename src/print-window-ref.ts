import { Injectable } from '@angular/core';
import { PrintWindow } from './print-window';
import { PrintParams } from './print-params';
import { dely } from '@huajie-ng/utils';
import { JsonStorageWrapper } from '@ssm/storage';
import { PrinterManager, PageRules } from './printer';

/**
 * 打印窗口引用.
 * 
 * 此服务用于窗口本身, 接收打印参数, 对打印内容进行排版, 并且唤起打印程序.
 * 
 * @export
 * @class PrintWindowRef
 */
@Injectable()
export class PrintWindowRef {

    constructor(
        private _printerMana: PrinterManager,
    ) {
    }

    /**
     * 获取打印参数.
     * 
     * @template T 
     * @param {PrintParams<T>} params 
     * @memberof PrintWindowRef
     */
    async getPrintParams<T>(): Promise<PrintParams<T>> {

        // todo(杨逸): 改进跨页面存储.
        let storage = new JsonStorageWrapper(localStorage);

        let params = storage.getItem(PrintWindow.PRINT_PARAMS_KEY);
        if (params == null) {
            throw new Error('提取打印参数失败, value is null');
        }
        return params;
    }

    /**
     * 打印
     * 
     * @param {PrintParams<any>} params 
     * @param {boolean} closeAfterPrint 
     * @memberof PrintWindowRef
     */
    async print(params: PrintParams<any>, closeAfterPrint: boolean) {
        if (params.page) {
            this.setPage(params.page);
        }

        if (closeAfterPrint) {
            // 因为浏览器无法检测到打印是否完成.
            // 所以统一在45秒后自动关闭窗口.
            setTimeout(() => { window.close() }, 45000);
        }

        await dely(300);
        await this._printerMana.print(params);
    }

    /**
     * 设置打印页面的@page规则. 例如: 页面边距, 大写等
     * 
     * @param {{ [key: string]: string}} rules 
     * @returns 
     * @memberof PrintWindowRef
     */
    protected async setPage(rules: PageRules) {
        let styleElement = this._ensurePageStyleElement();
        let styleSheet = styleElement.sheet as CSSStyleSheet;

        // 删除旧的规则.
        if (styleSheet.rules.length != 0) {
            styleSheet.removeRule(0);
        }

        // 插入新的规则.
        let cssString = this._createCssString(rules);
        styleSheet.insertRule(cssString);

        // 返回更新后的规则
        return this._parsePageRules(styleSheet.rules[0] as CSSPageRule);
    }

    /**
     * 将对象转换为`@page{...}`格式的css字符串.
     * 
     * @private
     * @param {PageRules} rules 
     * @returns 
     * @memberof PrintWindowRef
     */
    private _createCssString(rules: PageRules) {
        let content = Object.keys(rules).map(key => { return `${key}: ${rules[key]};`; }).join(' ');
        return `@page{${content}}`;
    }

    /**
     * 获取样式表, 如果不存在就创建它.
     * 
     * @private
     * @returns {HTMLStyleElement} 
     * @memberof PrintWindowRef
     */
    private _ensurePageStyleElement(): HTMLStyleElement {
        let id = 'print-window-ref-page';
        let styleElement = document.getElementById(id) as HTMLStyleElement;

        if (styleElement == null) {
            styleElement = document.createElement('style');
            styleElement.id = id;
            styleElement.type = 'text/css';
            document.head.appendChild(styleElement);
        }
        return styleElement;
    }

    /**
     * 将css规则转换为object
     * 
     * @private
     * @param {CSSPageRule} cssRule 
     * @returns 
     * @memberof PrintWindowRef
     */
    private _parsePageRules(cssRule: CSSPageRule) {
        let result: PageRules = {};

        for(let i = 0; i != cssRule.style.length; ++i) {
            let key = cssRule.style[i];
            result[key] = cssRule.style[key];
        }
        return result;
    }
}

