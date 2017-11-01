
/**
 * 打印选项.
 * 
 * @export
 * @interface PrintOptions
 */
export interface PrintOptions {
     /**
     * 打印机名称.
     * 
     * @type {string}
     * @memberof PrintParams
     */
    printerName?: string,
    
    /**
     * 指示是否静默打印
     * 
     * @type {boolean}
     * @memberof PrintParams
     */
    silent?: boolean,

    /**
     * 指示需要调试.
     * 
     * @type {boolean}
     * @memberof PrintParams
     */
    debug?: boolean,

    /**
     * 页面设置
     * 
     * @type {PageRules}
     * @memberof PrintOptions
     */
    page?: PageRules,
}

/**
 * css 的@page样式规则.
 * 
 * @export
 * @interface PageRules
 */
export interface PageRules {
    size?: string,
    margin?: string,
    [key: string]: string,
}