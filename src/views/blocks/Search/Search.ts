import Block, { Props } from '@/core/Block';
import { Input } from '@/views/components/Input';
import { IconButton } from '@/views/components/IconButton';

import tpl from './tpl';
import { InputAddon } from '@/views/components/InputAddon';
import { actions } from '@/store/actions';

class Search extends Block {
  private clearButton = new IconButton({
    attributes: { class: 'search__button' },
    iconName: 'delete',
    iconSize: 'sm',
    onClick: (event: Event): void => this.handleClear(event),
  });

  private searchActivated = false;

  constructor(props: Props) {
    super({
      ...props,
      attributes: { class: 'search' },
      searchAction: new InputAddon({
        placement: 'right',
        addon: [
          new IconButton({
            attributes: { class: 'search__button' },
            iconName: 'search',
            iconSize: 'sm',
            onClick: (event: Event): void => this.handleSearch(event),
          }),
        ],
      }),
      searchInput: new Input({
        size: 'sm',
        attributes: { class: 'search__input', placeholder: 'Search' },
        onInput: (event: Event): void => this.handleInput(event),
      }),
    });
  }

  private handleClear(event: Event): void {
    event.preventDefault();
    const inputElement = (this.getChild('searchInput') as Input).element as HTMLInputElement;
    inputElement.value = '';
    (this.props.onSearch as (value: string) => void)('');
    this.toggleIcons('');
    this.searchActivated = false;
  }

  private handleSearch(event: Event): void {
    event.preventDefault();
    const inputElement = (this.getChild('searchInput') as Input).element as HTMLInputElement;
    const { value } = inputElement;
    (this.props.onSearch as (value: string) => void)(value);
  }

  private handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { value } = target;

    if (!this.searchActivated && value) {
      actions.setActiveChatId(null);
      // this.searchActivated = true;
    }

    this.toggleIcons(value);
  }

  private toggleIcons(value: string): void {
    const buttons = this.getChild('searchAction') as InputAddon;
    const innerAddon = buttons.getChildItems('addon') as IconButton[];

    if (value) {
      if (!innerAddon?.includes(this.clearButton)) {
        buttons.setProps({
          addon: [...innerAddon, this.clearButton],
        });
      }
    } else if (innerAddon.includes(this.clearButton)) {
      buttons.setProps({
        addon: innerAddon.filter((addon: IconButton) => addon !== this.clearButton),
      });
    }
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Search;
