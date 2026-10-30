
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-social-media-design',
  standalone: true,
  imports: [],
  templateUrl: './social-media-design.component.html',
  styleUrl: './social-media-design.component.scss'
})
export class SocialMediaDesignComponent
  implements AfterViewInit, OnDestroy {

  animationReady = false;

  firstGalleryVisible = false;
  campaignGalleryVisible = false;
  campaignFeaturedVisible = false;

  private observer?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {

    // Respect reduced-motion preferences
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.showAllSections();
      return;
    }

    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      this.showAllSections();
      return;
    }

    const element = this.elementRef.nativeElement;

    const firstGallery = element.querySelector(
      '.social-design__gallery'
    );

    const campaignGallery = element.querySelector(
      '.social-campaign__gallery'
    );

    const campaignFeatured = element.querySelector(
      '.social-campaign__featured'
    );

    if (!firstGallery || !campaignGallery || !campaignFeatured) {
      this.showAllSections();
      return;
    }

    this.animationReady = true;

    this.observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target;

          if (target === firstGallery) {
            this.firstGalleryVisible = true;
          }

          if (target === campaignGallery) {
            this.campaignGalleryVisible = true;
          }

          if (target === campaignFeatured) {
            this.campaignFeaturedVisible = true;
          }

          // Stop observing once animation is triggered
          this.observer?.unobserve(target);

        });

      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observer.observe(firstGallery);
    this.observer.observe(campaignGallery);
    this.observer.observe(campaignFeatured);
  }

  private showAllSections(): void {
    this.firstGalleryVisible = true;
    this.campaignGalleryVisible = true;
    this.campaignFeaturedVisible = true;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
