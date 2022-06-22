import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { SHEcoShopFormService } from 'src/app/services/sheco-shop-form.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  
  constructor(private formBuilder: FormBuilder,
              private shecoShopFormService: SHEcoShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:[''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']

      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard:this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: ['']
      })
    });

    // populate months 
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.shecoShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    // populate years
      this.shecoShopFormService.getCreditCardYears().subscribe(data => {
        console.log("Retrived Credit Card Years: " + JSON.stringify(data));
        this.creditCardYears = data;
      })

      // populate countries
      this.shecoShopFormService.getCountries().subscribe(data => {
        console.log("Retrived countries: " + JSON.stringify(data));
        this.countries = data;
      });

  }

  
onSubmit(){
  console.log("Handling the submit button")
  
  console.log(this.checkoutFormGroup.get('customer').value);
  console.log(this.checkoutFormGroup.get('customer').value.email);
  console.log("The shippingAddress country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
  console.log("The shippingAddress state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
}

copyShippingAddressToBillingAddress(event: any){
  if (event.target.checked){
    this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
  }
  else{
    this.checkoutFormGroup.controls['billingAddress'].reset()
  }

}
handleMonthsAndYears(){
  const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
  const currentYear: number = new Date().getFullYear();
  const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);


  let startMonth: number ;

  if (currentYear === selectedYear){
    startMonth = new Date().getMonth() + 1;

  }
  else{
    startMonth = 1;

  }

this.shecoShopFormService.getCreditCardMonths(startMonth).subscribe(
  data => {
    console.log("Retrived credit card months:" + JSON.stringify(data));
    this.creditCardMonths = data;
  }
)

}
getStates(formGroupName: string) {
  const formGroup = this.checkoutFormGroup.get(formGroupName);

  const countryCode = formGroup.value.country.code;
  const countryName = formGroup.value.country.name;

  console.log(`${formGroupName} country code: ${countryCode}`);
  console.log(`${formGroupName} country name: ${countryName}`);

  this.shecoShopFormService.getStates(countryCode).subscribe((data) => {
    if (formGroupName === 'shippingAddress') {
      this.shippingAddressStates = data;
    } else {
      this.billingAddressStates = data;
    }

    formGroup.get('state').setValue(data[0]);
  });
}
}
