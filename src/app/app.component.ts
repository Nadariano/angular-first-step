import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LucideAngularModule, HeaderComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test';
  constructor(
    private primeng: PrimeNG,
  ) {}

  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }
}
