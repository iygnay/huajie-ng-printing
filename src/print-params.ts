
import { PrintOptions } from './printer';

/**
 * 打印参数.
 * 
 * @export
 * @interface PrintParams
 */
export interface PrintParams<T> extends PrintOptions {

    /**
     * 打印的内容参数.
     * 
     * @type {*}
     * @memberof PrintParams
     */
    data?: T,
}