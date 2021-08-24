import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let Heroes;
  let mockHeroService;
  let fixture: ComponentFixture<HeroesComponent>;

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    Heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'wonderful woman', strength: 24 },
      { id: 3, name: 'superdude', strength: 55 },
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(HeroesComponent);
    component = new HeroesComponent(mockHeroService);
  })

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = Heroes;
      component.delete(Heroes[2]);

      expect(component.heroes.length).toBe(2);
    })

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = Heroes;
      component.delete(Heroes[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(Heroes[2]);
    })
  })
  describe('getHeroes', () => {
    it('should set heroes correctly from the service', () => {
      mockHeroService.getHeroes.and.returnValue(of(Heroes));
      fixture.detectChanges();

      expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should create one li for each hero',()=>{
      mockHeroService.getHeroes.and.returnValue(of(Heroes));
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
  })

})
