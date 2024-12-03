import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,         
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send login data to the backend', () => {
    component.username = 'testuser';
    component.password = 'testpassword';

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser', password: 'testpassword' });

    req.flush({ token: 'fake-jwt-token' });

    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
  });

  it('should display an error message on failed login', () => {
    component.username = 'wronguser';
    component.password = 'wrongpassword';

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(component.errorMessage).toBe('Invalid username or password');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
