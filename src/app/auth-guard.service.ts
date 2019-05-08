import { CheckAuthService } from './check-auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';



@Injectable()
export class AuthGuard implements CanActivate {

constructor(private checkAuthService: CheckAuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.checkAuthService.checkStorage()) {
      return true;
    }
    this.router.navigate(['/auth'], {
      queryParams: {
        return: state.url
      }
    });
    return false;
  }

}
