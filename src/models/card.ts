export interface Card {
  id?: string;
  name: string;
  corpName: string;
  tags: string[];
  benefit: string[];
  promotion?: {
    title: string;
    terms: string;
  };
  payback?: string;
  color: string[];
  image?: string;
  score?: number;
}
