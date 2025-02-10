import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tokenFormat',
  standalone: true,
})
export class TokenPipe implements PipeTransform {
  transform(token: string): string {
    if (!token) {
      return '';
    }

    return `${token.slice(0, 3)} ${token.slice(3)}`;
  }
}
