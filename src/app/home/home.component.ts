import { Component } from '@angular/core';
import { Story } from '../model/story';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<h1>Newest stories:</h1>
  <ul>
    <li *ngFor="let story of stories">
      <span>{{story.time * 1000 | date}}</span>
      <a href={{story.url}} target="_blank">{{story.title}} <i>by {{story.by}}</i></a>
    </li>
  </ul>
  `,
  styles: [`
    ul { list-style-type: none }
    span { display: block; }
    li { margin: 25px 0; border-bottom: 1px dashed white}
    a {
      font-size: 20px;
      color: white;
      text-decoration: none;
    }
    a: hover {
      text-decoration: underline;
    }
  `]
})
export class HomeComponent {

  public stories: Story[] = this.router.snapshot.data.stories;

  constructor(private router: ActivatedRoute) { }
}
