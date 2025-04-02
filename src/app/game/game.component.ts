import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  secretNumber: string = '';
  userGuess: string = '';
  message: string = '';
  gameOver: boolean = false;
  attempts: string[] = [];
  results: string[] = [];

  ngOnInit() {
    this.generateSecretNumber();
  }

  generateSecretNumber() {
    let numbers = Array.from({length: 9}, (_, i) => (i + 1).toString()); // 1-9 arası rakamlar
    let result = '';
    
    // İlk rakamı 1-9 arasından seç
    const firstDigitIndex = Math.floor(Math.random() * numbers.length);
    result += numbers[firstDigitIndex];
    numbers.splice(firstDigitIndex, 1);
    
    // 0'ı ekle ve kalan rakamları karıştır
    numbers.push('0');
    
    // Kalan 3 rakamı seç
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result += numbers[randomIndex];
      numbers.splice(randomIndex, 1);
    }
    
    this.secretNumber = result;
    console.log('Gizli Sayı:', this.secretNumber);
  }

  checkGuess() {
    if (this.userGuess.length !== 4 || !/^\d+$/.test(this.userGuess)) {
      this.message = 'Lütfen 4 basamaklı bir sayı girin!';
      return;
    }

    if (this.userGuess[0] === '0') {
      this.message = 'Sayı 0 ile başlayamaz!';
      return;
    }

    // Tekrar eden rakam kontrolü
    const digits = new Set(this.userGuess.split(''));
    if (digits.size !== 4) {
      this.message = 'Her rakamı sadece bir kez kullanabilirsiniz!';
      return;
    }

    let plus = 0;
    let minus = 0;

    // Doğru yer ve sayı kontrolü
    for (let i = 0; i < 4; i++) {
      if (this.userGuess[i] === this.secretNumber[i]) {
        plus++;
      } else if (this.secretNumber.includes(this.userGuess[i])) {
        minus++;
      }
    }

    const result = `+${plus} -${minus}`;
    this.attempts.push(this.userGuess);
    this.results.push(result);

    if (plus === 4) {
      this.message = 'Tebrikler! Sayıyı doğru tahmin ettiniz!';
      this.gameOver = true;
    }

    this.userGuess = '';
  }

  showAnswer() {
    this.message = `Gizli sayı: ${this.secretNumber}`;
    this.gameOver = true;
  }

  resetGame() {
    this.generateSecretNumber();
    this.userGuess = '';
    this.message = '';
    this.gameOver = false;
    this.attempts = [];
    this.results = [];
  }
}
