import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { QuestionsService } from 'src/app/core/services/questions/questions.service';
import { AskQuestionComponent } from 'src/app/modal/ask-question/ask-question.component';

@Component({
  selector: 'app-portfolio-detail-faq',
  templateUrl: './portfolio-detail-faq.component.html',
  styleUrls: ['./portfolio-detail-faq.component.css']
})
export class PortfolioDetailFAQComponent implements OnInit {
  @Input() user_id!: string;
  @Input() item_id!: string;
  // Questions
  public questions: any;
  // Modal configuration
  public ng_modal_options: NgbModalOptions = { backdrop: 'static', keyboard: false, centered: true, size: 'md', animation: true };
  // Utils
  public empty_state_msg: string = 'No questions and answers over here, but you can start this forum';

  constructor(private modalService: NgbModal, private _questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  private getQuestions(): void {
    lastValueFrom(this._questionsService.getQuestionByItem(this.item_id))
      .then((resp: any) => {
        if(resp.success && resp.data) this.questions = resp.data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // Open modal to login an user
  public addComment(reply_question_id: string | null = null): void {
    const modalRef = this.modalService.open(AskQuestionComponent, this.ng_modal_options);
    modalRef.componentInstance.item_id = this.item_id;
    modalRef.componentInstance.user_id = this.user_id;
    modalRef.componentInstance.reply_id = reply_question_id;
    modalRef.componentInstance.btn_msg = 'Volver';
    modalRef.componentInstance.close_callback = () => {};  }
}
