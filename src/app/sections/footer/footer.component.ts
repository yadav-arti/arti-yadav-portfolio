
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  contact = {
    name: 'Arti Yadav',
    role: 'Creative Designer',
    heading: "Let's create something beautiful and meaningful.",
    description:
      "I'm passionate about crafting thoughtful visual identities and engaging digital experiences. Whether you need a creative designer for branding, UI/UX design, or digital content, I'd love to collaborate and bring your ideas to life.",
    email: 'aartiy5057145@gmail.com',
    phone: '+91-9286191956',
    phoneLink: '+919286191956',
    location: 'Bareilly, India',
    emailSubject: 'Portfolio Contact'
  };

  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yadav-arti',
      icon: 'github',
      ariaLabel: 'Visit GitHub profile'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aarti-yadav-9920b0288/',
      icon: 'linkedin',
      ariaLabel: 'Visit LinkedIn profile'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/aarticreatesx',
      icon: 'instagram',
      ariaLabel: 'Visit Instagram profile'
    }
  ];

  get emailUrl(): string {
    return `mailto:${this.contact.email}?subject=${encodeURIComponent(
      this.contact.emailSubject
    )}`;
  }

  get phoneUrl(): string {
    return `tel:${this.contact.phoneLink}`;
  }
}
