import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'OYALssNYGWQSr9utyL97oOenAAocziio';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial') !== null) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if (localStorage.getItem('resultados') !== null) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: params })
      .subscribe((response: SearchGifsResponse) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
    /* MÉTODO ALTERNATIVO PARA LLAMADAS HTTP
    fetch('https://api.giphy.com/v1/gifs/search?api_key=OYALssNYGWQSr9utyL97oOenAAocziio&q=dragon ball z&limit=10')
      .then(resp => {
        resp.json().then(data => {
          console.log(data);
        })
      })
    console.log(this.historial) */
  }
}
