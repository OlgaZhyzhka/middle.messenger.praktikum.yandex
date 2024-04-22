export interface InputProps {
  onBlur?: (event: Event) => void;
  onInput?: (event: Event) => void;
  attributes?: Record<string, string | boolean>;
  inputAttributes?: Record<string, string | boolean>;
};
