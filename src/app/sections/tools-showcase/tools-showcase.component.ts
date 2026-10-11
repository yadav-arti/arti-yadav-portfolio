
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';

interface DesignTool {
  id: string;
  name: string;
  iconUrl: string;
  x: string;
  y: string;
  delay: number;
}

@Component({
  selector: 'app-tools-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tools-showcase.component.html',
  styleUrl: './tools-showcase.component.scss'
})
export class ToolsShowcaseComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  readonly tools: DesignTool[] = [
    {
      id: 'figma',
      name: 'Figma',
      iconUrl: 'https://cdn.simpleicons.org/figma',
      x: '18%',
      y: '17%',
      delay: 100
    },
    {
      id: 'photoshop',
      name: 'Photoshop',
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/1/1781.png',
      x: '39%',
      y: '8%',
      delay: 250
    },
    {
      id: 'illustrator',
      name: 'Adobe Illustrator',
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/1/1759.png',
      x: '62%',
      y: '12%',
      delay: 400
    },
    {
      id: 'html',
      name: 'HTML5',
      iconUrl: 'https://cdn.simpleicons.org/html5',
      x: '9%',
      y: '40%',
      delay: 700
    },
    {
      id: 'css',
      name: 'CSS3',
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/888/888847.png',
      x: '12%',
      y: '67%',
      delay: 1000
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      iconUrl: 'https://cdn.simpleicons.org/wordpress',
      x: '27%',
      y: '85%',
      delay: 1300
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/11865/11865326.png',
      x: '91%',
      y: '43%',
      delay: 850
    },
    {
      id: 'gemini',
      name: 'Gemini',
      iconUrl: 'https://cdn.simpleicons.org/googlegemini',
      x: '83%',
      y: '20%',
      delay: 550
    },
    {
      id: 'claude',
      name: 'Claude',
      iconUrl: 'https://cdn.simpleicons.org/claude',
      x: '74%',
      y: '86%',
      delay: 1600
    },
    {
      id: 'canva',
      name: 'Canva',
      iconUrl: 'https://img.utdstc.com/icon/431/c6b/431c6be8e8dbb358738980c75c35c56ee8e8c3238089ed9b6f04d295d4008970:100',
      x: '87%',
      y: '68%',
      delay: 1150
    },
    {
      id: 'coreldraw',
      name: 'CorelDRAW',
      iconUrl: 'https://cdn.simpleicons.org/coreldraw',
      x: '51%',
      y: '91%',
      delay: 1450
    }
  ];

  trackByToolId(index: number, tool: DesignTool): string {
    return tool.id;
  }

  ngAfterViewInit(): void {
    // Avoid using IntersectionObserver where it is unavailable.
    if (typeof IntersectionObserver === 'undefined') {
      this.elementRef.nativeElement
        .querySelector('.tools-showcase')
        ?.classList.add('is-visible');

      return;
    }

    const section = this.elementRef.nativeElement.querySelector(
      '.tools-showcase'
    );

    if (!section) {
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');

          // Run the entrance animation only once.
          this.observer?.disconnect();
        }
      },
      {
        threshold: 0.2
      }
    );

    this.observer.observe(section);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
