
import { NgModule, ClassProvider } from '@angular/core';
import { PrinterManager, BrowserPrinterManager } from './printer';
import { PrintWindow } from './print-window';
import { PrintWindowRef } from './print-window-ref';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        BrowserPrinterManager,
        PrintWindow,
        PrintWindowRef,
        { provide: PrinterManager, useClass: BrowserPrinterManager },
    ],
})
export class PrintingModule { 
}
