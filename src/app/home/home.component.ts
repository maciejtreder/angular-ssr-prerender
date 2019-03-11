import { Component, OnInit } from '@angular/core';
import { Story } from '../model/story';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

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
export class HomeComponent implements OnInit {

  public stories: Story[] = this.router.snapshot.data.stories;

  constructor(private router: ActivatedRoute, private titleService: Title, private metaService: Meta) { }

  public ngOnInit(): void {
    this.titleService.setTitle('Recent entries from Hackers-news!')
    this.metaService.updateTag({name: 'description', content: 'Checkout recent stories!'});
  }
}
