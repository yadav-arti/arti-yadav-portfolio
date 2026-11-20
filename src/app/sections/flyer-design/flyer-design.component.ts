import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ImageLoadingDirective } from '../../shared/directives/image-loading.directive';

interface FlyerDesign {
  src: string;
  alt: string;
  label: string;
}

@Component({
  selector: 'app-flyer-design',
  standalone: true,
  imports: [ImageLoadingDirective],
  templateUrl: './flyer-design.component.html',
  styleUrl: './flyer-design.component.scss'
})
export class FlyerDesignComponent implements AfterViewInit, OnDestroy {
  readonly flyers: FlyerDesign[] = [
    {
      src: '/portfolio-assets/standees/standee-01.webp',
      alt: 'STEP Strong Connections promotional flyer',
      label: 'Strong Connections'
    },
    {
      src: '/portfolio-assets/standees/standee-02.webp',
      alt: 'STEP and Lincoln modular switch promotional flyer',
      label: 'Modern Living'
    },
    {
      src: '/portfolio-assets/standees/standee-03.webp',
      alt: 'Lincoln Series premium modular switch flyer',
      label: 'Lincoln Series'
    },
    {
      src: '/portfolio-assets/standees/standee-04.webp',
      alt: 'Lincoln smart performance promotional flyer',
      label: 'Smart Performance'
    }
  ];

  isVisible = false;
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      this.isVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
