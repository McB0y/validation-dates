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

      public actual: any; 
      public myTimePicker: any;
      public datePickerSet: any;
      public myDatePickerOptions: IMyDpOptions;
      public model: any;
      public finalDate: any;
      public invalidDateChoosen: boolean;//bandera de fecha invalida

      public constructor(){
        this.actual = moment(); 
        this.myTimePicker = new Date(); 
        this.invalidDateChoosen = false;
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

      public dateChoosenByTheUser(){ // te paso la fecha del tiem picker.
          let modelDate = {...this.model.date};
          modelDate.month = modelDate.month - 1;
           //Conseguimos la hora para la creacion de la fecha.
          let h = this.actual.get('hour');
          let m = this.actual.get('minute');
          let s = this.actual.get('second')
           /*

           Borra el codigo de arriba para probar con el date picker de bootstrap.
            Para el bloque del time picker
            let h = this.myTimePicker.getHours();
            let m = this.myTimePicker.getMinutes();
            let s = this.myTimePicker.getSeconds();
          */
          let userDate = moment(modelDate).hours(h).minutes(m).seconds(s); // aqui va la hora del date picker
              this.invalidDateChoosen = false;
              console.log(userDate);
              return userDate;
         
      }

      // 2.- Obtenemos una fecha con diferencia de 72 horas usando el metodo moment() y asignando la hora actual
      //para después comparalas

      public limitDateValidInvoice(){
         let h = this.actual.get('hour');
         let m = this.actual.get('minute');
         let s = this.actual.get('second')
         let rigthNow = moment().hour(h).minute(m).second(s);
         //hace 3 días.
         let threeDaysAgo = rigthNow.subtract(72,'hours');
         return threeDaysAgo;
      }

      // 3.- Asegurandonos de que la fecha que fue elegida jamas se exeda de 72 horas.

      public compareDates(){
         let validInvoice = this.dateChoosenByTheUser().isBefore(this.limitDateValidInvoice());
          console.log(this.dateChoosenByTheUser());
          console.log(this.limitDateValidInvoice());
          console.log(validInvoice);
          return validInvoice;
      }

       //NOTE: Utilizo este bloque de código para que la fecha final de la factura sea seteada correctamente.

      public checkTime(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
      }
      
      //El último método en ejecutarse por que es quien setea el invoice.

      public setInvoiceValiDate() {
        //La factura sigue siendo valida para
        if(!this.compareDates()){
        let chooseDate = { ...this.model.date }
        let day = this.checkTime(chooseDate.day);
        let month = this.checkTime(chooseDate.month);
        let year = this.checkTime(chooseDate.year);
        let actualHour = moment().format('HH:mm:ss');
        let finalDate = `${year}-${month}-${day} ${actualHour}`
        console.log(finalDate);
        } else {
          // llama al toaster porque la factura ya no es valida
        }
      }
      
}
