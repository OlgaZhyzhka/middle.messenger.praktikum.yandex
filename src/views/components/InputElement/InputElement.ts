import Block from '@/core/Block';
import { ErrorText } from '@/views/components/ErrorText';
import { Input } from '@/views/components/Input';
import { InputElementProps } from './interfaces/InputProps';
import tpl from './tpl';



class InputElement extends Block {
  constructor(props: InputElementProps) {
    super({
      ...props,
      errorText: new ErrorText({
        attributes: { class: 'form__error' },
        text: props.errorText || '',
      }),
      input: new Input({
        size: props.size,
        attributes: {
          ...props.inputAttributes,
        },
        onBlur: props.onBlur,
      }),
    });
  }

  public setIsValid(isValid: boolean): void {
    this.toggleClass({ class: isValid ? 'is-success' : 'is-error' });

    this.setProps({
      isValid,
    });
  }

  public setErrorMessage(message: string): void {
    (this.getChild('errorText') as ErrorText).setProps({
      text: message,
    });
  }

  public getInputElement(): HTMLInputElement {
    return (this.getChild('input') as Input).element as HTMLInputElement;
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default InputElement;
