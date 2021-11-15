import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ToastContainerDirective, {static: true}) private toastContainer: ToastContainerDirective;

  skills: Skill[];
  sourcesAllowed: Source[];
  skillRankTableData: MatTableDataSource<SkillRankPair>;
  private searchTablePropertyMapping = Constants.skillSearchTableColumnsMapping();
  searchTableColumnsToDisplay: string[] = Constants.skillSearchTableColumnsToDisplay;

  constructor(private skillService: SkillService, private toastr: ToastrService, private dialog: MatDialog,
              public cbFormService: CharacterBuilderFormService) { }

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
    this.setSources();
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
      this.cbFormService.characterBuilderForm.addControl(skill.name, new FormControl([0]))
    })
  }

  openDialog(skill) {
    this.dialog.open(SkillDetailComponent, {
      data: skill
    })
  }

  private getRankTableData() {
    let skillRanks: SkillRankPair[] = [];

    this.skills.forEach((skill: Skill) => skillRanks.push(new SkillRankPair(skill)))

    return new MatTableDataSource<SkillRankPair>(skillRanks);
  }

  calculateSkillBaseAbilityModifier(skillRankPair: SkillRankPair): number {
    const keyAbility: string = skillRankPair.skill.keyAbility;

    return 0;
  }
}
