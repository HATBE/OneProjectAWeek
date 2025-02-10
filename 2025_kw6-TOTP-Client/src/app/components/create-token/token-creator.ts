import { EventEmitter } from '@angular/core';
import { TotpItemForm } from '../../models/totp-item.model';

export default interface TokenCreator {
  onCreate: EventEmitter<TotpItemForm>;
}
