// Import stylesheets
import './style.css';
import {
  Subject,
  interval,
  map,
  take,
  tap,
  Observer,
  firstValueFrom,
  of,
  Observable,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

const userUrl = 'https://api.github.com/users/six-edge';

const authenticated = false;

const toJson = {
  selector: (response) => response.json(),
};

// Chaining fromPromise

// 1. Insert observable after API tasks depending on condition
// 2. Call a function to create a new observable, then subscribe.

function sendMessage$(msg: string): Observable<string> {
  const source$ = of(msg);

  if (authenticated) {
    return source$;
  } else {
    const repos$ = ({ repos_url }) =>
      fromFetch(repos_url, toJson).pipe(
        tap(() => console.log('got repos')),
        switchMap(() => source$)
      );

    const user$ = fromFetch(userUrl, toJson).pipe(
      tap(() => console.log('got user')),
      switchMap(repos$)
    );
    return user$;
  }
}

async function start() {
  const observable = sendMessage$('send request');

  const subscription = observable.subscribe({
    next: (data) => {
      console.log('subscribe', data);
    },
  });

  // const data = await firstValueFrom(observable);
  // console.log('promise', data);
}

start();
