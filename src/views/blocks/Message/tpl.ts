const tpl = `{{#if (eq type 'media')}}
<div class="media__thumb"><img src="{{mediaUrl}}" alt="" /></div>
{{else}}
  <p class="message__content">{{content}}</p>
{{/if}}
<div class="message__footer">
  <span class="message__date">{{time}}</span>
{{#if isRead}}
  {{{ icon }}}
{{/if}}</div>`;
export default tpl;
