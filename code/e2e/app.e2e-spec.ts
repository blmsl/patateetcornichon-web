import { WebPecPage } from './app.po';

describe('web-pec App', () => {
  let page: WebPecPage;

  beforeEach(() => {
    page = new WebPecPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
