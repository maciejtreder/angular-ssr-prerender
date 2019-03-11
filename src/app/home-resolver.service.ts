import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from './data.service';
import { Observable, timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Story } from './model/story';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<Story[]> {
  constructor(private dataService: DataService, @Inject(PLATFORM_ID) private platformId: any) { }

  public resolve(): Observable<Story[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.dataService.getStories();
    }

    const watchdog: Observable<number> = timer(500);

    return Observable.create(subject => {
      this.dataService.getStories().pipe(takeUntil(watchdog)).subscribe(stories => {
        subject.next(stories);
        subject.complete();
      });
      watchdog.subscribe( _ => {
        subject.next(null);
        subject.complete();
      });
    });
  }
}
