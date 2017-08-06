import {trigger, state, style, transition, animate} from "@angular/animations";

export const SearchBarAnimations = [

  trigger('displayResults', [
    state('visible', style({
      'opacity': '1'
    })),
    state('hidden', style({
      'opacity': '0'
    })),
    transition('visible <=> hidden', animate('0.1s'))
  ])
];
