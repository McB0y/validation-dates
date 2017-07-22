import { DateProyectPage } from './app.po';

describe('date-proyect App', () => {
  let page: DateProyectPage;

  beforeEach(() => {
    page = new DateProyectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
