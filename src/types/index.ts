export interface TodoItem {
    id: number;
    title: string;
    text: string;
    isDone: boolean;
  }
  
  export type FilterType = 'all' | 'active' | 'completed';
  