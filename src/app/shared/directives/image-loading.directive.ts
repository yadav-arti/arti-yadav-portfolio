import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2
} from '@angular/core';

@Directive({
  selector: 'img[appImageLoading]',
  standalone: true
})
export class ImageLoadingDirective implements AfterViewInit, OnDestroy {
  @HostBinding('attr.decoding')
  readonly decoding = 'async';

  private wrapper?: HTMLElement;
  private removeLoadListener?: () => void;
  private removeErrorListener?: () => void;
  private observer?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const image = this.elementRef.nativeElement;
    this.wrapper = image.parentElement ?? undefined;

    if (!this.wrapper) {
      return;
    }

    this.renderer.addClass(this.wrapper, 'image-loading');
    this.removeLoadListener = this.renderer.listen(image, 'load', () => {
      this.finishLoading();
    });
    this.removeErrorListener = this.renderer.listen(image, 'error', () => {
      this.finishLoading(true);
    });

    if (image.complete) {
      this.finishLoading(image.naturalWidth === 0);
    } else if (image.loading !== 'lazy' || typeof IntersectionObserver === 'undefined') {
      this.startShimmer();
    } else {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.startShimmer();
            this.observer?.disconnect();
            this.observer = undefined;
          }
        },
        { rootMargin: '350px' }
      );
      this.observer.observe(this.wrapper);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.removeLoadListener?.();
    this.removeErrorListener?.();
  }

  private startShimmer(): void {
    if (this.wrapper) {
      this.renderer.addClass(this.wrapper, 'image-loading--nearby');
    }
  }

  private finishLoading(failed = false): void {
    if (!this.wrapper) {
      return;
    }

    this.observer?.disconnect();
    this.observer = undefined;
    this.renderer.removeClass(this.wrapper, 'image-loading');
    this.renderer.removeClass(this.wrapper, 'image-loading--nearby');

    if (failed) {
      this.renderer.addClass(this.wrapper, 'image-load-error');
    }

    this.removeLoadListener?.();
    this.removeErrorListener?.();
    this.removeLoadListener = undefined;
    this.removeErrorListener = undefined;
  }
}
