export interface DropdownProps {
  isOpen: boolean;
  items: {
    title: string;
    onClick: (event: Event) => void;
  }[];
}