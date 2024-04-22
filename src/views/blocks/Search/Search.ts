import Block, { Props } from '@/core/Block';
import { Input } from '@/views/components/Input';
import { IconButton } from '@/views/components/IconButton';
import tpl from './tpl';

class Search extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      attributes: { class: 'search' },
      searchIcon: new IconButton({
        attributes: { class: 'search__button' },
        iconName: 'search',
        iconSize: 'sm',
        onClick: (event): void => {
          event.preventDefault();
          this.handleSearch();
        },
      }),
      searchInput: new Input({
        size: 'sm',
        attributes: { class: 'search__input', placeholder: 'Search' },
      }),
    });
  }

  private handleSearch(): void {
    const value = ((this.getChild('searchInput') as Input).element as HTMLInputElement)?.value;
    console.log(value);
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Search;
