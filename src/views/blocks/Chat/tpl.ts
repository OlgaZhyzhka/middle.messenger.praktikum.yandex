const tpl = `
{{{ chatButton }}}
{{#if activeChatId}}
<div class="chat__wrapper">
{{{ chatHeader }}}

<div class="chat__body">{{{ chatLog }}}</div>
{{{ chatInput }}}
</div>
{{{ modalAddUser }}}{{{ modalDeleteUser }}}{{{ modalDeleteChat }}}{{{ modalUploadAvatar }}}
{{else}}
<div class="chat__message"><span class="title">Select chat for start</span></div>
{{/if}}{{{ modalCreateChat }}}`;
export default tpl;
