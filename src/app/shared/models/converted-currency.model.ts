export interface IConvertedCurrency {
  date: string;
  historical: string;
  info: IInfo;
  query: Query;
  result: number;
  success: boolean;
}

interface IInfo {
  rate: number;
  timestamp: number;
}

interface Query {
  amount: number;
  from: string;
  to: string;
}
