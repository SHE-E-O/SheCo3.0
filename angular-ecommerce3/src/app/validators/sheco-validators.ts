import { FormControl, ValidationErrors } from "@angular/forms";

export class ShecoValidators {
    // whitspace validation
    static notOnlyWhiteSpace(control: FormControl) : ValidationErrors{
        //Chck if string only has white spacer
        if((control.value != null) && (control.value.trim().length === 0)){

            //invalid, return error objects
            return{'notOnlyWhiteSpace': true};
        }
        else{
            // 
            return null;
        }


        
    }

}
