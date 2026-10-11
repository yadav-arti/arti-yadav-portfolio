
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

interface ExperienceItem {
  period: string;
  company: string;
  description: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements AfterViewInit, OnDestroy{
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const section = this.elementRef.nativeElement.querySelector('.experience');

    if (!section) return;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('experience--visible');
          this.observer?.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    this.observer.observe(section);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  experiences: ExperienceItem[] = [
    {
      period: 'March 2026 - Present',
      company: 'Step Wire & Cables',
      description:
        'Creating branding, social media creatives, packaging, brochures, and marketing materials. Handling social media, website updates, and basic SEO.'
    },
    {
      period: 'Sep 2025 - Feb 2026',
      company: 'Inland India, Noida',
      description:
        'Designing responsive websites and landing pages, managing WordPress websites, updating content, and improving user experience.'
    },
    {
      period: 'March 2024 - Sep 2025',
      company: 'Cosmo Consultants, Bareilly',
      description:
        'Designing website interfaces, social media creatives, and print materials. Managing social media, website updates, and basic on-page SEO.'
    }
  ];
}
