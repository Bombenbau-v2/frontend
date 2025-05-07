import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredntialsAlternativeComponent } from './credntials-alternative.component';

describe('CredntialsAlternativeComponent', () => {
  let component: CredntialsAlternativeComponent;
  let fixture: ComponentFixture<CredntialsAlternativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredntialsAlternativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredntialsAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
