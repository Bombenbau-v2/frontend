import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RighthandSidebarComponent } from './righthand-sidebar.component';

describe('RighthandSidebarComponent', () => {
  let component: RighthandSidebarComponent;
  let fixture: ComponentFixture<RighthandSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RighthandSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RighthandSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
