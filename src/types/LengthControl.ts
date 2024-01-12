// for coverage
export const TYPE_ONLY = true;

export default interface LengthControl {
  drawerOpen?: boolean;

  character?: string;
  length: string;
  direction: 'FRONT' | 'BACK';
  truncate: boolean;
}
