import { JspdfTablePage } from './app.po';

describe('jspdf-table App', () => {
  let page: JspdfTablePage;

  beforeEach(() => {
    page = new JspdfTablePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
