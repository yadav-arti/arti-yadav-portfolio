import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ImageLoadingDirective } from '../../shared/directives/image-loading.directive';

interface StandeeDesign {
  src: string;
  alt: string;
  title: string;
  zoom: number;
}

@Component({
  selector: 'app-standees-design',
  standalone: true,
  imports: [ImageLoadingDirective],
  templateUrl: './standees-design.component.html',
  styleUrl: './standees-design.component.scss'
})
export class StandeesDesignComponent implements AfterViewInit, OnDestroy {
  readonly rollupStandees: StandeeDesign[] = [
    {
      src: '/portfolio-assets/standees/standee-05.jpg',
      title: 'Built to Connect',
      alt: 'STEP cable standee design with blue cable coils',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-06.jpg',
      title: 'Built for High Voltage',
      alt: 'STEP high-voltage cable standee against a stormy blue background',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-07.jpg',
      title: 'Powering Every Connection',
      alt: 'STEP roll-up standee showing cable designs in a warehouse setting',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-08.jpg',
      title: 'Built for Every Environment',
      alt: 'STEP cable standee mockup showing performance in different environments',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-09.jpg',
      title: 'Multi-Core Cable Range',
      alt: 'STEP multi-core cable range standee with a selection of cable coils',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-10.jpg',
      title: 'Lincoln Smart Performance',
      alt: 'Lincoln Series standee promoting premium smart performance',
      zoom: 2.4
    }
  ];

  readonly rollupCount = this.rollupStandees.length.toString().padStart(2, '0');

  rollupsVisible = false;

  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      this.rollupsVisible = true;
      return;
    }

    const galleries = this.elementRef.nativeElement.querySelectorAll(
      '.standees-design__gallery'
    );

    if (!galleries.length) {
      this.rollupsVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (entry.target.classList.contains('standees-design__gallery--rollups')) {
            this.rollupsVisible = true;
          }

          this.observer?.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    galleries.forEach((gallery) => this.observer?.observe(gallery));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
