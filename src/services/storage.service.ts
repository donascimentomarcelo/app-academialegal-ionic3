import { LocalPerfis } from './../models/local_perfis';
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

    getLocalPerfis(): LocalPerfis 
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

    setLocalPerfis(obj: LocalPerfis)
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

}