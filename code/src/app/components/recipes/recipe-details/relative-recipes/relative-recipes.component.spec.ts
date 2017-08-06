import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeRecipesComponent } from './relative-recipes.component';

describe('RelativeRecipesComponent', () => {
  let component: RelativeRecipesComponent;
  let fixture: ComponentFixture<RelativeRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativeRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
