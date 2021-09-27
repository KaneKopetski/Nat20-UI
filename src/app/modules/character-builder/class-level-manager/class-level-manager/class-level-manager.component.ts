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
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ClassLevelTableRow} from "../../model/class-level-table-row/class-level-table-row.model";
import {SavingThrowTotals} from "../../model/saving-throw-totals/saving-throw-totals.model";
import {ClassFeature} from "../../model/character-class/class-feature-model";

@Component({
  selector: 'app-class-level-manager',
  templateUrl: './class-level-manager.component.html',
  styleUrls: ['./class-level-manager.component.css']
})
export class ClassLevelManagerComponent implements OnInit, AfterViewInit {

  @Input() sourcesAllowed: any[];
  searchTableDataSource: MatTableDataSource<CharacterClass>;
  searchTableColumnsToDisplay: string[] = Constants.classLevelManagerSearchTableColumnsToDisplay;
  goodSavingThrowFormula: string = Constants.GOOD_SAVING_THROW_FORMULA;
  badSavingThrowFormula: string = Constants.BAD_SAVING_THROW_FORMULA;
  goodSavingThrowQuality: string = Constants.SAVING_THROW_QUALITY_GOOD;
  babDisplayValues: Map<number, string> = Constants.babDisplayValues;

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tooltipDelay: FormControl = Constants.tooltipDelay;
  characterBuildData: FormGroup;

  classLevelTableColumnsToDisplay: string[] = Constants.classLevelManagerClassLevelTableColumnsToDisplay;
  classLevelTableDataSource: MatTableDataSource<ClassLevelTableRow>;
  classLevelTableData: ClassLevelTableRow[] = [];
  classLevels: LevelClassPair[] = [];
  savingThrows: string[] = Constants.savingThrows;
  savingThrowTotalsByLevel: Map<number, SavingThrowTotals> = new Map();
  babTotal: number = 0;
  classCount: Map<CharacterClass, number> = new Map();
  classFeatures: Map<number, string[]> = new Map();
  selectedIndex: number;

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

  addClass(row: CharacterClass) {
    let level: number = this.classLevels.length + 1;
    let classLevel: LevelClassPair = {
      level: level,
      characterClass: row
    }
    this.classLevels.push(classLevel);
    this.countClassLevels();
    this.savingThrowTotalsByLevel.set(classLevel.level, this.calculateSavingThrows());
    this.babTotal += row.baseAttackBonusProgression;
    this.updateTableData(classLevel);
  }

  removeClass(row: ClassLevelTableRow) {
    if (this.classLevels.length === 1)
      this.selectedIndex = 0;

    this.classLevels.splice(row.level - 1, 1);
    this.babTotal = 0;
    this.savingThrowTotalsByLevel.clear();
    this.classCount.clear();
    this.classLevelTableData = [];
    this.classLevelTableDataSource = undefined;
    this.recalculateClassLevels();
  }

  private recalculateClassLevels() {
    let classLevels: LevelClassPair[] = this.classLevels;
    this.classLevels = [];

    classLevels.forEach((classLevel: LevelClassPair) => {
      this.addClass(classLevel.characterClass);
    })
  }

  openDialog(row: CharacterClass) {
    this.dialog.open(CharacterClassDetailComponent, {
      data: row,
      width: '90%'
    });
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.classLevels, event.previousIndex, event.currentIndex);
    this.babTotal = 0;
    this.savingThrowTotalsByLevel.clear();
    this.classCount.clear();
    this.classLevelTableData = [];
    this.classLevelTableDataSource = undefined;
    this.recalculateClassLevels();
  }

  private countClassLevels() {
    let classCount: Map<CharacterClass, number> = new Map();

    this.classLevels.forEach((levelClassPair: LevelClassPair) => {
      if (classCount.has(levelClassPair.characterClass))
        classCount.set(levelClassPair.characterClass, classCount.get(levelClassPair.characterClass) + 1);
      else
        classCount.set(levelClassPair.characterClass, 1);
    });

    this.classCount = classCount;
  }

  private calculateSavingThrows() {
    let savingThrowValues: SavingThrowTotals = new SavingThrowTotals();

    this.savingThrows.forEach((savingThrow: string) => {
      this.classCount.forEach((count: number, characterClass: CharacterClass) => {
        switch (savingThrow) {
          case Constants.FORTITUDE_SAVE_PROGRESS_STRING: {
            savingThrowValues.fortSaveProgression = savingThrowValues.fortSaveProgression + ClassLevelManagerComponent.calculateSavingThrow(characterClass.fortSaveProgression, count);
          }
            break;
          case Constants.REFLEX_SAVE_PROGRESS_STRING: {
            savingThrowValues.reflexSaveProgression = savingThrowValues.reflexSaveProgression + ClassLevelManagerComponent.calculateSavingThrow(characterClass.reflexSaveProgression, count);
          }
            break;
          case Constants.WILL_SAVE_PROGRESS_STRING: {
            savingThrowValues.willSaveProgression = savingThrowValues.willSaveProgression + ClassLevelManagerComponent.calculateSavingThrow(characterClass.willSaveProgression, count);
          }
            break;
        }
      })
    })
    return savingThrowValues;
  }

  private static calculateSavingThrow(saveQuality: string, count: number): number {
    if (saveQuality === Constants.SAVING_THROW_QUALITY_GOOD)
      return Math.floor(Math.floor(2 + Math.floor(count / 2)));
    else
      return Math.floor(Math.floor(count / 3));
  }

  private updateTableData(levelClassPair: LevelClassPair) {
    this.classLevelTableData.push(this.mapLevelClassPairToClassLevelRow(levelClassPair));
    this.classLevelTableDataSource = new MatTableDataSource<ClassLevelTableRow>(this.classLevelTableData);
  }

  private mapLevelClassPairToClassLevelRow(levelClassPair: LevelClassPair): ClassLevelTableRow {
    let row: ClassLevelTableRow = new ClassLevelTableRow();

    row.level = levelClassPair.level;
    row.characterClassName = levelClassPair.characterClass.name;
    row.classFeatures = this.getClassFeaturesNames(levelClassPair).join(Constants.COMMA_SPACE);
    row.babTotal = this.getBabDescription();
    row.fortSaveTotal = this.savingThrowTotalsByLevel.get(levelClassPair.level).fortSaveProgression + this.getBaseAbilityModifier(Constants.CONSTITUTION_SCORE_LABEL);
    row.reflexSaveTotal = this.savingThrowTotalsByLevel.get(levelClassPair.level).reflexSaveProgression + this.getBaseAbilityModifier(Constants.DEXTERITY_SCORE_LABEL);
    row.willSaveTotal = this.savingThrowTotalsByLevel.get(levelClassPair.level).willSaveProgression + this.getBaseAbilityModifier(Constants.WISDOM_SCORE_LABEL);

    return row;
  }

  private getClassFeaturesNames(levelClassPair: LevelClassPair): string[] {
    let classFeatures: string[] = [];
    levelClassPair.characterClass.classFeatures.forEach((classFeature: ClassFeature) => {
      if (classFeature.levelAttained === this.classCount.get(levelClassPair.characterClass))
        classFeatures.push(classFeature.name);
    })
    return classFeatures;
  }

  private getBabDescription(): string {
    let babString: string;
    let roundedBabTotal: number = Math.floor(this.babTotal);
    let firstAttackBab: number = roundedBabTotal;
    let secondAttackBab: number = roundedBabTotal - 5;
    let thirdAttackBab: number = roundedBabTotal - 10;
    let fourthAttackBab: number = roundedBabTotal - 15;

    if (roundedBabTotal >= 16) {
      babString =
        (firstAttackBab >= 0 ? '+' : '') + firstAttackBab
        + '/' + (secondAttackBab >= 0 ? '+' : '') + secondAttackBab
        + '/' + (thirdAttackBab >= 0 ? '+' : '') + thirdAttackBab
        + '/' + (fourthAttackBab >= 0 ? '+' : '') + fourthAttackBab;
    } else if (roundedBabTotal >= 11) {
      babString =
        (firstAttackBab >= 0 ? '+' : '') + firstAttackBab
        + '/' + (secondAttackBab >= 0 ? '+' : '') + secondAttackBab
        + '/' + (thirdAttackBab >= 0 ? '+' : '') + thirdAttackBab;
    } else if (roundedBabTotal >= 6) {
      babString =
        (firstAttackBab >= 0 ? '+' : '') + firstAttackBab
        + '/' + (secondAttackBab >= 0 ? '+' : '') + secondAttackBab;
    } else
      babString =
        (firstAttackBab >= 0 ? '+' : '') + firstAttackBab;

    return babString;
  }

  findCharacterClassInSearchResultsByName(characterClassName: any): CharacterClass {
    let classToReturn;
    this.searchTableDataSource.data.forEach((characterClass: CharacterClass) => {
      if (characterClass.name === characterClassName)
        classToReturn = characterClass;
    })
    return classToReturn;
  }

  getBaseAbilityModifier(abilityName: string): number {
    let abilityScore: number = this.characterBuildData.get(abilityName).value;
    return Math.floor((abilityScore - 10) / 2);
  }

}
