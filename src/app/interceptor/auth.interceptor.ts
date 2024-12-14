import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getAuthToken();

  if (!authToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', authToken),
  });
  return next(newReq);
};
