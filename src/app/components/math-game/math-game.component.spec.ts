import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathGameComponent } from './math-game.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MathGameComponent', () => {
  let component: MathGameComponent;
  let fixture: ComponentFixture<MathGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathGameComponent, FormsModule, MatInputModule, MatButtonModule, MatIconModule, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MathGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a new equation and display correct answer', async () => {
    const correctAnswer = component.firstNumber + component.secondNumber;

    component.form.setValue(correctAnswer);
    component.checkAnswer();
    expect(component.isCorrect).toBe(true);
  });

  it('should display incorrect answer feedback for wrong answer', async () => {
    const incorrectAnswer = component.firstNumber + component.secondNumber + 1;

    component.form.setValue(incorrectAnswer);
    component.checkAnswer();
    expect(component.isCorrect).toBe(false);

    fixture.detectChanges();
    const wrongAnswerElement = fixture.debugElement.query(By.css('.wrong-answer'));
    expect(wrongAnswerElement).toBeTruthy();
  });
});
