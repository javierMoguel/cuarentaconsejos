import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public flipActive = false;
  public imageToShow: string;
  constructor(
    private http: HttpClient,
  ) {}

  flipCard() {
    this.flipActive = !this.flipActive;
  }

  getRandomMeme() {
    this.memeService().subscribe( res => {
      this.imageToShow = res.preview[res.preview.length - 1 ];
    });
  }

  memeService() {
    return this.http.get('https://meme-api.herokuapp.com/gimme')
    .pipe( map( (res: any) => res), catchError(error => throwError(error)));
  }

}
