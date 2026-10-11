
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageGlowDirective } from '../../shared/directives/image-glow.directive';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    NavbarComponent,
    ImageGlowDirective
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly name = 'Arti Yadav';
  readonly tagline = 'Designing Ideas. Building Visual Identities.';

  readonly portrait = '/portfolio-assets/hero/arti-portrait.png';
  readonly logo = '/portfolio-assets/hero/logo.png';

  readonly words = ['Creative Designer'];

  displayedText = '';
  private typingTimer?: ReturnType<typeof setTimeout>;
  private wordIndex = 0;
  private deleting = false;

  ngOnInit(): void {
    this.typeText();
  }

  private typeText(): void {
    const currentWord = this.words[this.wordIndex];

    if (this.deleting) {
      this.displayedText = currentWord.substring(
        0,
        this.displayedText.length - 1
      );
    } else {
      this.displayedText = currentWord.substring(
        0,
        this.displayedText.length + 1
      );
    }

    let delay = this.deleting ? 55 : 110;

    if (!this.deleting && this.displayedText === currentWord) {
      delay = 1300;
      this.deleting = true;
    } else if (this.deleting && this.displayedText === '') {
      this.deleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      delay = 350;
    }

    this.typingTimer = setTimeout(() => this.typeText(), delay);
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  }
}
