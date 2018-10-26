import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputModalComponent } from '../input-modal/input-modal.component';
import { HomeService } from './home.service';
import { Product } from './product.model';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public products:Array<Product> = [];

    constructor(private modalService: NgbModal, private homeService: HomeService) {}

    ngOnInit() {
        this.getProducts();
    }

    open(type) {
        const modalRef = this.modalService.open(InputModalComponent);
        modalRef.componentInstance.type = type;
        modalRef.result.then(result=> {
            if (result) {
                switch (type) {
                    case "Add":
                        this.addProducts(result);
                        break;
                    case "Remove":
                        this.removeProducts(result);
                        break;
                    case "Modify":
                        this.updateProducts(result);
                        break;
                
                    default:
                        break;
                }
            }
        })
    }

    getProducts() {
        this.products = [];
        this.homeService.getProducts().subscribe((data) => {
            this.products = data;
        });
    }

    addProducts(data) {
        this.homeService.addProducts(data).subscribe((data) => {
            if (data) {
                this.products = this.products.concat(data)
            }
        });
    }

    removeProducts(data) {
        this.homeService.deleteProducts(data).subscribe((data) => {
            this.getProducts();
        });
    }

    updateProducts(data) {
        this.homeService.updateProducts(data).subscribe((data) => {
            if (data) {
                this.products = data
            }
        });
    }

}
