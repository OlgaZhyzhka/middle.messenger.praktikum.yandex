const tpl = `
<div class="page__container">
{{#if isLoading}}
  {{{ spinner }}}
{{else}}
<img src="{{ imgSrc }}" alt="{{ imgAlt }}">
<h1 class="page__title">{{ title }}</h1>
{{#if loginError}}
<h4 class="page__error">{{{loginError}}}</h4>
{{/if}}
{{{loginForm}}}
</div>
{{/if}}`;

export default tpl;
