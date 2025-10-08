import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: false,
})
export class PhoneMaskDirective {
  // fixed for (XXX) XXXX-XXXX
  @Input() maxDigits = 11;
  private formattingExtras = 4; // parentheses(2) + space(1) + dash(1)
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
    // set proper maxlength on the input (11 digits + 4 formatting chars = 15)
    this.renderer.setAttribute(
      this.el,
      'maxlength',
      String(this.maxDigits + this.formattingExtras)
    );
  }

  @HostListener('input', ['$event'])
  onInput(_: Event) {
    const input = this.el;
    const rawValue = input.value;
    const prevCursor = input.selectionStart ?? 0;

    // number of digits before cursor (to restore caret)
    const digitsBeforeCursor = (
      rawValue.slice(0, prevCursor).match(/\d/g) || []
    ).length;

    // keep only digits and enforce max
    let digits = rawValue.replace(/\D/g, '');
    if (digits.length > this.maxDigits) {
      digits = digits.substring(0, this.maxDigits);
    }

    const formatted = this.format(digits);
    // set value via Renderer
    this.renderer.setProperty(this.el, 'value', formatted);

    // compute new caret position to match previous digit index
    const newPos = this.findCursorPosition(formatted, digitsBeforeCursor);
    this.el.setSelectionRange(newPos, newPos);

    // notify Angular forms / ngModel
    this.el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text') ?? '';
    let digits = pasted.replace(/\D/g, '').substring(0, this.maxDigits);
    const formatted = this.format(digits);
    this.renderer.setProperty(this.el, 'value', formatted);
    this.el.dispatchEvent(new Event('input', { bubbles: true }));
    const pos = this.findCursorPosition(formatted, digits.length);
    this.el.setSelectionRange(pos, pos);
  }

  private format(d: string): string {
    if (!d) return '';
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 7) return `(${d.substring(0, 3)}) ${d.substring(3)}`;
    // full: (XXX) XXXX-XXXX
    return `(${d.substring(0, 3)}) ${d.substring(3, 7)}-${d.substring(7, 11)}`;
  }

  // find position in formatted string corresponding to Nth digit (1-based)
  private findCursorPosition(
    formatted: string,
    digitsBeforeCursor: number
  ): number {
    if (digitsBeforeCursor <= 0) return 0;
    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        count++;
        if (count === digitsBeforeCursor) return i + 1;
      }
    }
    return formatted.length;
  }
}
