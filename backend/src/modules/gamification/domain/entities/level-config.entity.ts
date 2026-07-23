import { LevelMustBePositiveException } from '../exceptions/level-must-be-positive.exception';
import { LevelTitleEmptyException } from '../exceptions/level-title-empty.exception';
import { MinimumExpNegativeException } from '../exceptions/minimum-exp-negative.exception';

export interface LevelConfigProps {
  level: number;
  minExp: number;
  title: string;
}

export class LevelConfigEntity {
  readonly level: number;
  readonly minExp: number;
  readonly title: string;

  constructor(props: LevelConfigProps) {
    if (props.level < 1) {
      throw new LevelMustBePositiveException();
    }

    if (props.minExp < 0) {
      throw new MinimumExpNegativeException();
    }

    if (!props.title.trim()) {
      throw new LevelTitleEmptyException();
    }

    this.level = props.level;
    this.minExp = props.minExp;
    this.title = props.title;
  }
}
