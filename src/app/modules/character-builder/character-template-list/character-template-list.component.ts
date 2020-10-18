import { Component, Input } from '@angular/core';
import { CharacterTemplateModel } from '../model/character-template-model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-character-template-list',
  templateUrl: './character-template-list.component.html',
  styleUrls: ['./character-template-list.component.css']
})
export class CharacterTemplateListComponent {

  @Input('characterList') characters: Array<CharacterTemplateModel>;
  @Input('titleText') titleText: string;
  @Input('subtitleText') subtitleText: string;

  customOptions: OwlOptions = {
    dots: true,
    autoWidth: true,
    loop: false,
    freeDrag: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    navText: ['<', '>'],
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };

}
