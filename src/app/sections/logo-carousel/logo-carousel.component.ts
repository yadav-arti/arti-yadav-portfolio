
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-logo-carousel',
  standalone: true,
  templateUrl: './logo-carousel.component.html',
  styleUrl: './logo-carousel.component.scss'
})
export class LogoCarouselComponent implements AfterViewInit, OnDestroy {
  animationReady = false;
  isVisible = false;

  activeLogo: number | null = null;

  private observer?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    // Respect reduced-motion preferences.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.isVisible = true;
      this.animationReady = false;
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible = true;
      return;
    }

    const gallery =
      this.elementRef.nativeElement.querySelector(
        '.logo-showcase__gallery'
      );

    if (!gallery) {
      this.isVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.observer?.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Enable the entrance animation state before observing.
    this.animationReady = true;
    this.observer.observe(gallery);
  }

  toggleLogo(index: number): void {
    this.activeLogo =
      this.activeLogo === index ? null : index;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
