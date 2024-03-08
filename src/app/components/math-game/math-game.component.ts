import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-math-game',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule],
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
  totalTime: number = 0;
  subscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.generateNewEquation();
  }

  generateNewEquation(): void {
    this.firstNumber = Math.floor(Math.random() * 10);
    this.secondNumber = Math.floor(Math.random() * 10);
    this.userAnswer = null;
    this.isCorrect = null;
  }

  checkAnswer(): void {
      const correctAnswer = this.firstNumber + this.secondNumber;
      this.isCorrect = this.userAnswer === correctAnswer;
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
    this.totalTime = 0;
    this.startTime = performance.now();
    this.generateNewEquation();
    this.subscription = interval(1000)
      .pipe(take(Infinity))
      .subscribe(() => {
        this.endTime = performance.now();
        this.totalTime = this.endTime - this.startTime;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}