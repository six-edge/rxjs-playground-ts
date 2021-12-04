// Import stylesheets
import './style.css';
import { Subject, interval, map, take, tap, Observer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

// const subject = new Subject();

// console.log(`subject is ${subject.closed ? 'closed' : 'open'}`);

// const subscriptionA = subject.subscribe({
//   next: (v) => console.log(`observerA`, v),
//   error: (err) => console.error(`observerA err`, err),
//   complete: (v) => console.log(`observerA complete`),
// } as Observer<string>);

// const subscriptionB = subject.subscribe({
//   next: (v) => console.log('observerB', v),
//   error: (err) => console.error(`observerB err`, err),
//   complete: (v) => console.log(`observerB complete`),
// } as Observer<string>);

// const keepAlive$ = interval(2000).pipe(
//   map((count) => ({ message: 'KeepAlive', count })),
//   tap(({ count }) => {
//     if (count === 2) {
//       subject.next({ Message: 'Ping' });
//     }
//   }),
//   take(3)
// );

// // Subscribe providing a Subject
// // When subscribed to KeepAlive it starts to emit values
// // which uses next() to send values to the Subject
// // enabling KeepAlive to be a data source
// keepAlive$.subscribe(subject);

// subject.next({ Message: 'Init' });

// console.log('subscribers', subject.observed ? 'yes' : 'no');

const repoObservable = fromFetch(
  'https://api.github.com/users/six-edge/repos',
  {
    selector: (response) => response.json(),
  }
);

// Chaining fromPromise
const reposObservable = fromFetch(
  'https://api.github.com/users/six-edge/repos',
  {
    selector: (response) => response.json(),
  }
).pipe(switchMap((data) => repoObservable));

reposObservable.subscribe({
  next: (val) => console.log('subscriber', val),
});
