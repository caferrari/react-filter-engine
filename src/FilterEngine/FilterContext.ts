import { BehaviorSubject, Observable } from 'rxjs';

export interface IAttributeData {
  [key: string]: string;
}

export class FilterContext {
  private attributes: IAttributeData = {};
  private value$: BehaviorSubject<IAttributeData>;

  constructor() {
    this.value$ = new BehaviorSubject<IAttributeData>({});
  }

  setValue(attribute: string, value: string): void {
    this.attributes[attribute] = value;

    if (value === null || value === '') {
      delete this.attributes[attribute];
    }

    this.value$.next(this.attributes);
  }

  public getSubject(): Observable<IAttributeData> {
    return this.value$.asObservable();
  }

}