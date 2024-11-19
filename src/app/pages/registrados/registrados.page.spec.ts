import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistradosPage } from './registrados.page';

describe('RegistradosPage', () => {
  let component: RegistradosPage;
  let fixture: ComponentFixture<RegistradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
