/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FasebookUserComponent } from './fasebook-user.component';

describe('FasebookUserComponent', () => {
  let component: FasebookUserComponent;
  let fixture: ComponentFixture<FasebookUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FasebookUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FasebookUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
