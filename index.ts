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
const toJson = { selector: (response) => response.json() };
const authenticated = false;

/**
 * Chains observables together based on a condition
 */
function sendMessage$(msg: string): Observable<string> {
  const message$ = of(msg);

  if (authenticated) {
    return message$;
  } else {
    const repos$ = ({ repos_url }) =>
      fromFetch(repos_url, toJson).pipe(
        tap(() => console.log('got repos')),
        switchMap(() => message$)
      );

    const user$ = fromFetch(userUrl, toJson).pipe(
      tap(() => console.log('got user')),
      switchMap(repos$)
    );
    return user$;
  }
}

/**
 * Entry Point
 */
async function start() {
  const observable = sendMessage$('send request');

  const subscription = observable.subscribe({
    next: (data) => console.log(data),
    complete: () => console.log('done'),
    error: (err) => console.error('catch', err),
  });

  // const data = await firstValueFrom(observable);
  // console.log('promise', data);
}

start();
