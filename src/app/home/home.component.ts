import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

interface HomeForm {
  pokemonName: FormControl<string>;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  homeForm: FormGroup<HomeForm>;
  searchPokemonSubscription: Subscription | null = null;
  pokemonData: { name: string; url: string } | null = null;
  errorMessage: string | null = null;

  constructor(private api: ApiService) {
    this.homeForm = new FormGroup<HomeForm>({
      pokemonName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(30)] }),
    });
  }

  onSubmit(): void {
    if (this.homeForm.invalid) return;

    const formValue = this.homeForm.value;
    const param = {
      pokemonName: formValue.pokemonName as string,
    };

    this.searchPokemonSubscription = this.api.searchPokemon(param).subscribe({
      next: (response) => {
        this.pokemonData = {
          name: response.name,
          url: response.sprites_front_default_url,
        };
      },
      error: (error) => {
        console.error('エラー:', error);
      },
    });
  }
}
