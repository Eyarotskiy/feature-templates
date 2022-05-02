import { ApiService } from 'src/app/services/api/api.service';
import {
  AuthenticationResponse,
  DishData,
  FileUploadResponse,
  LoginData,
  SignInResponse,
  UserData,
  UsersResponse
} from 'src/app/shared/types';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let httpController: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    apiService = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe('getData', () => {
    it('should trigger getData request and return user data', () => {
      const expectedData: UserData[] = [{
        id: 'testId',
        name: 'testName',
        username: 'testUserName',
        website: 'testWebsite',
      }];

      apiService.getData().subscribe((res: UserData[]) => {
        expect(res).toEqual(expectedData);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: '/api/data/get',
      });

      req.flush(expectedData);
    });
  });

  describe('getMenu', () => {
    it('should trigger getMenu request and return menu data', () => {
      const expectedData: DishData[] = [{
        _id: 'testId',
        creation_date: new Date(),
        name: 'testName',
      }];

      apiService.getMenu().subscribe((res: DishData[]) => {
        expect(res).toEqual(expectedData);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: '/api/menu/get',
      });

      req.flush(expectedData);
    });
  });

  describe('getUsers', () => {
    it('should trigger getUsers request and return users list', () => {
      const expectedData: UsersResponse = {users: ['testUser1', 'testUser2']};

      apiService.getUsers().subscribe((res: UsersResponse) => {
        expect(res).toEqual(expectedData);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: '/api/users/get',
      });

      req.flush(expectedData);
    });
  });

  describe('sendSignInRequest', () => {
    it('should trigger sign in request and return token', () => {
      const loginData: LoginData = {
        login: 'testLogin',
        password: 'testPassword',
      };
      const expectedData: SignInResponse = {token: 'testToken'};

      apiService.sendSignInRequest(loginData).subscribe((res: SignInResponse) => {
        expect(res).toEqual(expectedData);
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: '/api/login/signIn',
      });

      req.flush(expectedData);
    });
  });

  describe('sendSignUpRequest', () => {
    it('should trigger sign up request and return users list', () => {
      const loginData: LoginData = {
        login: 'testLogin',
        password: 'testPassword',
      };
      const expectedData: UsersResponse = {users: ['testUser1', 'testUser2']};

      apiService.sendSignUpRequest(loginData).subscribe((res: UsersResponse) => {
        expect(res).toEqual(expectedData);
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: '/api/login/signUp',
      });

      req.flush(expectedData);
    });
  });

  describe('uploadFile', () => {
    it('should trigger file upload request and return url to the file', () => {
      const formData: FormData = new FormData();
      const expectedData: FileUploadResponse = {url: 'testUrl'};

      apiService.uploadFile(formData).subscribe((res: FileUploadResponse) => {
        expect(res).toEqual(expectedData);
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: '/api/file/upload',
      });

      req.flush(expectedData);
    });
  });

  describe('authenticateUser', () => {
    it('should trigger file upload request and return login and token', () => {
      const expectedData: AuthenticationResponse = {
        login: 'testLogin',
        newToken: 'testNewToken',
      };

      apiService.authenticateUser().subscribe((res: AuthenticationResponse) => {
        expect(res).toEqual(expectedData);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: '/api/login/authenticate',
      });

      req.flush(expectedData);
    });
  });
});
