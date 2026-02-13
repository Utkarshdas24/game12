import { Routes } from '@angular/router';
import { AuthComponent } from './features/game-dispatcher/auth.component';
import { LobbyComponent } from './features/game-dispatcher/lobby.component';
import { GameWrapperComponent } from './shared/components/game-wrapper/game-wrapper.component';
import { ErrorFallbackComponent } from './shared/components/error-fallback/error-fallback.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'play/:gameId',
    component: GameWrapperComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    component: ErrorFallbackComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
