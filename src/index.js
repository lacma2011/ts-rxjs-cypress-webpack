"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
// RxJS v6+
const rxjs_1 = require("rxjs");
const rxjs_2 = require("rxjs");
const getContinents = keys => [
    'africa',
    'antarctica',
    'asia',
    'australia',
    'europe',
    'north america',
    'south america'
].filter(e => e.indexOf(keys.toLowerCase()) > -1);
const fakeContinentsRequest = keys => (0, rxjs_1.of)(getContinents(keys))
    .pipe((0, rxjs_2.tap)(_ => console.log(`API CALL at ${new Date()}`)));
(0, rxjs_1.fromEvent)(document.getElementById('type-ahead'), 'keyup')
    .pipe((0, rxjs_2.debounceTime)(200), (0, rxjs_2.map)((e) => e.target.value), (0, rxjs_2.distinctUntilChanged)(), (0, rxjs_2.switchMap)(fakeContinentsRequest), (0, rxjs_2.tap)(c => document.getElementById('output').innerText = c.join('\n'))).subscribe();
