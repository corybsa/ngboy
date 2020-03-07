import { BehaviorSubject } from 'rxjs';

export abstract class Debugger<T> {
  protected readonly debugData: BehaviorSubject<T>;

  protected constructor() {
    this.debugData = new BehaviorSubject<T>(null);
  }

  protected emit(data: T): void {
    this.debugData.next(data);
  }

  public subscribe(): BehaviorSubject<T> {
    return this.debugData;
  }
}
