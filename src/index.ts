
// console.clear();
// RxJS v6+
import * as jQuery from 'jquery';

import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

import { from, scan } from 'rxjs';
// import { from as observableFrom } from 'rxjs';
import * as Rx from 'rxjs'

var box = document.getElementById('type-ahead')
fromEvent(box, 'click')
  .pipe(
    scan( count => count + 1, 0),    
  )
  .subscribe( count => console.log('Clicked ${count} times.'));

const getContinents = keys => [
  'africa',
  'antarctica',
  'asia',
  'australia',
  'europe',
  'north america',
  'south america'
].filter(e => e.indexOf(keys.toLowerCase()) > -1);

const fakeContinentsRequest = keys => of(getContinents(keys))
  .pipe(
    tap(_ => console.log(`API CALL at ${new Date()}`))
  );

fromEvent(document.getElementById('type-ahead'), 'keyup')
  .pipe(
    debounceTime(200),
    map((e: any) => e.target.value),
    distinctUntilChanged(),
    switchMap(fakeContinentsRequest),
    tap(c => document.getElementById('output').innerText = c.join('\n'))
  ).subscribe();



// for one test 'todo.spec.js' 'alias gets new rerender from DOM'
jQuery('#output').on('click', function(e){
  console.log('CLICKED');
  jQuery(this).html('We are here!');
});
