import {UserProfile} from "../../../user-profile/user-profile";
import {DynamicTable} from "../dynamic-table/dynamic-table-model";
import {FeatPrerequisite} from "./feat-prerequisite-model";
import {FeatModifier} from "./feat-modifier-model";
import {FeatTag} from "./feat-tag-model";

export interface Feat {
  id: number;
  name: string;
  type: string;
  source: string;
  dateCreated: string;
  userCreated: UserProfile;
  featTextInfo: string;
  featModifiers: Array<FeatModifier>;
  prerequisites: FeatPrerequisite;
  featTables: Map<string, DynamicTable>;
  tags: Array<FeatTag>;
}
