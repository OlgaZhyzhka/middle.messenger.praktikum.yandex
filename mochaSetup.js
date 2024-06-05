import 'tsconfig-paths/register';
import { JSDOM } from 'jsdom';
const jsdom = new JSDOM('<!doctype html><html><body><div id="test-root"></div></body></html>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.Event = jsdom.window.Event;
