import Block, { Props } from '@/core/Block';

export interface BasePageProps extends Props {
  pageTitle: string;
  attributes?: Record<string, string>;
}

class BasePage extends Block {
  constructor(props: BasePageProps) {
    super({
      ...props,
      attributes: {
        class: 'container container_centered page',
        ...props.attributes,
      },
    });
  }
}

export default BasePage;
