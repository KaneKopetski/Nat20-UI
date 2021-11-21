import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SkillService} from "../services/skill-service/skill.service";
import {MatTableDataSource} from "@angular/material/table";
import {Constants} from "../../../shared/constants/constants";
import {Source} from "../model/source/source-model";
import {Skill} from "../model/skill/skill";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {SkillRankPair} from "../model/skill/skill-rank-pair-model";
import {SkillDetailComponent} from "../skill-detail/skill-detail.component";
import {CharacterBuilderFormService} from "../services/characer-builder-form-service/character-builder-form.service";
import {BaseAbilityService} from "../services/base-ability-service/base-ability.service";
import {Race} from "../model/race/race";
import {RaceSkillBonus} from "../model/race/race-skill-bonus-model";

export class SkillInfoRow {
  skillRankPair: SkillRankPair;
  raceBonus: number;
  baseAbilityModifier: number;

  constructor(skillRankPair?: SkillRankPair, raceBonus?: number, baseAbilityModifier?: number) {
    this.skillRankPair = skillRankPair;
    this.raceBonus = raceBonus;
    this.baseAbilityModifier = baseAbilityModifier;
  }
}

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ToastContainerDirective, {static: true}) private toastContainer: ToastContainerDirective;

  @Input()
  step;

  skills: Skill[];
  sourcesAllowed: Source[];
  skillRankTableData: MatTableDataSource<SkillInfoRow>;
  private searchTablePropertyMapping = Constants.skillSearchTableColumnsMapping();
  searchTableColumnsToDisplay: string[] = Constants.skillSearchTableColumnsToDisplay;

  constructor(private skillService: SkillService, private toastr: ToastrService, private dialog: MatDialog,
              public cbFormService: CharacterBuilderFormService, private baseAbilityService: BaseAbilityService) { }

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.step) {
      if (this.step.label === Constants.SKILL_FORM_LABEL) {
        console.log('at the right step...');
        this.setSources();
      }
    }
  }

  setSources() {
    this.cbFormService.characterBuilderForm.get(Constants.SOURCES_SELECTED).valueChanges.subscribe(value => {
      this.sourcesAllowed = value;
      this.fetchFirstPageOfSkillsForSourcesProvided();
    })
  }

  private fetchFirstPageOfSkillsForSourcesProvided() {
    this.skillService.getSkillsForSources(this.sourcesAllowed).subscribe(res => {
        this.skills = res;
        this.skillRankTableData = this.getRankTableData();
        this.skillRankTableData.paginator = this.paginator;
        this.skillRankTableData.sort = this.sort;
        this.setSortingDataAccessorForSearchTable();
        this.addSkillFormControlsToForm();
        console.log(res);
      },
      error => this.toastr.error(error.message, Constants.GENERIC_ERROR_TITLE));
  }

  private setSortingDataAccessorForSearchTable() {
    this.skillRankTableData.sortingDataAccessor = (skill, property) => {
      return skill[this.searchTablePropertyMapping.get(property)];
    }
  }

  addSkillFormControlsToForm() {
    this.skills.forEach((skill: Skill) => {
      this.cbFormService.characterBuilderForm.addControl(skill.name, new FormControl([0]));
    })
  }

  openDialog(skill) {
    this.dialog.open(SkillDetailComponent, {
      data: skill
    })
  }

  private getRankTableData() {
    let skillInfo: SkillInfoRow[] = [];

    this.skills.forEach((skill: Skill) => {
      const skillRankPair = SkillFormComponent.mapSkillToSkillRankPair(skill);
      const skillInfoRow = new SkillInfoRow(skillRankPair);
      skillInfo.push(skillInfoRow)
    });

    return new MatTableDataSource<SkillInfoRow>(skillInfo);
  }

  private static mapSkillToSkillRankPair(skill: Skill): SkillRankPair {
    return new SkillRankPair(skill, 0);
  }

  calculateSkillBaseAbilityModifier(skillInfoRow: SkillInfoRow): number {
    const keyAbility: string = skillInfoRow.skillRankPair.skill.keyAbility;
    const keyAbilityScore: number = this.cbFormService.getAbilityScoreByName(keyAbility);
    return this.baseAbilityService.calculateBaseAbilityModifierForScore(keyAbilityScore);
  }

  calculateRacialSkillBonuses(skillInfoRow: SkillInfoRow): number {
    const raceSelected: Race = this.cbFormService.raceSelected.value;
    let bonus: number = 0;
    if (raceSelected.skillBonuses) {
      raceSelected.skillBonuses.forEach((raceSkillBonus: RaceSkillBonus) => {
        if (raceSkillBonus.skillId === skillInfoRow.skillRankPair.skill.id && !raceSkillBonus.circumstance)
           bonus = raceSkillBonus.skillBonus;
      })
      return bonus;
    }
  }

  getCircumstanceForRacialBonus(skillInfoRow): string {
    const raceSelected: Race = this.cbFormService.raceSelected.value;
    let circumstance: string = '';
    let bonus: number;
    if (raceSelected.skillBonuses) {
      raceSelected.skillBonuses.forEach((raceSkillBonus: RaceSkillBonus) => {
        if (raceSkillBonus.skillId === skillInfoRow.skillRankPair.skill.id && raceSkillBonus.circumstance) {
          circumstance = raceSkillBonus.circumstance;
          bonus = raceSkillBonus.skillBonus;
        }
      });
      if (circumstance != '')
      return '+' + bonus + ', ' + circumstance.toLowerCase();
    }
  }
}
