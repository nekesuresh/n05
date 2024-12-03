import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: spy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if the user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block navigation and redirect to login if the user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display an alert when redirecting to login', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(window, 'alert'); 

    guard.canActivate();

    expect(window.alert).toHaveBeenCalledWith(
      'Login to access this page. Redirecting to login page...'
    );
  });
});
