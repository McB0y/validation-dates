import { Component, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { NgForm } from '@angular/forms';
import * as moment from 'moment'; // importamos moment.js

@Component({
  selector: 'date-component',
  templateUrl: './date-componet.component.html',
  styleUrls: ['./date-componet.component.css']
})
export class DateComponetComponent {

      public actual: any
      public datePickerSet: any;
      public myDatePickerOptions: IMyDpOptions;
      public model: any;
      public finalDate: any;

      public constructor(){
        this.actual = moment();  
        this.finalDate = ''; // Esta es la fecha final que va a tener la factura.
      }

      public ngOnInit() {
        let year = this.actual.get('year');
        let day = this.actual.get('date');
        let month = this.parseMonth(this.actual.get('month'));
        this.myDatePickerOptions = {
          dateFormat: 'dd/mm/yyyy',
        };
        this.model = {
          date: {
            year: year,
            month: month,
            day: day
          }
        }
      }

      public parseMonth(month) { // Este metodo es necesario para que podamos setear el mes del picker correctamente.
      if (month < 10) {
        month = month + 1;
        }
        return month;
      }

      //Funciones independientes con moment.js

      //1.- Fecha elegida elegida por el usuario mediante el date picker. y le asignamos una hora

      public dateChoosenByTheUser(){
          let modelDate = {...this.model.date};
          modelDate.month = modelDate.month - 1;
           //Conseguimos la hora para la creacion de la fecha.
          let h = this.actual.get('hour');
          let m = this.actual.get('minute');
          let s = this.actual.get('second')
          let fecha = moment(modelDate).hours(h).minutes(m).seconds(s);
          console.log(fecha);
      }
   

      public prueba(){
      // Ya tenemos la fecha que se selecciono el usurio pero con hora
      //procedemos a crear la fecha de hace 3 dias con respecto a hoy para despues comparalar
      //la que eligio el usuario  y saber si ya tiene mas de 3 dias, entonces hay que repetir el paso anterior
      //para setar la fecha pasada
      let rigthNow = moment().second(s);
      rigthNow.subtract(72, 'hours');
      console.log(rigthNow);
      console.log(fecha.isBefore(rigthNow));
      }

      public checkTime(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
      }


      //El ultimo método en ejecutarse

      public setInvoiceValiDate() {
        //hay que checar si es que viene la fecha del date picker si no por defecto es la de hoy
        let chooseDate = { ...this.model.date }
        let day = this.checkTime(chooseDate.day);
        let month = this.checkTime(chooseDate.month);
        let year = this.checkTime(chooseDate.year);
        let actualHour = moment().format('HH:mm:ss');
        let finalDate = `${year}-${month}-${day} ${actualHour}`
        console.log(finalDate);
      }
      
}
