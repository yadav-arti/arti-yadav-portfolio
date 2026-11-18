
import { Component } from '@angular/core';
import { ImageGlowDirective } from '../../shared/directives/image-glow.directive';
import { ImageLoadingDirective } from '../../shared/directives/image-loading.directive';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    NavbarComponent,
    ImageGlowDirective,
    ImageLoadingDirective
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly name = 'Arti Yadav';
  readonly tagline = 'Designing Ideas. Building Visual Identities.';

  readonly portrait = '/portfolio-assets/hero/arti-portrait.png';
  readonly logo = '/portfolio-assets/hero/logo.png';

  readonly displayedText = 'Creative Designer';
}
