import { Solicitacao_identificator } from './../models/solicitacao_identificator';
import { Cart } from './../models/cart';
import { LocalProfile } from './../models/local_profile';
import { STORAGE_KEY } from './../config/storage_keys.config';
import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {

        let user = localStorage.getItem(STORAGE_KEY.localUser);

        if(user == null)
        {
            return null;
        }
        else
        {
            return JSON.parse(user);
        };
    };

    setLocalUser(obj: LocalUser) {

        if(obj == null)
        {
            localStorage.removeItem(STORAGE_KEY.localUser);
        }
        else
        {
            localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(obj));
        };
    };

    getLocalPerfis(): LocalProfile 
    {
        let profile = localStorage.getItem(STORAGE_KEY.localProfile);

        if(profile == null)
        {
            return null;
        }
        else
        {
            return JSON.parse(profile);
        };
    };

    setLocalPerfis(obj: LocalProfile)
    {
        if(obj == null)
        {
            localStorage.removeItem(STORAGE_KEY.localProfile);
        }
        else
        {
            localStorage.setItem(STORAGE_KEY.localProfile, JSON.stringify(obj));
        };
    };

    getCart(): Cart 
    {
        let cart = localStorage.getItem(STORAGE_KEY.cart);

        if(cart == null)
        {
            return null;
        }
        else
        {
            return JSON.parse(cart);
        };
    };

    setCart(obj: Cart)
    {
        if(obj == null)
        {
            localStorage.removeItem(STORAGE_KEY.cart);
        }
        else
        {
            localStorage.setItem(STORAGE_KEY.cart, JSON.stringify(obj));
        };
    };

    getSolicitacao(): Solicitacao_identificator 
    {
        let solicitacaoIdentificator = localStorage.getItem(STORAGE_KEY.solicitacaoIdentificator);

        if(solicitacaoIdentificator == null)
        {
            return null;
        }
        else
        {
            return JSON.parse(solicitacaoIdentificator);
        };
    };

    setSolicitacao(obj: Solicitacao_identificator)
    {
        if(obj == null)
        {
            localStorage.removeItem(STORAGE_KEY.solicitacaoIdentificator);
        }
        else
        {
            localStorage.setItem(STORAGE_KEY.solicitacaoIdentificator, JSON.stringify(obj));
        };
    };

}