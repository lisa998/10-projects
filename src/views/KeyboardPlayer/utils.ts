import axios, { AxiosResponse } from 'axios';

interface StringResponse {
  Content: string;
  Author: string;
  Source: string;
  ID: string;
}

// eslint-disable-next-line import/prefer-default-export
export async function getSentence(): Promise<StringResponse> {
  const result: AxiosResponse<StringResponse> = await axios('https://api.eatrice.top/');
  // correct the sentence syntax wrong
  if (!result.data.Content.includes(', ')) {
    result.data.Content = result.data.Content.replaceAll(',', ', ');
  }
  const end = result.data.Content[result.data.Content.length - 1];
  if (end !== '.' && end !== '?') {
    result.data.Content = `${result.data.Content}.`;
  }
  return result.data;
}
export const buttons = [
  ['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'BACK'],
  ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'ENTER'],
  ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ';', 'SHIFT'],
];
export const specificWidth = (key: string): string | null => {
  switch (key) {
    case 'BACK':
    case 'TAB':
      return '5em';
    case 'CAPS':
    case 'ENTER':
      return '6em';
    case 'SHIFT':
      return '8em';
    default:
      return null;
  }
};
export const specificBgColor = (i: number): string => {
  switch (i) {
    case 2:
    case 9:
      return 'coral';
    case 3:
    case 8:
      return 'darkorange';
    case 4:
    case 7:
      return 'gold';
    case 5:
    case 6:
      return 'khaki';
    default:
      return 'crimson';
  }
};
