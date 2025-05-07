import { HttpClient } from '@angular/common/http';
import { Component, Input, inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-credentials-enter-button',
  imports: [],
  templateUrl: './credentials-enter-button.component.html',
  styleUrl: './credentials-enter-button.component.scss',
})
// @Injectable({ providedIn: 'root' })
export class CredentialsEnterButtonComponent {
  // private http = inject(HttpClient);
  // @Input() name = '';
  // private testname = "testman";
  // private testtag = "testtag";
  // private testhash = "D3B778A25E5B1CC6B5386EE2E44395235D669B8E0117FC81B5089534B9F85165";
  // onClick() {
  //   console.log("clicK");
  //   this.http.post('http://localhost:6969/register',{name: this.testname, tag: this.testtag, hash: this.testhash}).subscribe();
  // }
}
