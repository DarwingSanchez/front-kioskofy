import { Directive, ElementRef, HostListener } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appCurrencyFormat]'
})
export class CurrencyFormatDirective {

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) { }

  /**
   * From an Input String, takes the number and replace it as a COP currency
   * When inputs a character that is not a number will be replace by number 0,
   * Note: Always returns a string value:  $ 45.000
   * @param value Input String
   */

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string | number) {
    if (!value) {
      this.el.nativeElement.value = '';
      return
    }
console.log('value', value);

    let cleanedValue: number = 0;

    if (typeof value === 'string' && value !== 'CA$') cleanedValue =  parseInt(value.replace(/[CA$,.]/g, ''));

    if (value == 'CA$' || value == 'CA$0' || isNaN(cleanedValue)) cleanedValue = 0
console.log('cleanedValue', cleanedValue);

    const formattedValue = cleanedValue === 0 ? null : this.currencyPipe.transform(cleanedValue || 0, 'CAD', 'symbol', '1.0-0');
    this.el.nativeElement.value = formattedValue;
  }

}
