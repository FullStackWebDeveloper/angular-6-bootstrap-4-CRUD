import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { Product } from './../home/product.model';

@Component({
    selector: 'app-input-modal',
    templateUrl: './input-modal.component.html',
    styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {

    @Input() type;
    public inputField = new FormControl('', Validators.required);
    public validateValue: boolean = true;
    public products: Array<Product> = [];

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.inputField.valueChanges.subscribe((value)=> {
            this.validateValue = true;
            this.products = [];
            if (!value.match(/^\s*\(\s*[A-Za-z]+\s*\,\s*[0-9]+\s*\)(\s*\,\s*\(\s*[A-Za-z]+\s*\,\s*[0-9]+\s*\)\s*)*$/g)) {
                this.validateValue = false;
                return;
            }
            value = value.replace(/\s/g, '');
            let tempArray = value.split(/[\s()]+/);
            tempArray = tempArray.filter(item => item);
            for (let i=0; i<tempArray.length; i++) {
                let t = tempArray[i].split(/[\s,]+/).filter(item => item);
                if (t.length != 2 && t.length != 0)  {
                    this.validateValue = false;
                    break;
                }
                if (t.length == 0) {
                    continue;
                }
                else {
                    if (!Number(t[1])) {
                        this.validateValue = false;
                        break;
                    }
                    this.products.push({
                        product_name: t[0],
                        weight: t[1]
                    })
                    this.validateValue = true && this.inputField.valid;
                }
            }
        })
    }

    submit() {
        if (this.validateValue) {
            this.activeModal.close(this.products)
        } else {
            this.validateValue = false;
        }
    }
}
