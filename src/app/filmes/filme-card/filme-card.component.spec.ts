import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeCardComponent } from './filme-card.component';

describe('FilmeCardComponent', () => {
  let component: FilmeCardComponent;
  let fixture: ComponentFixture<FilmeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
