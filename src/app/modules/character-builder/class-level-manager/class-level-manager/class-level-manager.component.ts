import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CharacterClassService} from '../../services/character-class-service/character-class.service';
import {Source} from '../../model/source/source-model';
import {CharacterClass} from '../../model/character-class/character-class';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {LevelClassPair} from '../../model/level-class-pair/level-class-pair-model';
import {Constants} from '../../../../shared/constants/constants';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {CharacterClassDetailComponent} from '../character-class-detail/character-class-detail.component';
import {FormControl, FormGroup} from '@angular/forms';

export class ClassLevelTableRow {
  level: number;
  characterClassName: string;
  babTotal: string;
  fortSaveTotal: number;
  reflexSaveTotal: number;
  willSaveTotal: number;
  classFeatures: string;
}

export class SavingThrowTotals {
  fortSaveProgression: number;
  reflexSaveProgression: number;
  willSaveProgression: number;
}

@Component({
  selector: 'app-class-level-manager',
  templateUrl: './class-level-manager.component.html',
  styleUrls: ['./class-level-manager.component.css']
})
export class ClassLevelManagerComponent implements OnInit, AfterViewInit {

  @Input() sourcesAllowed: any[];
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  classLevels: LevelClassPair[] = [];
  characterBuildData: FormGroup;
  searchTableColumnsToDisplay: string[] = Constants.classLevelManagerSearchTableColumnsToDisplay;
  classLevelTableColumnsToDisplay: string[] = Constants.classLevelManagerClassLevelTableColumnsToDisplay;
  searchTableDataSource: MatTableDataSource<CharacterClass>;
  classLevelTableDataSource;
  babDisplayValues: Map<number, string> = Constants.babDisplayValues;
  tableData: ClassLevelTableRow[] = [];
  tooltipDelay: FormControl = Constants.tooltipDelay;
  savingThrowTotalsByLevel: Map<number, SavingThrowTotals> = new Map();
  private classCount: Map<CharacterClass, number>;
  saveBaseAbilityMap: Map<string, string> = Constants.savingThrowAbilityMap();
  savingThrows: string[] = Constants.savingThrows;
  goodSavingThrowFormula: string = Constants.GOOD_SAVING_THROW_FORMULA;
  badSavingThrowFormula: string = Constants.BAD_SAVING_THROW_FORMULA;
  goodSavingThrowQuality: string = Constants.SAVING_THROW_QUALITY_GOOD;

  constructor(private characterClassService: CharacterClassService, private toastr: ToastrService,
              private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit(): void {
    this.characterBuildData = this.data;
    this.toastr.overlayContainer = this.toastContainer;
  }

  ngAfterViewInit(): void {
    this.fetchFirstPageOfClassesForSourcesProvided();
  }

  private fetchFirstPageOfClassesForSourcesProvided() {
    this.characterClassService.getClassesFromSources(this.prepareSources()).subscribe(res => {
        this.searchTableDataSource = new MatTableDataSource<CharacterClass>(res);
        this.searchTableDataSource.paginator = this.paginator;
      },
      error => this.toastr.error(error.message, Constants.GENERIC_ERROR_MESSAGE));
  }

  //TODO change all sources to sources selected
  private prepareSources() {
    if (!this.sourcesAllowed) {
      const sources: string[] = [];
      Constants.allSources.forEach((source: Source) => sources.push(source.sourceEnum));
      return sources;
    } else {
      return this.sourcesAllowed;
    }
  }

  addClass(row) {
    let level: number = this.classLevels.length + 1;
    let classLevel = {
      level: level,
      characterClass: row
    }
    this.classLevels.push(classLevel);
    this.countClassLevelsForEachClass();
    this.calculateSavingThrowBonuses(level);
    this.updateTableDataSource(classLevel);
  }

  removeClass(row) {

  }

  private updateTableDataSource(classLevel: LevelClassPair) {
    let row = new ClassLevelTableRow()

    row.level = classLevel.level;
    row.characterClassName = classLevel.characterClass.name;
    row.babTotal = this.constructBabDescription();
    row.fortSaveTotal = this.getSavingThrowTotal(Constants.FORTITUDE_SAVE_PROGRESS_STRING);
    row.reflexSaveTotal = this.getSavingThrowTotal(Constants.REFLEX_SAVE_PROGRESS_STRING);
    row.willSaveTotal = this.getSavingThrowTotal(Constants.WILL_SAVE_PROGRESS_STRING);
    row.classFeatures = this.getClassFeaturesForClassLevelsSelected();

    this.tableData.push(row)

    this.classLevelTableDataSource = new MatTableDataSource<ClassLevelTableRow>(this.tableData);
  }

  getSavingThrowTotal(savingThrow: string): number {
    let savingThrowGoverningAbility = this.saveBaseAbilityMap.get(savingThrow);
    let abilityModifier: number = this.getBaseAbilityModifier(savingThrowGoverningAbility);
    let currentLevel: number = this.classLevels.length;

    return this.savingThrowTotalsByLevel.get(currentLevel)[savingThrow] + abilityModifier;
  }

  openDialog(row: CharacterClass) {
    this.dialog.open(CharacterClassDetailComponent, {
      data: row,
      width: '90%'
    });
  }

  private getClassFeaturesForClassLevelsSelected(): string {
    return "";
  }

  private constructBabDescription(): string {
    let babTotal: number = 0;

    this.classLevels.forEach((classLevel: LevelClassPair) => {
      babTotal = babTotal + classLevel.characterClass.baseAttackBonusProgression;
    })

    let babString: string = Math.floor(babTotal).toString();

    if (babTotal >= 16) {
      babString = babTotal + '/' + (babTotal - 5) + '/' + (babTotal - 10) + '/' + (babTotal - 15);
    } else if (babTotal >= 11) {
      babString = babTotal + '/' + (babTotal - 5) + '/' + (babTotal - 10);
    } else if (babTotal >= 6) {
      babString = babTotal + '/' + (babTotal - 5);
    }
    return babString;
  }

  countClassLevelsForEachClass() {
    let classCount: Map<CharacterClass, number> = new Map();

    this.classLevels.forEach((levelClassPair: LevelClassPair) => {
      if (classCount.has(levelClassPair.characterClass))
        classCount.set(levelClassPair.characterClass, classCount.get(levelClassPair.characterClass) + 1);
      else
        classCount.set(levelClassPair.characterClass, 1);
    });

    this.classCount = classCount;
  }

  calculateSavingThrowBonuses(level: number) {
    let totalFortSaveBonus: number = 0;
    let totalReflexSaveBonus: number = 0;
    let totalWillSaveBonus: number = 0;

    this.savingThrows.forEach((savingThrow: string) => {
      this.classCount.forEach((count: number, characterClass: CharacterClass) => {
        switch (savingThrow) {
          case Constants.FORTITUDE_SAVE_PROGRESS_STRING: {
            totalFortSaveBonus = totalFortSaveBonus + ClassLevelManagerComponent.calculateSavingThrow(characterClass.fortSaveProgression, count);
          }
          break;
          case Constants.REFLEX_SAVE_PROGRESS_STRING: {
            totalReflexSaveBonus = totalReflexSaveBonus + ClassLevelManagerComponent.calculateSavingThrow(characterClass.reflexSaveProgression, count);
          }
          break;
          case Constants.WILL_SAVE_PROGRESS_STRING: {
            totalWillSaveBonus = totalWillSaveBonus + ClassLevelManagerComponent.calculateSavingThrow(characterClass.willSaveProgression, count);
          }
          break;
        }
      })
    })

    let savingThrowValues: SavingThrowTotals = new SavingThrowTotals();
    savingThrowValues.fortSaveProgression = totalFortSaveBonus;
    savingThrowValues.reflexSaveProgression = totalReflexSaveBonus;
    savingThrowValues.willSaveProgression = totalWillSaveBonus;

    this.savingThrowTotalsByLevel.set(level, savingThrowValues);
  }

  private static calculateSavingThrow(saveQuality: string, count: number): number {
    if (saveQuality === Constants.SAVING_THROW_QUALITY_GOOD)
      return Math.floor(Math.floor(2 + Math.floor(count/2)));
    else
      return Math.floor(Math.floor(count / 3));
  }

  getBaseAbilityModifier(baseAbilityFormControl: string): number {
    return Math.floor((this.characterBuildData.get(baseAbilityFormControl).value - 10) / 2);
  }
}
