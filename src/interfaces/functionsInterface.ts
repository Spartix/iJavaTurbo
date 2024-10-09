export interface proutedefonctions {
  name: string;
  description: string;
  return: string;
  args: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
}
