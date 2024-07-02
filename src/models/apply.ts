export interface Term {
  id: string;
  link?: string;
  title: string;
}

export interface ApplyValues {
  terms: Array<Term["id"]>;
  cardId: string;
  salary: string;
  creditScore: string;
  payDate: string;
  isMaster: boolean;
  isHipass: boolean;
  isRf: boolean;
  colorSelected: string;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}
