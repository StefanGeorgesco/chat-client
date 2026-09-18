import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoComponent } from './geo.component';

describe('GeoComponent', () => {
  let component: GeoComponent;
  let fixture: ComponentFixture<GeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
