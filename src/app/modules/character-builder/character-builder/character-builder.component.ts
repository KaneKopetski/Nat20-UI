import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CharacterClass} from '../model/character-class/character-class';
import {CharacterClassService} from '../services/character-class-service/character-class.service';
import {RaceService} from '../services/race-service/race.service';
import {Race} from '../model/race/race';
import {CharacterBuildRequest} from '../model/character-build/character-build-request-model';
import {FeatService} from '../services/feat-service/feat.service';
import {Feat} from '../model/feat/feat-model';
import {DeityService} from '../services/deity-service/deity.service';
import {Deity} from '../model/deity/deity-model';
import {Skill} from '../model/skill/skill';
import {SkillService} from '../services/skill-service/skill.service';
import {Source} from '../model/source/source-model';
import {SourceService} from '../services/source-service/source.service';
import {MatChip} from '@angular/material/chips';
import {Constants} from '../../../shared/constants/constants';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {ErrorResponse} from '../model/error-response/error-response-model';
import {MatSelectChange} from '@angular/material/select';
import {LevelClassPair} from '../model/level-class-pair/level-class-pair-model';
import {MatDialog} from '@angular/material/dialog';
import {ClassLevelManagerComponent} from '../class-level-manager/class-level-manager/class-level-manager.component';


export interface BaseAbilityScore {
  ability: string;
  position: number;
  score: number;
}

const ELEMENT_DATA: BaseAbilityScore[] = [
  {position: 1, ability: 'Str', score: 0},
  {position: 2, ability: 'Dex', score: 0},
  {position: 3, ability: 'Con', score: 0},
  {position: 4, ability: 'Wis', score: 0},
  {position: 5, ability: 'Int', score: 0},
  {position: 6, ability: 'Cha', score: 0},
];

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  baseAbilities: Array<string> = ['strength', 'dexterity', 'constitution', 'wisdom', 'intelligence', 'charisma'];

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  characterBuildRequest: CharacterBuildRequest;

  classLevels: Array<LevelClassPair> = [];
  private characterClassLevelMap: Map<number, CharacterClass> = new Map<number, CharacterClass>();
  characterClassLevelsDisplayHeaders: string[] = ['level', 'class', 'remove'];

  selectedClass: CharacterClass;

  availableCharacterClasses: Array<CharacterClass>;
  availableRaces: Array<Race>;
  availableFeats: Array<Feat>;
  availableDeities: Array<Deity>;
  availableSkills: Array<Skill>;
  allSources: Array<Source>;

  selectable = true;
  removable = true;
  isLinear = false;
  selectAll = false;

  sourceSelectionForm: FormGroup;
  characterBuilderForm: FormGroup;

  abilityScoreInputColumns = ['ability', 'score'];
  abilityScoreInputData = ELEMENT_DATA;

  abilityScoreDisplayColumns: string[];
  abilityScoreDisplayData: any[];

  baseAbilityStyle = 'manual';
  standardArray: Array<number> = [15, 14, 13, 12, 10, 8];

  private defaultErrorResponse = {
    timestamp: '',
    status: 500,
    message: 'Something went wrong. Please try again later.'
  };

  get sourceChipsSelected() {
    return this.sourceSelectionForm.get('sourcesSelected');
  }

  constructor(private fb: FormBuilder, private characterClassService: CharacterClassService, private raceService: RaceService,
              private featService: FeatService, private deityService: DeityService, private skillService: SkillService,
              private sourceService: SourceService, private toastr: ToastrService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setupForms();
    this.getSourceOptions();
    this.toastr.overlayContainer = this.toastContainer;
    this.abilityScoreDisplayColumns = ['0'].concat(this.abilityScoreInputData.map(x => x.position.toString()));
    this.abilityScoreDisplayData = this.abilityScoreInputColumns.map(x => this.formatInputRow(x));
    this.watchStandardArrayFormFields();
  }

  private setupForms() {
    this.sourceSelectionForm = this.fb.group({
      firstCtrl: ['', Validators.required],
      sourcesSelected: []
    });
    this.characterBuilderForm = this.fb.group({
      buildName: ['', Validators.required],
      characterClasses: ['', Validators.required],
      strengthScore: ['8', Validators.required],
      dexterityScore: ['8', Validators.required],
      constitutionScore: ['8', Validators.required],
      wisdomScore: ['8', Validators.required],
      intelligenceScore: ['8', Validators.required],
      charismaScore: ['8', Validators.required],
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
      }
                                                   break;
      case Constants.specialSourceCases.selectNone: {
        this.sourceChipsSelected.reset();
        this.selectAll = false;
      }
                                                    break;
      case Constants.specialSourceCases.coreOnly: {
        this.sourceChipsSelected.setValue(['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35']);
        this.selectAll = false;
      }
                                                  break;
      case Constants.specialSourceCases.srdOnly: {
        this.sourceChipsSelected.setValue(['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35', 'EXPANDED_PSIONICS_HANDBOOK']);
        this.selectAll = false;
      }
                                                 break;
      default: {
        this.handleError(this.defaultErrorResponse);
      }
    }
  }

  private handleError(error: ErrorResponse) {
    let errorMessage;
    let errorTitle;
    switch (error.status) {
      case 500: {
        errorMessage = 'Something went wrong. Please try again.';
        errorTitle = 'There be dragons?';
      }         break;
      case 404: {
        errorTitle = 'Resource not found.';
        errorMessage = 'Error while trying to load resources for character builder. Please try again later.';
      }         break;
    }
    this.toastr.error(errorMessage, errorTitle);
  }

  public addSelectedClassToClassLevels() {
    if (this.selectedClass) {
      const characterBuildLevel = this.characterClassLevelMap.size + 1;
      this.characterClassLevelMap.set(characterBuildLevel, this.selectedClass);
      this.classLevels.push({level: characterBuildLevel, characterClass: this.selectedClass});
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

  formatInputRow(row) {
    const output = {};

    output[0] = row;
    this.abilityScoreInputData.forEach(item => {
      output[item.position] = item[row];
    });

    return output;
  }

  watchStandardArrayFormFields() {
    console.log('watching');
    this.standardArray.forEach((baseAbilityScore: number) => {
      console.log(baseAbilityScore);
      this.characterBuilderForm.get(baseAbilityScore + 'Score').valueChanges.subscribe((value: number) => {
        console.log(baseAbilityScore);
        console.log(value);
        this.standardArray.splice(this.standardArray.indexOf(value), 1);
      });
    });
  }

  removeClass(row) {
    console.log(row);
  }

  launchCharacterLevelManager() {
    this.dialog.open(ClassLevelManagerComponent, {
      data: [this.characterBuilderForm, this.sourceSelectionForm.get('sourcesSelected').value],
      width: '100%',
      height: '80%'
    });
  }
}


