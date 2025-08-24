import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  appHighlight = input<string>();

  private el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.appHighlight() || '#f5f5f5');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
