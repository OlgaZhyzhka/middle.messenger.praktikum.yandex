const tpl = `
<div class="page__container">
{{#if isLoading}}
  {{{ spinner }}}
{{else}}
<h1 class="page__title">{{ title }}</h1>
{{#if signUpError}}
<h4 class="is-error">{{{signUpError}}}</h4>
{{/if}}
{{{registrationForm}}}
</div>
{{/if}}
`;

export default tpl;
