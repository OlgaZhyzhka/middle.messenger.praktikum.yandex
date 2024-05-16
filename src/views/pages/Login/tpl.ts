const tpl = `
{{#if isLoading}}
  {{{ spinner }}}
{{else}}
    <img src="{{ imgSrc }}" alt="{{ imgAlt }}"> <h1 class="form__title">{{ pageTitle }}</h1> {{{loginForm}}}
{{#if loginError}}
  <p>{{{loginError}}}</p>
{{/if}}
{{/if}}`;

export default tpl;
