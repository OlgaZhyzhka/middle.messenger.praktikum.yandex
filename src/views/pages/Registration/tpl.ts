const tpl = `
<div class="page__container">
{{#if isLoading}}
  {{{ spinner }}}
{{else}}
<h1 class="page__title">{{ title }}</h1>
{{#if authError}}
<h4 class="is-error">{{{authError}}}</h4>
{{/if}}
{{{registrationForm}}}
</div>
{{/if}}
`;

export default tpl;
