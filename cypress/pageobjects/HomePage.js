import {AuthPageLocators, BasePageLocators} from './LocatorsPage'
// var chaiColors = require('chai-colors');    
// chai.use(chaiColors);


//ФУНКЦИИ АВТОРИЗАЦИИ//

let globalCookie = '';

export class HomePage {
    static login() { //Авторизация//
        cy.clearCookies()
        cy.visit('https://alfabank.ru/')
        cy.window().then((win)=> {
            if(win.top.odoo === undefined){
                win.top.odoo = win.odoo;
            }
        })
        cy.get(AuthPageLocators.LOGIN_FIELD).type('admin')
        cy.get(AuthPageLocators.PASSWORD_FIELD).type('admin')
        cy.get('button').contains('Log In').click()
    };
    
    static login_n(login,password) { //Авторизация с переменными//
        cy.clearCookies()
        cy.visit('https://alfabank.ru/')
        cy.window().then((win)=> {
            if(win.top.odoo === undefined){
                win.top.odoo = win.odoo;
            }
        })
        cy.get(AuthPageLocators.LOGIN_FIELD).type(login)
        cy.get(AuthPageLocators.PASSWORD_FIELD).type(password)
        cy.get('button').contains('Log In').click()
    };

    //Функция по получению токена авторизации//
    static receive_cookie(login,password) {
        HomePage.login_n(login,password)
        cy.request({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
            url: Cypress.env('URL')  + '/web/session/authenticate',
            body: {
              login: 'admin',
              password: "admin",
              db: "woody",
            },
        }).then((response) => {
        console.log(response);
      
               const cookie = response.headers['set-cookie'][0].split(';').filter(el=> (el.includes('session_id')))[0].split('=')[1];

               globalCookie = cookie
      
        })};
        
    // Авторизация через токен
    static auth_cookie() {
        cy.request({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
            url: Cypress.env('URL') + '/web/session/authenticate',
            body: {
              login: 'admin',
              password: "admin",
              db: "woody",
              
            },
        }).then((response) => {
        console.log(response);
      
               const cookie = response.headers['set-cookie'][0].split(';').map(el=>{
                return el.trim().split('=');
              });
               const [_,session_id] = cookie.find(([key,value])=>{
          
                return key==='session_id'
               })
      
                cy.setCookie('session_id', globalCookie, {
                    domain: cookie.domain,
                    expiry: 1672844064,
                    httpOnly: true,
                    path: '/',
                  })
                  Cypress.Cookies.defaults({
                    preserve:cookie.name,
                  })
                  cy.visit(Cypress.env('URL'))
        })};

    // открыть страницу
    static visit_url(url) {
        cy.visit(url)
    };
        
//ФУНКЦИИ КЛИКА ПО ЭЛЕМЕНТАМ//

    //XPATH КЛИКИ//

    //Найти поле-кликнуть xpath//
    static xpath_clicks_on_the_button(selector) {
        cy.wait(500)
        cy.xpath(selector).click()
    };

    //Найти поле-кликнуть-ввести данные xpath//
    static xpath_find_click_and_fill_in(selector, meaning) {
        cy.wait(500)
        cy.xpath(selector).type(meaning)
    };

    //Kликни, очисти поле и введи данные xpath//
    static clicks_button_clear_xp(selector,meaning) {
        cy.wait(500)
        cy.xpath(selector).click().clear()
        cy.xpath(selector).type(meaning)      
    };

    //Найти поле-кликнуть-ввести данные-нажать enter xpath//
    static xp_click_write_enter(selector, meaning) {
        cy.wait(500)
        cy.xpath(selector).type(meaning)
        HomePage.enter_click()
    };

    //Клик по кнопкам циклом c xpath//
    static xpath_elem_cycle_click(...elements) {
        cy.wait(500)
        elements.forEach(e => cy.xpath(e).click())
    };

    //GET КЛИКИ//

    //Последовательный клик по двум элементам//
    static two_clicks_in_the_fields(selector,selector2) {
        cy.get(selector).click()
        cy.wait(500)
        cy.get(selector2).click()
        cy.wait(500)
    };

    //Найти поле-кликнуть//
    static clicks_on_the_button(selector) {
        cy.wait(500)
        cy.get(selector).click()
    };

    //Найти поле-кликнуть-ввести данные//
    static find_click_and_fill_in(selector, meaning) {
        cy.wait(500)
        cy.get(selector).type(meaning)
    };

    //Кликни и нажми enter//
    static clicks_button_enter(selector) {
        cy.wait(500)
        cy.get(selector).click()
        HomePage.enter_click()
    };

    //Найти поле-кликнуть-ввести данные-нажать enter//
    static click_write_enter(selector, meaning) {
        cy.wait(500)
        cy.get(selector).type(meaning)
        HomePage.enter_click()
    };

    //Кликни, очисти поле и введи данные//
    static clicks_button_clear(selector,meaning) {
        cy.wait(500)
        cy.get(selector).click().clear()
        cy.get(selector).type(meaning)      
    };

    // кликни, очисти поле и введи данные нажми enter
    static clicks_button_clear_enter(selector,meaning) {
        cy.wait(500)
        cy.get(selector).click().clear()
        cy.get(selector).type(meaning)
        HomePage.enter_click()      
    };

    //Клик по кнопкам циклом//
    static elem_cycle_click(...elements) {
        cy.wait(500)
        elements.forEach(e => cy.get(e).click().wait(500))
    };


    //CONTAINS КЛИКИ//

    //Найти текст-кликнуть-ввести данные-нажать enter//
    static find_click_and_fill_in_text(tag,text,meaning) {
        cy.wait(500)
        cy.get(tag).contains(text).type(meaning)
        HomePage.enter_click()
    };

    //Найти элемент по тексту и кликнуть//
    static contains_click(tag,text) {
        cy.wait(500)
        cy.get(tag).contains(text).click()
    };

    //Найти элемент по тексту без тега и кликнуть//
    static contains_text_click(text) {
        cy.wait(500)
        cy.contains(text).click()
    }; 


//ФУНКЦИИ ПРОВЕРОК ЭЛЕМЕНТОВ И ТЕКСТА//

    //ПРОВЕРКА ТЕКСТА//

    //Проверка совпадения текста//
    static should_text(tag,text) {
        cy.get(tag).should('have.text',text);
    };

    //Проверка совпадения текста по всем полям//
    static cont_text(text) {
        cy.wait(500)
        cy.contains(text).should('be.visible');
    };

    //Проверка отсутствия текста по всем полям//
    static not_cont_text(text) {
        cy.wait(500)
        cy.contains(text).should('not.exist');
    };

    //Проверка что текст не виден по всем полям//
    static not_visibl_cont_text(text) {
        cy.wait(500)
        cy.contains(text).should('not.be.visible');
    };

    //Проверка отсутствия ошибки Odoo Error//
    static not_odoo_error() {
        cy.contains('Odoo Error').should('not.exist');
    };

    //Проверка присутствия текста циклом//
    static element_cycle(...elements) {
        elements.forEach(e => cy.contains(e))
    };

    //ПРОВЕРКА GET ЭЛЕМЕНТА//

    //Проверка отсутствия элемента//
    static not_element(text) {
        cy.get(text).should('not.exist');
    };

    //Проверка присутствия элемента//
    static element(text) {
        cy.get(text).should('exist')
    };

    //Проверка присутствия элемета get циклом//
    static get_cycle(...elements) {
        elements.forEach(e => cy.get(e))
    };

    //ПРОВЕРКА XPATH ЭЛЕМЕНТА//

    //Проверка отсутствия элемента xp//
    static xp_not_element(text) {
        cy.xpath(text).should('not.exist')
    };

    //Проверка отсутствия видимости элемента xp//
    static xp_not_vis_element(text) {
        cy.xpath(text).should('not.visible')
    };

    //Проверка присутствия элемета xpath циклом//
    static xpath_cycle(...elements) {
        elements.forEach(e => cy.xpath(e))
    };

    
//ФУНКЦИИ СПЕЦИАЛЬНЫХ ПРОВЕРОК И ВЗАИМОДЕЙСТВИЙ//
    

    //Выбор значения из выпадающего списка//
    static clicks_button_select(selector,select) {
        cy.wait(500)
        cy.get('.o_loading').should('not.be.visible')
        cy.get(selector).select(select)
    };

    //Выбор значения из выпадающего списка xpath//
    static xp_clicks_button_select(selector,select) {
        cy.wait(500)
        cy.get('.o_loading').should('not.be.visible')
        cy.xpath(selector).select(select)
    };

    //Текущая дата.Передавать HomePage.date_local()
    static date_local() {
        cy.wait(500)
        const date = new Date()
        return date.toLocaleString()
    };

    //Текущая дата+n часов.Передавать HomePage.date_local_n()
    static date_local_n(n) {
        cy.wait(500)
        const date = new Date()
        date.setHours(n);
        return date.toLocaleString()
    };

    //Проверка цвета - вводить код в формате rgb(220, 165, 0)//
    static color_check(selector,code) {
        cy.wait(500)
        cy.get('.o_loading').should('not.be.visible')
        cy.get(selector)
            .should('have.css', 'color')
            .and('eq', code)
    };

    //Нажатие Enter//
    static enter_click() {
        cy.wait(500)
        cy.get('body').type('{enter}')
    };

//ФУНКЦИИ ОЖИДАНИЙ//   

    //Ожидание появления элемента//
    static element_n(text,time) {
        cy.wait(500)
        cy.get(text, {timeout: time}).should('exist')
    };

    //Ожидание появления элемента xpath//
    static element_n_xp(text,time) {
        cy.wait(500)
        cy.xpath(text, {timeout: time}).should('exist')
    };

    //Ожидание появления текста//
    static text_n(text,time) {
        cy.wait(500)
        cy.contains(text, {timeout: time}).should('exist')
    };


    //Ожидание пока элемент исчезнет//
    static not_element_n(text,time) {
        cy.get(text, {timeout: time}).should('not.exist')
    };   

    //Ожидание пока текст исчезнет//
    static not_text_n(text,time) {
        cy.contains(text, {timeout: time}).should('not.exist')
    }; 

    //Подождать загрузку и перезагрузить страницу//
    static reload() {
        cy.reload()
    };  

    
}
