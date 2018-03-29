import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";
import { Cart } from '../../models/cart';
import { ExercicioDTO } from '../../models/exercicio.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService){};

    createOrClearCart(): Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    };

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if(cart == null)
        {
            cart = this.createOrClearCart();
        };
        return cart;
    };

    addExercicio(exercicio: ExercicioDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(index => index.exercicio.id == exercicio.id);
        if(position == -1)
        {
            cart.items.push(
                {
                    letra: null,
                    repeticoes: '10 - 10 - 10',
                    observacao: null,
                    exercicio: exercicio
                }
            );
        }
        this.storage.setCart(cart);
        return cart;
    }
}