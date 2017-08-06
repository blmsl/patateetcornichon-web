import {Pipe} from "@angular/core";

@Pipe({
  name: 'getDifficulty'
})
export class DifficultyPipe {
  public transform(difficulty: string): string {
    switch (difficulty) {
      case 'easy':
        return 'Facile';
      case 'medium':
        return 'Moyen';
      case 'hard':
        return 'Difficile';
      default:
        return null;
    }
  }
}
