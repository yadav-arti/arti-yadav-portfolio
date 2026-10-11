
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DesignArtwork {
  src: string;
  alt: string;
  x: number;
  width: number;
}

interface FloatingArtwork {
  src: string;
  alt: string;
  position: 'top-left' | 'top-middle' | 'top-right' | 'bottom-left' | 'bottom-middle' | 'bottom-right';
  rotation: number;
}

@Component({
  selector: 'app-design-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-showcase.component.html',
  styleUrl: './design-showcase.component.scss'
})
export class DesignShowcaseComponent {
  title = 'DESIGNS';

  // Images displayed inside the large typography.
  // Replace these paths with your actual portfolio artwork.
  letterArtworks: DesignArtwork[] = [
    {
      src: '/portfolio-assets/main-design/1.jpg',
      alt: 'Creative poster design',
      x: 0,
      width: 260
    },
    {
      src: '/portfolio-assets/main-design/2.jpg',
      alt: 'Branding artwork',
      x: 220,
      width: 260
    },
    {
      src: '/portfolio-assets/main-design/3.jpg',
      alt: 'Social media design',
      x: 440,
      width: 260
    },
    {
      src: '/portfolio-assets/main-design/4.jpg',
      alt: 'Packaging design',
      x: 660,
      width: 260
    },
    {
      src: '/portfolio-assets/main-design/5.jpg',
      alt: 'Product advertisement',
      x: 880,
      width: 260
    },
    {
      src: '/portfolio-assets/main-design/6.jpg',
      alt: 'Promotional graphic design',
      x: 1100,
      width: 260
    },
    {
      src: '/portfolio-assets/main-design/7.jpg',
      alt: 'Creative visual identity',
      x: 1300,
      width: 260
    }
  ];

  // Decorative artwork around the typography.
  floatingArtworks: FloatingArtwork[] = [
    {
      src: '/portfolio-assets/main-design/2.jpg',
      alt: 'Travel campaign poster',
      position: 'top-left',
      rotation: -16
    },
    {
      src: '/portfolio-assets/main-design/7.jpg',
      alt: 'Promotional social media artwork',
      position: 'top-middle',
      rotation: -12
    },
    {
      src: '/portfolio-assets/main-design/4.jpg',
      alt: 'Brand identity design',
      position: 'top-right',
      rotation: -17
    },
    {
      src: '/portfolio-assets/main-design/5.jpg',
      alt: 'Packaging portfolio artwork',
      position: 'bottom-left',
      rotation: -15
    },
    {
      src: '/portfolio-assets/main-design/6.jpg',
      alt: 'Product advertising design',
      position: 'bottom-middle',
      rotation: -16
    },
    {
      src: '/portfolio-assets/main-design/3.jpg',
      alt: 'Creative advertising poster',
      position: 'bottom-right',
      rotation: -15
    }
  ];
}
