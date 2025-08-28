import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DetailsComponent } from './details.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockHousingService: jasmine.SpyObj<HousingService>;
  let mockActivatedRoute: any;

  const mockHousingLocation: HousingLocation = {
    id: 0,
    name: 'Test Housing',
    city: 'Test City',
    state: 'TS',
    photo: 'test.jpg',
    availableUnits: 1,
    wifi: true,
    laundry: true,
    privateBathroom: true
  };

  beforeEach(async () => {
    const housingServiceSpy = jasmine.createSpyObj('HousingService', ['getHousingLocationById', 'submitApplication']);
    housingServiceSpy.getHousingLocationById.and.returnValue(Promise.resolve(mockHousingLocation));

    mockActivatedRoute = {
      snapshot: {
        params: { id: '0' }
      }
    };

    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        { provide: HousingService, useValue: housingServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    mockHousingService = TestBed.inject(HousingService) as jasmine.SpyObj<HousingService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display private bathroom information', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('li');

    let privateBathroomFound = false;
    listItems.forEach(item => {
      if (item.textContent?.includes('Does this location have private bathroom')) {
        privateBathroomFound = true;
        expect(item.textContent).toContain('true');
      }
    });

    expect(privateBathroomFound).toBe(true);
  });

  it('should display false for private bathroom when location does not have it', async () => {
    const locationWithoutPrivateBathroom: HousingLocation = {
      ...mockHousingLocation,
      privateBathroom: false
    };
    
    mockHousingService.getHousingLocationById.and.returnValue(Promise.resolve(locationWithoutPrivateBathroom));
    component.housingLocation = locationWithoutPrivateBathroom;
    
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('li');
    
    let privateBathroomFound = false;
    listItems.forEach(item => {
      if (item.textContent?.includes('Does this location have private bathroom')) {
        privateBathroomFound = true;
        expect(item.textContent).toContain('false');
      }
    });
    
    expect(privateBathroomFound).toBe(true);
  });
});
