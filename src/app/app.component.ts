import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { FooterComponent } from './sections/footer/footer.component';
import { DesignShowcaseComponent } from './sections/design-showcase/design-showcase.component';
import { ToolsShowcaseComponent } from './sections/tools-showcase/tools-showcase.component';
import { LogoCarouselComponent } from './sections/logo-carousel/logo-carousel.component';
import { SocialMediaDesignComponent } from './sections/social-media-design/social-media-design.component';
import { PrintDesignComponent } from './sections/print-design/print-design.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    DesignShowcaseComponent,
    ToolsShowcaseComponent,
    LogoCarouselComponent,
    SocialMediaDesignComponent,
    PrintDesignComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
