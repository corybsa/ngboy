import { BehaviorSubject } from 'rxjs';

export abstract class Debugger<T> {
  protected readonly debugData: BehaviorSubject<T>;

  private enabled = true;

  protected constructor() {
    this.debugData = new BehaviorSubject<T>(null);
  }

  protected emit(data: T): void {
    if(this.enabled) {
      this.debugData.next(data);
    }
  }

  public setDebuggerEnabled(status: boolean) {
    this.enabled = status;
  }

  public subscribe(): BehaviorSubject<T> {
    return this.debugData;
  }
}
