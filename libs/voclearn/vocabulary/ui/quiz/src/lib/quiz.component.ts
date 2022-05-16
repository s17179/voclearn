import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionContract } from '@voclearn/contracts';
import { AssociationDialogComponent } from '@voclearn/voclearn/vocabulary/ui/association-dialog';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '@voclearn/voclearn/vocabulary/api';

@Component({
  selector: 'voclearn-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  form: FormGroup;
  state = {
    form: true,
    correctAnswerResult: false,
    wrongAnswerResult: false,
  };
  question!: QuestionContract;
  correctAnswer?: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly quizService: QuizService
  ) {
    this.form = this.formBuilder.group({
      answer: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.quizService.getQuestion().subscribe((question) => {
      this.question = question;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.quizService
        .answerQuestion(this.question.id, { answer: this.form.value.answer })
        .subscribe((answeredQuestion) => {
          if (answeredQuestion.isCorrect) {
            this.changeStateForCorrectAnswer();
          } else {
            this.changeStateForWrongAnswer(answeredQuestion.correctAnswer);
          }
        });
    }
  }

  onShowAssociationButtonClicked(): void {
    this.dialog.open(AssociationDialogComponent, { data: this.question.hint });
  }

  onNextQuestionButtonClicked(): void {
    this.quizService.getQuestion().subscribe((question) => {
      this.changeStateForNextQuestion(question);
    });
  }

  private changeStateForCorrectAnswer(): void {
    this.state.form = false;
    this.state.correctAnswerResult = true;
  }

  private changeStateForWrongAnswer(correctAnswer: string): void {
    this.correctAnswer = correctAnswer;
    this.state.form = false;
    this.state.wrongAnswerResult = true;
  }

  private changeStateForNextQuestion(question: QuestionContract): void {
    this.state.correctAnswerResult = false;
    this.state.wrongAnswerResult = false;
    this.correctAnswer = undefined;
    this.question = question;
    this.form.reset();
    this.state.form = true;
  }
}
