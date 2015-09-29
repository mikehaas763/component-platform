///<reference path="../typings/angular2/angular2.d.ts"/>

import {Component, View, bootstrap} from 'angular2/angular2';
import Service from './Service';

@Component({
    selector: 'my-app'
})
@View({
    template: '<h1 id="output">Root</h1>'
})
export default class App {

    constructor() {
        let service: Service = new Service();
        console.log(service.getWorkDone());
    }
}

bootstrap(App);
