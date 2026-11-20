
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
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
export class HeroComponent implements OnInit, OnDestroy {
  readonly name = 'Arti Yadav';
  readonly tagline = 'Designing Ideas. Building Visual Identities.';

  readonly portrait = '/portfolio-assets/hero/arti-portrait.png';
  readonly logo = '/portfolio-assets/hero/logo.png';

  readonly profession = 'Creative Designer';
  displayedText = '';

  private typingTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (typeof window === 'undefined') {
      this.displayedText = this.profession;
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.displayedText = this.profession;
      return;
    }

    this.startTyping();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  }

  private startTyping(): void {
    let characterIndex = 0;

    const typeNextCharacter = (): void => {
      characterIndex++;
      this.displayedText = this.profession.slice(0, characterIndex);

      if (characterIndex < this.profession.length) {
        this.typingTimer = setTimeout(typeNextCharacter, 95);
        return;
      }

      this.typingTimer = setTimeout(() => this.eraseText(), 2200);
    };

    this.typingTimer = setTimeout(typeNextCharacter, 500);
  }

  private eraseText(): void {
    if (!this.displayedText) {
      this.typingTimer = setTimeout(() => this.startTyping(), 300);
      return;
    }

    this.displayedText = this.displayedText.slice(0, -1);
    this.typingTimer = setTimeout(() => this.eraseText(), 45);
  }
}
