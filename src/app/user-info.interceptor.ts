import { HttpInterceptorFn } from '@angular/common/http';

export const userInfoInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
