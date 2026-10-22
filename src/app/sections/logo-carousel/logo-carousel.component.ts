import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

interface LogoDesign {
  name: string;
  category: string;
  image: string;
  description: string;
}

interface VisibleDesign {
  position: number;
  design: LogoDesign;
}

@Component({
  selector: 'app-logo-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-carousel.component.html',
  styleUrl: './logo-carousel.component.scss'
})
export class LogoCarouselComponent {
  activeIndex = 0;
  direction: 'next' | 'prev' = 'next';

  readonly designs: LogoDesign[] = [
    {
      name: 'MarketNest',
      category: 'Brand Identity',
      image: '/portfolio-assets/logos/1.png',
      description: 'A bold identity for a modern marketplace.'
    },
    {
      name: 'Serpent',
      category: 'Emblem Design',
      image: '/portfolio-assets/logos/2.png',
      description: 'An expressive emblem with a distinctive silhouette.'
    },
    {
      name: 'Northern',
      category: 'Brand Identity',
      image: '/portfolio-assets/logos/3.png',
      description: 'A minimal mountain-inspired brand identity.'
    },
    {
      name: 'Hook & Fish',
      category: 'Hospitality',
      image: '/portfolio-assets/logos/4.png',
      description: 'A nautical-inspired identity for a brew pub.'
    },
    {
      name: 'Light Filmstrip',
      category: 'Entertainment',
      image: '/portfolio-assets/logos/5.png',
      description: 'A film-inspired identity for an entertainment brand.'
    },
    {
      name: 'MarketNest',
      category: 'Brand Identity',
      image: '/portfolio-assets/logos/6.png',
      description: 'A bold identity for a modern marketplace.'
    },
    {
      name: 'Serpent',
      category: 'Emblem Design',
      image: '/portfolio-assets/logos/7.png',
      description: 'An expressive emblem with a distinctive silhouette.'
    },
    {
      name: 'Northern',
      category: 'Brand Identity',
      image: '/portfolio-assets/logos/8.png',
      description: 'A minimal mountain-inspired brand identity.'
    },
    {
      name: 'Hook & Fish',
      category: 'Hospitality',
      image: '/portfolio-assets/logos/9.png',
      description: 'A nautical-inspired identity for a brew pub.'
    },
    {
      name: 'Light Filmstrip',
      category: 'Entertainment',
      image: '/portfolio-assets/logos/10.png',
      description: 'A film-inspired identity for an entertainment brand.'
    },
    {
      name: 'MarketNest',
      category: 'Brand Identity',
      image: '/portfolio-assets/logos/11.png',
      description: 'A bold identity for a modern marketplace.'
    },
    {
      name: 'Serpent',
      category: 'Emblem Design',
      image: '/portfolio-assets/logos/12.png',
      description: 'An expressive emblem with a distinctive silhouette.'
    },
    {
      name: 'Northern',
      category: 'Brand Identity',
      image: '/portfolio-assets/logos/13.png',
      description: 'A minimal mountain-inspired brand identity.'
    },
    {
      name: 'Hook & Fish',
      category: 'Hospitality',
      image: '/portfolio-assets/logos/14.png',
      description: 'A nautical-inspired identity for a brew pub.'
    },
    {
      name: 'Light Filmstrip',
      category: 'Entertainment',
      image: '/portfolio-assets/logos/15.png',
      description: 'A film-inspired identity for an entertainment brand.'
    },
    {
      name: 'Light Filmstrip',
      category: 'Entertainment',
      image: '/portfolio-assets/logos/16.png',
      description: 'A film-inspired identity for an entertainment brand.'
    }
  ];

  get currentDesign(): LogoDesign {
    return this.designs[this.activeIndex];
  }

  get visibleDesigns(): VisibleDesign[] {
    const total = this.designs.length;

    return [-2, -1, 0, 1, 2]
      .filter(position => total > 0)
      .map(position => {
        const index =
          (this.activeIndex + position + total) % total;

        return {
          position,
          design: this.designs[index]
        };
      });
  }

  animationKey = 0;

  next(): void {
    this.direction = 'next';
    this.activeIndex =
      (this.activeIndex + 1) % this.designs.length;
    this.animationKey++;
  }

  previous(): void {
    this.direction = 'prev';
    this.activeIndex =
      (this.activeIndex - 1 + this.designs.length)
      % this.designs.length;
    this.animationKey++;
  }

  goTo(index: number): void {
    if (index === this.activeIndex) return;

    this.direction = index > this.activeIndex ? 'next' : 'prev';
    this.activeIndex = index;
    this.animationKey++;
  }

  selectPosition(position: number): void {
    if (position === 0) return;

    if (position < 0) {
      this.previous();
    } else {
      this.next();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (this.modalOpen) {
      if (event.key === 'Escape') {
        this.closeModal();
      }

      // Prevent carousel navigation while preview is open.
      if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight'
      ) {
        event.preventDefault();
      }

      return;
    }

    const target = event.target as HTMLElement | null;

    if (
      target &&
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
    ) {
      return;
    }

    if (event.key === 'ArrowLeft') this.previous();
    if (event.key === 'ArrowRight') this.next();
  }

  // Add inside LogoCarouselComponent

  readonly Math = Math;

  modalOpen = false;
  selectedDesign: LogoDesign | null = null;

  zoomLevel = 1;
  readonly minZoom = 0.5;
  readonly maxZoom = 3;
  readonly zoomStep = 0.25;

  get downloadFilename(): string {
    const name = this.selectedDesign?.name ?? 'logo';

    return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-logo.png`;
  }

  openModal(design: LogoDesign, event: MouseEvent): void {
    event.stopPropagation();

    this.selectedDesign = design;
    this.zoomLevel = 1;
    this.modalOpen = true;

    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedDesign = null;
    this.zoomLevel = 1;

    document.body.style.overflow = '';
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(
      this.maxZoom,
      this.zoomLevel + this.zoomStep
    );
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(
      this.minZoom,
      this.zoomLevel - this.zoomStep
    );
  }

  resetZoom(): void {
    this.zoomLevel = 1;
  }

  onModalWheel(event: WheelEvent): void {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();

      if (event.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    }
  }
}