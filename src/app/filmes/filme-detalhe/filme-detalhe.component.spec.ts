import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDetalheComponent } from './filme-detalhe.component';

describe('FilmeDetalheComponent', () => {
  let component: FilmeDetalheComponent;
  let fixture: ComponentFixture<FilmeDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
