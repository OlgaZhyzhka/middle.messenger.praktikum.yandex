const tpl = `<div class="message message_base">
  <p class="message__content">{{content}}</p>
<div class="message__footer">
  <span class="message__date">{{time}}</span>
{{#if is_read}}
  {{{ icon }}}
{{/if}}
</div></div>`;
export default tpl;
