const tpl = `<div class="message message_base">
{{#if_eq type 'file'}}
  {{{ fileDisplay }}}
{{else}}
  <p class="message__content">{{content}}</p>
{{/if_eq}}
<div class="message__footer">
  <span class="message__date">{{time}}</span>
{{#if is_read}}
  {{{ iconRead }}}
{{/if}}
</div></div>`;
export default tpl;