
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-print-design',
  standalone: true,
  imports: [],
  templateUrl: './print-design.component.html',
  styleUrl: './print-design.component.scss'
})
export class PrintDesignComponent implements AfterViewInit, OnDestroy {

  animationReady = false;
  isVisible = false;
  merchVisible = false;

  private observer?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.isVisible = true;
      this.merchVisible = true;
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible = true;
      this.merchVisible = true;
      return;
    }

    const galleries =
      this.elementRef.nativeElement.querySelectorAll(
        '.print-design__gallery, .print-merch__gallery'
      );

    if (!galleries.length) {
      this.isVisible = true;
      this.merchVisible = true;
      return;
    }

    this.animationReady = true;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (entry.target.classList.contains('print-design__gallery')) {
            this.isVisible = true;
          }

          if (entry.target.classList.contains('print-merch__gallery')) {
            this.merchVisible = true;
          }

          this.observer?.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    galleries.forEach((gallery) => {
      this.observer?.observe(gallery);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
