import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin } from 'rxjs';
import { Post } from './model/post';
import { map, flatMap } from 'rxjs/operators';
import { Story } from './model/story';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  public getStories(): Observable<Story[]> {
    return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/newstories.json')
    .pipe(
      map(ids => ids.slice(0, 20)),
      flatMap(ids => {
        return forkJoin(
          ids.map(id => this.http.get<Story>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
        );
      })
    );
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

}
