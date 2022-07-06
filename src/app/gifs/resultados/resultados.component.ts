import { Component } from '@angular/core';
import { Gif } from '../interfaces/gifs.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html'
})
export class ResultadosComponent {

  constructor(private gifsService: GifsService) { }

  get resultados(): Gif[] {
    return this.gifsService.resultados;
  }
}
