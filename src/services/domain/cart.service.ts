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
                    letra: 'A',
                    repeticoes: '10 - 10 - 10',
                    observacao: null,
                    exercicio: exercicio
                }
            );
        }
        this.storage.setCart(cart);
        return cart;
    };

    removeExercicio(exercicio: ExercicioDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(index => index.exercicio.id == exercicio.id);
        if(position != -1)
        {
            cart.items.slice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    };

    addLetra(exercicio: ExercicioDTO, letra: string): Cart{
        let cart = this.getCart();
        
        let position = cart.items.findIndex(index => index.exercicio.id == exercicio.id);
        if(position != -1)
        {
            cart.items[position].letra = letra;
        }
        this.storage.setCart(cart);
        return cart;
    };

    addRepeticoes(exercicio: ExercicioDTO, repeticoes: string): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(index => index.exercicio.id == exercicio.id);
        if(position != -1)
        {
            cart.items[position].repeticoes = repeticoes;
        }
        this.storage.setCart(cart);
        return cart;
    };

    addObservacoes(exercicio: ExercicioDTO, observacao: string): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(index => index.exercicio.id == exercicio.id);
        if(position != -1)
        {
            cart.items[position].observacao = observacao;
        }
        this.storage.setCart(cart);
        return cart;
    };

}