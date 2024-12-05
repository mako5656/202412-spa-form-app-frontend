import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface FormDTO {
  pokemonName: string;
}

interface FormResponse {
  name: string;
  sprites_front_default_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly FORM_API = '/api/search-pokemon';

  constructor(private http: HttpClient) {}

  searchPokemon(dto: FormDTO): Observable<FormResponse> {
    return this.http.post<FormResponse>(this.FORM_API, dto).pipe(
      catchError((error) => {
        console.error('APIエラー:', error);
        return throwError(() => new Error('API呼び出しに失敗しました。'));
      })
    );
  }
}
