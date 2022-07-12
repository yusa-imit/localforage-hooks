import { TableScheme } from './TableScheme';
export interface DBScheme {
  name: string;
  tables: TableScheme[];
}
