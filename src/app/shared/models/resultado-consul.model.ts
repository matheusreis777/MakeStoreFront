export class ResultadoConsulta<T> {
    sort(arg0: (a: any, b: any) => number) {
      throw new Error('Method not implemented.');
    }
    total: number | undefined;
    lista: T[] | undefined;
}
