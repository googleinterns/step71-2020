import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCollaboratorsComponent } from './manage-collaborators.component';

describe('ManageCollaboratorsComponent', () => {
  let component: ManageCollaboratorsComponent;
  let fixture: ComponentFixture<ManageCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
