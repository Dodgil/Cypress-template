import { HomePage } from "./HomePage";
// import {AuthPageLocators, BasePageLocators} from '../../pageobjects/LocatorsPage'
import {AuthPageLocators, BasePageLoc, HomePageLoc, VkladPageLoc} from './LocatorsPage'


export class UrlPage {

// ts-001 Первый пробный тест - проверка заголовка
static Test_1() {
    HomePage.visit_url(BasePageLoc.url)
    HomePage.xpath_elem_cycle_click(HomePageLoc.VKLAD_BTN_XP)
    cy.wait(1000)
    HomePage.xpath_cycle(VkladPageLoc.NAC_PR_BTN_XP)
    };
}