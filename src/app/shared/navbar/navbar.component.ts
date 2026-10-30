
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly logo = '/portfolio-assets/hero/logo.png';

  readonly navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Tools', href: '#tools' },
    { label: 'Experience', href: '#experience' },
    { label: 'Designs', href: '#designs' },
    { label: 'Logo', href: '#logo-designs' },
    { label: 'Social Media', href: '#social-media-design' },
    { label: 'Print Design', href: '#print-design' }
  ];

  readonly resumeUrl = '/portfolio-assets/resume/arti-yadav-resume.pdf';

  menuOpen = false;
  activeLink = '#home';

  selectLink(href: string): void {
    this.activeLink = href;
    this.closeMenu();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
