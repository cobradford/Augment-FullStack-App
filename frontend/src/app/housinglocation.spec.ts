import { HousingLocation } from './housinglocation';

describe('HousingLocation Interface', () => {
  it('should have privateBathroom property', () => {
    const mockLocation: HousingLocation = {
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

    expect(mockLocation.privateBathroom).toBeDefined();
    expect(typeof mockLocation.privateBathroom).toBe('boolean');
    expect(mockLocation.privateBathroom).toBe(true);
  });

  it('should allow privateBathroom to be false', () => {
    const mockLocation: HousingLocation = {
      id: 1,
      name: 'Test Housing 2',
      city: 'Test City 2',
      state: 'TS',
      photo: 'test2.jpg',
      availableUnits: 2,
      wifi: false,
      laundry: false,
      privateBathroom: false
    };

    expect(mockLocation.privateBathroom).toBe(false);
  });
});
