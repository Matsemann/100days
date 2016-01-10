import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    template: `
    <p>Dette er en flat utfordring hvor man konkurrerer med seg selv, og målet er å nå 100 timer trening på 100 dager.
    Eller 50 timer. Eller 33, eller hva enn man definerer som mål selv. Første dag vi begynner tellingen er 11. januar. Definisjonen
    på trening har vi kommet frem til er at du blir svett/føler du trenger å dusje, men her må man selv gjøre en skjønnsmessig
    vurdering.</p>

    <p>Vil du være med? <b><a [routerLink]="['Register']">Registrer deg</a>!</b></p>
        `,
    directives: [ROUTER_DIRECTIVES]

})
export class LandingComponent {
    getData = function () {
        return "hhehee";
    }
}