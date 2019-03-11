import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../model/post';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  template: `
    <h1>Posts</h1>
    <ul>
      <li *ngFor="let post of posts | async"><h2>{{post.title}}</h2><p>{{post.body}}</p></li>
    </ul>
  `,
  styles: [`ul {list-style-type: none;} li {border-bottom: 1px solid white;}`]
})
export class PostsComponent implements OnInit {

  public posts: Observable<Post[]> = this.dataService.getPosts();

  constructor(private dataService: DataService, private titleService: Title, private metaService: Meta) { }

  public ngOnInit(): void {
    this.titleService.setTitle('Posts from https://jsonplaceholder.typicode.com')
    this.metaService.updateTag({name: 'description', content: 'Data from the Fake Online REST API for Testing and Prototyping'});
  }
}
