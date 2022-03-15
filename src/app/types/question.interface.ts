import { OptionInterface } from 'src/app/types/option.interface';

export interface QuestionInterface {
  questionText: string;
  options: OptionInterface[];
  explanation: string;
}
