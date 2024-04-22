const tpl = `{{#if isLoading}}
  <div class="chat__message">Select chat for start.</div>
{{else}}
<div class="chat__wrapper">
{{{ chatHeader }}}
<div class="chat__body">{{{ chatMessages }}}</div>
{{{ chatInput }}}
</div>
{{/if}}`;
export default tpl;
