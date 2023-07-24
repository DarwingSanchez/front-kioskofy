import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FONT_AWESOME_ICONS } from 'src/app/core/constants/icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question!: any;
  @Output() emit_reply_comment = new EventEmitter();
  public readonly FONT_AWESOME_ICONS = FONT_AWESOME_ICONS;

  public addReplyComment(): void {
    this.emit_reply_comment.emit(this.question._id);
  }
}
