import {trigger, state, style, transition, animate} from "@angular/animations";

export const NavAnimations = [

  trigger('navStateTranslate', [
    state('visible', style({
      'transform': 'translate3d(0,0,0)',
    })),
    state('hidden', style({
      'transform': 'translate3d(-250px,0,0)',
    })),
    transition('visible <=> hidden', animate('0.45s ease'))
  ]),

  trigger('navStateOpacity', [
    state('visible', style({
      'opacity': 1,
    })),
    state('hidden', style({
      'opacity': 0,
    })),
    transition('visible <=> hidden', animate('0.2s linear'))
  ])

];
