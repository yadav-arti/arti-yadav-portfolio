
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy{

  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const section =
      this.elementRef.nativeElement.querySelector('.about');

    if (!section) return;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('about--visible');
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

  readonly introduction =
    'I’m Arti Yadav, a Creative Designer with 2.5+ years of experience in branding, social media, packaging, print, and digital design. I create visually engaging designs that combine creativity, strategy, and clear communication.';

  readonly approach =
    'Creative thinking + Clean design + Brand consistency + Purpose-driven communication';

  readonly timeline: TimelineItem[] = [
    {
      year: '2009-2021',
      title: 'SCHOOL',
      description: 'Kendriya Vidyalaya NER Bareilly'
    },
    {
      year: '2021-2025',
      title: 'GRADUATION',
      description: 'B.Tech — Rajshree Institute of Management and Technology'
    },
    {
      year: '2026-2028',
      title: 'POST GRADUATION',
      description: 'MBA (Pursuing) — Manipal University Jaipur'
    }
  ];
}
