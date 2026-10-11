
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appImageGlow]',
  standalone: true
})
export class ImageGlowDirective implements OnChanges {
  @Input('appImageGlow')
  glowColor = '#5d91df';

  @HostBinding('class.image-glow')
  readonly glowEnabled = true;

  @HostBinding('class.is-glowing')
  isGlowing = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['glowColor']) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        '--image-glow-color',
        this.glowColor
      );
    }
  }

  @HostListener('pointerenter')
  onPointerEnter(): void {
    this.isGlowing = true;
  }

  @HostListener('pointerleave')
  onPointerLeave(): void {
    this.isGlowing = false;
  }

  @HostListener('pointercancel')
  onPointerCancel(): void {
    this.isGlowing = false;
  }
}
