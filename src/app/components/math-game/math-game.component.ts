import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-math-game',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './math-game.component.html',
  styleUrls: ['./math-game.component.scss']
})
export class MathGameComponent implements OnInit {
  firstNumber: number = 0;
  secondNumber: number = 0;
  userAnswer: number | null = null;
  isCorrect: boolean | null = null;
  totalQuestions = 0;
  correctAnswers = 0;
  startTime: number = 0;
  endTime: number = 0;
  averageTime: number = 0;
  subscription?: Subscription;
  form: FormControl;

  constructor() {
    this.form = new FormControl('', [
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(2),
    ]);
  }

  ngOnInit(): void {
    this.generateNewEquation();
  }

  generateNewEquation(): void {
    this.firstNumber = Math.floor(Math.random() * 10);
    this.secondNumber = Math.floor(Math.random() * 10);
    this.userAnswer = null;
    this.isCorrect = null;
    this.form.reset();
    this.form.markAsPristine();
    this.startTime = performance.now();
  }

  checkAnswer(): void {
    const correctAnswer = this.firstNumber + this.secondNumber;
    this.userAnswer = parseInt(this.form.value, 10);
    this.isCorrect = this.userAnswer === correctAnswer;
    const endTime = performance.now();
    const questionTime = (endTime - this.startTime) / 1000;
    this.averageTime = this.totalQuestions > 0 ? (this.totalQuestions * this.averageTime + questionTime) / this.totalQuestions : questionTime;

    if (this.isCorrect) {
      this.correctAnswers++;
      // Delay the new equation generation to give the user a chance to see the correct answer
      setTimeout(() => {
        this.generateNewEquation();
      }, 500);
    }
    this.totalQuestions++;
  }

  resetGame(): void {
    this.totalQuestions = 0;
    this.correctAnswers = 0;
    this.averageTime = 0;
    this.generateNewEquation();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}