export interface Event {
  type: string;
  title: string;
  source: string;
  time: string;
  description: string;
  icon: string;
  size: string;
}

export interface Pagination {
  offset: number;
  limit: number;
}

export interface Filters {
  types: Array<string>;
}
