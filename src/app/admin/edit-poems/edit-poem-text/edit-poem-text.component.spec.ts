/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditPoemTextComponent } from './edit-poem-text.component';

describe('EditPoemTextComponent', () => {
  let component: EditPoemTextComponent;
  let fixture: ComponentFixture<EditPoemTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPoemTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPoemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
