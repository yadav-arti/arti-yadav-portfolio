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

  brandIdentityVisible = false;

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
      this.brandIdentityVisible = true;
      this.animationReady = false;
      return;
    }

    // Fallback if IntersectionObserver is unavailable.
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible = true;
      this.brandIdentityVisible = true;
      return;
    }

    const logoGallery =
      this.elementRef.nativeElement.querySelector(
        '.logo-showcase__gallery'
      );

    const brandGallery =
      this.elementRef.nativeElement.querySelector(
        '.brand-identity__gallery'
      );

    if (!logoGallery && !brandGallery) {
      this.isVisible = true;
      this.brandIdentityVisible = true;
      return;
    }

    // Enable animation classes before observing.
    this.animationReady = true;

    this.observer = new IntersectionObserver(
      (entries) => {

        for (const entry of entries) {

          if (!entry.isIntersecting) {
            continue;
          }

          // Logo Design gallery animation.
          if (entry.target === logoGallery) {
            this.isVisible = true;
            this.observer?.unobserve(entry.target);
          }

          // Brand Identity gallery animation.
          if (entry.target === brandGallery) {
            this.brandIdentityVisible = true;
            this.observer?.unobserve(entry.target);
          }
        }

      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Observe both galleries independently.
    if (logoGallery) {
      this.observer.observe(logoGallery);
    }

    if (brandGallery) {
      this.observer.observe(brandGallery);
    }
  }

  toggleLogo(index: number): void {
    this.activeLogo =
      this.activeLogo === index ? null : index;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
