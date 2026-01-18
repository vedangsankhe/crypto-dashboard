import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('API Request:', req.url);

  return next(req).pipe(
    tap(() => {
      console.log('API Response received');
    }),

    catchError((error) => {
      console.error('Global API error:', error.message);
      return throwError(() => error);
    })
  );
};
