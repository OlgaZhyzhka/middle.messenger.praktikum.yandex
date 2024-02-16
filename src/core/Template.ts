import Handlebars from 'handlebars';

export default class Template {
  private template: HandlebarsTemplateDelegate;

  constructor(templatePath: string) {
    const template = templatePath;
    this.template = Handlebars.compile(template);
  }

  public render(props = {}): string {
    return this.template(props);
  }
}
