const tpl = `<div class="page__section">
{{{sidebar}}}
{{#if isChatListLoading}}
  {{{ spinner }}}
{{else}}
{{{contactsPanel}}}{{/if}}
<div class="page__column">{{{chat}}}</div></div>`;

export default tpl;
