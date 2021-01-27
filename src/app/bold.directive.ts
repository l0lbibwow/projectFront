import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {

  constructor() { }
    private fontWeight = 'normal';

    @HostBinding('style.fontWeight') get getFontWeight(): any{

        return this.fontWeight;
    }

    @HostBinding('style.cursor') get getCursor(): any{
        return 'pointer';
    }

    @HostListener('mouseenter') onMouseEnter(): any {
        this.fontWeight = 'bold';
    }

    @HostListener('mouseleave') onMouseLeave(): any {
        this.fontWeight = 'normal';
    }
}
