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
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

const userUrl = 'https://api.github.com/users/six-edge';

const toJson = {
  selector: (response) => response.json(),
};

// Chaining fromPromise

async function start() {
  const repos$ = ({ repos_url }) => fromFetch(repos_url, toJson);

  const user$ = fromFetch(userUrl, toJson).pipe(switchMap(repos$));

  user$.subscribe({
    next: (data) => {
      console.log('first repo', data[0].name);
    },
  });

  // const promise = firstValueFrom(user$);
  // const data = await promise;
  // console.log('promise', data[0].name);
}

start();
