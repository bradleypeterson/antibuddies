import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNodeComponent } from './video-node.component';

describe('VideoNodeComponent', () => {
  let component: VideoNodeComponent;
  let fixture: ComponentFixture<VideoNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
