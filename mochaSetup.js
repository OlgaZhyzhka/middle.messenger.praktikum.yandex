import 'tsconfig-paths/register';
import { JSDOM } from 'jsdom';
const jsdom = new JSDOM('<!doctype html><html><body><div id="test-root"></div></body></html>', { url: 'http://localhost/' });

global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.window = jsdom.window;
global.document = jsdom.window.document;
global.history = jsdom.window.history;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.Event = jsdom.window.Event;
