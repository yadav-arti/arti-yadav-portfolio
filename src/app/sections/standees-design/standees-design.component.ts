import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ImageLoadingDirective } from '../../shared/directives/image-loading.directive';

interface StandeeImage {
  src: string;
  alt: string;
}

interface StandeeDesign extends StandeeImage {
  title: string;
  number: string;
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
  readonly wallPosters: StandeeImage[] = [
    {
      src: '/portfolio-assets/standees/standee-01.webp',
      alt: 'STEP Strong Connections standee displayed on a brick wall'
    },
    {
      src: '/portfolio-assets/standees/standee-02.webp',
      alt: 'STEP and Lincoln modular switch standee for modern living'
    },
    {
      src: '/portfolio-assets/standees/standee-03.webp',
      alt: 'Lincoln Series standee featuring premium modular switches'
    },
    {
      src: '/portfolio-assets/standees/standee-04.webp',
      alt: 'Warm-toned Lincoln Series standee promoting smart performance'
    }
  ];

  readonly rollupStandees: StandeeDesign[] = [
    {
      src: '/portfolio-assets/standees/standee-05.jpg',
      title: 'Built to Connect',
      alt: 'STEP cable standee design with blue cable coils',
      number: '01',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-06.jpg',
      title: 'Built for High Voltage',
      alt: 'STEP high-voltage cable standee against a stormy blue background',
      number: '02',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-07.jpg',
      title: 'Powering Every Connection',
      alt: 'STEP roll-up standee showing cable designs in a warehouse setting',
      number: '03',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-08.jpg',
      title: 'Built for Every Environment',
      alt: 'STEP cable standee mockup showing performance in different environments',
      number: '04',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-09.jpg',
      title: 'Multi-Core Cable Range',
      alt: 'STEP multi-core cable range standee with a selection of cable coils',
      number: '05',
      zoom: 2.6
    },
    {
      src: '/portfolio-assets/standees/standee-10.jpg',
      title: 'Lincoln Smart Performance',
      alt: 'Lincoln Series standee promoting premium smart performance',
      number: '06',
      zoom: 2.4
    }
  ];

  readonly rollupCount = this.rollupStandees.length.toString().padStart(2, '0');

  postersVisible = false;
  rollupsVisible = false;

  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      this.postersVisible = true;
      this.rollupsVisible = true;
      return;
    }

    const galleries = this.elementRef.nativeElement.querySelectorAll(
      '.standees-design__gallery'
    );

    if (!galleries.length) {
      this.postersVisible = true;
      this.rollupsVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (entry.target.classList.contains('standees-design__gallery--posters')) {
            this.postersVisible = true;
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
