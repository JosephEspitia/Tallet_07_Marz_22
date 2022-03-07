import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from './products.service';
import Swal from 'sweetalert2'
import { Product } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public productService:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  createProduct(form: NgForm) {
    const { name, price, availableElemnts, description } = form.value
    if(!name || !price || !availableElemnts || !description) {
     return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes dejar campos vacios',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      
    }
    this.productService.postProduct(form.value).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Producto creado correctamente',
        showConfirmButton: true,
      })
      this.productService.selectedProduct.name=""
      this.productService.selectedProduct.price=0
      this.productService.selectedProduct.availableElemnts=0
      this.productService.selectedProduct.description=""
      this.getProducts();
    })
  return
  }

  getProducts() {
    this.productService.getProduct().subscribe(res=>{
      this.productService.products=res as Product[];
      console.log(res)
    })
  }

  deleteProduct(_id:string) {
    /* if(confirm("¿Seguro desea eliminar el elemento seleccionado?")) { */


      Swal.fire({
        title: '¿Estas seguro de eliminar el producto?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Producto eliminado exitosamente!', '', 'success')
          this.productService.deleteProduct(_id).subscribe(res=>{
            this.getProducts();
          });
          
        } else if (result.isDenied) {
          Swal.fire('Los cambios no han sido guardado', '', 'info')
        }
      })

   
    }
 /*  } */

}
