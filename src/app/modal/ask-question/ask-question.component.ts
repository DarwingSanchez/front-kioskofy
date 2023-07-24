import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { FONT_AWESOME_ICONS } from 'src/app/core/constants/icons';
import { QuestionsService } from 'src/app/core/services/questions/questions.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent {
  @Input() item_id!: string;
  @Input() user_id!: string;
  @Input() reply_id!: string | null;
  @Input() btn_msg!: string;
  // Formularios reactivos
  public question_form: UntypedFormGroup;
  public readonly FONT_AWESOME_ICONS = FONT_AWESOME_ICONS;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _questionsService: QuestionsService,
    public activeModal: NgbActiveModal
    ) {
    this.question_form = this.formBuilder.group({
      item: ['', [Validators.required]],
      user: [null, Validators.required],
      status: ['active', Validators.required],
      comment: ['', Validators.required],
      is_reply_comment: [false, Validators.required],
      reply_question: [null],
    });
  }

  public constructFormValues(): void {
    this.question_form.patchValue({ item: this.item_id });
    this.question_form.patchValue({ user: this.user_id });
    this.question_form.patchValue({ is_reply_comment: this.reply_id ? true : false });
    this.question_form.patchValue({ reply_question: this.reply_id });
  }

  public sendQuestion() {
    this.constructFormValues();
    if (this.question_form.invalid) {
      this.question_form.markAllAsTouched();
      return;
    }
    lastValueFrom(this._questionsService.addQuestion(this.question_form.value))
      .then((resp: any) => {
        this.closeModal();
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  public closeModal() {
    this.activeModal.close();
    this.question_form.reset();
  }
}