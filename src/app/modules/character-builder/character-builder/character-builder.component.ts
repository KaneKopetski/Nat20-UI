import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterClass} from '../model/character-class/character-class';
import {CharacterClassService} from '../character-class-service/character-class.service';
import {RaceService} from '../race-service/race.service';
import {Race} from '../model/race/race';
import {CharacterBuild} from "../model/character-build/character-build-response-model";
import {CharacterBuildRequest} from "../model/character-build/character-build-request-model";
import {FeatService} from "../feat-service/feat.service";
import {Feat} from "../model/feat/feat-model";
import {DeityService} from "../deity-service/deity.service";
import {Deity} from "../model/deity/deity-model";
import {Skill} from "../model/skill/skill";
import {SkillService} from "../skill-service/skill.service";
import {Source} from "../model/source/source-model";
import {SourceService} from "../source-service/source.service";
import {MatChip} from "@angular/material/chips";
import {Constants} from "../../../shared/constants/constants";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {ErrorResponse} from "../model/error-response/error-response-model";

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  characterBuild: CharacterBuild;
  characterBuildRequest: CharacterBuildRequest;

  characterClassLevelMap: Map<number, CharacterClass> = new Map<number, CharacterClass>();

  characterClassLevelsDisplayHeaders: string[] = ['level', 'class'];
  selectedClass: CharacterClass;

  isExpanded = false;

  availableCharacterClasses: Array<CharacterClass>;
  availableRaces: Array<Race>;
  availableFeats: Array<Feat>;
  availableDeities: Array<Deity>;
  availableSkills: Array<Skill>;
  allSources: Array<Source>;

  selectable = true;
  removable = true;
  isLinear = false;
  selectAll: boolean = false;

  sourceSelectionForm: FormGroup;
  characterBuilderForm: FormGroup;

  get sourceChipsSelected() {
    return this.sourceSelectionForm.get('sourcesSelected');
  }

  constructor(private fb: FormBuilder, private characterClassService: CharacterClassService, private raceService: RaceService,
              private featService: FeatService, private deityService: DeityService, private skillService: SkillService,
              private sourceService: SourceService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.setupForms();
    this.getSourceOptions();
    this.toastr.overlayContainer = this.toastContainer;
  }

  private setupForms() {
    this.sourceSelectionForm = this.fb.group({
      firstCtrl: ['', Validators.required],
      sourcesSelected: []
    });
    this.characterBuilderForm = this.fb.group({
      buildName: ['', Validators.required],
      characterClasses: ['', Validators.required]
    });
  }

  private getSourceOptions() {
    this.sourceService.getAllSources().subscribe(res => {
      this.allSources = res;
    }, (error: ErrorResponse) => this.handleError(error));
  }

  public getCharacterBuilderFormSelectionValues() {
    this.characterClassService.getCharacterClasses().subscribe(res => this.availableCharacterClasses = res, (error: ErrorResponse) => this.handleError(error));
    this.deityService.getAllDeities().subscribe(res => this.availableDeities = res, (error: ErrorResponse) => this.handleError(error));
    this.featService.getAllFeats().subscribe(res => this.availableFeats = res, (error: ErrorResponse) => this.handleError(error));
    this.raceService.getAllRaces().subscribe(res => this.availableRaces = res, (error: ErrorResponse) => this.handleError(error));
    this.skillService.getAllSkills().subscribe(res => this.availableSkills = res, (error: ErrorResponse) => this.handleError(error));
  }

  public specialSourceHandling(specialChip: MatChip) {
    const chipValue: string = specialChip.value.trim();
    switch (chipValue) {
      case Constants.specialSourceCases.selectAll: {
        const values: string[] = [];
        this.allSources.forEach((source: Source) => values.push(source.sourceEnum));
        this.sourceChipsSelected.setValue(values);
        this.selectAll = true;
      } break;
      case Constants.specialSourceCases.selectNone: {
        this.sourceChipsSelected.reset();
        this.selectAll = false;
      } break;
      case Constants.specialSourceCases.coreOnly: {
        this.sourceChipsSelected.setValue(['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35']);
        this.selectAll = false;
      } break;
      case Constants.specialSourceCases.srdOnly: {
        this.sourceChipsSelected.setValue(['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35', 'EXPANDED_PSIONICS_HANDBOOK']);
        this.selectAll = false;
      } break;
      default: {
        this.handleError(this.defaultErrorResponse)
      }
    }
  }

  private defaultErrorResponse = {
    timestamp: '',
    status: 500,
    message: 'Something went wrong. Please try again later.'
  }

  private handleError(error: ErrorResponse) {
    let errorMessage;
    let errorTitle;
    switch (error.status) {
      case 500: {
        errorMessage = 'Something went wrong. Please try again.';
        errorTitle = 'There be dragons?';
      } break;
      case 404: {
        errorTitle = 'Resource not found.';
        errorMessage = 'Error while trying to load resources for character builder. Please try again later.';
      } break;
    }
    this.toastr.error(errorMessage, errorTitle)
  }

  public addSelectedClassToClassLevels() {
    if (this.selectedClass) {
      console.log(this.selectedClass);
      const characterBuildLevel = this.characterClassLevelMap.size + 1;
      this.characterClassLevelMap.set(characterBuildLevel, this.selectedClass);
    }
  }

  public getCharacterClassLevelsAsArray(): [number, CharacterClass][] {
    return Array.from(this.characterClassLevelMap);
  }

  private countInstancesOfEachCharacterClass(): Map<CharacterClass, number> {
    const characterClassCount: Map<CharacterClass, number> = new Map();
    this.characterClassLevelMap.forEach((characterClass) => {
      if (characterClassCount.has(characterClass)) {
        characterClassCount.set(characterClass, characterClassCount.get(characterClass) + 1);
      } else {
        characterClassCount.set(characterClass, 1);
      }
    });
    return characterClassCount;
  }

  private calculateBab(): number {
    const classCount = this.countInstancesOfEachCharacterClass();
    let bab = 0;
    classCount.forEach((count: number, charClass: CharacterClass) => {
      bab += Math.floor(count * charClass.baseAttackBonusProgression);
    });
    return bab;
  }

}


