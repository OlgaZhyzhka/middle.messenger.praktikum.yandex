const tpl = `{{{ avatar }}} <span>{{ login }}</span>
{{#if isAdmin}} 
<span class="title">{{ role }}</span>
{{/if}}`;
export default tpl;
