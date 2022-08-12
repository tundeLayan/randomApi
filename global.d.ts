interface IRow{
  id: string;
  row: number;
  age: number;
  gender: string;
}

interface IRows extends Array<IRow>{}