import Block from '@/core/Block';
import TabsNav from '@/views/components/TabsNav/TabsNav';
import { TabsContent } from '@/views/components/TabsContent';
import { TabsProps } from './interfaces/TabsProps';
import tpl from './tpl';

class Tabs extends Block {
  private activeTab: number = 0;

  constructor(props: TabsProps) {
    super(props);
    this.setProps({
      attributes: { class: `${props.attributes?.class || ''} tabs` },
      tabsNav: new TabsNav({
        items: props.items,
        onClick: (index: number): void => this.setActiveTab(index),
      }),
      tabsContent: new TabsContent({}),
    });
    this.updateTabsDisplay();
  }

  private updateTabsDisplay(): void {
    (this.children.tabsNav as TabsNav).highlightTab(this.activeTab); 
    const contentComponent = (this.props as TabsProps).onChange(this.activeTab);
    (this.children.tabsContent as TabsContent).setProps({
      content: contentComponent,
    });
  }

  private setActiveTab(index: number): void {
    if (index < 0) {
      return;
    }

    this.activeTab = index;

    this.updateTabsDisplay();
  }

  public render(): DocumentFragment {
    return this.compile(tpl);
  }
}

export default Tabs;
